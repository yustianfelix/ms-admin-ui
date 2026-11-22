import { Edit3 } from "lucide-react";
import type { EmployeeTableProps } from "../_types/employee";

export function EmployeeTable({ employees, onEdit }: EmployeeTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e5eae5] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f9faf9] text-[11px] font-semibold tracking-wider text-[#6b7b71] uppercase">
            <tr><th className="w-16 px-4 py-3.5 text-center">Edit</th><th className="px-6 py-3.5">Employee</th><th className="px-6 py-3.5">Role</th><th className="px-6 py-3.5">Phone</th></tr>
          </thead>
          <tbody className="divide-y divide-[#edf0ec]">
            {employees.map((employee) => (
              <tr key={employee.employeeId} className="hover:bg-[#f6f9f7]">
                <td className="px-4 py-4 text-center"><button onClick={() => onEdit(employee)} aria-label={`Edit ${employee.name}`} className="inline-flex size-9 items-center justify-center rounded-xl border border-[#dce5df] text-[#176b50] hover:bg-[#edf4ef]"><Edit3 className="size-4" /></button></td>
                <td className="px-6 py-4"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-[#e2ede6] text-xs font-bold text-[#176b50]">{employee.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div><p className="font-semibold">{employee.name}</p><p className="mt-0.5 text-xs text-[#7b897f]">{employee.email}</p></div></div></td>
                <td className="px-6 py-4 text-[#53655a]">{employee.role}</td>
                <td className="px-6 py-4 text-[#53655a]">{employee.phoneNumber || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {employees.length === 0 && <div className="py-16 text-center text-sm text-[#748378]">No employees found.</div>}
    </div>
  );
}
