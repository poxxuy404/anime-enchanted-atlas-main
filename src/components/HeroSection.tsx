import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { ImFire } from "react-icons/im";
import { RiStarSFill } from "react-icons/ri";

export const HeroSection = () => {
  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop"
          alt="Featured Anime"
          className="h-full w-full object-cover object-center motion-safe:animate-image-reveal"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto flex h-full items-center px-4">
        <div
          className="max-w-2xl space-y-6 motion-safe:animate-slide-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-5 py-2 backdrop-blur motion-safe:animate-slide-up"
            style={{ animationDelay: "0.16s", animationFillMode: "both" }}
          >
            <span className="text-sm inline-flex items-center font-medium text-primary tracking-wider uppercase">
              <ImFire className="mr-2" />
              Eng mashhur
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg motion-safe:animate-slide-up"
            style={{ animationDelay: "0.22s", animationFillMode: "both" }}
          >
            <span className="gradient-text">Demon Slayer:</span>
            <br />
            Kimetsu no Yaiba
          </h1>

          {/* Description */}
          <p
            className="max-w-xl text-lg text-muted-foreground motion-safe:animate-slide-up"
            style={{ animationDelay: "0.28s", animationFillMode: "both" }}
          >
            Oilasi qatl etilgan va singlisi jinga aylantirilganidan keyin, yosh bola jin qotili bo'ladi. U singliga inson qiyofasini qaytarish va oilasi qotillaridan qasos olish uchun sayohat qiladi.
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm motion-safe:animate-slide-up"
            style={{ animationDelay: "0.34s", animationFillMode: "both" }}
          >
            <div className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-anime-orange font-bold shadow-lg shadow-anime-orange/10">
              <RiStarSFill />
              9.2
            </div>

            <div className="rounded-full bg-background/70 px-3 py-1.5">26 Epizod</div>
            <div className="rounded-full bg-background/70 px-3 py-1.5">2023</div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-muted/80 px-3 py-1 text-xs uppercase tracking-wide">Action</span>
              <span className="rounded-full bg-muted/80 px-3 py-1 text-xs uppercase tracking-wide">Fantasy</span>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-center motion-safe:animate-slide-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <Link to="/anime/1" className="group relative">
              <Button
                size="lg"
                className="relative w-full bg-primary px-8 py-6 text-base shadow-xl shadow-primary/25 transition hover:shadow-2xl hover:shadow-primary/35 motion-safe:animate-glow-pulse"
              >
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Play className="mr-2 h-5 w-5" />
                Hozir ko'rish
              </Button>
            </Link>
            <Link to="/anime/1">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-border/60 bg-background/60 px-8 py-6 text-base backdrop-blur transition hover:bg-muted/80"
              >
                <Info className="mr-2 h-5 w-5" />
                Batafsil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
