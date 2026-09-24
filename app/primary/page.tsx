"use client";

import { useUser } from "@/context/UserContext";
import { primarySubjects } from "@/data/mockData";
import RobotMascot from "../components/common/RobotMascot";

export default function PrimaryDashboard() {
  const { profile } = useUser();

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl2 bg-white shadow-card p-6 flex items-center gap-4">
        <RobotMascot className="w-24 shrink-0" />
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-1">
            Hi {profile.name}! Ready to play &amp; learn? 🎉
          </h2>
          <p className="text-slate-500">Pick a subject below and let&apos;s get started!</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">My Subjects</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {primarySubjects.map((s) => (
            <button
              key={s.id}
              className={`flex flex-col items-center gap-2 rounded-xl2 ${s.color} p-6 text-slate-800 font-bold shadow-card hover:scale-105 transition-transform`}
            >
              <span className="text-5xl">{s.icon}</span>
              <span className="text-lg">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="w-full flex items-center gap-4 rounded-xl2 bg-brand-100 hover:bg-brand-200 transition-colors p-5">
        <RobotMascot className="w-16 shrink-0" />
        <span className="flex-1 text-left">
          <span className="block text-lg font-bold text-slate-800">Chat with my AI Buddy</span>
          <span className="block text-sm text-slate-500">Ask questions and get fun answers!</span>
        </span>
        <span className="text-3xl">💬</span>
      </button>

      <div className="rounded-xl2 bg-white shadow-card p-6 text-center">
        <p className="text-lg font-bold text-slate-800 mb-1">🌟 You&apos;ve earned 5 stars this week! 🌟</p>
        <p className="text-slate-500 text-sm">Keep learning to earn more stars!</p>
      </div>
    </div>
  );
}
