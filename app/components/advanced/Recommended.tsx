import Link from "next/link";
import { recommended } from "@/data/mockData";

export default function Recommended() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-800">Recommended for You</h3>
        <Link href="/dashboard/library" className="text-sm text-brand-600 font-medium hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {recommended.map((item) => (
          <div key={item.id} className={`rounded-xl2 ${item.bg} p-4`}>
            <span className="text-2xl">{item.icon}</span>
            <p className="font-semibold text-slate-800 mt-2">{item.title}</p>
            <p className="text-xs text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
