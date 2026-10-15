"use client";

import Link from "next/link";
import Image from "next/image";
import { PiStar, PiStarFill } from "react-icons/pi";
import { subjectsCatalog, type Subject } from "@/data/textbooksData";
import { useUser } from "@/context/UserContext";
import heroImage from "@/assets/images/hero-student-robot.png";

function SubjectCard({
  subject,
  isFavorite,
  onToggleFavorite,
}: {
  subject: Subject;
  isFavorite: boolean;
  onToggleFavorite: (subjectId: string) => void;
}) {
  const favoriteLabel = isFavorite
    ? `Remove ${subject.name} from favorites`
    : `Add ${subject.name} to favorites`;

  return (
    <div className="relative">
      <Link
        href={`/dashboard/textbooks/${subject.id}`}
        className="group h-full rounded-xl2 bg-white border border-slate-200 p-5 flex flex-col hover:border-brand-300 hover:shadow-soft transition-all"
      >
        <div className={`w-14 h-14 rounded-xl ${subject.badgeBg} flex items-center justify-center text-3xl mb-4`}>
          {subject.icon}
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-1">{subject.name}</h3>
        <p className="text-sm text-slate-500 flex-1">{subject.description}</p>
        <div className="flex items-center justify-between gap-2 mt-4">
          <span className="text-xs text-slate-500">
            {subject.chapters.length} Chapters 
          </span>
          <span className="w-9 h-9 rounded-full bg-brand-500 group-hover:bg-brand-600 text-white flex items-center justify-center shrink-0 transition-colors">
            →
          </span>
        </div>
      </Link>

      {/* Sibling of the Link (not nested) so toggling never navigates. */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite(subject.id);
        }}
        aria-pressed={isFavorite}
        aria-label={favoriteLabel}
        title={favoriteLabel}
        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
          isFavorite ? "bg-amber-50 text-amber-400 hover:bg-amber-100" : "text-slate-400 hover:bg-amber-50 hover:text-amber-500"
        }`}
      >
        {isFavorite ? <PiStarFill size={22} /> : <PiStar size={22} />}
      </button>
    </div>
  );
}

export default function SubjectsPage() {
  const { profile, toggleFavoriteSubject } = useUser();
  const favoriteSet = new Set(profile.favoriteSubjects);
  const featured = subjectsCatalog.filter((s) => favoriteSet.has(s.id));

  const renderGrid = (subjects: Subject[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {subjects.map((s) => (
        <SubjectCard
          key={s.id}
          subject={s}
          isFavorite={favoriteSet.has(s.id)}
          onToggleFavorite={toggleFavoriteSubject}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl2 bg-brand-100 p-8 flex items-center gap-6 overflow-hidden">
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Subjects</h2>
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

      {featured.length > 0 && (
        <section aria-labelledby="featured-subjects-heading">
          <h3 id="featured-subjects-heading" className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3">
            <PiStarFill className="text-amber-400" size={20} />
            Featured Subjects
          </h3>
          {renderGrid(featured)}
        </section>
      )}

      <section aria-labelledby="all-subjects-heading">
        <h3 id="all-subjects-heading" className="text-lg font-bold text-slate-800 mb-3">
          All Subjects
        </h3>
        {renderGrid(subjectsCatalog)}
      </section>
    </div>
  );
}
