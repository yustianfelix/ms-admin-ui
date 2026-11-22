"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Employee } from "@/lib/_types/hr";
import { AttendanceHeader } from "./_components/attendance-header";
import { AttendanceFilters } from "./_components/attendance-filters";
import { AttendanceSummary } from "./_components/attendance-summary";
import { AttendanceTable } from "./_components/attendance-table";
import type { AttendanceListResponse, AttendanceSummaryResponse, AttendanceRecord } from "./_types/attendance";

export default function AttendancePage() {
  const { isLoading, user } = useAuth();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [employeeId, setEmployeeId] = useState("all");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<{ data: Employee[] }>("/employees?page=1&pageSize=10")
      .then((result) => setEmployees(result.data))
      .catch((error) => toast.error(error instanceof Error ? error.message : "Failed to load employees."));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      try {
        if (employeeId !== "all" && (from || to)) {
          const params = new URLSearchParams({ employee_id: employeeId });
          if (from) params.set("start_date", from);
          if (to) params.set("end_date", to);
          const result = await apiRequest<AttendanceSummaryResponse>(`/attendance/summary?${params}`);
          if (!cancelled) {
            const all = result.data.attendances;
            setRecords(all.slice((page - 1) * pageSize, page * pageSize));
            setTotalPages(Math.max(1, Math.ceil(all.length / pageSize)));
          }
        } else {
          const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
          if (employeeId !== "all") params.set("employee_id", employeeId);
          if (from) params.set("date", from);
          const result = await apiRequest<AttendanceListResponse>(`/attendance?${params}`);
          if (!cancelled) {
            setRecords(result.data.attendances);
            setTotalPages(result.data.pagination.totalPages);
          }
        }
      } catch (error) {
        if (!cancelled) toast.error(error instanceof Error ? error.message : "Failed to load attendance.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [employeeId, from, to, page, pageSize]);

  if (isLoading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="size-8 animate-spin text-[#176b50]" /></div>;

  return (
    <div className="min-h-screen bg-[#f5f7f4]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AttendanceHeader />
        <AttendanceFilters employees={employees} from={from} to={to} employeeId={employeeId} onFromChange={(value) => { setFrom(value); setPage(1); }} onToChange={(value) => { setTo(value); setPage(1); }} onEmployeeChange={(value) => { setEmployeeId(value); setPage(1); }} />
        {loading ? (
          <div className="flex min-h-60 items-center justify-center"><Loader2 className="size-7 animate-spin text-[#176b50]" /></div>
        ) : (
          <>
            <AttendanceSummary records={records} />
            <AttendanceTable records={records} />
          </>
        )}
        {!loading && (
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
        )}
      </main>
    </div>
  );
}
