import { Anime } from "@/data/animeData";
import { Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImFire } from "react-icons/im";
interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link to={`/anime/${anime.id}`}>
      <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/80 transition-all duration-300 hover:scale-105 hover-glow animate-on-scroll">
        {/* Image */}
        <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 mr-2" />
                Ko'rish
              </Button>
            </div>
          </div>

          {/* Trending Badge */}
          {anime.trending && (
           <div className="absolute top-2 right-2 bg-accent px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 motion-safe:animate-bounce-in">
    <ImFire />
    Mashhur
  </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-anime-orange text-anime-orange transition-transform group-hover:scale-110" />
              <span className="font-medium">{anime.rating}</span>
            </div>
            <span>{anime.episodes} EP</span>
            <span>{anime.year}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs px-2 py-0.5 bg-muted rounded-full transition-all group-hover:bg-primary/20"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
