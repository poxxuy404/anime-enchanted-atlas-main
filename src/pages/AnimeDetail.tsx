import { useCallback, useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { animeData } from "@/data/animeData";
import { useParams, Link } from "react-router-dom";
import {
  Play,
  Heart,
  Star,
  Calendar,
  Film,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react";
import { AnimeCard } from "@/components/AnimeCard";
import useFavorites from "@/hooks/use-favorites";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const EPISODES_STEP = 12;
const MAX_EPISODES_RENDER = 200; // cheklov: birdaniga juda ko'p DOM element yaratmaslik uchun
const TRUNCATE_AT = 180;

const AnimeDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const anime = useMemo(() => animeData.find((a) => a.id === Number(id)), [id]);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  // prefers-reduced-motion: SSR-safe detection and cleanup
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setPrefersReducedMotion(false);
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(Boolean(mq.matches));
    update();
    // modern API
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    // fallback
    if (typeof (mq as any).addListener === "function") {
      (mq as any).addListener(update);
      return () => (mq as any).removeListener(update);
    }
    return;
  }, []);

  // If anime not found — friendly fallback
  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Anime topilmadi 😔</h2>
          <p className="text-muted-foreground">
            Siz qidirgan anime mavjud emas yoki notoʻgʻri URL kiritilgan.
          </p>
          <Link to="/">
            <Button className="mt-2">Bosh sahifaga qaytish</Button>
          </Link>
        </div>
      </div>
    );
  }

  // xavfsizlik: genres har doim massiv bo'lsin
  const animeGenres = Array.isArray(anime.genres) ? anime.genres : [];

  // related anime (memoized va limitlangan)
  const relatedAnime = useMemo(() => {
    if (animeGenres.length === 0) return [];
    const genreSet = new Set(animeGenres);
    return animeData
      .filter(
        (a) =>
          a.id !== anime.id &&
          Array.isArray(a.genres) &&
          a.genres.some((g) => genreSet.has(g))
      )
      .slice(0, 6);
  }, [anime.id, animeGenres]);

  // umumiy epizodlar soni — kabi noto'g'ri qiymatlarni clamp qilamiz
  const totalEpisodes = useMemo(
    () =>
      clamp(
        Number.isFinite(Number(anime.episodes)) ? Number(anime.episodes) : 0,
        0,
        10000
      ),
    [anime.episodes]
  );

  // visible count boshida EPISODES_STEP, ammo anime o'zgarganda reset qilinadi
  const [visibleEpisodesCount, setVisibleEpisodesCount] = useState<number>(() =>
    Math.min(EPISODES_STEP, totalEpisodes, MAX_EPISODES_RENDER)
  );

  // Reset visibleEpisodesCount when anime (id/totalEpisodes) changes
  useEffect(() => {
    setVisibleEpisodesCount(Math.min(EPISODES_STEP, totalEpisodes, MAX_EPISODES_RENDER));
  }, [anime.id, totalEpisodes]);

  // displayedEpisodes kichik massiv yaratadi (faqat ko'rsatilayotgan son)
  const displayedEpisodes = useMemo(() => {
    const count = Math.min(visibleEpisodesCount, totalEpisodes, MAX_EPISODES_RENDER);
    const arr: number[] = new Array(count);
    for (let i = 0; i < count; i++) arr[i] = i + 1;
    return arr;
  }, [visibleEpisodesCount, totalEpisodes]);

  const canLoadMore =
    visibleEpisodesCount < Math.min(totalEpisodes, MAX_EPISODES_RENDER);

  // description qisqartirilgan versiyasi
  const truncatedDescription = useMemo(() => {
    if (!anime.description) return "";
    if (anime.description.length <= TRUNCATE_AT) return anime.description;
    return anime.description.slice(0, TRUNCATE_AT).trim() + "...";
  }, [anime.description]);

  const favorite = isFavorite(anime.id);

  // ulashish ishlovchisi: navigator.share -> clipboard -> xabar
  const onShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof (navigator as any).share === "function") {
        await (navigator as any).share({
          title: anime.title,
          text: `${anime.title} — AniBro`,
          url,
        });
        setShareStatus("Ulashildi");
      } else if (navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);
        setShareStatus("Havola nusxalandi");
      } else {
        setShareStatus("Ulashish imkoni yoʻq");
      }
    } catch {
      setShareStatus("Ulashishda xatolik");
    }
    // clear after short delay
    window.setTimeout(() => setShareStatus(null), 2500);
  }, [anime.title]);

  // Load more episodes incrementally (cheap — only increases visible count)
  const loadMoreEpisodes = useCallback(() => {
    setVisibleEpisodesCount((prev) =>
      Math.min(prev + EPISODES_STEP, totalEpisodes, MAX_EPISODES_RENDER)
    );
  }, [totalEpisodes]);

  return (
    <div className="relative min-h-screen bg-background/95">
      <Navbar />

      {/* Hero */}
      <div className="relative min-h-[56vh] md:h-[64vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={anime.coverImage}
            alt={`${anime.title} poster`}
            className="w-full h-full object-cover filter blur-sm"
            loading="lazy"
            decoding="async"
            // avoid JS-driven transforms for perf if user requests reduced motion
            style={{ transform: prefersReducedMotion ? "none" : undefined }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
            <div
              className="mx-auto flex-shrink-0 w-36 h-52 md:w-48 md:h-72 lg:w-64 lg:h-96 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-primary/10 md:mx-0"
              style={{ contain: "content" }}
            >
              <img
                src={anime.coverImage}
                alt={anime.title}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="flex-1 space-y-3 md:space-y-4">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold gradient-text text-center md:text-left">
                {anime.title}
              </h1>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-background/50 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-anime-orange" />
                  <span className="font-semibold">{anime.rating ?? "—"}</span>
                </div>
                <div className="flex items-center space-x-2 bg-background/50 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{anime.year ?? "—"}</span>
                </div>
                <div className="flex items-center space-x-2 bg-background/50 px-3 py-1.5 rounded-full">
                  <Film className="w-4 h-4 text-muted-foreground" />
                  <span>{anime.episodes ?? "—"} EP</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {animeGenres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-muted/80 px-3 py-1 text-xs md:text-sm uppercase"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="max-w-2xl mx-auto md:mx-0">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {isDescriptionExpanded ? anime.description : truncatedDescription}
                </p>
                {anime.description && anime.description.length > TRUNCATE_AT && (
                  <button
                    onClick={() => setIsDescriptionExpanded((s) => !s)}
                    className="mt-2 inline-flex items-center gap-2 text-primary text-sm hover:underline"
                    aria-expanded={isDescriptionExpanded}
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Kamroq ko'rsatish <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Toʻliq ko'rish <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 md:pt-4">
                <Link to={`/watch/${anime.id}/1`} className="flex-1 sm:flex-initial">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Play className="w-5 h-5 mr-2" />
                    Ko'rishni boshlash
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className={`w-full sm:w-auto border-border transition-all ${
                    favorite ? "bg-accent/10 border-accent text-accent" : ""
                  }`}
                  onClick={() => toggleFavorite(anime.id)}
                  aria-pressed={favorite}
                  aria-label={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${favorite ? "fill-accent text-accent" : ""}`}
                  />
                  {favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="sm:hidden w-full border-border"
                  onClick={onShare}
                  aria-label="Ulashish"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Ulashish
                </Button>
                {shareStatus && (
                  <div className="text-sm text-muted-foreground mt-1">{shareStatus}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <section className="container mx-auto px-4 py-8 md:py-16 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold">Epizodlar</h2>
          <span className="text-sm text-muted-foreground">{totalEpisodes} ta epizod</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
          {displayedEpisodes.map((ep) => (
            <Link key={ep} to={`/watch/${anime.id}/${ep}`}>
              <Button
                variant="outline"
                className="w-full h-12 md:h-16 border-border/70 bg-background/60 text-xs font-semibold uppercase tracking-wide hover:border-primary hover:bg-primary hover:text-primary-foreground"
                aria-label={`Epizod ${ep} ga oʻtish`}
              >
                {ep}
              </Button>
            </Link>
          ))}
        </div>

        {canLoadMore && (
          <div className="pt-3 flex items-center gap-3">
            <Button variant="ghost" onClick={loadMoreEpisodes}>
              Yana ko'rsatish
            </Button>
            <span className="text-sm text-muted-foreground">
              {displayedEpisodes.length} / {Math.min(totalEpisodes, MAX_EPISODES_RENDER)} ko'rsatildi
            </span>
          </div>
        )}

        {/* If more episodes exist but capped, provide navigation to full list */}
        {totalEpisodes > MAX_EPISODES_RENDER && (
          <div className="pt-2">
            <Link to={`/watch/${anime.id}`}>
              <Button variant="link" className="text-sm">
                Barcha epizodlarni ko'rish
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Related */}
      {relatedAnime.length > 0 && (
        <section className="container mx-auto px-4 py-8 md:py-16 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold">O'xshash anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
            {relatedAnime.map((r) => (
              <AnimeCard key={r.id} anime={r} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-3 md:hidden z-50">
        <div className="flex gap-2">
          <Link to={`/watch/${anime.id}/1`} className="flex-1">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Play className="w-5 h-5 mr-2" />
              Tomosha qilish
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => toggleFavorite(anime.id)}
            className={`${favorite ? "bg-accent/10 border-accent text-accent" : ""}`}
            aria-label={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          >
            <Heart className={`w-5 h-5 ${favorite ? "fill-accent text-accent" : ""}`} />
          </Button>
          <Button size="lg" variant="outline" onClick={onShare}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="h-20 md:hidden" />
    </div>
  );
};

export default AnimeDetail;