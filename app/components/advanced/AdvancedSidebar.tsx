"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/data/mockData";
import RobotMascot from "../common/RobotMascot";
import { PiPackage } from "react-icons/pi";

export default function AdvancedSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
          <PiPackage size={18} />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 leading-none">EduView</h1>
          <p className="text-xs text-slate-400">Learn with AI</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {sidebarNav.map((item) => {
          const isActive =
            item.path === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.path);
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "bg-brand-500 text-white" : "text-slate-600 hover:bg-brand-50"
              }`}
            >
              <item.icon size={20} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl2 bg-brand-50 p-4 mt-4 text-center">
        <p className="font-semibold text-slate-800 mb-1">Ask AI anything</p>
        <p className="text-xs text-slate-500 mb-2">Get answers, explanations and help instantly.</p>
        <RobotMascot className="w-20 mx-auto mb-2" />
        <Link
          href="/dashboard/ai-learning"
          className="inline-flex items-center justify-center gap-1 w-full rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2 transition-colors"
        >
          Chat with AI →
        </Link>
      </div>
    </aside>
  );
}
