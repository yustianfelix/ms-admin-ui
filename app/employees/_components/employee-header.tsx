import { Plus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmployeeHeaderProps } from "../_types/employee";

export function EmployeeHeader({ onAdd }: EmployeeHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f1ec] px-3 py-1 text-xs font-semibold text-[#176b50]">
          <UsersRound className="size-3.5" />People Directory
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Employees</h1>
        <p className="mt-1 text-sm text-[#6c7d71]">Add and update employee records.</p>
      </div>
      <Button onClick={onAdd}><Plus className="size-4" />Add Employee</Button>
    </div>
  );
}
