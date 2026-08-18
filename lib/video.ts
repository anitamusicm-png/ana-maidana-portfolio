export interface VideoEmbed {
  provider: "youtube" | "vimeo";
  embedUrl: string;
  thumbnailUrl?: string;
}

export function parseVideoUrl(url: string): VideoEmbed | null {
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (youtube) {
    const id = youtube[1];
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}`,
    };
  }

  return null;
}
