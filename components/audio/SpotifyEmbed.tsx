interface SpotifyEmbedProps {
  spotifyId?: string;
  label: string;
}

export function SpotifyEmbed({ spotifyId, label }: SpotifyEmbedProps) {
  if (!spotifyId) {
    return <span className="font-mono text-xs uppercase tracking-wider opacity-40">Preview soon</span>;
  }

  return (
    <iframe
      title={`${label} — Spotify`}
      style={{ borderRadius: 12 }}
      src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}
