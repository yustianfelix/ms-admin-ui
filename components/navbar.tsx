"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, FileSpreadsheet, LogOut, Menu, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Employees", href: "/employees", icon: UsersRound },
    { name: "Attendance Summary", href: "/attendance", icon: FileSpreadsheet },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5eae5] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/employees" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#176b50] text-white shadow-sm">
              <CalendarDays className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">kantor</span>
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-1">
            {links.map(({ name, href, icon: Icon }) => (
              <Link key={href} href={href} className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ${pathname === href ? "bg-[#e8f1ec] text-[#176b50]" : "text-[#55635a] hover:bg-[#f3f6f3]"}`}>
                <Icon className="size-4" />{name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-xl border border-[#e5eae5] bg-[#fafbfa] px-3 py-2 text-right">
            <p className="text-xs font-semibold">{user?.name}</p>
            <p className="text-[10px] text-[#748378]">HR Administrator</p>
          </div>
          <button onClick={logout} aria-label="Sign out" className="flex size-9 items-center justify-center rounded-xl border border-[#e5eae5] text-[#69786e] hover:border-red-200 hover:bg-red-50 hover:text-red-600">
            <LogOut className="size-4" />
          </button>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="flex size-9 items-center justify-center rounded-xl border border-[#e5eae5] md:hidden">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#edf0ec] bg-white px-4 py-3 md:hidden">
          {links.map(({ name, href, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#55635a]">
              <Icon className="size-4" />{name}
            </Link>
          ))}
          <button onClick={logout} className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600"><LogOut className="size-4" />Sign out</button>
        </div>
      )}
    </header>
  );
}
