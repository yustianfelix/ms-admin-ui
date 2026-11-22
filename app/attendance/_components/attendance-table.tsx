import { Calendar } from "lucide-react";
import type { AttendanceListProps } from "../_types/attendance";

function duration(clockIn: string, clockOut: string | null) {
  if (!clockOut) return "Active";
  const inDate = new Date(clockIn);
  const outDate = new Date(clockOut);
  const minutes = Math.max(0, Math.round((outDate.getTime() - inDate.getTime()) / 60000));
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function AttendanceTable({ records }: AttendanceListProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e5eae5] bg-white shadow-sm">
      <div className="border-b border-[#edf0ec] px-6 py-4 text-base font-semibold">Attendance Entries</div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f9faf9] text-[11px] font-semibold tracking-wider text-[#6b7b71] uppercase"><tr><th className="px-6 py-3.5">Employee</th><th className="px-6 py-3.5">Date</th><th className="px-6 py-3.5">Clock In</th><th className="px-6 py-3.5">Clock Out</th><th className="px-6 py-3.5">Duration</th></tr></thead>
          <tbody className="divide-y divide-[#edf0ec]">
            {records.map((record) => (
              <tr key={record.uuid} className="hover:bg-[#f6f9f7]">
                <td className="px-6 py-4"><p className="font-semibold">Employee {record.employeeId}</p><p className="mt-0.5 text-xs text-[#7b897f]">{record.status}</p></td>
                <td className="px-6 py-4"><span className="flex items-center gap-2"><Calendar className="size-4 text-[#899a8f]" />{record.date}</span></td>
                <td className="px-6 py-4 font-mono text-xs">{new Date(record.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-6 py-4">{record.clockOut ? <span className="font-mono text-xs">{new Date(record.clockOut).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span> : <span className="rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-800">Active Shift</span>}</td>
                <td className="px-6 py-4 font-mono text-xs font-semibold text-[#176b50]">{duration(record.clockIn, record.clockOut)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 && <div className="py-16 text-center"><Calendar className="mx-auto size-7 text-[#176b50]" /><p className="mt-3 font-semibold">No attendance records found</p><p className="mt-1 text-xs text-[#738478]">Try choosing another date range or employee.</p></div>}
    </div>
  );
}
