import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/data/animeData";
import { Button } from "@/components/ui/button";
import { Filter, Tag, Sparkles, Star, Search, SortDesc } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const genres = ["Hammasi", "Action", "Fantasy", "Comedy", "Drama", "Supernatural", "Sports"];
const sortOptions = [
  { label: "Mashhurlik", value: "popularity" },
  { label: "Baho", value: "rating" },
  { label: "Yili", value: "year" }
];

const Browse = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Hammasi");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  useScrollAnimation();

  // Qidiruv, filtr va sort logikasi
  const filteredAnime = useMemo(() => {
    let data = animeData;

    if (selectedGenre !== "Hammasi") {
      data = data.filter((a) => a.genres.includes(selectedGenre));
    }
    if (searchQuery.trim()) {
      data = data.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (sortBy) {
      case "popularity":
        data = [...data].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case "rating":
        data = [...data].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "year":
        data = [...data].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        break;
      default:
        break;
    }
    return data;
  }, [selectedGenre, searchQuery, sortBy]);

  // "Tanlanganlar"ni boshqarish
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen bg-background/95 motion-safe:animate-page-in">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-8">
          {/* Sarlavha */}
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-10 shadow-2xl backdrop-blur motion-safe:animate-scale-in">
            <span className="pointer-events-none absolute -inset-px rounded-[inherit] border border-white/10 opacity-40" />
            <div className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-anime-blue/30 to-transparent blur-3xl" />
            <div className="space-y-4 motion-safe:animate-slide-up" style={{ animationDelay: "0.12s" }}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
                <Sparkles className="h-4 w-4" />
                AniBro katalogi
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                ANI<span className="text-indigo-700">BRO</span>
              </h1>
              <p className="max-w-3xl text-sm md:text-base text-muted-foreground">
                To‘liq katalogdan foydalangan holda anime toping. Filtrlar panelini ochib, janr, kayfiyat yoki mashhurlik bo‘yicha tezda saralang.
              </p>
            </div>
          </div>
          {/* Filtrlar, qidiruv, sort */}
          <div className="flex flex-wrap items-center gap-3 motion-safe:animate-slide-up" style={{ animationDelay: "0.18s" }}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-full border border-gray-300/60 bg-background/60 px-5 py-2 text-sm uppercase tracking-wide transition hover:border-primary/60 hover:text-primary"
              onClick={() => setShowGenres(!showGenres)}
              aria-expanded={showGenres}
              aria-controls="genre-filter-group"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtr
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  value={searchQuery}
                  type="text"
                  className="pl-9 pr-3 py-2 rounded-full border bg-background/70 text-sm"
                  placeholder="Anime nomi bo'yicha..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={sortBy}
                className="py-2 px-3 rounded-full border text-sm bg-background/70 text-muted-foreground"
                onChange={e => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {showGenres && (
              <div id="genre-filter-group" className="flex flex-wrap items-center gap-2 rounded-2xl bg-card/70 p-4 shadow-inner">
                {genres.map((janr) => (
                  <Button
                    key={janr}
                    variant={selectedGenre === janr ? "default" : "outline"}
                    size="sm"
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      selectedGenre === janr
                        ? "border-primary bg-primary/15 text-primary shadow-lg shadow-primary/20"
                        : "border-gray-300/60 bg-background/70 text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                    onClick={() => setSelectedGenre(janr)}
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {janr}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {/* Anime grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {(selectedGenre === "Favorites"
              ? animeData.filter(a => favorites.includes(a.id))
              : filteredAnime
            ).map((anime, index) => (
              <div
                key={anime.id}
                className="transform transition duration-300 hover:scale-105 motion-safe:animate-slide-up"
                style={{ animationDelay: `${0.3 + index * 0.03}s`, animationFillMode: "both" }}
              >
                <AnimeCard anime={anime} />
                <Button
                  variant={favorites.includes(anime.id) ? "default" : "outline"}
                  size="icon"
                  className="mt-2 rounded-full"
                  aria-label="Favorite"
                  onClick={() => toggleFavorite(anime.id)}
                >
                  <Star className="h-4 w-4 text-yellow-500" fill={favorites.includes(anime.id) ? "yellow" : "none"} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;