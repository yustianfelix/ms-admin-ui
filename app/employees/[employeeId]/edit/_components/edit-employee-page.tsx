"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Employee } from "@/lib/_types/hr";
import { EditEmployeeForm } from "./edit-employee-form";
import type { EditEmployeeForm as EditForm, EmployeeProfileResponse } from "../_types/edit";

export function EditEmployeePageContent() {
  const params = useParams<{ employeeId: string }>();
  const router = useRouter();
  const { isLoading, user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EditForm>({ currentPassword: "", phoneNumber: "", photo: "", newPassword: "" });

  useEffect(() => {
    let cancelled = false;
    apiRequest<EmployeeProfileResponse>(`/employees/${encodeURIComponent(params.employeeId)}/profile`)
      .then((result) => {
        if (cancelled) return;
        setEmployee(result.data);
        setForm((current) => ({ ...current, phoneNumber: result.data.phoneNumber || "" }));
      })
      .catch((error) => {
        if (!cancelled) toast.error(error instanceof Error ? error.message : "Failed to load employee.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [params.employeeId]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const body: Record<string, string | null> = { currentPassword: form.currentPassword };
      if (form.phoneNumber) body.phoneNumber = form.phoneNumber;
      if (form.newPassword) body.newPassword = form.newPassword;
      if (form.photo.trim().toLowerCase() === "null") body.photo = null;
      else if (form.photo) body.photo = form.photo;

      await apiRequest<EmployeeProfileResponse>(`/employees/${encodeURIComponent(params.employeeId)}/profile`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      toast.success("Employee updated.");
      router.replace("/employees");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update employee.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-8 animate-spin text-[#176b50]" /></div>;

  return (
    <div className="min-h-screen bg-[#f5f7f4]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex min-h-60 items-center justify-center"><Loader2 className="size-7 animate-spin text-[#176b50]" /></div>
        ) : employee ? (
          <EditEmployeeForm employee={employee} form={form} loading={saving} onChange={setForm} onSubmit={submit} onCancel={() => router.replace("/employees")} />
        ) : (
          <p className="text-sm text-[#718277]">Employee not found.</p>
        )}
      </main>
    </div>
  );
}
