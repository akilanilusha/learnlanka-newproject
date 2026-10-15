"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  PiBookOpenText,
  PiBooks,
  PiFolderSimpleStar,
  PiPlant,
  PiSparkle,
  PiStack,
  PiNotePencil,
  PiExam,
  PiFileArrowUp,
  PiArrowRight,
  PiCaretDown,
  PiCaretRight,
  PiMagnifyingGlass,
  PiClock,
  PiStarFill,
  PiChartBar,
  PiFilePdf,
  PiFileImage,
  PiFileDoc,
  PiTray,
} from "react-icons/pi";
import { getChapter, subjectsCatalog } from "@/data/textbooksData";
import { subjectStyle, subjectName } from "@/data/subjectVisuals";
import { useUser } from "@/context/UserContext";

/* ---------- Mock library data (no backend yet) ---------- */

type ChapterRef = { subjectId: string; chapterId: string };

const recentlyOpened: ChapterRef[] = [
  { subjectId: "mathematics", chapterId: "ch-5" },
  { subjectId: "science", chapterId: "ch-1" },
  { subjectId: "english", chapterId: "ch-2" },
  { subjectId: "music", chapterId: "ch-1" },
  { subjectId: "art-craft", chapterId: "ch-2" },
  { subjectId: "environment", chapterId: "ch-2" },
];

const savedLessons: ChapterRef[] = [
  { subjectId: "mathematics", chapterId: "ch-5" },
  { subjectId: "mathematics", chapterId: "ch-6" },
  { subjectId: "science", chapterId: "ch-2" },
  { subjectId: "english", chapterId: "ch-3" },
  { subjectId: "environment", chapterId: "ch-5" },
  { subjectId: "social-studies", chapterId: "ch-2" },
  { subjectId: "computer-skills", chapterId: "ch-4" },
];

type Note = { id: string; title: string; subjectId: string; updated: string };
const notes: Note[] = [
  { id: "n-1", title: "Fraction rules cheat sheet", subjectId: "mathematics", updated: "Oct 9, 2026" },
  { id: "n-2", title: "Parts of a plant", subjectId: "science", updated: "Oct 7, 2026" },
  { id: "n-3", title: "Tenses summary", subjectId: "english", updated: "Oct 4, 2026" },
  { id: "n-4", title: "Map symbols to remember", subjectId: "social-studies", updated: "Sep 30, 2026" },
];

type SavedQuiz = { id: string; title: string; subjectId: string; questions: number; score: number | null };
const savedQuizzes: SavedQuiz[] = [
  { id: "q-1", title: "Math practice - Fractions", subjectId: "mathematics", questions: 10, score: 8 },
  { id: "q-2", title: "Living things challenge", subjectId: "science", questions: 10, score: 7 },
  { id: "q-3", title: "Parts of speech", subjectId: "english", questions: 5, score: null },
  { id: "q-4", title: "Water cycle check", subjectId: "environment", questions: 15, score: 12 },
];

type Upload = { id: string; name: string; subjectId: string; kind: "pdf" | "image" | "doc"; size: string };
const uploads: Upload[] = [
  { id: "u-1", name: "Class notes - Decimals.pdf", subjectId: "mathematics", kind: "pdf", size: "1.2 MB" },
  { id: "u-2", name: "Plant diagram.png", subjectId: "science", kind: "image", size: "640 KB" },
  { id: "u-3", name: "Essay draft - My village.docx", subjectId: "english", kind: "doc", size: "85 KB" },
];

type Bookmark = ChapterRef & { id: string; title: string; page: number };
const bookmarks: Bookmark[] = [
  { id: "b-1", title: "Fractions — Important Formulas", subjectId: "mathematics", chapterId: "ch-5", page: 12 },
  { id: "b-2", title: "The Water Cycle", subjectId: "environment", chapterId: "ch-2", page: 8 },
  { id: "b-3", title: "Nouns and Pronouns — Examples", subjectId: "english", chapterId: "ch-2", page: 25 },
  { id: "b-4", title: "States of Matter Diagram", subjectId: "science", chapterId: "ch-5", page: 31 },
];

const uploadIcons: Record<Upload["kind"], IconType> = { pdf: PiFilePdf, image: PiFileImage, doc: PiFileDoc };

/* ---------- Tabs ---------- */

type TabId = "recent" | "lessons" | "notes" | "quizzes" | "uploads" | "bookmarks";
const TABS: { id: TabId; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "lessons", label: "Saved Lessons" },
  { id: "notes", label: "My Notes" },
  { id: "quizzes", label: "Saved Quizzes" },
  { id: "uploads", label: "My Uploads" },
  { id: "bookmarks", label: "Bookmarks" },
];

const RECENT_PREVIEW = 5;
const SIDE_PREVIEW = 3;

/* ---------- Small building blocks ---------- */

function chapterInfo(ref: ChapterRef) {
  const { chapter } = getChapter(ref.subjectId, ref.chapterId);
  return {
    title: chapter?.title ?? ref.chapterId,
    number: chapter?.number ?? 0,
    completed: chapter?.status === "completed",
  };
}

function chapterHref(ref: ChapterRef) {
  return `/dashboard/textbooks/${ref.subjectId}/${ref.chapterId}`;
}

function SubjectTile({ subjectId, icon }: { subjectId: string; icon?: IconType }) {
  const style = subjectStyle(subjectId);
  const Icon = icon ?? style.icon;
  return (
    <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.tile} ${style.color}`}>
      <Icon size={24} />
    </span>
  );
}

function ItemRow({
  subjectId,
  icon,
  title,
  meta,
  badge,
  href,
}: {
  subjectId: string;
  icon?: IconType;
  title: string;
  meta: string;
  badge?: ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <SubjectTile subjectId={subjectId} icon={icon} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 truncate">{title}</p>
        <p className="text-xs text-slate-500 truncate">{meta}</p>
      </div>
      {badge}
      {href && <PiCaretRight size={16} className="text-slate-400 group-hover:text-slate-600 shrink-0 transition-colors" />}
    </>
  );

  return (
    <li>
      {href ? (
        <Link
          href={href}
          className="group flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
        >
          {content}
        </Link>
      ) : (
        <div className="flex items-center gap-3 px-2 py-3">{content}</div>
      )}
    </li>
  );
}

function Pill({ children, tone }: { children: ReactNode; tone: "green" | "blue" | "amber" }) {
  const tones = {
    green: "bg-brand-50 text-brand-700 border-brand-200",
    blue: "bg-sky-50 text-sky-700 border-sky-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`hidden sm:inline-block text-xs font-semibold rounded-full border px-3 py-1 shrink-0 ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Panel({
  icon: Icon,
  iconClass,
  title,
  subtitle,
  onViewAll,
  expanded = false,
  children,
}: {
  icon: IconType;
  iconClass: string;
  title: string;
  subtitle: string;
  onViewAll?: () => void;
  expanded?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl2 shadow-card p-5">
      <div className="flex items-start gap-3 mb-2">
        <Icon size={28} className={`shrink-0 ${iconClass}`} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="shrink-0 flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            {expanded ? "Show less" : "View All"}
            <PiArrowRight size={14} className={`transition-transform ${expanded ? "-rotate-90" : ""}`} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function EmptyList({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center text-center py-10 text-slate-500">
      <PiTray size={36} className="text-slate-300 mb-2" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

/* ---------- Page ---------- */

export default function LibraryPage() {
  const { profile } = useUser();
  const grade = profile.role === "parent" ? profile.childGrade : profile.grade;
  const gradeLabel = grade ? ` • Grade ${grade}` : "";

  const [tab, setTab] = useState<TabId>("recent");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAllRecent, setShowAllRecent] = useState(false);

  const query = search.trim().toLowerCase();
  const matches = (subjectId: string, ...texts: string[]) =>
    (subjectFilter === "all" || subjectFilter === subjectId) &&
    (!query || [subjectName(subjectId), ...texts].some((t) => t.toLowerCase().includes(query)));

  const chapterMatches = (ref: ChapterRef) => matches(ref.subjectId, chapterInfo(ref).title);

  const filtered = {
    recent: recentlyOpened.filter(chapterMatches),
    lessons: savedLessons.filter(chapterMatches),
    notes: notes.filter((n) => matches(n.subjectId, n.title)),
    quizzes: savedQuizzes.filter((q) => matches(q.subjectId, q.title)),
    uploads: uploads.filter((u) => matches(u.subjectId, u.name)),
    bookmarks: bookmarks.filter((b) => matches(b.subjectId, b.title)),
  };

  const stats: {
    tab: TabId;
    label: string;
    count: number;
    caption: string;
    icon: IconType;
    card: string;
    tile: string;
    arrow: string;
  }[] = [
    {
      tab: "lessons",
      label: "Saved Lessons",
      count: savedLessons.length,
      caption: "Textbooks and topics",
      icon: PiStack,
      card: "bg-brand-50/70 border-brand-100",
      tile: "bg-brand-100 text-brand-600",
      arrow: "bg-brand-100 text-brand-700",
    },
    {
      tab: "notes",
      label: "My Notes",
      count: notes.length,
      caption: "Personal study notes",
      icon: PiNotePencil,
      card: "bg-amber-50/70 border-amber-100",
      tile: "bg-amber-100 text-amber-600",
      arrow: "bg-amber-100 text-amber-700",
    },
    {
      tab: "quizzes",
      label: "Saved Quizzes",
      count: savedQuizzes.length,
      caption: "Practice anytime",
      icon: PiExam,
      card: "bg-violet-50/70 border-violet-100",
      tile: "bg-violet-100 text-violet-600",
      arrow: "bg-violet-100 text-violet-700",
    },
    {
      tab: "uploads",
      label: "My Uploads",
      count: uploads.length,
      caption: "Personal resources",
      icon: PiFileArrowUp,
      card: "bg-sky-50/70 border-sky-100",
      tile: "bg-sky-100 text-sky-600",
      arrow: "bg-sky-100 text-sky-700",
    },
  ];

  const renderChapterRow = (ref: ChapterRef, withStatus: boolean) => {
    const info = chapterInfo(ref);
    return (
      <ItemRow
        key={`${ref.subjectId}-${ref.chapterId}`}
        subjectId={ref.subjectId}
        title={`${subjectName(ref.subjectId)} — ${info.title}`}
        meta={`Chapter ${info.number}${gradeLabel}`}
        href={chapterHref(ref)}
        badge={withStatus && (info.completed ? <Pill tone="blue">Read Again</Pill> : <Pill tone="green">Continue</Pill>)}
      />
    );
  };

  const renderBookmarkRow = (b: Bookmark) => (
    <ItemRow
      key={b.id}
      subjectId={b.subjectId}
      title={b.title}
      meta={`${subjectName(b.subjectId)} • Page ${b.page}`}
      href={chapterHref(b)}
    />
  );

  const renderQuizRow = (q: SavedQuiz) => (
    <ItemRow
      key={q.id}
      subjectId={q.subjectId}
      icon={PiExam}
      title={q.title}
      meta={`${q.questions} questions${gradeLabel}`}
      href="/dashboard/ai-learning"
      badge={
        q.score === null ? <Pill tone="amber">In Progress</Pill> : <Pill tone="green">Score: {q.score}/{q.questions}</Pill>
      }
    />
  );

  const renderNoteRow = (n: Note) => (
    <ItemRow
      key={n.id}
      subjectId={n.subjectId}
      icon={PiNotePencil}
      title={n.title}
      meta={`${subjectName(n.subjectId)} • Updated ${n.updated}`}
      href={`/dashboard/textbooks/${n.subjectId}`}
    />
  );

  const renderUploadRow = (u: Upload) => (
    <ItemRow
      key={u.id}
      subjectId={u.subjectId}
      icon={uploadIcons[u.kind]}
      title={u.name}
      meta={`${subjectName(u.subjectId)} • ${u.size}`}
    />
  );

  const fullList = (() => {
    switch (tab) {
      case "lessons":
        return { title: "Saved Lessons", icon: PiStack, iconClass: "text-brand-500", subtitle: "Chapters you saved to read later.", rows: filtered.lessons.map((r) => renderChapterRow(r, true)) };
      case "notes":
        return { title: "My Notes", icon: PiNotePencil, iconClass: "text-amber-500", subtitle: "Your personal study notes.", rows: filtered.notes.map(renderNoteRow) };
      case "quizzes":
        return { title: "Saved Quizzes", icon: PiExam, iconClass: "text-violet-500", subtitle: "Practice again and improve your score.", rows: filtered.quizzes.map(renderQuizRow) };
      case "uploads":
        return { title: "My Uploads", icon: PiFileArrowUp, iconClass: "text-sky-500", subtitle: "Files you added to your library.", rows: filtered.uploads.map(renderUploadRow) };
      case "bookmarks":
        return { title: "Bookmarks", icon: PiStarFill, iconClass: "text-amber-400", subtitle: "Quick access to your important pages.", rows: filtered.bookmarks.map(renderBookmarkRow) };
      default:
        return null;
    }
  })();

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="rounded-xl2 bg-gradient-to-r from-brand-50 via-brand-50 to-brand-100 px-6 sm:px-8 py-7 flex items-center gap-6 overflow-hidden">
        <span className="hidden sm:flex w-20 h-20 rounded-2xl bg-white shadow-card items-center justify-center text-brand-600 shrink-0">
          <PiBookOpenText size={44} />
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-1">My Library</h2>
          <p className="text-slate-600">Your personal space for learning and revision.</p>
          <p className="text-slate-600">Save lessons, take notes, keep quizzes and organize your study materials.</p>
        </div>
        <div className="hidden lg:block relative w-64 h-32 shrink-0" aria-hidden="true">
          <PiSparkle size={26} className="absolute top-1 left-2 text-amber-400" />
          <PiBooks size={84} className="absolute bottom-0 left-10 text-brand-600" />
          <PiFolderSimpleStar size={80} className="absolute bottom-0 left-32 text-amber-400" />
          <PiPlant size={56} className="absolute bottom-0 right-0 text-brand-500" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <button
            key={s.tab}
            type="button"
            onClick={() => setTab(s.tab)}
            className={`group text-left rounded-xl2 border p-4 flex items-center gap-4 hover:shadow-soft transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${s.card}`}
          >
            <span className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${s.tile}`}>
              <s.icon size={34} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-semibold text-slate-800">{s.label}</span>
              <span className="block text-2xl font-extrabold text-slate-800 leading-tight">{s.count}</span>
              <span className="block text-sm text-slate-500 truncate">{s.caption}</span>
            </span>
            <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform ${s.arrow}`}>
              <PiArrowRight size={18} />
            </span>
          </button>
        ))}
      </div>

      {/* Tabs + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div role="tablist" aria-label="Library sections" className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 flex-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 ${
                tab === t.id ? "bg-brand-100 text-brand-700" : "text-slate-600 hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <label htmlFor="library-subject" className="sr-only">
              Filter by subject
            </label>
            <select
              id="library-subject"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white pl-4 pr-9 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="all">All Subjects</option>
              {subjectsCatalog.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <PiCaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex-1 lg:w-64">
            <PiMagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search in library..."
              aria-label="Search in library"
              className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {tab === "recent" ? (
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <Panel
            icon={PiClock}
            iconClass="text-slate-500"
            title="Recently opened"
            subtitle="Continue where you left off."
            onViewAll={recentlyOpened.length > RECENT_PREVIEW ? () => setShowAllRecent((v) => !v) : undefined}
            expanded={showAllRecent}
          >
            {filtered.recent.length ? (
              <ul className="divide-y divide-slate-100">
                {(showAllRecent ? filtered.recent : filtered.recent.slice(0, RECENT_PREVIEW)).map((r) => renderChapterRow(r, true))}
              </ul>
            ) : (
              <EmptyList label="Nothing matches your filters." />
            )}
          </Panel>

          <div className="flex flex-col gap-6">
            <Panel
              icon={PiStarFill}
              iconClass="text-amber-400"
              title="Bookmarked items"
              subtitle="Quick access to your important pages and resources."
              onViewAll={() => setTab("bookmarks")}
            >
              {filtered.bookmarks.length ? (
                <ul className="divide-y divide-slate-100">{filtered.bookmarks.slice(0, SIDE_PREVIEW).map(renderBookmarkRow)}</ul>
              ) : (
                <EmptyList label="No bookmarks match your filters." />
              )}
            </Panel>

            <Panel
              icon={PiChartBar}
              iconClass="text-brand-500"
              title="Recently saved quizzes"
              subtitle="Practice again and improve your score."
              onViewAll={() => setTab("quizzes")}
            >
              {filtered.quizzes.length ? (
                <ul className="divide-y divide-slate-100">{filtered.quizzes.slice(0, SIDE_PREVIEW).map(renderQuizRow)}</ul>
              ) : (
                <EmptyList label="No quizzes match your filters." />
              )}
            </Panel>
          </div>
        </div>
      ) : (
        fullList && (
          <Panel icon={fullList.icon} iconClass={fullList.iconClass} title={fullList.title} subtitle={fullList.subtitle}>
            {fullList.rows.length ? (
              <ul className="divide-y divide-slate-100">{fullList.rows}</ul>
            ) : (
              <EmptyList label="Nothing matches your filters." />
            )}
          </Panel>
        )
      )}
    </div>
  );
}
