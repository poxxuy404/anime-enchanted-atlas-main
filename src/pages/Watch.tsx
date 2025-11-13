import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { animeData } from "@/data/animeData";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Watch = () => {
  const { id, episode } = useParams();
  const anime = animeData.find((a) => a.id === Number(id));
  const currentEpisode = Number(episode);

  if (!anime) {
    return <div>Anime topilmadi</div>;
  }

  const hasNextEpisode = currentEpisode < anime.episodes;
  const hasPrevEpisode = currentEpisode > 1;
  
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background motion-safe:animate-page-in">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 space-y-6">
          
          {/* Video Player */}
          <div 
            className="relative aspect-video bg-black rounded-lg overflow-hidden motion-safe:animate-fade-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 motion-safe:animate-scale-in">
                <div className="text-6xl motion-safe:animate-bounce-in"><BiSolidCameraMovie /></div>
                <p className="text-muted-foreground motion-safe:animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>Video Player</p>
                <p className="text-sm text-muted-foreground motion-safe:animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
                  Video player integratsiyasi qo'shiladi
                </p>
              </div>
            </div>
          </div>

          {/* Episode Info */}
          <div 
            className="space-y-4 motion-safe:animate-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <div className="motion-safe:animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              <Link to={`/anime/${anime.id}`} className="text-muted-foreground hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Ortga qaytish
              </Link>
            </div>
            
            <div className="motion-safe:animate-slide-up" style={{ animationDelay: "0.35s", animationFillMode: "both" }}>
              <h1 className="text-3xl font-bold gradient-text">{anime.title}</h1>
              <p className="text-muted-foreground">Epizod {currentEpisode}</p>
            </div>

            {/* Episode Navigation */}
            <div 
              className="flex items-center justify-between motion-safe:animate-slide-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <Link to={hasPrevEpisode ? `/watch/${anime.id}/${currentEpisode - 1}` : "#"}>
                <Button
                  variant="outline"
                  disabled={!hasPrevEpisode}
                  className="border-border transition-all hover:scale-105 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Oldingi epizod
                </Button>
              </Link>

              <div className="text-sm text-muted-foreground font-medium">
                {currentEpisode} / {anime.episodes}
              </div>

              <Link to={hasNextEpisode ? `/watch/${anime.id}/${currentEpisode + 1}` : "#"}>
                <Button
                  variant="outline"
                  disabled={!hasNextEpisode}
                  className="border-border transition-all hover:scale-105 disabled:opacity-50"
                >
                  Keyingi epizod
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Episode List */}
          <div 
            className="space-y-4 motion-safe:animate-slide-up"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <h2 className="text-xl font-bold gradient-text">Barcha epizodlar</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
              {Array.from({ length: anime.episodes }, (_, i) => i + 1).map((ep, index) => (
                <Link 
                  key={ep} 
                  to={`/watch/${anime.id}/${ep}`}
                  className="motion-safe:animate-card-pop"
                  style={{ animationDelay: `${0.55 + index * 0.02}s`, animationFillMode: "both" }}
                >
                  <Button
                    variant={ep === currentEpisode ? "default" : "outline"}
                    className="w-full border-border transition-all hover:scale-105"
                  >
                    {ep}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Description */}
          <div 
            className="space-y-2 motion-safe:animate-fade-in"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <h2 className="text-xl font-bold gradient-text">Tavsif</h2>
            <p className="text-muted-foreground leading-relaxed">{anime.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
