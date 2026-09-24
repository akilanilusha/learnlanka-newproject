import { weekDays } from "@/data/mockData";
import { PiLightning, PiCheck } from "react-icons/pi";

export default function TodaysGoals() {
  return (
    <div className="bg-white rounded-xl2 shadow-card p-5">
      <h3 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
        <PiLightning className="text-amber-500" /> Today&apos;s Goals
      </h3>
      <p className="text-xs text-slate-400 mb-4">Keep going, you&apos;re doing great!</p>
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day) => (
          <div
            key={day.label}
            className={`flex flex-col items-center gap-1.5 rounded-xl py-2 ${
              day.active ? "bg-brand-500 text-white" : "text-slate-500"
            }`}
          >
            <span className="text-[10px] font-medium">{day.label}</span>
            <span className="text-sm font-semibold">{day.date}</span>
            {day.done ? (
              <span className="w-4 h-4 rounded flex items-center justify-center bg-green-500 text-white">
                <PiCheck size={11} />
              </span>
            ) : (
              <span className="w-4 h-4 rounded-full bg-violet-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
