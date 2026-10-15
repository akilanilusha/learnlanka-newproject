function chapterTitles(subjectId: string): string[] {
  const titles: Record<string, string[]> = {
    mathematics: [
      "Numbers and Counting",
      "Addition and Subtraction",
      "Multiplication of Numbers",
      "Division Basics",
      "Fractions",
      "Decimals",
      "Measurement",
      "Time and Calendar",
      "Money and Shopping",
      "Shapes and Geometry",
      "Patterns",
      "Data and Graphs",
    ],
    english: [
      "Alphabet and Phonics",
      "Nouns and Pronouns",
      "Verbs and Tenses",
      "Adjectives and Adverbs",
      "Sentence Building",
      "Reading Comprehension",
      "Storytelling",
      "Poetry",
      "Letter Writing",
      "Grammar in Practice",
    ],
    science: [
      "Living and Non-Living Things",
      "The Solar System",
      "Plants Around Us",
      "Animals and Habitats",
      "States of Matter",
      "The Human Body",
      "Forces and Motion",
      "Simple Machines",
    ],
    environment: [
      "Our Planet Earth",
      "Air and Water",
      "Weather and Seasons",
      "Forests and Wildlife",
      "Reduce, Reuse, Recycle",
      "Caring for Our Environment",
    ],
    "social-studies": [
      "My Family and Community",
      "Maps and Directions",
      "Our Country",
      "Ancient Civilizations",
      "Culture and Festivals",
      "Rules and Government",
      "Great Explorers",
    ],
    "art-craft": [
      "Colors and Shapes",
      "Drawing Basics",
      "Paper Craft",
      "Painting Techniques",
      "Clay Modeling",
      "Recycled Art",
    ],
    "computer-skills": [
      "Introduction to Computers",
      "Using the Keyboard and Mouse",
      "Typing and Documents",
      "Internet Safety",
      "Fun with Coding",
    ],
    music: ["Sounds and Rhythm", "Notes and Scales", "Musical Instruments", "Sing and Play"],
  };
  return titles[subjectId] || [];
}

export type Chapter = {
  id: string;
  number: number;
  title: string;
  summary: string;
  minutes: number;
  status: "not-started" | "in-progress" | "completed";
  progress: number;
};

function buildChapters(subjectId: string, subjectName: string, completedCount: number): Chapter[] {
  return chapterTitles(subjectId).map((title, index) => {
    const number = index + 1;
    let status: Chapter["status"] = "not-started";
    let progress = 0;
    if (number <= completedCount) {
      status = "completed";
      progress = 100;
    } else if (number === completedCount + 1) {
      status = "in-progress";
      progress = 40;
    }

    return {
      id: `ch-${number}`,
      number,
      title,
      summary: `Learn about ${title.toLowerCase()} in ${subjectName}.`,
      minutes: 10 + index * 2,
      status,
      progress,
    };
  });
}

export type Subject = {
  id: string;
  name: string;
  icon: string;
  description: string;
  cardBg: string;
  badgeBg: string;
  chapters: Chapter[];
};

export const subjectsCatalog: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "🧮",
    description: "Build strong math skills step by step.",
    cardBg: "bg-violet-50",
    badgeBg: "bg-violet-100",
    chapters: buildChapters("mathematics", "Mathematics", 8),
  },
  {
    id: "english",
    name: "English",
    icon: "📖",
    description: "Improve reading, writing and speaking.",
    cardBg: "bg-amber-50",
    badgeBg: "bg-amber-100",
    chapters: buildChapters("english", "English", 5),
  },
  {
    id: "science",
    name: "Science",
    icon: "🧪",
    description: "Discover the world through science.",
    cardBg: "bg-lime-50",
    badgeBg: "bg-lime-100",
    chapters: buildChapters("science", "Science", 1),
  },
  {
    id: "environment",
    name: "Environment",
    icon: "🌍",
    description: "Learn about nature and our planet.",
    cardBg: "bg-sky-50",
    badgeBg: "bg-sky-100",
    chapters: buildChapters("environment", "Environment", 3),
  },
  {
    id: "social-studies",
    name: "Social Studies",
    icon: "🗺️",
    description: "Explore history, people and civilizations.",
    cardBg: "bg-orange-50",
    badgeBg: "bg-orange-100",
    chapters: buildChapters("social-studies", "Social Studies", 2),
  },
  {
    id: "art-craft",
    name: "Art & Craft",
    icon: "🎨",
    description: "Unleash creativity and imagination.",
    cardBg: "bg-rose-50",
    badgeBg: "bg-rose-100",
    chapters: buildChapters("art-craft", "Art & Craft", 1),
  },
  {
    id: "computer-skills",
    name: "Computer Skills",
    icon: "💻",
    description: "Learn essential digital skills for the future.",
    cardBg: "bg-blue-50",
    badgeBg: "bg-blue-100",
    chapters: buildChapters("computer-skills", "Computer Skills", 1),
  },
  {
    id: "music",
    name: "Music",
    icon: "🎵",
    description: "Discover the magic of music.",
    cardBg: "bg-fuchsia-50",
    badgeBg: "bg-fuchsia-100",
    chapters: buildChapters("music", "Music", 0),
  },
];

export function getSubject(subjectId: string): Subject | undefined {
  return subjectsCatalog.find((s) => s.id === subjectId);
}

export function getChapter(subjectId: string, chapterId: string) {
  const subject = getSubject(subjectId);
  if (!subject) return { subject: null, chapter: null, index: -1 };
  const index = subject.chapters.findIndex((c) => c.id === chapterId);
  return {
    subject,
    chapter: subject.chapters[index] || null,
    index,
  };
}

type ChapterContent = {
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  keyPoints: string[];
  activity: { question: string; hint: string };
};

const customContent: Record<string, ChapterContent> = {
  "mathematics:ch-3": {
    intro:
      "Multiplication helps us add the same number again and again, quickly. Instead of counting one by one, we can multiply to save time.",
    sections: [
      {
        heading: "What is Multiplication?",
        paragraphs: [
          "Multiplication is a fast way of adding equal groups. For example, 4 + 4 + 4 is the same as 3 groups of 4, which we write as 3 × 4.",
          'The answer to a multiplication is called the "product". In 3 × 4 = 12, the number 12 is the product.',
        ],
      },
      {
        heading: "Multiplying by Skip Counting",
        paragraphs: [
          "One easy way to multiply small numbers is skip counting. To find 5 × 3, count in 5s three times: 5, 10, 15.",
          "Try it yourself: skip count in 2s to find 2 × 6.",
        ],
      },
      {
        heading: "The Multiplication Table",
        paragraphs: [
          "Learning your times tables (1× to 10×) makes multiplication much faster. Practice a little every day and it becomes easy to remember.",
        ],
      },
    ],
    keyPoints: [
      "Multiplication is repeated addition of equal groups.",
      "The result of a multiplication is called the product.",
      "Skip counting is a helpful strategy for smaller numbers.",
      "Practicing times tables makes multiplication quick and easy.",
    ],
    activity: {
      question: "A box has 6 rows of apples with 4 apples in each row. How many apples are there in total?",
      hint: "Think of it as 6 groups of 4, or use skip counting in 4s six times.",
    },
  },
  "science:ch-2": {
    intro:
      "Our Solar System is made up of the Sun and everything that orbits it — eight planets, moons, comets and asteroids.",
    sections: [
      {
        heading: "The Sun: Our Star",
        paragraphs: [
          "The Sun is a giant ball of hot gases at the center of our Solar System. It gives us light and heat, and everything else orbits around it.",
        ],
      },
      {
        heading: "The Eight Planets",
        paragraphs: [
          "In order from the Sun, the planets are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.",
          "Mercury, Venus, Earth and Mars are rocky planets. Jupiter, Saturn, Uranus and Neptune are much bigger and made mostly of gas.",
        ],
      },
      {
        heading: "Earth, Our Home",
        paragraphs: [
          "Earth is the only planet we know of that has liquid water on its surface and supports life. It takes Earth 365 days to orbit the Sun once — that is one year!",
        ],
      },
    ],
    keyPoints: [
      "The Solar System has the Sun, 8 planets, moons, and other smaller bodies.",
      "Planets orbit the Sun in a fixed order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
      "Earth is special because it supports life.",
      "It takes Earth 365 days to complete one orbit around the Sun.",
    ],
    activity: {
      question: 'Can you name the planet that comes right after Earth as we move away from the Sun?',
      hint: 'It is known as the "Red Planet".',
    },
  },
};

export function getChapterContent(
  subjectId: string,
  chapterId: string,
  chapterTitle: string,
  subjectName: string
): ChapterContent {
  const key = `${subjectId}:${chapterId}`;
  if (customContent[key]) return customContent[key];

  return {
    intro: `In this chapter, you'll explore "${chapterTitle}" and see how it connects to everyday life in ${subjectName}.`,
    sections: [
      {
        heading: `Getting Started with ${chapterTitle}`,
        paragraphs: [
          `We'll break "${chapterTitle}" down into simple steps so it's easy to follow, with examples along the way.`,
          "Take your time, re-read any part that feels tricky, and try the activity at the end to check your understanding.",
        ],
      },
      {
        heading: "Why It Matters",
        paragraphs: [
          `Understanding "${chapterTitle.toLowerCase()}" builds a foundation for later, more advanced topics in ${subjectName}.`,
        ],
      },
    ],
    keyPoints: [
      `Understand what "${chapterTitle.toLowerCase()}" means.`,
      `See examples of "${chapterTitle.toLowerCase()}" in everyday life.`,
      "Practice with the short activity below.",
    ],
    activity: {
      question: `Can you think of one example of "${chapterTitle.toLowerCase()}" from your daily life?`,
      hint: "Think about school, home, or things you see outside.",
    },
  };
}
