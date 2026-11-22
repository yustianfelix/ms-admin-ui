"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Employee } from "@/lib/_types/hr";
import { EmployeeHeader } from "./_components/employee-header";
import { EmployeeSearch } from "./_components/employee-search";
import { EmployeeTable } from "./_components/employee-table";
import { EmployeeDialog } from "./_components/employee-dialog";
import { EMPTY_EMPLOYEE, type EmployeeForm, type EmployeeListResponse, type CreateEmployeeResponse } from "./_types/employee";

export default function EmployeesPage() {
  const { isLoading, user } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<EmployeeForm>(EMPTY_EMPLOYEE);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setLoadingEmployees(true);
      try {
        const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
        if (search.trim()) params.set("name", search.trim());
        const result = await apiRequest<EmployeeListResponse>(`/employees?${params}`);
        if (!cancelled) {
          setEmployees(result.data);
          setTotalPages(result.pagination.totalPages);
        }
      } catch (error) {
        if (!cancelled) toast.error(error instanceof Error ? error.message : "Failed to load employees.");
      } finally {
        if (!cancelled) setLoadingEmployees(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [page, pageSize, search]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_EMPLOYEE);
    setDialogOpen(true);
  };

  const openEdit = (employee: Employee) => {
    router.push(`/employees/${encodeURIComponent(employee.employeeId)}/edit`);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await apiRequest<CreateEmployeeResponse>("/employees", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          photo: form.photo || undefined,
          phoneNumber: form.phoneNumber?.trim() || undefined,
          role: form.role || undefined,
        }),
      });
      toast.success("Employee added.");
      setDialogOpen(false);
      setPage(1);
      setSearch("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add employee.");
    }
  };

  if (isLoading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-8 animate-spin text-[#176b50]" /></div>;

  return (
    <div className="min-h-screen bg-[#f5f7f4]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmployeeHeader onAdd={openAdd} />
        <EmployeeSearch value={search} onChange={(value) => { setSearch(value); setPage(1); }} />
        {loadingEmployees ? (
          <div className="flex min-h-60 items-center justify-center"><Loader2 className="size-7 animate-spin text-[#176b50]" /></div>
        ) : (
          <EmployeeTable employees={employees} onEdit={openEdit} />
        )}
        <div className="mt-5 flex items-center justify-between">
          <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="h-10 rounded-xl border border-[#dce5df] bg-white px-3 text-sm">
            {[10, 5, 1].map((size) => <option key={size} value={size}>{size} per page</option>)}
          </select>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="h-10 rounded-xl border border-[#dce5df] px-4 text-sm font-semibold disabled:opacity-40">Previous</button>
            <span className="text-sm text-[#718277]">Page {page} of {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className="h-10 rounded-xl border border-[#dce5df] px-4 text-sm font-semibold disabled:opacity-40">Next</button>
          </div>
        </div>
      </main>
      <EmployeeDialog open={dialogOpen} editing={editing} form={form} onClose={() => setDialogOpen(false)} onChange={setForm} onSubmit={submit} />
    </div>
  );
}
