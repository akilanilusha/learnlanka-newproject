import {
  PiHouse,
  PiBookOpen,
  PiSparkle,
  PiFolders,
  PiChartBar,
  PiFileText,
  PiGear,
} from "react-icons/pi";

export const subjects = [
  { id: "math", name: "Mathematics", icon: "➗", chapters: 12, progress: 68, color: "bg-lime-100" },
  { id: "english", name: "English", icon: "📖", chapters: 10, progress: 58, color: "bg-amber-100" },
  { id: "science", name: "Science", icon: "🧪", chapters: 8, progress: 72, color: "bg-violet-100" },
  { id: "environment", name: "Environment", icon: "🌍", chapters: 6, progress: 64, color: "bg-sky-100" },
];

export const continueLearning = [
  {
    id: "multiplication",
    title: "Multiplication of Numbers",
    subject: "Mathematics",
    chapter: "Chapter 3",
    progress: 45,
    status: "In progress",
    emoji: "🧮",
    bg: "bg-green-100",
    path: "mathematics/ch-3",
  },
  {
    id: "solar-system",
    title: "The Solar System",
    subject: "Science",
    chapter: "Chapter 2",
    progress: 30,
    status: "In progress",
    emoji: "🪐",
    bg: "bg-slate-800",
    path: "science/ch-2",
  },
];

export const weekDays = [
  { label: "Mon", date: 20, done: true, active: false },
  { label: "Tue", date: 21, done: true, active: true },
  { label: "Wed", date: 22, done: false, active: false },
  { label: "Thu", date: 23, done: true, active: false },
  { label: "Fri", date: 24, done: true, active: false },
  { label: "Sat", date: 25, done: true, active: false },
  { label: "Sun", date: 26, done: false, active: false },
];

export const learningProgress = {
  percent: 72,
  lessonsCompleted: 78,
  quizzesTaken: 24,
  readingHours: 12.5,
};

export const recommended = [
  { id: "daily-quiz", title: "Daily Quiz", description: "Test your knowledge every day", icon: "🏆", bg: "bg-amber-50" },
  { id: "fun-facts", title: "Fun Facts", description: "Discover amazing facts", icon: "🪐", bg: "bg-sky-50" },
];

export const quickActions = [
  { id: "textbooks", title: "Textbooks", description: "Read your school books", icon: "📗" },
  { id: "search", title: "Search", description: "Find any topic or content", icon: "🔍" },
  { id: "ai-quiz", title: "AI Quiz", description: "Test your knowledge with AI", icon: "🤖" },
  { id: "ask-ai", title: "Ask AI", description: "Get answers and explanations", icon: "💡" },
];

export const primarySubjects = [
  { id: "math", name: "Maths", icon: "🔢", color: "bg-yellow-200" },
  { id: "english", name: "English", icon: "📚", color: "bg-pink-200" },
  { id: "science", name: "Science", icon: "🔬", color: "bg-sky-200" },
  { id: "environment", name: "My World", icon: "🌱", color: "bg-green-200" },
  { id: "art", name: "Drawing", icon: "🎨", color: "bg-purple-200" },
  { id: "quiz", name: "Fun Quiz", icon: "🎯", color: "bg-orange-200" },
];

// Paths are absolute (Next.js App Router routes) instead of the old
// react-router paths, which were relative to the /dashboard parent route.
export const sidebarNav = [
  { id: "dashboard", label: "Dashboard", icon: PiHouse, path: "/dashboard" },
  { id: "textbooks", label: "Subjects", icon: PiBookOpen, path: "/dashboard/textbooks" },
  { id: "library", label: "My Library", icon: PiFolders, path: "/dashboard/library" },
  { id: "ai-learning", label: "AI Quiz Bot", icon: PiSparkle, path: "/dashboard/ai-learning", badge: "New" },
  { id: "progress", label: "Progress", icon: PiChartBar, path: "/dashboard/progress" },
  { id: "reports", label: "Reports", icon: PiFileText, path: "/dashboard/reports" },
  { id: "settings", label: "Settings", icon: PiGear, path: "/dashboard/settings" },
];
