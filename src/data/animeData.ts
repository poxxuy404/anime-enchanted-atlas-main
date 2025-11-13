export interface Anime {
  popularity: number;
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  episodes: number;
  genres: string[];
  year: number;
  description: string;
  featured?: boolean;
  trending?: boolean;
}

export const animeData: Anime[] = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1200&fit=crop",
    rating: 9.2,
    episodes: 26,
    genres: ["Action", "Fantasy", "Shounen"],
    year: 2019,
    description: "A young boy becomes a demon slayer after his family is slaughtered and his sister turned into a demon.",
    featured: true,
    trending: true,
    popularity: 0
  },
  {
    id: 2,
    title: "Attack on Titan",
    coverImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&h=1200&fit=crop",
    rating: 9.1,
    episodes: 75,
    genres: ["Action", "Dark Fantasy", "Drama"],
    popularity: 0,
    year: 2013,
    description: "Humanity lives behind walls protecting them from giant humanoid Titans that devour humans.",
    trending: true,
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    coverImage: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=1200&fit=crop",
    rating: 8.9,
    episodes: 24,
    genres: ["Action", "Supernatural", "Shounen"],
    year: 2020,
    description: "A high school student joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse.",
    trending: true,
    popularity: 0
  },
  {
    id: 4,
    title: "My Hero Academia",
    coverImage: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1200&fit=crop",
    rating: 8.7,
    episodes: 113,
    genres: ["Action", "Superhero", "Shounen"],
    year: 2016,
    description: "A boy born without superpowers in a superhero society receives an opportunity to become a hero.",
    featured: true,
    popularity: 0
  },
  {
    id: 5,
    title: "Spy x Family",
    coverImage: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&h=1200&fit=crop",
    rating: 8.8,
    episodes: 25,
    genres: ["Comedy", "Action", "Slice of Life"],
    popularity: 0,
    year: 2022,
    description: "A spy must create a fake family to execute a mission, not knowing his fake wife is an assassin.",
  },
  {
    id: 6,
    title: "One Piece",
    coverImage: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&h=1200&fit=crop",
    rating: 9.0,
    episodes: 1050,
    genres: ["Adventure", "Fantasy", "Shounen"],
    year: 1999,
    popularity: 0,
    description: "Monkey D. Luffy and his pirate crew explore the ocean in search of the ultimate treasure, One Piece.",
    featured: true,
  },
  {
    id: 7,
    title: "Chainsaw Man",
    coverImage: "https://images.unsplash.com/photo-1611707227023-ea6a5bc20627?w=800&h=1200&fit=crop",
    rating: 8.6,
    episodes: 12,
    popularity: 0,
    genres: ["Action", "Dark Fantasy", "Horror"],
    year: 2022,
    description: "A young man merges with his pet chainsaw devil and becomes a devil hunter.",
  },
  {
    id: 8,
    title: "Frieren: Beyond Journey's End",
    coverImage: "https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&h=1200&fit=crop",
    rating: 9.3,
    episodes: 28,
    genres: ["Fantasy", "Adventure", "Drama"],
    year: 2023,
    description: "An elf mage embarks on a new journey to understand humanity after her party's adventure ends.",
    popularity: 0
  },
  {
    id: 9,
    title: "Tokyo Revengers",
    coverImage: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1200&fit=crop",
    rating: 8.4,
    episodes: 24,
    genres: ["Action", "Drama", "Supernatural"],
    year: 2021,
     popularity: 0,

    description: "A young man travels back in time to save his girlfriend from a tragic fate.",
  },
  {
    id: 10,
    title: "Vinland Saga",
    coverImage: "https://images.unsplash.com/photo-1611438402201-e216d46d43c8?w=800&h=1200&fit=crop",
    rating: 8.9,
    episodes: 24,
    genres: ["Action", "Historical", "Adventure"],
    year: 2019,
     popularity: 0,

    description: "A young Viking warrior seeks revenge for his father's death during medieval times.",
  },
  {
    id: 11,
    title: "Haikyuu!!",
    coverImage: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800&h=1200&fit=crop",
    rating: 8.8,
     popularity: 0,

    episodes: 85,
    genres: ["Sports", "Comedy", "Drama"],
    year: 2014,
    description: "A short but determined boy joins his school's volleyball team despite his height disadvantage.",
  },
  {
    id: 12,
    title: "Bleach: Thousand-Year Blood War",
    coverImage: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1200&fit=crop",
    rating: 8.7,
    episodes: 26,
     popularity: 0,

    genres: ["Action", "Supernatural", "Shounen"],
    year: 2022,
    description: "Soul Reapers face their most powerful enemy yet in the final arc of Bleach.",
  },
  {
    id: 13,
    title: "Fullmetal Alchemist: Brotherhood",
    coverImage: "https://images.unsplash.com/photo-1582719478250-2f29b4f0d7d0?w=800&h=1200&fit=crop",
    rating: 9.2,
    episodes: 64,
    genres: ["Action", "Adventure", "Drama"],
    year: 2009,
     popularity: 0,

    description: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed transmutation.",
    featured: true,
  },
  {
    id: 14,
    title: "Naruto: Shippuden",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=1200&fit=crop",
    rating: 8.3,
    episodes: 500,
    genres: ["Action", "Adventure", "Shounen"],
    year: 2007,
     popularity: 0,

    description: "Naruto and his friends face increasingly powerful threats as they protect their village and pursue their dreams.",
  },
  {
    id: 15,
    title: "Steins;Gate",
    coverImage: "https://images.unsplash.com/photo-1509221968937-0f2f6f6f1a6d?w=800&h=1200&fit=crop",
    rating: 9.1,
    episodes: 24,
    genres: ["Sci-Fi", "Thriller", "Drama"],
    year: 2011,
     popularity: 0,

    description: "A group of friends invent a device that can send messages to the past, with dangerous consequences.",
  },
  {
    id: 16,
    title: "Death Note",
    coverImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&h=1200&fit=crop",
    rating: 8.8,
    episodes: 37,
     popularity: 0,

    genres: ["Mystery", "Supernatural", "Thriller"],
    year: 2006,
    description: "A high school student obtains a notebook that allows him to kill anyone by writing their name in it.",
  },
  {
    id: 17,
    title: "Mob Psycho 100",
    coverImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=1200&fit=crop",
    rating: 8.6,
    episodes: 25,
    genres: ["Action", "Comedy", "Supernatural"],
    year: 2016,
     popularity: 0,

    description: "A powerful esper struggles to live a normal life while dealing with spirits and his own emotions.",
  },
  {
    id: 18,
    title: "Hunter x Hunter (2011)",
    coverImage: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=1200&fit=crop",
    rating: 9.0,
    episodes: 148,
    genres: ["Adventure", "Fantasy", "Shounen"],
    year: 2011,
     popularity: 0,

    description: "Gon Freecss becomes a Hunter to find his father and discovers a world of dangerous challenges.",
  },
  {
    id: 19,
    title: "Kaguya-sama: Love is War",
    coverImage: "https://images.unsplash.com/photo-1541364983171-a8ba01d90d0a?w=800&h=1200&fit=crop",
    rating: 8.7,
    episodes: 24,
    genres: ["Romance", "Comedy", "School"],
    year: 2019,
     popularity: 0,

    description: "Two genius student council members try to make the other confess first in their romantic mind games.",
  },
  {
    id: 20,
    title: "Mushishi",
    coverImage: "https://images.unsplash.com/photo-1528747008803-2d6c6c8baf0f?w=800&h=1200&fit=crop",
    rating: 8.9,
    episodes: 26,
     popularity: 0,
    genres: ["Mystery", "Fantasy", "Slice of Life"],
    year: 2005,
    description: "A calm, atmospheric series about 'mushi' — ethereal lifeforms that affect people's lives in subtle ways.",
  },
];