import type { AttendanceListProps } from "../_types/attendance";

export function AttendanceSummary({ records }: AttendanceListProps) {
  const items = [
    ["Employees with records", new Set(records.map((record) => record.employeeId)).size, "text-[#176b50]"],
    ["Attendance entries", records.length, "text-[#17261f]"],
    ["Active shifts", records.filter((record) => !record.clockOut).length, "text-amber-700"],
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map(([label, value, color]) => (
        <div key={String(label)} className="rounded-2xl border border-[#e5eae5] bg-white p-5 shadow-sm"><span className="text-xs font-medium text-[#718277]">{label}</span><p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p></div>
      ))}
    </div>
  );
}
