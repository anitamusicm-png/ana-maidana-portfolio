import { useTranslations } from "next-intl";
import { entreDosOrillas } from "@/data/release";
import { SpotifyEmbed } from "@/components/audio/SpotifyEmbed";
import { FadeIn } from "@/components/animations/FadeIn";

export function Discography() {
  const t = useTranslations();

  return (
    <section
      id="ep"
      className="px-6 md:px-10 py-24 md:py-32 bg-deep-navy text-off-white scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn as="section">
          <p className="font-mono text-xs uppercase tracking-wider text-mid-blue mb-3">
            {t("ep.eyebrow")}
          </p>
          <h2 className="font-display font-bold uppercase text-4xl md:text-6xl">
            {t("ep.title")}
          </h2>
          <p className="mt-4 text-sm text-pale-haze max-w-xl">
            {t("descriptions.entreDosOrillas")}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-silver-haze">
            {t("ep.collaborators")}
          </p>
        </FadeIn>

        <ol className="mt-16 flex flex-col divide-y divide-off-white/10">
          {entreDosOrillas.tracks.map((track, i) => (
            <FadeIn key={track.slug} delay={i * 80} as="li" className="py-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <span className="font-mono text-xs text-silver-haze w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-display font-bold uppercase text-lg">{track.title}</h3>
                  {track.featuring && (
                    <p className="font-mono text-[11px] uppercase tracking-wider text-silver-haze mt-1">
                      ft. {track.featuring}
                    </p>
                  )}
                  <p className="text-sm text-pale-haze mt-2 max-w-md">
                    {t(`descriptions.${track.descriptionKey}`)}
                  </p>
                </div>
                <div className="w-full md:w-72 shrink-0">
                  <SpotifyEmbed spotifyId={track.spotifyId} label={track.title} />
                </div>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
