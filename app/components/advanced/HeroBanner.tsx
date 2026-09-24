import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/images/hero-student-robot.png";

export default function HeroBanner({
  studentName,
  isParent,
}: {
  studentName: string;
  isParent: boolean;
}) {
  return (
    <div className="rounded-xl2 bg-brand-100 p-8 flex items-center gap-6 overflow-hidden relative">
      <div className="flex-1 relative z-10">
        <h2 className="text-3xl font-extrabold text-slate-800 leading-tight mb-2">
          {isParent ? <>Track {studentName}&apos;s progress today! ✨</> : <>Let&apos;s learn something new today! ✨</>}
        </h2>
        <p className="text-slate-600 mb-5 max-w-md">
          {isParent
            ? `See how ${studentName} is doing across subjects, quizzes and AI learning sessions.`
            : "Explore textbooks, ask AI, take quizzes and boost your knowledge."}
        </p>
        <Link
          href={isParent ? "/dashboard/progress" : "/dashboard/ai-learning"}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 transition-colors"
        >
          {isParent ? "View Progress" : "Start Learning"} →
        </Link>
      </div>
      <Image
        src={heroImage}
        alt="Student learning with AI"
        className="hidden md:block w-64 h-44 object-cover rounded-2xl shadow-soft relative z-10"
      />
    </div>
  );
}
