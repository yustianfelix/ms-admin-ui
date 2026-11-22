"use client";

import { LoginForm } from "./_components/login-form";
import { LoginBrandHeader } from "./_components/login-brand-header";
import { LoginFooter } from "./_components/login-footer";
import { MarketingAside } from "./_components/marketing-aside";

export default function LoginPage() {
  return (
    <main className="min-h-svh bg-[#f3f5f1] p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100svh-1.5rem)] max-w-[1440px] overflow-hidden rounded-[26px] bg-white shadow-[0_24px_80px_-36px_rgba(27,55,40,0.28)] sm:min-h-[calc(100svh-2.5rem)] lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1fr_1.04fr]">
        <section className="flex flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-14 xl:px-20">
          <LoginBrandHeader />
          <div className="flex flex-1 items-center justify-center py-12 lg:py-10">
            <LoginForm />
          </div>
          <LoginFooter />
        </section>
        <MarketingAside />
      </div>
    </main>
  );
}
