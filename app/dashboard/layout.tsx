"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import AdvancedSidebar from "../components/advanced/AdvancedSidebar";
import TopBar from "../components/advanced/TopBar";

export default function AdvancedLayout({ children }: LayoutProps<"/dashboard">) {
  const { profile, hydrated } = useUser();
  const router = useRouter();

  const allowed = profile.role === "parent" || (profile.role === "student" && Number(profile.grade) > 5);

  useEffect(() => {
    if (!hydrated) return;
    if (!profile.isOnboarded || !allowed) {
      router.replace("/");
    }
  }, [hydrated, profile.isOnboarded, allowed, router]);

  if (!hydrated || !profile.isOnboarded || !allowed) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdvancedSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
