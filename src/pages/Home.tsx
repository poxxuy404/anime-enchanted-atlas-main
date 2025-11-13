import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/data/animeData";
import { Search, Sparkles, ListFilter, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const GENRES = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Shounen",
  "Slice of Life",
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // simple debounce for search input to avoid filtering on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Memoized filtered data — search checks title and description
  const filteredAnime = useMemo(() => {
    const q = debouncedQuery;
    return animeData.filter((anime) => {
      const title = (anime.title || "").toLowerCase();
      const desc = (anime.description || "").toLowerCase();

      const matchesSearch = q === "" || title.includes(q) || desc.includes(q);
      const matchesGenre = selectedGenre === "All" || (anime.genres || []).includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [debouncedQuery, selectedGenre]);

  const featuredAnime = useMemo(() => filteredAnime.filter((a) => a.featured), [filteredAnime]);
  const trendingAnime = useMemo(() => filteredAnime.filter((a) => a.trending), [filteredAnime]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
  };

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
            Qidiruvdan foydalanib nom yoki ta’rif bo'yicha toping, yoki quyidagi asosiy janrlar bo'yicha filtrlash qiling.
          </p>
        </header>

        <div className="relative flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-6 shadow-md md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="Masalan, One Piece, Haikyuu yoki Shounen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border/60 bg-background/90 py-3 pl-11 pr-4 text-base shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Anime qidirish"
            />
          </div>

          {/* Genre Filter (reduced list) */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedGenre === genre
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
                type="button"
                aria-pressed={selectedGenre === genre}
              >
                {genre === "All" ? <ListFilter className="h-4 w-4" /> : <Tag className="h-3.5 w-3.5" />}
                {genre}
              </button>
            ))}

            {/* Clear filters */}
            <button
              onClick={clearFilters}
              className="ml-2 text-sm text-muted-foreground hover:text-primary underline"
              type="button"
            >
              Filterni tozalash
            </button>
          </div>
        </div>
      </section>

      {/* Featured Anime */}
      <section className="container mx-auto px-4 py-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Ko'p ko'rilgan anime</h2>
          {featuredAnime.length > 0 && <span className="text-sm text-muted-foreground">{featuredAnime.length} ta anime</span>}
        </div>

        {featuredAnime.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Hech qanday tanlangan anime topilmadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {featuredAnime.map((anime) => (
              <div key={anime.id}>
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending Anime */}
      <section className="container mx-auto px-4 py-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Mashhur anime</h2>
          {trendingAnime.length > 0 && <span className="text-sm text-muted-foreground">{trendingAnime.length} ta anime</span>}
        </div>

        {trendingAnime.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Hech qanday mashhur anime topilmadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {trendingAnime.map((anime) => (
              <div key={anime.id}>
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/80 mt-16">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="text-center text-muted-foreground">
            <p className="text-2xl font-bold gradient-text mb-2">AniBro</p>
            <p className="text-sm">© {new Date().getFullYear()} AniBro. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;