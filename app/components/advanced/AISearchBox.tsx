"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import robotWave from "@/assets/images/robot-wave.gif";
import {
  PiMagnifyingGlass,
  PiPaperclip,
  PiArrowRight,
  PiArrowsOut,
  PiArrowsIn,
  PiSparkle,
  PiBookOpen,
  PiRadical,
  PiLightbulb,
  PiFileText,
  PiQuestion,
  PiShuffle,
  PiPlus,
  PiChatCircleText,
} from "react-icons/pi";

type ChatMessage = { role: "user" | "ai"; text: string };
type ChatThread = { id: string; title: string; time: string; messages: ChatMessage[] };

const suggestions = [
  { label: "Explain fractions", icon: PiBookOpen, bg: "bg-purple-100", color: "text-purple-600" },
  { label: "Solve equation", icon: PiRadical, bg: "bg-emerald-100", color: "text-emerald-600" },
  { label: "What is photosynthesis?", icon: PiLightbulb, bg: "bg-amber-100", color: "text-amber-600" },
  { label: "Summarize this topic", icon: PiFileText, bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Practice quiz", icon: PiQuestion, bg: "bg-rose-100", color: "text-rose-600" },
  { label: "Surprise me", icon: PiShuffle, bg: "bg-indigo-100", color: "text-indigo-600" },
];

const initialHistory: ChatThread[] = [
  {
    id: "hist-1",
    title: "Explain fractions with examples",
    time: "Today",
    messages: [
      { role: "user", text: "Explain fractions with examples" },
      {
        role: "ai",
        text: "A fraction represents a part of a whole, like 1/2 meaning one out of two equal parts. If you cut a pizza into 4 slices and eat 1, you've eaten 1/4 of the pizza.",
      },
    ],
  },
  {
    id: "hist-2",
    title: "Solve: 2x + 5 = 15",
    time: "Today",
    messages: [
      { role: "user", text: "Solve: 2x + 5 = 15" },
      { role: "ai", text: "Subtract 5 from both sides to get 2x = 10, then divide both sides by 2, so x = 5." },
    ],
  },
  {
    id: "hist-3",
    title: "What is photosynthesis?",
    time: "Yesterday",
    messages: [
      { role: "user", text: "What is photosynthesis?" },
      {
        role: "ai",
        text: "Photosynthesis is the process plants use to turn sunlight, water and carbon dioxide into energy and oxygen.",
      },
    ],
  },
  {
    id: "hist-4",
    title: "Summarize Chapter 3: Multiplication",
    time: "2 days ago",
    messages: [
      { role: "user", text: "Summarize Chapter 3: Multiplication" },
      {
        role: "ai",
        text: "Multiplication is repeated addition of equal groups. The answer is called the product, and skip counting helps with smaller numbers.",
      },
    ],
  },
];

const CANNED_REPLY =
  "Here's a quick explanation based on your textbooks. Connect a real AI backend to get live, in-depth answers.";

export default function AISearchBox({
  expanded,
  onToggleExpand,
}: {
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<ChatThread[]>(initialHistory);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = history.find((h) => h.id === activeChatId) ?? null;

  const startNewChat = () => {
    setActiveChatId(null);
    setQuery("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;

    if (!expanded) onToggleExpand();

    if (activeChatId) {
      setHistory((prev) =>
        prev.map((h) =>
          h.id === activeChatId
            ? { ...h, messages: [...h.messages, { role: "user", text }, { role: "ai", text: CANNED_REPLY }] }
            : h
        )
      );
    } else {
      const id = `chat-${Date.now()}`;
      setHistory((prev) => [
        { id, title: text, time: "Just now", messages: [{ role: "user", text }, { role: "ai", text: CANNED_REPLY }] },
        ...prev,
      ]);
      setActiveChatId(id);
    }
    setQuery("");
  };

  const searchBar = (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-3 bg-white rounded-full px-5 py-3 ${
        expanded ? "border border-slate-200" : "shadow-card"
      }`}
    >
      <PiMagnifyingGlass className="text-brand-500 shrink-0" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question or search for any topic..."
        className="flex-1 min-w-0 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      <PiPaperclip className="text-slate-400 shrink-0" size={20} />
      <button
        type="submit"
        className="w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-600 flex items-center justify-center text-white shrink-0 transition-colors"
      >
        <PiArrowRight size={18} />
      </button>
    </form>
  );

  const emptyState = (
    <div className={expanded ? "max-w-2xl mx-auto text-center pt-10" : ""}>
      <h2
        className={`font-extrabold text-slate-800 flex items-center gap-2 mb-1 ${
          expanded ? "text-2xl justify-center" : "text-2xl"
        }`}
      >
        What would you like to learn today? <PiSparkle className="text-amber-400" />
      </h2>
      <p className={`text-slate-500 mb-5 max-w-md ${expanded ? "mx-auto" : ""}`}>
        Ask any question, search for topics, get explanations, or explore study materials.
      </p>
      {!expanded && <div className="mb-4">{searchBar}</div>}
      <div className={`flex flex-wrap gap-2 ${expanded ? "justify-center" : ""}`}>
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setQuery(s.label)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1.5 pr-4 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-300 transition-colors"
          >
            <span className={`w-6 h-6 rounded-full ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
              <s.icon size={13} />
            </span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );

  if (expanded) {
    return (
      <div className="h-[80vh] min-h-[520px] flex rounded-xl2 border border-slate-200 bg-white overflow-hidden">
        <div className="w-72 shrink-0 border-r border-slate-100 flex flex-col p-3">
          <button
            onClick={startNewChat}
            className="flex items-center gap-2 rounded-lg border border-slate-200 hover:bg-brand-50 px-3 py-2.5 text-sm font-semibold text-slate-700 mb-4 transition-colors"
          >
            <PiPlus size={16} /> New chat
          </button>
          <p className="text-xs font-semibold text-slate-400 px-2 mb-2">Recent</p>
          <div className="flex-1 overflow-y-auto flex flex-col gap-1">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveChatId(h.id)}
                className={`text-left rounded-lg px-3 py-2 text-sm flex items-start gap-2 transition-colors ${
                  activeChatId === h.id ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <PiChatCircleText size={16} className="mt-0.5 shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="block truncate font-medium">{h.title}</span>
                  <span className="block text-xs text-slate-400">{h.time}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <h3 className="font-bold text-slate-800 truncate">{activeChat ? activeChat.title : "New chat"}</h3>
            <button
              onClick={onToggleExpand}
              title="Collapse"
              className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-colors"
            >
              <PiArrowsIn size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeChat ? (
              <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {activeChat.messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm max-w-md ${
                        m.role === "user" ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              emptyState
            )}
          </div>

          <div className="px-6 py-4 border-t border-slate-100 shrink-0">{searchBar}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 bg-gradient-to-br from-brand-50 to-white p-8 flex items-center gap-6 overflow-hidden relative">
      <button
        onClick={onToggleExpand}
        title="Expand"
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-500 shadow-soft transition-colors"
      >
        <PiArrowsOut size={16} />
      </button>

      <div className="flex-1 relative z-[1]">{emptyState}</div>

      <div className="hidden lg:block relative shrink-0 w-44">
        <PiSparkle className="absolute -top-2 left-2 text-amber-400" size={22} />
        <PiSparkle className="absolute bottom-6 -right-1 text-brand-400" size={16} />
        <div className="absolute top-1 right-4 bg-white rounded-full shadow-soft px-3 py-1.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
        <Image
          src={robotWave}
          alt="AI learning buddy waving hello"
          className="w-40 relative z-10"
          draggable={false}
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
