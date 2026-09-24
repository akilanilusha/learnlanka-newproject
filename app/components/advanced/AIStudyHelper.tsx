import Link from "next/link";
import RobotMascot from "../common/RobotMascot";

const points = ["Explain any topic", "Create practice quizzes", "Summarize content", "And much more!"];

export default function AIStudyHelper() {
  return (
    <div className="bg-brand-100 rounded-xl2 p-5 relative overflow-hidden">
      <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
        AI Study Helper
        <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-semibold">New</span>
      </h3>
      <p className="text-sm text-slate-600 mb-2">I can help you with:</p>
      <ul className="space-y-1 mb-4">
        {points.map((p) => (
          <li key={p} className="text-sm text-slate-700 flex items-center gap-2">
            <span className="text-brand-600">✔</span> {p}
          </li>
        ))}
      </ul>
      <Link
        href="/dashboard/ai-learning"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 transition-colors"
      >
        Ask AI Now →
      </Link>
      <RobotMascot className="w-24 absolute -right-2 -bottom-2 opacity-90" />
    </div>
  );
}
