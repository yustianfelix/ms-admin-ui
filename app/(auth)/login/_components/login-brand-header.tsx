import { CalendarDays } from "lucide-react";

export function LoginBrandHeader() {
  return (
    <div className="flex w-fit items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-[13px] bg-[#176b50] text-white">
        <CalendarDays className="size-5" />
      </span>
      <span className="text-[19px] font-semibold tracking-[-0.04em]">kantor</span>
    </div>
  );
}
