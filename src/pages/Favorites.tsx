import { Navbar } from "@/components/Navbar";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/data/animeData";
import { useFavorites } from "@/hooks/use-favorites";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites } = useFavorites();
  useScrollAnimation();

  const favoriteAnime = animeData.filter((anime) => favorites.includes(anime.id));

  return (
    <div className="relative min-h-screen bg-background/95 motion-safe:animate-page-in">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <div
            className="text-center space-y-3 motion-safe:animate-slide-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text motion-safe:animate-fade-in flex items-center justify-center gap-3">
              <Heart className="w-10 h-10 md:w-12 md:h-12 fill-accent text-accent motion-safe:animate-bounce-in" />
              Sevimlilar
            </h1>
            <p className="text-muted-foreground text-lg motion-safe:animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              {favoriteAnime.length > 0
                ? `${favoriteAnime.length} ta sevimli anime`
                : "Hozircha sevimli animelar yo'q"}
            </p>
          </div>

          {/* Favorites Grid */}
          {favoriteAnime.length === 0 ? (
            <div
              className="text-center py-20 motion-safe:animate-fade-in"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <Heart className="w-20 h-20 mx-auto mb-4 text-muted-foreground/30" />
              <h2 className="text-2xl font-bold text-muted-foreground mb-2">
                Sevimli animelar yo'q
              </h2>
              <p className="text-muted-foreground">
                Sevimli animelaringizni qo'shish uchun anime sahifasiga o'ting va yurakcha ustigini bosib qo'shing
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {favoriteAnime.map((anime, index) => (
                <div
                  key={anime.id}
                  className="motion-safe:animate-card-pop"
                  style={{ animationDelay: `${0.3 + index * 0.05}s`, animationFillMode: "both" }}
                >
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;

