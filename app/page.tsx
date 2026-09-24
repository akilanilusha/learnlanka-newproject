"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Onboarding from "./components/Onboarding";

export default function Home() {
  const { profile, hydrated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated || !profile.isOnboarded) return;
    if (profile.role === "student" && Number(profile.grade) <= 5) {
      router.replace("/primary");
    } else {
      router.replace("/dashboard");
    }
  }, [hydrated, profile, router]);

  if (!hydrated || profile.isOnboarded) return null;

  return <Onboarding />;
}
