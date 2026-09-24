"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import RobotMascot from "../components/common/RobotMascot";

export default function PrimaryLayout({ children }: LayoutProps<"/primary">) {
  const { profile, resetProfile, hydrated } = useUser();
  const router = useRouter();

  const allowed = profile.role === "student" && Number(profile.grade) <= 5;

  useEffect(() => {
    if (!hydrated) return;
    if (!profile.isOnboarded || !allowed) {
      router.replace("/");
    }
  }, [hydrated, profile.isOnboarded, allowed, router]);

  const handleSwitchProfile = () => {
    resetProfile();
    router.replace("/");
  };

  if (!hydrated || !profile.isOnboarded || !allowed) return null;

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-card">
        <div className="flex items-center gap-2">
          <RobotMascot className="w-10 h-10 object-contain" />
          <div>
            <h1 className="font-extrabold text-lg text-slate-800 leading-none">EduView</h1>
            <p className="text-xs text-slate-400">Learn with AI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="font-semibold text-slate-800">Hi, {profile.name}! 👋</p>
            <p className="text-xs text-slate-400">Grade {profile.grade}</p>
          </div>
          <button
            onClick={handleSwitchProfile}
            className="text-2xl w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center"
            title="Switch profile"
          >
            🧒
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
