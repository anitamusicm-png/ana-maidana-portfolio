export type ProjectCategory =
  | "production"
  | "mixing"
  | "sound-design"
  | "post-production"
  | "recording"
  | "composition";

export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: number;
  categories: ProjectCategory[];
  descriptionKey: string;
  heroLabel: string;
  audioPreview?: string;
  audioBeforeAfter?: { before: string; after: string };
  credits: Credit[];
  featured: boolean;
  order: number;
  screenings?: string[];
}

export interface Track {
  slug: string;
  title: string;
  duration?: string;
  featuring?: string;
  audioPreview?: string;
  descriptionKey: string;
}

export interface Release {
  slug: string;
  title: string;
  type: "EP" | "single" | "album";
  year: number;
  tracks: Track[];
  descriptionKey: string;
  streamingLinks: { platform: string; url: string }[];
}
