import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EmployeeDialogProps } from "../_types/employee";

export function EmployeeDialog({ open, editing, form, onClose, onChange, onSubmit }: EmployeeDialogProps) {
  if (!open) return null;

  const fields = [
    ["name", "Full name", "text"],
    ["email", "Work email", "email"],
    ["password", "Password (12+ characters)", "password"],
    ["phoneNumber", "Phone number", "tel"],
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10271c]/30 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <form onSubmit={onSubmit} className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div><p className="text-xs font-semibold text-[#176b50]">{editing ? "Update record" : "New record"}</p><h2 className="mt-1 text-xl font-bold">{editing ? "Edit Employee" : "Add Employee"}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex size-9 items-center justify-center rounded-xl border border-[#e5eae5]"><X className="size-4" /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([field, label, type]) => (
            <Label key={field} className="space-y-1.5">{label}<Input required={field !== "phoneNumber"} type={type} value={form[field]} onChange={(event) => onChange({ ...form, [field]: event.target.value })} /></Label>
          ))}
          <label className="space-y-1.5 text-xs font-semibold text-[#54675b]">Role<select value={form.role} onChange={(event) => onChange({ ...form, role: event.target.value })} className="h-11 w-full rounded-xl border border-[#dce5df] px-3 text-sm font-normal outline-none"><option value="employee">Employee</option><option value="HR">HR</option></select></label>
          <Label className="space-y-1.5">Photo base64 or data URL<Input value={form.photo || ""} onChange={(event) => onChange({ ...form, photo: event.target.value })} /></Label>
        </div>
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="h-10 rounded-xl border border-[#dce5df] px-4 text-sm font-semibold">Cancel</button><button type="submit" className="h-10 rounded-xl bg-[#176b50] px-4 text-sm font-semibold text-white">{editing ? "Save Changes" : "Add Employee"}</button></div>
      </form>
    </div>
  );
}
