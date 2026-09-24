import Link from "next/link";
import { redirect } from "next/navigation";
import { getChapter, getChapterContent } from "@/data/textbooksData";
import RobotMascot from "@/app/components/common/RobotMascot";

export default async function ChapterReader({
  params,
}: PageProps<"/dashboard/textbooks/[subjectId]/[chapterId]">) {
  const { subjectId, chapterId } = await params;
  const { subject, chapter, index } = getChapter(subjectId, chapterId);

  if (!subject || !chapter) redirect("/dashboard/textbooks");

  const content = getChapterContent(subjectId, chapterId, chapter.title, subject.name);
  const prevChapter = subject.chapters[index - 1];
  const nextChapter = subject.chapters[index + 1];

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href={`/dashboard/textbooks/${subjectId}`} className="text-sm text-brand-600 font-medium hover:underline">
          ← {subject.name} Chapters
        </Link>
        <span className="text-xs text-slate-400">
          Chapter {chapter.number} of {subject.chapters.length}
        </span>
      </div>

      <div className={`rounded-xl2 ${subject.cardBg} p-6`}>
        <p className="text-xs font-semibold text-slate-500 mb-1">
          {subject.icon} {subject.name} · {chapter.minutes} min read
        </p>
        <h2 className="text-2xl font-extrabold text-slate-800">{chapter.title}</h2>
      </div>

      <div className="bg-white rounded-xl2 shadow-card p-6 flex flex-col gap-6">
        <p className="text-slate-600 leading-relaxed">{content.intro}</p>

        {content.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="font-bold text-slate-800 mb-2">{section.heading}</h3>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-2">
                {p}
              </p>
            ))}
          </div>
        ))}

        <div className="rounded-xl bg-brand-50 p-4">
          <h4 className="font-semibold text-slate-800 mb-2">Key Points</h4>
          <ul className="space-y-1">
            {content.keyPoints.map((point) => (
              <li key={point} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-brand-600 mt-0.5">✔</span> {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border-2 border-dashed border-amber-200 bg-amber-50 p-4">
          <h4 className="font-semibold text-slate-800 mb-1">🎯 Try It Yourself</h4>
          <p className="text-sm text-slate-700 mb-1">{content.activity.question}</p>
          <p className="text-xs text-slate-500">Hint: {content.activity.hint}</p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
          <RobotMascot className="w-12 shrink-0" />
          <p className="text-sm text-slate-600 flex-1">
            Stuck on this chapter? Ask your AI study buddy to explain it differently.
          </p>
          <Link
            href="/dashboard/ai-learning"
            className="shrink-0 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-3 py-2 transition-colors"
          >
            Ask AI
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {prevChapter ? (
          <Link
            href={`/dashboard/textbooks/${subjectId}/${prevChapter.id}`}
            className="text-sm font-semibold text-slate-600 hover:text-brand-600"
          >
            ← {prevChapter.title}
          </Link>
        ) : (
          <span />
        )}
        {nextChapter ? (
          <Link
            href={`/dashboard/textbooks/${subjectId}/${nextChapter.id}`}
            className="text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-4 py-2 transition-colors"
          >
            Next: {nextChapter.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
