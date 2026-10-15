import Link from "next/link";
import { redirect } from "next/navigation";
import { getSubject } from "@/data/textbooksData";

const statusMeta = {
  completed: { label: "Completed", badge: "bg-brand-100 text-brand-700" },
  "in-progress": { label: "In progress", badge: "bg-amber-100 text-amber-700" },
  "not-started": { label: "Not started", badge: "bg-slate-100 text-slate-500" },
};

export default async function TextbookChapters({ params }: PageProps<"/dashboard/textbooks/[subjectId]">) {
  const { subjectId } = await params;
  const subject = getSubject(subjectId);

  if (!subject) redirect("/dashboard/textbooks");

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <Link href="/dashboard/textbooks" className="text-sm text-brand-600 font-medium hover:underline self-start">
        ← All Subjects
      </Link>

      <div className={`rounded-xl2 ${subject.cardBg} p-6 flex items-center gap-4`}>
        <div className={`w-16 h-16 rounded-xl ${subject.badgeBg} flex items-center justify-center text-4xl shrink-0`}>
          {subject.icon}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">{subject.name}</h2>
          <p className="text-slate-500">{subject.description}</p>
          <p className="text-xs text-slate-400 mt-1">
            {subject.chapters.length} Chapters
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl2 shadow-card divide-y divide-slate-100">
        {subject.chapters.map((chapter) => {
          const meta = statusMeta[chapter.status];
          return (
            <Link
              key={chapter.id}
              href={`/dashboard/textbooks/${subjectId}/${chapter.id}`}
              className="flex items-center gap-4 p-4 hover:bg-brand-50/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center font-bold text-brand-700 shrink-0">
                {chapter.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">{chapter.title}</p>
                <p className="text-xs text-slate-400">{chapter.minutes} min read</p>
              </div>
              <span className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 ${meta.badge}`}>
                {meta.label}
              </span>
              <span className="text-slate-300 shrink-0">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
