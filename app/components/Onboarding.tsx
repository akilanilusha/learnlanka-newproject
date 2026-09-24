"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser, type Role } from "@/context/UserContext";
import RobotMascot from "./common/RobotMascot";
import { PiBackpack, PiUsersThree } from "react-icons/pi";
import heroImage from "@/assets/images/hero-student-robot.png";

const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Onboarding() {
  const [step, setStep] = useState<"role" | "details">("role");
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<number | null>(null);
  const [childName, setChildName] = useState("");
  const [childGrade, setChildGrade] = useState<number | null>(null);

  const { completeOnboarding } = useUser();
  const router = useRouter();

  const chooseRole = (value: Role) => {
    setRole(value);
    setStep("details");
  };

  const canSubmit =
    role === "student"
      ? name.trim().length > 0 && grade !== null
      : name.trim().length > 0 && childName.trim().length > 0 && childGrade !== null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (role === "student") {
      completeOnboarding({ role, name, grade });
      router.replace(Number(grade) <= 5 ? "/primary" : "/dashboard");
    } else {
      completeOnboarding({ role, name, childName, childGrade });
      router.replace("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl2 shadow-soft overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex flex-col items-center justify-center bg-brand-100 p-8">
          <Image
            src={heroImage}
            alt="Student learning with AI"
            className="rounded-2xl object-cover max-h-72 w-full"
          />
          <p className="mt-6 text-brand-800 font-semibold text-lg text-center">
            Let&apos;s set things up for you!
          </p>
        </div>

        <div className="p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <RobotMascot className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">EduView</h1>
              <p className="text-xs text-slate-500">Learn with AI</p>
            </div>
          </div>

          {step === "role" && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Who&apos;s joining us today?</h2>
              <p className="text-slate-500 mb-6">This helps us set up the right experience for you.</p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => chooseRole("student")}
                  className="flex flex-col items-center gap-3 rounded-xl2 border-2 border-brand-100 hover:border-brand-400 hover:bg-brand-50 transition-colors p-6"
                >
                  <PiBackpack size={36} color="#35502f" />
                  <span className="font-semibold text-slate-800">I&apos;m a Student</span>
                </button>
                <button
                  onClick={() => chooseRole("parent")}
                  className="flex flex-col items-center gap-3 rounded-xl2 border-2 border-brand-100 hover:border-brand-400 hover:bg-brand-50 transition-colors p-6"
                >
                  <PiUsersThree size={36} color="#35502f" />
                  <span className="font-semibold text-slate-800">I&apos;m a Parent</span>
                </button>
              </div>
            </div>
          )}

          {step === "details" && role === "student" && (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <button
                type="button"
                onClick={() => setStep("role")}
                className="text-sm text-slate-400 hover:text-slate-600 mb-4 self-start"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Tell us about you</h2>
              <p className="text-slate-500 mb-6">What&apos;s your name and grade?</p>

              <label className="text-sm font-medium text-slate-600 mb-1">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jacob"
                className="mb-5 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />

              <label className="text-sm font-medium text-slate-600 mb-2">Your grade</label>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {GRADES.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`rounded-lg py-2 font-semibold border-2 transition-colors ${
                      grade === g
                        ? "bg-brand-500 border-brand-500 text-white"
                        : "border-slate-200 text-slate-600 hover:border-brand-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-auto w-full rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors"
              >
                Start Learning →
              </button>
            </form>
          )}

          {step === "details" && role === "parent" && (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <button
                type="button"
                onClick={() => setStep("role")}
                className="text-sm text-slate-400 hover:text-slate-600 mb-4 self-start"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Tell us about your child</h2>
              <p className="text-slate-500 mb-6">We&apos;ll set up a dashboard to track their learning.</p>

              <label className="text-sm font-medium text-slate-600 mb-1">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mrs. Perera"
                className="mb-4 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />

              <label className="text-sm font-medium text-slate-600 mb-1">Child&apos;s name</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Jacob"
                className="mb-4 w-full rounded-lg border border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />

              <label className="text-sm font-medium text-slate-600 mb-2">Child&apos;s grade</label>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {GRADES.map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setChildGrade(g)}
                    className={`rounded-lg py-2 font-semibold border-2 transition-colors ${
                      childGrade === g
                        ? "bg-brand-500 border-brand-500 text-white"
                        : "border-slate-200 text-slate-600 hover:border-brand-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-auto w-full rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors"
              >
                Go to Dashboard →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
