import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/data/animeData";
import { Search, Sparkles, ListFilter, Tag } from "lucide-react";

const Home = () => {
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Memoized filtered data
  const filteredAnime = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return animeData.filter((anime) => {
      const title = anime.title?.toLowerCase() ?? "";
      const desc = anime.description?.toLowerCase() ?? "";

      // match when query is empty OR title/description contains query
      const matchesSearch = q === "" || title.includes(q) || desc.includes(q);

      const matchesGenre = selectedGenre === "All" || (anime.genres || []).includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const featuredAnime = useMemo(() => filteredAnime.filter((a) => a.featured), [filteredAnime]);
  const trendingAnime = useMemo(() => filteredAnime.filter((a) => a.trending), [filteredAnime]);

  // Extract unique genres from anime data (stable list)
  const genres = useMemo(() => {
    const allGenres = animeData.flatMap((anime) => anime.genres || []);
    const unique = Array.from(new Set(allGenres));
    unique.sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, []);

  return (
    <div className="relative min-h-screen bg-background/90">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 py-10 space-y-6">
        <header className="flex flex-col gap-3 text-center md:text-left">
          <span className="inline-flex items-center justify-center md:justify-start gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-4 w-4" />
            Anime qidiruvi
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Sevimli animeingizni toping va yangi janrlarni kashf qiling
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl md:leading-relaxed md:text-left mx-auto md:mx-0">
            Qidiruvdan foydalanib nom yoki ta’rif bo'yicha toping, yoki quyidagi janr yorliqlaridan birini tanlab tavsiya etilgan kontentni ko'ring.
          </p>
        </header>

        <div className="relative flex flex-col gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-2xl backdrop-blur md:flex-row md:items-center md:justify-between">
          {/* Subtle static decorative background (non-animated) */}
          <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-r from-anime-purple/10 via-transparent to-anime-blue/10 opacity-40 blur-xl" />

          {/* Search Input */}
          <div className="relative w-full md:max-w-lg">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Masalan, One Piece, Haikyuu yoki Shounen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-border/60 bg-background/90 py-4 pl-12 pr-4 text-base shadow-sm transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              aria-label="Anime qidirish"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedGenre === genre
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
                type="button"
              >
                {genre === "All" ? <ListFilter className="h-4 w-4" /> : <Tag className="h-3.5 w-3.5" />}
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Anime */}
      <section className="container mx-auto px-4 py-16 space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold gradient-text">Tanlangan Anime</h2>
          {featuredAnime.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {featuredAnime.length} ta anime topildi
            </span>
          )}
        </div>

        {featuredAnime.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Hech qanday anime topilmadi 😔</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
              }}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Filterni tozalash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {featuredAnime.map((anime, index) => (
              <div key={anime.id}>
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending Anime */}
      <section className="container mx-auto px-4 py-16 space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold gradient-text">Mashhur Anime</h2>
          {trendingAnime.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {trendingAnime.length} ta anime topildi
            </span>
          )}
        </div>

        {trendingAnime.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Hech qanday anime topilmadi 😔</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
              }}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Filterni tozalash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {trendingAnime.map((anime, index) => (
              <div key={anime.id}>
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer (static decorative element) */}
      <footer className="relative border-t border-border/80 mt-20 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-40 w-[110%] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-anime-blue/10 to-transparent blur-2xl opacity-40" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="text-center text-muted-foreground">
            <p className="text-2xl font-bold gradient-text mb-2">AniBro</p>
            <p className="text-sm">© 2024 AniBro. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;