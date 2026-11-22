import { FileSpreadsheet } from "lucide-react";

export function AttendanceHeader() {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f1ec] px-3 py-1 text-xs font-semibold text-[#176b50]">
        <FileSpreadsheet className="size-3.5" />Employee Records
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Attendance Summary</h1>
      <p className="mt-1 text-sm text-[#6c7d71]">View attendance records for all employees by date range.</p>
    </div>
  );
}
