import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EditEmployeeForm } from "../_types/edit";

type EditEmployeeFormProps = {
  employee: { name: string; email: string };
  form: EditEmployeeForm;
  loading: boolean;
  onChange: (form: EditEmployeeForm) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
};

export function EditEmployeeForm({ employee, form, loading, onChange, onSubmit, onCancel }: EditEmployeeFormProps) {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl rounded-3xl border border-[#e5eae5] bg-white p-6 shadow-sm">
      <div className="mb-6"><p className="text-xs font-semibold text-[#176b50]">Employee profile</p><h1 className="mt-1 text-2xl font-bold">{employee.name}</h1><p className="mt-1 text-sm text-[#718277]">{employee.email}</p></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label className="space-y-1.5">Current password<Input required type="password" value={form.currentPassword} onChange={(event) => onChange({ ...form, currentPassword: event.target.value })} /></Label>
        <Label className="space-y-1.5">Phone number<Input value={form.phoneNumber} onChange={(event) => onChange({ ...form, phoneNumber: event.target.value })} /></Label>
        <Label className="space-y-1.5">New password<Input type="password" value={form.newPassword} onChange={(event) => onChange({ ...form, newPassword: event.target.value })} /></Label>
        <Label className="space-y-1.5">Photo base64 or data URL<Input value={form.photo} onChange={(event) => onChange({ ...form, photo: event.target.value })} /></Label>
      </div>
      <p className="mt-4 text-xs text-[#7b897f]">Set photo to leave it unchanged. To remove a photo, enter `null`.</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
      </div>
    </form>
  );
}
