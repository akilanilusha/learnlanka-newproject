"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  PiSparkle,
  PiLightning,
  PiBookOpen,
  PiChartBar,
  PiFilePlus,
  PiGraduationCap,
  PiCaretDown,
  PiCaretRight,
  PiListBullets,
  PiCircle,
  PiShuffle,
  PiArrowRight,
  PiClock,
  PiDotsThreeBold,
  PiLightbulb,
} from "react-icons/pi";
import robotWave from "@/assets/images/robot-wave.gif";
import RobotMascot from "@/app/components/common/RobotMascot";
import { subjectsCatalog } from "@/data/textbooksData";
import { subjectStyle as styleFor, subjectName } from "@/data/subjectVisuals";
import { useUser } from "@/context/UserContext";

const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);
const QUESTION_COUNTS = [5, 10, 15, 20];

type Difficulty = "easy" | "medium" | "hard";
const DIFFICULTIES: { id: Difficulty; label: string; dot: string; active: string }[] = [
  { id: "easy", label: "Easy", dot: "bg-brand-500", active: "border-brand-400 bg-brand-50 text-brand-700" },
  { id: "medium", label: "Medium", dot: "bg-amber-400", active: "border-amber-300 bg-amber-50 text-amber-700" },
  { id: "hard", label: "Hard", dot: "bg-rose-400", active: "border-rose-300 bg-rose-50 text-rose-700" },
];

type QuestionType = "multiple-choice" | "true-false" | "mixed";
const QUESTION_TYPES: { id: QuestionType; label: string; icon: IconType }[] = [
  { id: "multiple-choice", label: "Multiple choice", icon: PiListBullets },
  { id: "true-false", label: "True / False", icon: PiCircle },
  { id: "mixed", label: "Mixed", icon: PiShuffle },
];

const quickStarts = [
  {
    title: "Math practice",
    description: "Numbers, fractions, problem solving",
    subjectId: "mathematics",
    topic: "Fractions and decimals",
    card: "bg-rose-50/60 hover:bg-rose-50 border-rose-100",
    arrow: "text-rose-500",
  },
  {
    title: "Science challenge",
    description: "Explore the world around you",
    subjectId: "science",
    topic: "Living things",
    card: "bg-emerald-50/60 hover:bg-emerald-50 border-emerald-100",
    arrow: "text-emerald-600",
  },
  {
    title: "English grammar",
    description: "Test your language skills",
    subjectId: "english",
    topic: "Parts of speech",
    card: "bg-blue-50/60 hover:bg-blue-50 border-blue-100",
    arrow: "text-blue-600",
  },
];

type RecentQuiz = {
  id: string;
  subjectId: string;
  topic: string;
  questions: number;
  score: { correct: number; total: number } | null; // null = still in progress
  date: string;
};

const initialRecent: RecentQuiz[] = [
  { id: "rq-1", subjectId: "mathematics", topic: "Fractions and Decimals", questions: 10, score: { correct: 8, total: 10 }, date: "Oct 8, 2026" },
  { id: "rq-2", subjectId: "science", topic: "Living Things", questions: 10, score: { correct: 7, total: 10 }, date: "Oct 6, 2026" },
  { id: "rq-3", subjectId: "english", topic: "Parts of Speech", questions: 5, score: null, date: "Oct 5, 2026" },
  { id: "rq-4", subjectId: "environment", topic: "Water Cycle", questions: 15, score: { correct: 12, total: 15 }, date: "Oct 2, 2026" },
  { id: "rq-5", subjectId: "social-studies", topic: "Map Reading", questions: 10, score: { correct: 9, total: 10 }, date: "Sep 29, 2026" },
];

const RECENT_PREVIEW = 3;

function scoreBadge(quiz: RecentQuiz) {
  if (!quiz.score) {
    return { label: "In Progress", className: "bg-amber-50 text-amber-700 border-amber-200" };
  }
  const ratio = quiz.score.correct / quiz.score.total;
  return {
    label: `Score: ${quiz.score.correct}/${quiz.score.total}`,
    className: ratio >= 0.8 ? "bg-brand-50 text-brand-700 border-brand-200" : "bg-sky-50 text-sky-700 border-sky-200",
  };
}

const optionBase =
  "flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300";
const optionIdle = "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50/50";
const optionActive = "border-brand-400 bg-brand-50 text-brand-700";

function SectionHeader({
  icon: Icon,
  iconClass,
  title,
  subtitle,
  action,
}: {
  icon: IconType;
  iconClass: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <Icon size={30} className={`shrink-0 ${iconClass}`} />
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export default function AiQuizBotPage() {
  const { profile } = useUser();
  const defaultGrade = (profile.role === "parent" ? profile.childGrade : profile.grade) ?? 6;

  const [subjectId, setSubjectId] = useState(subjectsCatalog[0].id);
  const [grade, setGrade] = useState<number>(defaultGrade);
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple-choice");
  const [recent, setRecent] = useState<RecentQuiz[]>(initialRecent);
  const [showAllRecent, setShowAllRecent] = useState(false);

  const selectedStyle = styleFor(subjectId);
  const visibleRecent = showAllRecent ? recent : recent.slice(0, RECENT_PREVIEW);

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    // No quiz backend yet: record the request so it shows up in Recent Quizzes.
    const quiz: RecentQuiz = {
      id: `rq-${Date.now()}`,
      subjectId,
      topic: topic.trim() || "General practice",
      questions: questionCount,
      score: null,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setRecent((prev) => [quiz, ...prev]);
    setTopic("");
  };

  const applyQuickStart = (qs: (typeof quickStarts)[number]) => {
    setSubjectId(qs.subjectId);
    setTopic(qs.topic);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="rounded-xl2 bg-gradient-to-r from-brand-50 via-brand-50 to-brand-100 px-8 py-7 flex items-center gap-6 overflow-hidden">
        <PiSparkle size={40} className="text-amber-400 shrink-0 self-start hidden sm:block" />
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">AI Quiz Bot</h2>
          <p className="text-lg text-slate-600 mb-2">Your personal AI study buddy</p>
          <p className="text-slate-600 max-w-xl">
            Generate practice quizzes, test your knowledge and improve your learning with the help of AI.
          </p>
        </div>

        <div className="hidden lg:block relative w-[420px] h-40 shrink-0">
          <PiSparkle size={22} className="absolute top-2 left-4 text-amber-400" />
          <PiSparkle size={26} className="absolute top-14 left-44 text-amber-400" />
          <Image
            src={robotWave}
            alt="AI quiz bot waving hello"
            className="absolute bottom-0 left-8 w-40"
            draggable={false}
            unoptimized
          />
          <span className="absolute top-0 right-6 flex items-center gap-2 rounded-full bg-white border border-brand-100 shadow-card px-4 py-2 text-sm font-semibold text-brand-700">
            <PiLightning size={18} /> Practice
          </span>
          <span className="absolute top-14 right-28 flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-card px-4 py-2 text-sm font-semibold text-blue-600">
            <PiBookOpen size={18} /> Learn
          </span>
          <span className="absolute bottom-6 right-2 flex items-center gap-2 rounded-full bg-white border border-amber-100 shadow-card px-4 py-2 text-sm font-semibold text-amber-600">
            <PiChartBar size={18} /> Improve
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Create a Quiz */}
        <form onSubmit={handleGenerate} className="bg-white rounded-xl2 shadow-card p-6 flex flex-col">
          <SectionHeader
            icon={PiFilePlus}
            iconClass="text-brand-500"
            title="Create a Quiz"
            subtitle="Choose your subject, topic and settings to generate a personalized quiz."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="quiz-subject" className="block text-sm font-semibold text-slate-700 mb-2">
                Subject
              </label>
              <div className="relative">
                <selectedStyle.icon
                  size={20}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${selectedStyle.color}`}
                />
                <select
                  id="quiz-subject"
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-9 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  {subjectsCatalog.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <PiCaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="quiz-grade" className="block text-sm font-semibold text-slate-700 mb-2">
                Grade
              </label>
              <div className="relative">
                <PiGraduationCap
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none"
                />
                <select
                  id="quiz-grade"
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-9 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
                <PiCaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="quiz-topic" className="block text-sm font-semibold text-slate-700 mb-2">
              Topic
            </label>
            <div className="relative">
              <PiBookOpen size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="quiz-topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Fractions and decimals, Algebra, Geometry..."
                className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <fieldset>
              <legend className="text-sm font-semibold text-slate-700 mb-2">Number of questions</legend>
              <div className="grid grid-cols-4 gap-2">
                {QUESTION_COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={questionCount === n}
                    onClick={() => setQuestionCount(n)}
                    className={`${optionBase} ${questionCount === n ? optionActive : optionIdle}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-slate-700 mb-2">Difficulty level</legend>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={difficulty === d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`${optionBase} ${difficulty === d.id ? d.active : optionIdle}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${d.dot}`} />
                    {d.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <fieldset className="mb-6">
            <legend className="text-sm font-semibold text-slate-700 mb-2">Question type</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {QUESTION_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={questionType === t.id}
                  onClick={() => setQuestionType(t.id)}
                  className={`${optionBase} sm:justify-start ${questionType === t.id ? optionActive : optionIdle}`}
                >
                  <t.icon size={18} />
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-auto w-full flex items-center justify-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 active:scale-[0.99] text-white font-semibold py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          >
            <PiSparkle size={20} /> Generate Quiz
          </button>
        </form>

        <div className="flex flex-col gap-6 min-w-0">
          {/* Quick Start */}
          <div className="bg-white rounded-xl2 shadow-card p-6">
            <SectionHeader
              icon={PiLightning}
              iconClass="text-amber-400"
              title="Quick Start"
              subtitle="Try these popular quiz topics to get started quickly."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickStarts.map((qs) => {
                const style = styleFor(qs.subjectId);
                return (
                  <button
                    key={qs.title}
                    type="button"
                    onClick={() => applyQuickStart(qs)}
                    aria-label={`${qs.title}: fill the quiz form with ${subjectName(qs.subjectId)}, ${qs.topic}`}
                    className={`text-left rounded-xl border p-4 flex gap-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${qs.card}`}
                  >
                    <span className={`w-11 h-11 rounded-lg bg-white flex items-center justify-center shrink-0 ${style.color}`}>
                      <style.icon size={24} />
                    </span>
                    <span className="flex-1 min-w-0 flex flex-col">
                      <span className="font-semibold text-sm text-slate-800">{qs.title}</span>
                      <span className="text-xs text-slate-500 flex-1">{qs.description}</span>
                      <PiArrowRight size={16} className={`self-end mt-2 ${qs.arrow}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="bg-white rounded-xl2 shadow-card p-6 flex-1">
            <SectionHeader
              icon={PiClock}
              iconClass="text-slate-500"
              title="Recent Quizzes"
              subtitle="Continue practicing from your recent quizzes."
              action={
                recent.length > RECENT_PREVIEW && (
                  <button
                    type="button"
                    onClick={() => setShowAllRecent((v) => !v)}
                    className="shrink-0 flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                  >
                    {showAllRecent ? "Show less" : "View All"}
                    <PiCaretRight size={14} className={`transition-transform ${showAllRecent ? "rotate-90" : ""}`} />
                  </button>
                )
              }
            />
            <ul className="divide-y divide-slate-100">
              {visibleRecent.map((q) => {
                const style = styleFor(q.subjectId);
                const badge = scoreBadge(q);
                return (
                  <li key={q.id} className="flex items-center gap-3 py-3">
                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${style.tile} ${style.color}`}>
                      <style.icon size={22} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800 truncate">{subjectName(q.subjectId)}</p>
                      <p className="text-xs text-slate-500 truncate">{q.topic}</p>
                    </div>
                    <span className="hidden md:block text-xs text-slate-500 w-24 shrink-0">{q.questions} questions</span>
                    <span className={`text-xs font-semibold rounded-full border px-3 py-1 shrink-0 ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="hidden sm:block text-xs text-slate-500 w-24 text-right shrink-0">{q.date}</span>
                    <button
                      type="button"
                      aria-label={`More options for ${subjectName(q.subjectId)} quiz`}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 shrink-0 transition-colors"
                    >
                      <PiDotsThreeBold size={18} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Suggestion banner */}
      <div className="rounded-xl2 bg-white border border-slate-100 shadow-card px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-1 shrink-0">
          <RobotMascot className="w-14" alt="" />
          <PiLightbulb size={26} className="text-amber-400 -ml-2 self-start" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800">Not sure where to start?</p>
          <p className="text-sm text-slate-500">
            Ask our AI to suggest the best quiz topics based on your grade and learning goals.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg border border-brand-400 text-brand-700 hover:bg-brand-50 font-semibold text-sm px-4 py-2.5 transition-colors"
        >
          Ask AI for a topic <PiArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
