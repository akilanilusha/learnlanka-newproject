import RobotMascot from "./RobotMascot";

export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white rounded-xl2 shadow-card">
      <RobotMascot className="w-28 mb-4" />
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 max-w-md">
        {description || "We're building this section. Check back soon!"}
      </p>
    </div>
  );
}
