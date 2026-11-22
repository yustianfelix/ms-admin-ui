import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { EditEmployeePageContent } from "./_components/edit-employee-page";

export default function EditEmployeePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="size-8 animate-spin text-[#176b50]" /></div>}>
      <EditEmployeePageContent />
    </Suspense>
  );
}
