export type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export type Guide = {
  id: number;
  name: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  available: boolean;
  languages: string[];
  experience: string;
  price: number;
  bio: string;
  pricing: { hour: number; halfDay: number; fullDay: number };
  expertise: string[];
  coverImage: string;
  avatar: string;
  gallery: string[];
  reviews: Review[];
  description: string;
};

export const allGuides: Guide[] = [
  {
    id: 1,
    name: "Sophie Laurent",
    city: "Paris",
    country: "France",
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    available: true,
    languages: ["English", "French", "Spanish"],
    experience: "8 years",
    price: 35,
    description: "Showing travelers the real Paris for 8 years",
    bio: "Born and raised in Paris, I've been showing travelers the hidden gems of this beautiful city for 8 years. From secret cafés to breathtaking viewpoints, I'll show you the Paris that locals love. My passion is food and history, and I love combining both in my tours!",
    pricing: { hour: 35, halfDay: 120, fullDay: 200 },
    expertise: ["Food Tours", "Hidden Gems", "History", "Coffee Culture"],
    coverImage: "https://images.unsplash.com/photo-1720988583730-1191f37e5fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzc0NzcyMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1758346973244-4979d432025a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZvb2QlMjBtYXJrZXQlMjBzdHJlZXR8ZW58MXx8fHwxNzc0ODUwMTE4fDA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1703232820514-d7b1662c1d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBhbGxleSUyMGV1cm9wZWFuJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTh8MA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1668884405041-aa8963908538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc3NDczMzk4N3ww&ixlib=rb-4.1.0&q=80&w=800",
    ],
    reviews: [
      { id: 1, name: "Michael R.", avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "March 2026", comment: "Sophie was absolutely amazing! She took us to places we would have never found on our own. The food tour was incredible." },
      { id: 2, name: "Jessica L.", avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "February 2026", comment: "Best tour guide ever! So knowledgeable and friendly. Made our Paris trip unforgettable." },
      { id: 3, name: "David K.", avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 4, date: "January 2026", comment: "Great experience! Sophie knows all the hidden spots. Highly recommend for anyone visiting Paris." },
    ],
  },
  {
    id: 2,
    name: "Marco Rossi",
    city: "Rome",
    country: "Italy",
    rating: 5.0,
    reviewCount: 89,
    verified: true,
    available: true,
    languages: ["English", "Italian", "French"],
    experience: "6 years",
    price: 40,
    description: "Rome's best-kept secrets revealed",
    bio: "As a born and bred Roman, I know every corner of this eternal city. From the Colosseum at dawn to the hidden trattorias in Trastevere, I'll take you beyond the tourist trail. My background in art history makes every tour a rich cultural journey.",
    pricing: { hour: 40, halfDay: 135, fullDay: 220 },
    expertise: ["History", "Architecture", "Art", "Hidden Gems"],
    coverImage: "https://images.unsplash.com/photo-1679161058888-0f0dc825e8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwaXRhbHklMjBjb2xvc3NldW0lMjBhbmNpZW50JTIwcnVpbnN8ZW58MXx8fHwxNzc0ODUwOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1701688992044-7c58b09effa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHRvdXIlMjBzY2VuaWMlMjB2aWV3cG9pbnQlMjBzdW5zZXR8ZW58MXx8fHwxNzc0ODUwOTA5fDA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1758346973244-4979d432025a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZvb2QlMjBtYXJrZXQlMjBzdHJlZXR8ZW58MXx8fHwxNzc0ODUwMTE4fDA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1703232820514-d7b1662c1d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBhbGxleSUyMGV1cm9wZWFuJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTh8MA&ixlib=rb-4.1.0&q=80&w=800",
    ],
    reviews: [
      { id: 1, name: "Anna M.", avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "March 2026", comment: "Marco brought Rome to life for us. His knowledge of ancient history is unmatched. We saw places we'd never have found alone!" },
      { id: 2, name: "James T.", avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "February 2026", comment: "Perfect guide for Rome! The Colosseum dawn tour was magical — completely empty and incredibly moving." },
      { id: 3, name: "Sarah P.", avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "January 2026", comment: "I've done many tours in Rome, but Marco is in a different league. Authentic, funny, and so passionate!" },
    ],
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    city: "Tokyo",
    country: "Japan",
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    available: false,
    languages: ["English", "Japanese", "Korean"],
    experience: "5 years",
    price: 45,
    description: "Tokyo's nightlife & culture insider",
    bio: "Tokyo is a city of infinite layers — and I love peeling them back for curious travelers. From the electric energy of Shinjuku's alleys to the serene temples of Yanaka, I design experiences that go far beyond the tourist brochure. Ramen specialist and nightlife expert!",
    pricing: { hour: 45, halfDay: 150, fullDay: 250 },
    expertise: ["Culture", "Nightlife", "Food", "Photography"],
    coverImage: "https://images.unsplash.com/photo-1730385835399-4d0f24898919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHQlMjBuZW9ufGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    avatar: "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1649957866905-bef01af303da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGphcGFuJTIwdGVtcGxlJTIwY2hlcnJ5JTIwYmxvc3NvbXxlbnwxfHx8fDE3NzQ5OTA5NTJ8MA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1770359646967-1d008a71e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91ciUyMHN0cmVldCUyMGZvb2QlMjBjb29raW5nJTIwY2xhc3N8ZW58MXx8fHwxNzc0ODUwOTA3fDA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1668884405041-aa8963908538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc3NDczMzk4N3ww&ixlib=rb-4.1.0&q=80&w=800",
    ],
    reviews: [
      { id: 1, name: "Chris W.", avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "March 2026", comment: "Yuki took us to a ramen shop with no English menu and it was the best meal of our lives. Absolutely incredible guide!" },
      { id: 2, name: "Mei L.", avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "February 2026", comment: "The night tour of Shinjuku was unforgettable. Yuki knows everyone and got us into places most tourists never see!" },
      { id: 3, name: "Tom B.", avatar: "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 4, date: "December 2025", comment: "Great experience, very knowledgeable. Tokyo makes so much more sense with a local showing you around." },
    ],
  },
  {
    id: 4,
    name: "Emma Wilson",
    city: "London",
    country: "UK",
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    available: true,
    languages: ["English", "German"],
    experience: "10 years",
    price: 38,
    description: "Showing travelers the real London for 10 years",
    bio: "London-born and proud of it! I've spent a decade showing visitors the city I love beyond the standard tourist route. From Portobello's vinyl shops to hidden Victorian pubs, Borough Market to the East End's street art scene — I know where the city breathes. Coffee tour specialist!",
    pricing: { hour: 38, halfDay: 125, fullDay: 210 },
    expertise: ["Street Art", "Coffee Culture", "History", "Markets"],
    coverImage: "https://images.unsplash.com/photo-1600682111749-2456071bf366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjBiZW4lMjBsYW5kbWFya3xlbnwxfHx8fDE3NzQ4NTAxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1647868044625-5637ff8abd1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBzdHJlZXQlMjBtYXJrZXQlMjB2aW50YWdlfGVufDF8fHx8MTc3NDk5MDk1M3ww&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1668884405041-aa8963908538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc3NDczMzk4N3ww&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1703232820514-d7b1662c1d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBhbGxleSUyMGV1cm9wZWFuJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTh8MA&ixlib=rb-4.1.0&q=80&w=800",
    ],
    reviews: [
      { id: 1, name: "Lucas B.", avatar: "https://images.unsplash.com/photo-1632660352036-439e70bb013f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGd1aWRlJTIwdHJhdmVsZXIlMjBvdXRkb29yfGVufDF8fHx8MTc3NDk5MDk1OHww&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "March 2026", comment: "Emma transformed my idea of London. We found incredible jazz bars, antique bookshops and the most amazing flat white of my life!" },
      { id: 2, name: "Nina C.", avatar: "https://images.unsplash.com/photo-1765987592329-517788f8f39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwbG9jYWwlMjBndWlkZSUyMGNpdHklMjB0b3VyJTIwc21pbGV8ZW58MXx8fHwxNzc0OTkwOTU4fDA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "February 2026", comment: "The East End street art tour was outstanding. Emma has stories about every mural — pure magic!" },
      { id: 3, name: "Ben H.", avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "January 2026", comment: "Best London experience I've ever had and I've visited 6 times. Emma completely changed how I see this city." },
    ],
  },
  {
    id: 5,
    name: "Alex Chen",
    city: "New York",
    country: "USA",
    rating: 4.7,
    reviewCount: 134,
    verified: true,
    available: true,
    languages: ["English", "Mandarin", "Cantonese"],
    experience: "4 years",
    price: 50,
    description: "Brooklyn native with insider NYC knowledge",
    bio: "Grew up in Brooklyn, lived in every borough, and know this city's soul. I show you the New York that doesn't appear in any guidebook — from Flushing's authentic dim sum to hidden rooftop bars with skyline views, Chinatown's back kitchens to underground jazz clubs.",
    pricing: { hour: 50, halfDay: 165, fullDay: 280 },
    expertise: ["Hidden Gems", "Food Tours", "Photography", "Nightlife"],
    coverImage: "https://images.unsplash.com/photo-1636682489073-125e6855a665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmUlMjBicm9va2x5bnxlbnwxfHx8fDE3NzQ5OTA5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1636682489073-125e6855a665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmUlMjBicm9va2x5bnxlbnwxfHx8fDE3NzQ5OTA5NTN8MA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1758346973244-4979d432025a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZvb2QlMjBtYXJrZXQlMjBzdHJlZXR8ZW58MXx8fHwxNzc0ODUwMTE4fDA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHN0cmVldHxlbnwxfHx8fDE3NzQ4NTAxMTd8MA&ixlib=rb-4.1.0&q=80&w=800",
    ],
    reviews: [
      { id: 1, name: "Rachel G.", avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "March 2026", comment: "Alex showed us a New York I've never seen in 20 visits. The hidden dim sum restaurant alone was worth every penny!" },
      { id: 2, name: "Mark D.", avatar: "https://images.unsplash.com/photo-1632660352036-439e70bb013f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGd1aWRlJTIwdHJhdmVsZXIlMjBvdXRkb29yfGVufDF8fHx8MTc3NDk5MDk1OHww&ixlib=rb-4.1.0&q=80&w=200", rating: 4, date: "February 2026", comment: "Great energy and amazing spots. The rooftop bar he found for us had the most insane view of Manhattan." },
    ],
  },
  {
    id: 6,
    name: "Isabella Garcia",
    city: "Barcelona",
    country: "Spain",
    rating: 5.0,
    reviewCount: 178,
    verified: true,
    available: true,
    languages: ["English", "Spanish", "Catalan"],
    experience: "7 years",
    price: 42,
    description: "Gaudí expert and Barcelona art historian",
    bio: "Barcelona is my canvas and I've been painting stories on it for 7 years. With a PhD in Catalan art history and a lifelong passion for Gaudí's genius, I take travelers deep into the soul of this incredible city. Gothic quarter secrets, tapas routes, and the best flamenco venues off the tourist trail.",
    pricing: { hour: 42, halfDay: 140, fullDay: 230 },
    expertise: ["Architecture", "Art", "Food Tours", "History"],
    coverImage: "https://images.unsplash.com/photo-1662128406983-e9c949797f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzcGFpbiUyMGFyY2hpdGVjdHVyZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    avatar: "https://images.unsplash.com/photo-1765987592329-517788f8f39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwbG9jYWwlMjBndWlkZSUyMGNpdHklMjB0b3VyJTIwc21pbGV8ZW58MXx8fHwxNzc0OTkwOTU4fDA&ixlib=rb-4.1.0&q=80&w=400",
    gallery: [
      "https://images.unsplash.com/photo-1662128406983-e9c949797f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzcGFpbiUyMGFyY2hpdGVjdHVyZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1770359646967-1d008a71e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91ciUyMHN0cmVldCUyMGZvb2QlMjBjb29raW5nJTIwY2xhc3N8ZW58MXx8fHwxNzc0ODUwOTA3fDA&ixlib=rb-4.1.0&q=80&w=800",
      "https://images.unsplash.com/photo-1703232820514-d7b1662c1d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBhbGxleSUyMGV1cm9wZWFuJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTh8MA&ixlib=rb-4.1.0&q=80&w=800",
    ],
    reviews: [
      { id: 1, name: "Pierre M.", avatar: "https://images.unsplash.com/photo-1632660352036-439e70bb013f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGd1aWRlJTIwdHJhdmVsZXIlMjBvdXRkb29yfGVufDF8fHx8MTc3NDk5MDk1OHww&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "March 2026", comment: "Isabella's knowledge of Gaudí is simply phenomenal. Sagrada Família with her felt like a private lecture from an art professor." },
      { id: 2, name: "Sofia K.", avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "February 2026", comment: "The tapas route she curated was a revelation. 6 stops, each more delicious than the last. Go with Isabella!" },
      { id: 3, name: "Tom J.", avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200", rating: 5, date: "January 2026", comment: "Absolutely outstanding. Isabella found a flamenco show in a 200-year-old cave that blew our minds completely." },
    ],
  },
];

export const searchCities = [
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1720988583730-1191f37e5fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzc0NzcyMjI1fDA&ixlib=rb-4.1.0&q=80&w=400", guides: 12 },
  { name: "Rome, Italy", image: "https://images.unsplash.com/photo-1679161058888-0f0dc825e8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwaXRhbHklMjBjb2xvc3NldW0lMjBhbmNpZW50JTIwcnVpbnN8ZW58MXx8fHwxNzc0ODUwOTA2fDA&ixlib=rb-4.1.0&q=80&w=400", guides: 8 },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1730385835399-4d0f24898919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHQlMjBuZW9ufGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=400", guides: 15 },
  { name: "London, UK", image: "https://images.unsplash.com/photo-1600682111749-2456071bf366?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjJiZW4lMjBsYW5kbWFya3xlbnwxfHx8fDE3NzQ4NTAxMTd8MA&ixlib=rb-4.1.0&q=80&w=400", guides: 21 },
  { name: "New York, USA", image: "https://images.unsplash.com/photo-1636682489073-125e6855a665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmUlMjBicm9va2x5bnxlbnwxfHx8fDE3NzQ5OTA5NTN8MA&ixlib=rb-4.1.0&q=80&w=400", guides: 18 },
  { name: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1662128406983-e9c949797f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzcGFpbiUyMGFyY2hpdGVjdHVyZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=400", guides: 9 },
  { name: "Amsterdam, Netherlands", image: "https://images.unsplash.com/photo-1672759328997-57b7af99afce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXN0ZXJkYW0lMjBjYW5hbCUyMGNpdHklMjB0cmF2ZWx8ZW58MXx8fHwxNzc0OTkwOTUyfDA&ixlib=rb-4.1.0&q=80&w=400", guides: 7 },
  { name: "Istanbul, Turkey", image: "https://images.unsplash.com/photo-1629212093584-6e1769fb1598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMHR1cmtleSUyMGJhemFhciUyMG1hcmtldCUyMGN1bHR1cmV8ZW58MXx8fHwxNzc0ODUwOTA2fDA&ixlib=rb-4.1.0&q=80&w=400", guides: 11 },
  { name: "Prague, Czech Republic", image: "https://images.unsplash.com/photo-1650099077861-c69fa9e0635f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmFndWUlMjBjemVjaCUyMHJlcHVibGljJTIwb2xkJTIwdG93biUyMHNxdWFyZXxlbnwxfHx8fDE3NzQ5OTA5NTd8MA&ixlib=rb-4.1.0&q=80&w=400", guides: 6 },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1576475706812-822620fc23ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwcmljZSUyMHRlcnJhY2VzJTIwdHJvcGljYWx8ZW58MXx8fHwxNzc0OTkwOTU0fDA&ixlib=rb-4.1.0&q=80&w=400", guides: 14 },
  { name: "Marrakech, Morocco", image: "https://images.unsplash.com/photo-1716146755954-4f197a5b6031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJyYWtlY2glMjBtb3JvY2NvJTIwbWVkaW5hJTIwY29sb3JmdWx8ZW58MXx8fHwxNzc0OTkwOTUzfDA&ixlib=rb-4.1.0&q=80&w=400", guides: 9 },
  { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1649957866905-bef01af303da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGphcGFuJTIwdGVtcGxlJTIwY2hlcnJ5JTIwYmxvc3NvbXxlbnwxfHx8fDE3NzQ5OTA5NTJ8MA&ixlib=rb-4.1.0&q=80&w=400", guides: 10 },
];
