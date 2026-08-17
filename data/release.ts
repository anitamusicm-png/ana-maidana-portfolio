import type { Release } from "@/types";

export const entreDosOrillas: Release = {
  slug: "entre-dos-orillas",
  title: "Entre dos orillas",
  type: "EP",
  year: 2026,
  descriptionKey: "entreDosOrillas",
  tracks: [
    {
      slug: "movimiento",
      title: "Movimiento",
      descriptionKey: "movimiento",
    },
    {
      slug: "abu-dhabi",
      title: "Abu Dhabi",
      featuring: "Rebeca Sanabria — Paraguayan harp",
      descriptionKey: "abuDhabiTrack",
    },
    {
      slug: "polka-arabia",
      title: "Polka Arabia",
      descriptionKey: "polkaArabia",
    },
    {
      slug: "desierto-del-sahara",
      title: "Desierto del Sahara",
      featuring: "Amr Wahid — Egyptian oud",
      descriptionKey: "desiertoDelSahara",
    },
  ],
  streamingLinks: [],
};
