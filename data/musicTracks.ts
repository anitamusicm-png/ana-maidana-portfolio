import type { MusicTrack } from "@/types";

export const musicTracks: MusicTrack[] = [
  {
    slug: "origen",
    title: "Origen",
    artist: "Romario",
    roleKey: "recordingMixingMastering",
    styleKey: "latinJazz",
    source: { type: "file", url: "/audio/music/origen.mp3" },
  },
  {
    slug: "a-sky-full-of-stars",
    title: "A Sky Full of Stars",
    artist: "Orquesta Juvenil de la ciudad de Encarnación",
    roleKey: "mixingEngineer",
    styleKey: "pop",
    source: { type: "file", url: "/audio/music/a-sky-full-of-stars.mp3" },
  },
  {
    slug: "amores-que-se-rompen-track",
    title: "Amores que se rompen",
    artist: "Liz Martinez",
    roleKey: "recordingMixingEngineer",
    styleKey: "folklore",
    source: { type: "file", url: "/audio/music/amores-que-se-rompen.mp3" },
  },
  {
    slug: "can-you-see-me",
    title: "Can You See Me?",
    artist: "Tricia",
    roleKey: "mixingEngineer",
    styleKey: "pop",
    source: { type: "file", url: "/audio/music/can-you-see-me.mp3" },
  },
];
