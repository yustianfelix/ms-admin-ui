import {ArrowUpRight, UsersRound} from "lucide-react";

export function MarketingAside() {
    return (
        <aside
            className="relative hidden min-h-[680px] overflow-hidden bg-[#123e30] px-14 py-12 text-white lg:block xl:px-[72px]">
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_15%,rgba(126,185,142,0.24),transparent_38%),radial-gradient(ellipse_at_4%_95%,rgba(78,141,108,0.24),transparent_40%)]"/>
            <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <span
                        className="text-xs font-medium tracking-[0.2em] text-[#c2d7c9] uppercase">People, in rhythm</span>
                    <span
                        className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5"><ArrowUpRight
                        className="size-4"/></span>
                </div>
                <h2 className="mt-12 max-w-[480px] text-[clamp(2.5rem,4vw,4rem)] leading-[1.04] font-medium tracking-[-0.055em]">Make
                    every<br/>workday count.</h2>
                <p className="mt-5 max-w-[390px] text-[15px] leading-7 text-[#c0d2c5]">Manage people and attendance in
                    one calm, organized workspace.</p>
                <div className="relative mx-auto mt-12 w-full max-w-[500px] flex-1">
                    <div
                        className="absolute top-0 left-1/2 w-full max-w-[440px] -translate-x-1/2 rotate-[-2deg] rounded-[20px] bg-[#f8faf7] p-5 text-[#1d3328] shadow-[0_28px_70px_-22px_rgba(0,0,0,0.55)]">
                        <div className="flex items-center justify-between border-b border-[#e9eee9] pb-4">
                            <div><p className="text-sm font-semibold">Today&apos;s attendance</p><p
                                className="mt-1 text-[11px] text-[#87948b]">Thursday, November 20</p></div>
                            <span
                                className="flex items-center gap-1.5 rounded-full bg-[#e7f3e9] px-2.5 py-1 text-[10px] font-semibold text-[#34714d]"><span
                                className="size-1.5 rounded-full bg-[#4d9b66]"/>Live</span>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white px-4 py-3"><p className="text-[10px] text-[#929d95]">Employees</p><p className="mt-1 text-lg font-semibold">Centralized</p></div>
                            <div className="rounded-xl bg-white px-4 py-3"><p className="text-[10px] text-[#929d95]">Attendance</p><p className="mt-1 text-lg font-semibold">Real-time</p></div>
                        </div>
                    </div>
                    <div
                        className="absolute right-0 bottom-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#285844]/90 px-4 py-3">
                        <span
                            className="flex size-9 items-center justify-center rounded-xl bg-[#d1e5d3] text-[#286344]"><UsersRound
                            className="size-[18px]"/></span>
                        <span><span className="block text-[11px] font-semibold">Your team, at a glance</span><span
                            className="text-[10px] text-[#c2d8c8]">All in one place</span></span>
                    </div>
                </div>
                <div
                    className="mt-8 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-[#b7cebf]">
                    <span>Built for better workdays</span><span>KANTOR / 01</span></div>
            </div>
        </aside>
    );
}
