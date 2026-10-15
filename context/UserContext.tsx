"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "eduview.profile";

export type Role = "student" | "parent";

export type Profile = {
  isOnboarded: boolean;
  role: Role | null;
  name: string;
  grade: number | null; // 1-12, only meaningful for role 'student'
  childName: string; // only meaningful for role 'parent'
  childGrade: number | null; // only meaningful for role 'parent'
  favoriteSubjects: string[]; // subject ids the user starred
};

const defaultProfile: Profile = {
  isOnboarded: false,
  role: null,
  name: "",
  grade: null,
  childName: "",
  childGrade: null,
  favoriteSubjects: [],
};

type UserContextValue = {
  profile: Profile;
  hydrated: boolean;
  completeOnboarding: (data: Partial<Profile>) => void;
  resetProfile: () => void;
  toggleFavoriteSubject: (subjectId: string) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const stored: Profile = { ...defaultProfile, ...JSON.parse(raw) };
    if (!Array.isArray(stored.favoriteSubjects)) stored.favoriteSubjects = [];
    return stored;
  } catch {
    return defaultProfile;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage during render would mismatch SSR output, so this
    // one-time sync happens post-mount instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(loadProfile());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, hydrated]);

  const completeOnboarding = (data: Partial<Profile>) => {
    setProfile({ ...defaultProfile, ...data, isOnboarded: true });
  };

  const resetProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(defaultProfile);
  };

  const toggleFavoriteSubject = (subjectId: string) => {
    setProfile((prev) => ({
      ...prev,
      favoriteSubjects: prev.favoriteSubjects.includes(subjectId)
        ? prev.favoriteSubjects.filter((id) => id !== subjectId)
        : [...prev.favoriteSubjects, subjectId],
    }));
  };

  const value = { profile, hydrated, completeOnboarding, resetProfile, toggleFavoriteSubject };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
