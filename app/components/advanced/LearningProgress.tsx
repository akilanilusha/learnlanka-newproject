import { learningProgress } from "@/data/mockData";

export default function LearningProgress() {
  const { percent, lessonsCompleted, quizzesTaken, readingHours } = learningProgress;

  return (
    <div className="bg-white rounded-xl2 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">Learning Progress</h3>
        <span className="text-xs text-slate-400">This Month ▾</span>
      </div>
      <div className="flex items-center gap-5">
        <div
          className="relative w-24 h-24 rounded-full shrink-0 flex items-center justify-center"
          style={{
            background: `conic-gradient(#5f9a3c ${percent * 3.6}deg, #eef1e9 0deg)`,
          }}
        >
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <span className="font-bold text-slate-800">{percent}%</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-brand-500" /> Lessons Completed
            </span>
            <span className="font-semibold text-slate-800">{lessonsCompleted}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Quizzes Taken
            </span>
            <span className="font-semibold text-slate-800">{quizzesTaken}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-violet-400" /> Reading Time
            </span>
            <span className="font-semibold text-slate-800">{readingHours} hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
