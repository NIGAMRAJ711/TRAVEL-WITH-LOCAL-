import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Clock,
  Calendar,
  Search,
  Filter,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

const groupTours = [
  {
    id: 1,
    title: "Hidden Paris Food Walk",
    description:
      "Explore the secret culinary soul of Paris — artisan cheese shops, unmarked bakeries, and the city's best wine caves.",
    guide: {
      id: 1,
      name: "Sophie Laurent",
      avatar:
        "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
      rating: 4.9,
      verified: true,
    },
    coverImage:
      "https://images.unsplash.com/photo-1770359646967-1d008a71e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91ciUyMHN0cmVldCUyMGZvb2QlMjBjb29raW5nJTIwY2xhc3N8ZW58MXx8fHwxNzc0ODUwOTA3fDA&ixlib=rb-4.1.0&q=80&w=800",
    location: "Paris, France",
    date: "Apr 5, 2026",
    time: "10:00 AM",
    duration: "3 hours",
    pricePerPerson: 28,
    maxSpots: 8,
    spotsLeft: 3,
    category: "Food",
    participants: [
      "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
    ],
    tags: ["Food", "Culture", "Hidden Gems"],
    joined: false,
  },
  {
    id: 2,
    title: "Sunset Photography Walk — Rome",
    description:
      "Chase the golden hour through Rome's ancient streets. No photography experience needed — just a phone and a sense of wonder.",
    guide: {
      id: 2,
      name: "Marco Rossi",
      avatar:
        "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
      rating: 5.0,
      verified: true,
    },
    coverImage:
      "https://images.unsplash.com/photo-1701688992044-7c58b09effa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHRvdXIlMjBzY2VuaWMlMjB2aWV3cG9pbnQlMjBzdW5zZXR8ZW58MXx8fHwxNzc0ODUwOTA5fDA&ixlib=rb-4.1.0&q=80&w=800",
    location: "Rome, Italy",
    date: "Apr 8, 2026",
    time: "5:30 PM",
    duration: "2 hours",
    pricePerPerson: 22,
    maxSpots: 10,
    spotsLeft: 1,
    category: "Photography",
    participants: [
      "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
    ],
    tags: ["Photography", "Sunset", "History"],
    joined: false,
  },
  {
    id: 3,
    title: "Pampas Valley Wine Experience",
    description:
      "Small group wine tasting at three boutique family vineyards — paired with local cheeses and stories from the winemakers themselves.",
    guide: {
      id: 4,
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      rating: 4.9,
      verified: true,
    },
    coverImage:
      "https://images.unsplash.com/photo-1770453572726-f51592710ca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMHZpbmV5YXJkJTIwdG91ciUyMGdyb3VwfGVufDF8fHx8MTc3NDg1MDkxMHww&ixlib=rb-4.1.0&q=80&w=800",
    location: "Mendoza, Argentina",
    date: "Apr 12, 2026",
    time: "2:00 PM",
    duration: "4 hours",
    pricePerPerson: 55,
    maxSpots: 6,
    spotsLeft: 2,
    category: "Food & Wine",
    participants: [
      "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    ],
    tags: ["Wine", "Food", "Boutique"],
    joined: false,
  },
  {
    id: 4,
    title: "Venice Canal Kayak Adventure",
    description:
      "Paddle through Venice's hidden canals in a small group kayak tour — the only way to see the parts of the city tourists never reach.",
    guide: {
      id: 3,
      name: "Luca Ferrari",
      avatar:
        "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      rating: 4.7,
      verified: true,
    },
    coverImage:
      "https://images.unsplash.com/photo-1736252333436-9f0234de7dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2F0JTIwd2F0ZXIlMjBjYW5hbCUyMGNpdHklMjB0b3VyJTIwdmVuaWNlfGVufDF8fHx8MTc3NDg1MDkxMHww&ixlib=rb-4.1.0&q=80&w=800",
    location: "Venice, Italy",
    date: "Apr 15, 2026",
    time: "9:00 AM",
    duration: "3 hours",
    pricePerPerson: 48,
    maxSpots: 6,
    spotsLeft: 4,
    category: "Adventure",
    participants: [
      "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    ],
    tags: ["Adventure", "Water", "Unique"],
    joined: true,
  },
  {
    id: 5,
    title: "Tokyo Night Ramen Crawl",
    description:
      "6 stops. 6 bowls. One legendary night through Tokyo's best ramen spots — from thick tonkotsu to crystal-clear shoyu broth.",
    guide: {
      id: 5,
      name: "Yuki Tanaka",
      avatar:
        "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
      rating: 4.8,
      verified: true,
    },
    coverImage:
      "https://images.unsplash.com/photo-1767447614358-99d907806f76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRvdXIlMjBoaWtpbmclMjBhZHZlbnR1cmUlMjBwZW9wbGV8ZW58MXx8fHwxNzc0ODUwOTAyfDA&ixlib=rb-4.1.0&q=80&w=800",
    location: "Tokyo, Japan",
    date: "Apr 18, 2026",
    time: "7:00 PM",
    duration: "3.5 hours",
    pricePerPerson: 38,
    maxSpots: 8,
    spotsLeft: 5,
    category: "Food",
    participants: [
      "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
      "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    ],
    tags: ["Food", "Nightlife", "Japanese"],
    joined: false,
  },
];

const categories = ["All", "Food", "Photography", "Adventure", "Food & Wine", "Culture"];

function SpotsBar({ left, max }: { left: number; max: number }) {
  const filled = max - left;
  const pct = (filled / max) * 100;
  const isAlmostFull = left <= 2;
  return (
    <div className="w-full h-1.5 bg-[#F5E6D8] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${
          isAlmostFull ? "bg-[#E07856]" : "bg-[#4CAF50]"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function GroupTours() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [joinedTours, setJoinedTours] = useState<Set<number>>(
    new Set(groupTours.filter((t) => t.joined).map((t) => t.id))
  );
  const [savedTours, setSavedTours] = useState<Set<number>>(new Set());
  const [justJoined, setJustJoined] = useState<number | null>(null);

  const filtered =
    selectedCategory === "All"
      ? groupTours
      : groupTours.filter((t) => t.category === selectedCategory);

  const handleJoin = (id: number) => {
    setJoinedTours((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setJustJoined(id);
        setTimeout(() => setJustJoined(null), 2000);
      }
      return next;
    });
  };

  const toggleSave = (id: number) => {
    setSavedTours((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] pt-12 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/home")}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Group Tours</h1>
              <p className="text-white/70 text-sm">Join a shared local experience</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
            <Input
              placeholder="Search tours..."
              className="pl-10 h-11 rounded-2xl bg-white border-none"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 bg-white border-b border-border">
        <div className="max-w-md mx-auto overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-2 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-[#FFF8F0] text-[#1E3A5F] hover:bg-[#FFDBC5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="px-4 py-3 bg-[#FFF8F0]">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-[#6B7C93]">
            <Users className="w-4 h-4 text-[#E07856]" />
            <span>
              <strong className="text-[#1E3A5F]">{filtered.length}</strong> tours available
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5 text-sm text-[#6B7C93]">
            <Calendar className="w-4 h-4 text-[#E07856]" />
            <span>Next: April 5</span>
          </div>
          <button className="ml-auto flex items-center gap-1 text-sm text-[#E07856] font-medium">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>
      </div>

      {/* Tour Cards */}
      <div className="px-4 py-4 space-y-5">
        <div className="max-w-md mx-auto space-y-5">
          {filtered.map((tour) => {
            const isJoined = joinedTours.has(tour.id);
            const isSaved = savedTours.has(tour.id);
            const spotsLeft = tour.spotsLeft - (isJoined && !tour.joined ? 1 : 0);
            const isAlmostFull = spotsLeft <= 2;

            return (
              <div
                key={tour.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-border"
              >
                {/* Cover Image */}
                <div className="relative h-44 w-full">
                  <button
                    onClick={() => navigate(`/group-tour/${tour.id}`)}
                    className="absolute inset-0"
                  >
                    <img
                      src={tour.coverImage}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#E07856] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {tour.category}
                      </span>
                    </div>

                    {/* Almost full warning */}
                    {isAlmostFull && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#E07856] text-white text-xs font-semibold px-3 py-1.5 rounded-full animate-pulse">
                          🔥 Only {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left!
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Save button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(tour.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center z-10"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? "fill-[#E07856] text-[#E07856]" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Guide info */}
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={tour.guide.avatar}
                      alt={tour.guide.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#E07856]/30"
                    />
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-[#1E3A5F]">
                        {tour.guide.name}
                      </span>
                      {tour.guide.verified && (
                        <div className="w-3.5 h-3.5 bg-[#4CAF50] rounded-full flex items-center justify-center">
                          <span className="text-white" style={{ fontSize: "8px" }}>✓</span>
                        </div>
                      )}
                      <div className="flex items-center gap-0.5 ml-1">
                        <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                        <span className="text-xs font-semibold text-[#1E3A5F]">
                          {tour.guide.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[#1E3A5F] mb-1">{tour.title}</h3>
                  <p className="text-sm text-[#6B7C93] leading-relaxed line-clamp-2 mb-3">
                    {tour.description}
                  </p>

                  {/* Tour details */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm text-[#6B7C93]">
                      <MapPin className="w-3.5 h-3.5 text-[#E07856]" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#6B7C93]">
                      <Clock className="w-3.5 h-3.5 text-[#E07856]" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-[#6B7C93] mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#E07856]" />
                    <span>{tour.date} at {tour.time}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {tour.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#FFF8F0] text-[#E07856] border-none text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Participants */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">
                      {tour.participants.slice(0, 4).map((avatar, i) => (
                        <img
                          key={i}
                          src={avatar}
                          alt={`Participant ${i + 1}`}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white"
                          style={{ marginLeft: i === 0 ? 0 : -10 }}
                        />
                      ))}
                      {tour.participants.length > 4 && (
                        <div
                          className="w-8 h-8 rounded-full bg-[#FFF8F0] border-2 border-white flex items-center justify-center"
                          style={{ marginLeft: -10 }}
                        >
                          <span className="text-xs font-semibold text-[#E07856]">
                            +{tour.participants.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#6B7C93]">
                          {tour.maxSpots - spotsLeft}/{tour.maxSpots} joined
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            isAlmostFull ? "text-[#E07856]" : "text-[#4CAF50]"
                          }`}
                        >
                          {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                        </span>
                      </div>
                      <SpotsBar left={spotsLeft} max={tour.maxSpots} />
                    </div>
                  </div>

                  {/* Price + Join */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#E07856]">
                        ${tour.pricePerPerson}
                      </span>
                      <span className="text-sm text-[#6B7C93] ml-1">/ person</span>
                    </div>
                    <button
                      onClick={() => handleJoin(tour.id)}
                      className={`h-11 px-6 rounded-2xl font-semibold flex items-center gap-2 transition-all ${
                        isJoined
                          ? "bg-[#4CAF50]/10 text-[#4CAF50] border-2 border-[#4CAF50]"
                          : "bg-[#E07856] text-white hover:bg-[#E07856]/90 active:scale-95"
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Joined!
                        </>
                      ) : (
                        <>
                          <Users className="w-4 h-4" />
                          Join Tour
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Just Joined Banner */}
                {justJoined === tour.id && (
                  <div className="bg-[#4CAF50] px-4 py-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                    <p className="text-white text-sm font-semibold">
                      You're in! Check your messages for details.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Padding for nav */}
      <div className="h-8" />
    </div>
  );
}
