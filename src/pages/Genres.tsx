import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Genres = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  const genres = [
    { name: "Action", icon: "⚔️", count: 145, color: "from-red-500 to-orange-500" },
    { name: "Adventure", icon: "🗺️", count: 98, color: "from-amber-500 to-yellow-500" },
    { name: "Comedy", icon: "😂", count: 87, color: "from-lime-400 to-green-500" },
    { name: "Drama", icon: "🎭", count: 112, color: "from-pink-500 to-rose-500" },
    { name: "Fantasy", icon: "🧙‍♂️", count: 134, color: "from-indigo-500 to-purple-500" },
    { name: "Horror", icon: "👻", count: 45, color: "from-gray-700 to-black" },
    { name: "Mystery", icon: "🔍", count: 67, color: "from-blue-500 to-indigo-600" },
    { name: "Romance", icon: "💕", count: 89, color: "from-rose-400 to-pink-500" },
    { name: "Sci-Fi", icon: "🚀", count: 76, color: "from-cyan-400 to-blue-500" },
    { name: "Shounen", icon: "⚡", count: 156, color: "from-yellow-400 to-orange-500" },
    { name: "Slice of Life", icon: "☕", count: 54, color: "from-teal-400 to-emerald-500" },
    { name: "Sports", icon: "⚽", count: 43, color: "from-green-400 to-lime-500" },
    { name: "Supernatural", icon: "🔮", count: 91, color: "from-purple-500 to-violet-600" },
    { name: "Thriller", icon: "😱", count: 58, color: "from-red-600 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background motion-safe:animate-page-in">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-10">
          {/* Header */}
          <div
            className="text-center space-y-3 motion-safe:animate-slide-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text motion-safe:animate-fade-in">
              🌀 Janrlar
            </h1>
            <p className="text-muted-foreground text-lg motion-safe:animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              Siz yoqtirgan anime turini tanlang 🎬
            </p>
          </div>

          {/* Genres Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {genres.map((genre, index) => (
              <div
                key={genre.name}
                className="motion-safe:animate-card-pop"
                style={{ animationDelay: `${0.3 + index * 0.05}s`, animationFillMode: "both" }}
              >
                <Link to={`/browse?genre=${genre.name}`}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer hover:scale-105`}
                  >
                    <div className="p-6 flex flex-col items-center text-center space-y-4">
                      {/* Ikon */}
                      <div
                        className={`text-4xl p-4 rounded-full bg-gradient-to-br ${genre.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300 motion-safe:animate-bounce-in`}
                        style={{ animationDelay: `${0.4 + index * 0.05}s`, animationFillMode: "both" }}
                      >
                        {genre.icon}
                      </div>

                      {/* Nomi */}
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {genre.name}
                      </h3>

                      {/* Anime soni */}
                      <p className="text-xs text-muted-foreground">
                        {genre.count} ta anime
                      </p>
                    </div>

                    {/* Hover fon effekti */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${genre.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genres;
