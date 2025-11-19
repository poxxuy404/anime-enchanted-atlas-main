import Navbar from "@/components/Navbar"; // default export deb olindi
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Genres = () => {
  useScrollAnimation();
  const { t } = useTranslation();

  const genres = [
    { name: "Action", short: "A", count: 145, color: "from-red-500 to-orange-500" },
    { name: "Adventure", short: "Ad", count: 98, color: "from-amber-500 to-yellow-500" },
    { name: "Comedy", short: "C", count: 87, color: "from-lime-400 to-green-500" },
    { name: "Drama", short: "D", count: 112, color: "from-pink-500 to-rose-500" },
    { name: "Fantasy", short: "F", count: 134, color: "from-indigo-500 to-purple-500" },
    { name: "Horror", short: "H", count: 45, color: "from-gray-700 to-black" },
    { name: "Mystery", short: "M", count: 67, color: "from-blue-500 to-indigo-600" },
    { name: "Romance", short: "R", count: 89, color: "from-rose-400 to-pink-500" },
    { name: "Sci-Fi", short: "S", count: 76, color: "from-cyan-400 to-blue-500" },
    { name: "Shounen", short: "Sh", count: 156, color: "from-yellow-400 to-orange-500" },
    { name: "Slice of Life", short: "SoL", count: 54, color: "from-teal-400 to-emerald-500" },
    { name: "Sports", short: "Sp", count: 43, color: "from-green-400 to-lime-500" },
    { name: "Supernatural", short: "Su", count: 91, color: "from-purple-500 to-violet-600" },
    { name: "Thriller", short: "T", count: 58, color: "from-red-600 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {t("genres.title", "Janrlar")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("genres.subtitle", "Siz yoqtirgan anime turini tanlang")}
            </p>
          </div>

          {/* Genres Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
            {genres.map((genre, index) => (
              <Link key={genre.name} to={`/browse?genre=${genre.name}`}>
                <div className="relative overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-900/70 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="p-6 flex flex-col items-center text-center space-y-4">
                    <div
                      className={`text-lg font-bold w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${genre.color} text-white shadow-md`}
                    >
                      {genre.short}
                    </div>

                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {t(`genres.${genre.name}`, genre.name)}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {genre.count} {t("genres.countSuffix", "ta anime")}
                    </p>
                  </div>

                  {/* Hover background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${genre.color} opacity-0 hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genres;
