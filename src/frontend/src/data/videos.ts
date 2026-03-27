export type VideoCategory =
  | "All"
  | "Motivational"
  | "Facts"
  | "Earning"
  | "Technology"
  | "Lifestyle";

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: Exclude<VideoCategory, "All">;
  duration: string;
  views: string;
  thumbnail?: string;
  featured?: boolean;
}

export const CATEGORIES: VideoCategory[] = [
  "All",
  "Motivational",
  "Facts",
  "Earning",
  "Technology",
  "Lifestyle",
];

export const videos: Video[] = [
  {
    id: "1",
    youtubeId: "ZXsQAXx_ao0",
    title: "Arnold Schwarzenegger's Greatest Motivational Speech",
    description:
      "The legendary bodybuilder, actor, and governor shares his six rules for success. A life-changing speech that will push you beyond your limits.",
    category: "Motivational",
    duration: "10:09",
    views: "14.2M",
    featured: true,
  },
  {
    id: "2",
    youtubeId: "mgmVOuLgFB0",
    title: "The Power of Your Mind — Reprogram for Success",
    description:
      "Discover how to rewire your mindset, eliminate self-doubt, and unlock the unstoppable version of yourself. Backed by neuroscience.",
    category: "Motivational",
    duration: "8:45",
    views: "9.8M",
    featured: true,
  },
  {
    id: "3",
    youtubeId: "Kg1b9cWgKxA",
    title: "50 Amazing Facts You Won't Believe Are Real",
    description:
      "Mind-bending facts about the universe, human body, animals, and technology that will leave you speechless and craving more knowledge.",
    category: "Facts",
    duration: "12:34",
    views: "22.1M",
    featured: true,
  },
  {
    id: "4",
    youtubeId: "aircAruvnKk",
    title: "The Science of Black Holes Explained Simply",
    description:
      "Journey into the most mysterious objects in the universe. From event horizons to spaghettification — explained in a way anyone can understand.",
    category: "Facts",
    duration: "15:21",
    views: "31.5M",
    featured: true,
  },
  {
    id: "5",
    youtubeId: "mEAkKnQfNDA",
    title: "How to Make $10,000 Per Month with AI Tools",
    description:
      "Real strategies for building passive income streams using AI automation. Step-by-step guide from zero to consistent monthly earnings.",
    category: "Earning",
    duration: "18:07",
    views: "5.4M",
  },
  {
    id: "6",
    youtubeId: "5MgBikgcWnY",
    title: "Top 7 Side Hustles to Start in 2025 (AI-Powered)",
    description:
      "From AI content creation to digital product sales — discover the most profitable side hustles you can start today with minimal investment.",
    category: "Earning",
    duration: "22:15",
    views: "8.7M",
  },
  {
    id: "7",
    youtubeId: "dQw4w9WgXcQ",
    title: "Never Give Up — The Anthem of Champions",
    description:
      "When the going gets tough, this is the one video you need to watch. An timeless reminder that persistence beats talent every time.",
    category: "Motivational",
    duration: "3:32",
    views: "1.4B",
  },
];
