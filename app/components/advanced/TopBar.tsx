"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { PiMagnifyingGlass, PiBell, PiUserCircle, PiStudent, PiCaretDown } from "react-icons/pi";

export default function TopBar() {
  const { profile, resetProfile } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isParent = profile.role === "parent";
  const displayName = profile.name;
  const subLabel = isParent
    ? `Monitoring ${profile.childName} · Grade ${profile.childGrade}`
    : `Grade ${profile.grade}`;

  const handleSwitchProfile = () => {
    resetProfile();
    router.replace("/");
  };

  return (
    <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="flex-1 relative max-w-xl">
        <PiMagnifyingGlass
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search for topics, textbooks, questions..."
          className="w-full rounded-full border border-slate-200 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
        />
      </div>

      <button className="ml-auto w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center">
        <PiBell size={20} />
      </button>

      <div className="relative">
        <button onClick={() => setMenuOpen((v) => !v)} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            {isParent ? <PiUserCircle size={20} /> : <PiStudent size={20} />}
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Hello, {displayName}!</p>
            <p className="text-xs text-slate-400">{subLabel}</p>
          </div>
          <PiCaretDown className="text-slate-400" size={14} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft border border-slate-100 py-2 text-sm">
            <button
              onClick={handleSwitchProfile}
              className="w-full text-left px-4 py-2 hover:bg-brand-50 text-slate-600"
            >
              Switch profile
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
