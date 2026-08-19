import type { MusicTrack } from "@/types";

export const musicTracks: MusicTrack[] = [
  {
    slug: "origen",
    title: "Origen",
    artist: "Romario",
    roleKey: "recordingMixingMastering",
    styleKey: "latinJazz",
    source: { type: "file", url: "/audio/romario_after.mp3" },
    beforeAfter: { before: "/audio/romario_before.mp3", after: "/audio/romario_after.mp3" },
    quoteKey: "origen",
  },
  {
    slug: "a-sky-full-of-stars",
    title: "A Sky Full of Stars",
    artist: "Orquesta Juvenil de la ciudad de Encarnación",
    roleKey: "mixingEngineer",
    styleKey: "pop",
    source: { type: "file", url: "/audio/uni_coldplay_after.mp3" },
    beforeAfter: { before: "/audio/uni_coldplay_before.mp3", after: "/audio/uni_coldplay_after.mp3" },
    quoteKey: "aSkyFullOfStars",
  },
  {
    slug: "amores-que-se-rompen-track",
    title: "Amores que se rompen",
    artist: "Liz Martinez",
    roleKey: "recordingMixingEngineer",
    styleKey: "folklore",
    source: { type: "file", url: "/audio/liz_after.mp3" },
    beforeAfter: { before: "/audio/liz_before.mp3", after: "/audio/liz_after.mp3" },
    quoteKey: "amoresQueSeRompen",
  },
];
