import { Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AttendanceFiltersProps } from "../_types/attendance";

export function AttendanceFilters({ employees, from, to, employeeId, onFromChange, onToChange, onEmployeeChange }: AttendanceFiltersProps) {
  return (
    <Card className="mb-6 p-6">
      <div className="mb-4 flex items-center gap-2 border-b border-[#edf0ec] pb-4 text-sm font-semibold"><Filter className="size-4 text-[#176b50]" />Filter Range</div>
      <div className="grid gap-4 sm:grid-cols-12 sm:items-end">
        <Label className="space-y-1.5 sm:col-span-4">Date From<Input type="date" value={from} onChange={(event) => onFromChange(event.target.value)} /></Label>
        <Label className="space-y-1.5 sm:col-span-4">Date To<Input type="date" value={to} onChange={(event) => onToChange(event.target.value)} /></Label>
        <Label className="space-y-1.5 sm:col-span-4">Employee<select value={employeeId} onChange={(event) => onEmployeeChange(event.target.value)} className="h-11 w-full rounded-xl border border-[#dce5df] px-3 text-sm font-normal outline-none"><option value="all">All employees</option>{employees.map((employee) => <option key={employee.employeeId} value={employee.employeeId}>{employee.name}</option>)}</select></Label>
      </div>
    </Card>
  );
}
