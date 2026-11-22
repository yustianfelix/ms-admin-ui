import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { EmployeeSearchProps } from "../_types/employee";

export function EmployeeSearch({ value, onChange }: EmployeeSearchProps) {
  return (
    <Card className="mb-5 flex items-center gap-3 rounded-2xl p-4">
      <Search className="size-4 text-[#87978d]" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search name, email, role, or department" className="h-9 w-full outline-none text-sm" />
    </Card>
  );
}
