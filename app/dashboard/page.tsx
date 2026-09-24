"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import HeroBanner from "../components/advanced/HeroBanner";
import AISearchBox from "../components/advanced/AISearchBox";
import TodaysGoals from "../components/advanced/TodaysGoals";
import LearningProgress from "../components/advanced/LearningProgress";
import AIStudyHelper from "../components/advanced/AIStudyHelper";
import Recommended from "../components/advanced/Recommended";

export default function Dashboard() {
  const { profile } = useUser();
  const isParent = profile.role === "parent";
  const studentName = isParent ? profile.childName : profile.name;
  const [aiExpanded, setAiExpanded] = useState(false);

  return (
    <div className={aiExpanded ? "flex flex-col" : "grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6"}>
      <div className="flex flex-col gap-6 min-w-0">
        {!aiExpanded && <HeroBanner studentName={studentName} isParent={isParent} />}
        <AISearchBox expanded={aiExpanded} onToggleExpand={() => setAiExpanded((v) => !v)} />
      </div>
      {!aiExpanded && (
        <div className="flex flex-col gap-6">
          <TodaysGoals />
          <LearningProgress />
          <AIStudyHelper />
          <Recommended />
        </div>
      )}
    </div>
  );
}
