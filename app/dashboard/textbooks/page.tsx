"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { subjectsCatalog, type Subject } from "@/data/textbooksData";
import { continueLearning } from "@/data/mockData";
import heroImage from "@/assets/images/hero-student-robot.png";

function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Link
      href={`/dashboard/textbooks/${subject.id}`}
      className="group rounded-xl2 bg-white border border-slate-200 p-5 flex flex-col hover:border-brand-300 hover:shadow-soft transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl ${subject.badgeBg} flex items-center justify-center text-3xl`}>
          {subject.icon}
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
          {subject.chapters.length} Chapters
        </span>
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-1">{subject.name}</h3>
      <p className="text-sm text-slate-500 flex-1">{subject.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-slate-500">👥 {subject.students} students</span>
        <span className="w-9 h-9 rounded-full bg-brand-500 group-hover:bg-brand-600 text-white flex items-center justify-center transition-colors">
          →
        </span>
      </div>
    </Link>
  );
}

export default function Textbooks() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleSubjects = useMemo(() => {
    if (activeFilter === "all") return subjectsCatalog;
    return subjectsCatalog.filter((s) => s.id === activeFilter);
  }, [activeFilter]);

  const continueItem = continueLearning[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      <div className="flex flex-col gap-6 min-w-0">
        <div className="rounded-xl2 bg-brand-100 p-8 flex items-center gap-6 overflow-hidden">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Textbooks</h2>
            <p className="text-slate-600 max-w-md">
              Explore interactive textbooks and strengthen your knowledge, chapter by chapter.
            </p>
          </div>
          <Image
            src={heroImage}
            alt="Student reading with AI"
            className="hidden md:block w-56 h-40 object-cover rounded-2xl shadow-soft"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter("all")}
            className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeFilter === "all" ? "bg-brand-500 text-white" : "bg-white text-slate-600 hover:bg-brand-50"
            }`}
          >
            🔳 All Subjects
          </button>
          {subjectsCatalog.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveFilter(s.id)}
              className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeFilter === s.id ? "bg-brand-500 text-white" : "bg-white text-slate-600 hover:bg-brand-50"
              }`}
            >
              <span>{s.icon}</span> {s.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleSubjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-xl2 shadow-card p-5">
          <h3 className="font-bold text-slate-800 mb-1">Find the right textbook</h3>
          <p className="text-xs text-slate-400 mb-4">Search or filter to find the perfect textbook for you.</p>
          <input
            type="text"
            placeholder="Search textbooks..."
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <select className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm mb-3 text-slate-500">
            <option>All Grades</option>
          </select>
          <select className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm mb-4 text-slate-500">
            <option>All Levels</option>
          </select>
          <button className="w-full rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 transition-colors">
            Search Textbooks
          </button>
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-5">
          <h3 className="font-bold text-slate-800 mb-1">Continue Learning</h3>
          <p className="text-xs text-slate-400 mb-3">Pick up where you left off</p>
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
            <div className={`w-12 h-12 rounded-lg ${continueItem.bg} flex items-center justify-center text-xl shrink-0`}>
              {continueItem.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-800 truncate">{continueItem.title}</p>
              <p className="text-xs text-slate-400 mb-1">
                {continueItem.subject} · {continueItem.chapter}
              </p>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${continueItem.progress}%` }} />
              </div>
            </div>
            <Link
              href={`/dashboard/textbooks/${continueItem.path}`}
              className="shrink-0 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-3 py-2 transition-colors"
            >
              Continue
            </Link>
          </div>
        </div>

        <div className="bg-violet-50 rounded-xl2 p-5">
          <h3 className="font-bold text-slate-800 mb-1">AI Recommends for You</h3>
          <p className="text-xs text-slate-500 mb-3">Textbooks based on your activity</p>
          <div className="bg-white rounded-xl p-3">
            <p className="font-semibold text-sm text-slate-800">Fractions Made Easy</p>
            <p className="text-xs text-slate-400 mb-2">Mathematics · Chapter 5</p>
            <Link
              href="/dashboard/textbooks/mathematics/ch-5"
              className="inline-block text-xs font-semibold text-white bg-violet-500 hover:bg-violet-600 rounded-lg px-3 py-2 transition-colors"
            >
              View Chapter
            </Link>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl2 p-5">
          <h3 className="font-bold text-slate-800 mb-1">Unlock New Achievements</h3>
          <p className="text-xs text-slate-500 mb-3">Complete chapters and earn badges</p>
          <div className="flex gap-2 text-2xl">
            <span>🏆</span>
            <span>⭐</span>
            <span>🎖️</span>
            <span>🛡️</span>
          </div>
        </div>
      </div>
    </div>
  );
}
