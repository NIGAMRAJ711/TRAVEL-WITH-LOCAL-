import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Badge } from "../components/ui/badge";
import {
  Search,
  MapPin,
  Star,
  Heart,
  User,
  MessageCircle,
  Home as HomeIcon,
  Map,
  Play,
  Users,
  X,
  TrendingUp,
} from "lucide-react";
import { allGuides, searchCities } from "../data/guides";
import { useAuth } from "../context/AuthContext";

const categories = ["All", "Hidden Gems", "Food Tours", "History Walks", "Nightlife", "Nature", "Photography", "Coffee Culture"];

const categoryExpertiseMap: Record<string, string[]> = {
  "All": [],
  "Hidden Gems": ["Hidden Gems"],
  "Food Tours": ["Food Tours", "Food"],
  "History Walks": ["History", "Architecture"],
  "Nightlife": ["Nightlife"],
  "Nature": ["Nature"],
  "Photography": ["Photography"],
  "Coffee Culture": ["Coffee Culture"],
};

export function TravelerHome() {
  const navigate = useNavigate();
  const { user, saveGuide, unsaveGuide } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync liked guides with auth context
  const likedGuides = new Set(user?.savedGuides ?? []);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedGuides.has(id)) {
      unsaveGuide(id);
    } else {
      saveGuide(id);
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Search filtering
  const query = searchQuery.toLowerCase();
  const matchingCities = searchCities.filter((c) => c.name.toLowerCase().includes(query));
  const matchingGuides = allGuides.filter(
    (g) =>
      g.name.toLowerCase().includes(query) ||
      g.city.toLowerCase().includes(query) ||
      g.country.toLowerCase().includes(query) ||
      g.expertise.some((e) => e.toLowerCase().includes(query))
  );

  // Category filtered featured guides
  const filteredFeatured =
    selectedCategory === "All"
      ? allGuides
      : allGuides.filter((g) =>
          g.expertise.some((exp) =>
            categoryExpertiseMap[selectedCategory]?.includes(exp)
          )
        );

  const topGuides = allGuides.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-[#E07856] pt-12 pb-6 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {user ? `Hi, ${user.name.split(" ")[0]}!` : "Find Your Guide"}
              </h1>
              <p className="text-white/80">Explore the world through local eyes</p>
            </div>
            {user && (
              <button
                onClick={() => navigate("/profile")}
                className="flex-shrink-0"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/40" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Search with autocomplete */}
          <div ref={searchRef} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7C93] z-10" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search cities or guides..."
                className="w-full pl-12 pr-10 h-12 rounded-2xl bg-white border-none outline-none text-[#1E3A5F] placeholder:text-[#6B7C93]"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#6B7C93]/20 rounded-full flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-[#6B7C93]" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-border z-50 overflow-hidden max-h-96 overflow-y-auto">
                {!searchQuery ? (
                  /* Trending / recent without query */
                  <div>
                    <div className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-2 text-xs text-[#6B7C93] font-semibold uppercase tracking-wide">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Trending Destinations
                      </div>
                    </div>
                    {searchCities.slice(0, 5).map((city) => (
                      <button
                        key={city.name}
                        onClick={() => { setSearchQuery(city.name); setShowSuggestions(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors text-left border-b border-border/50 last:border-0"
                      >
                        <img src={city.image} alt={city.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="font-medium text-[#1E3A5F]">{city.name}</p>
                          <p className="text-xs text-[#6B7C93]">{city.guides} local guides available</p>
                        </div>
                        <MapPin className="w-4 h-4 text-[#E07856] ml-auto" />
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Filtered results */
                  <div>
                    {matchingCities.length > 0 && (
                      <>
                        <div className="px-4 py-2 bg-[#FFF8F0]">
                          <p className="text-xs text-[#6B7C93] font-semibold uppercase tracking-wide">Cities</p>
                        </div>
                        {matchingCities.slice(0, 4).map((city) => (
                          <button
                            key={city.name}
                            onClick={() => { setSearchQuery(city.name); setShowSuggestions(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors text-left border-b border-border/50"
                          >
                            <img src={city.image} alt={city.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-medium text-[#1E3A5F]">{city.name}</p>
                              <p className="text-xs text-[#6B7C93]">{city.guides} guides available</p>
                            </div>
                            <MapPin className="w-4 h-4 text-[#E07856]" />
                          </button>
                        ))}
                      </>
                    )}
                    {matchingGuides.length > 0 && (
                      <>
                        <div className="px-4 py-2 bg-[#FFF8F0]">
                          <p className="text-xs text-[#6B7C93] font-semibold uppercase tracking-wide">Guides</p>
                        </div>
                        {matchingGuides.slice(0, 5).map((guide) => (
                          <button
                            key={guide.id}
                            onClick={() => { navigate(`/guide/${guide.id}`); setShowSuggestions(false); setSearchQuery(""); }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors text-left border-b border-border/50 last:border-0"
                          >
                            <div className="relative flex-shrink-0">
                              <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-full object-cover" />
                              {guide.available && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4CAF50] rounded-full border-2 border-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="font-medium text-[#1E3A5F] truncate">{guide.name}</p>
                                {guide.verified && (
                                  <div className="w-3.5 h-3.5 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white" style={{ fontSize: "8px" }}>✓</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-[#6B7C93]">
                                <MapPin className="w-2.5 h-2.5" />
                                <span>{guide.city}, {guide.country}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Star className="w-2.5 h-2.5 fill-[#FF8C42] text-[#FF8C42]" />
                                <span className="text-xs font-semibold text-[#1E3A5F]">{guide.rating}</span>
                                <span className="text-xs text-[#6B7C93]">· ${guide.price}/hr</span>
                              </div>
                            </div>
                            <span className="text-xs text-[#E07856] font-semibold">${guide.price}/hr</span>
                          </button>
                        ))}
                      </>
                    )}
                    {matchingCities.length === 0 && matchingGuides.length === 0 && (
                      <div className="px-4 py-8 text-center">
                        <p className="text-[#6B7C93]">No results for "<strong>{searchQuery}</strong>"</p>
                        <p className="text-sm text-[#6B7C93] mt-1">Try a city or guide name</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Guides Horizontal Scroll */}
      <div className="px-4 py-5 bg-white">
        <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">Top Guides Near You</h3>
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {topGuides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => navigate(`/guide/${guide.id}`)}
              className="flex-shrink-0 w-36 text-left"
            >
              <div className="relative">
                <img src={guide.avatar} alt={guide.name} className="w-36 h-36 rounded-2xl object-cover" />
                <div
                  onClick={(e) => toggleLike(guide.id, e)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <Heart className={`w-4 h-4 transition-colors ${likedGuides.has(guide.id) ? "fill-[#E07856] text-[#E07856]" : "text-[#E07856]"}`} />
                </div>
                {guide.available && (
                  <div className="absolute bottom-2 left-2 bg-[#4CAF50] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Available
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="font-semibold text-[#1E3A5F] truncate text-sm">{guide.name}</div>
                <div className="flex items-center gap-1 text-xs text-[#6B7C93]">
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="truncate">{guide.city}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                    <span className="text-xs font-semibold">{guide.rating}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#E07856]">${guide.price}/hr</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-4 bg-background">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                selectedCategory === category
                  ? "bg-[#E07856] text-white shadow-md"
                  : "bg-white text-[#1E3A5F] border border-border hover:border-[#E07856]/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guides */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#1E3A5F]">
            {selectedCategory === "All" ? "All Guides" : selectedCategory}
          </h3>
          <span className="text-sm text-[#6B7C93]">{filteredFeatured.length} found</span>
        </div>

        {filteredFeatured.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-border">
            <p className="text-[#6B7C93] mb-2">No guides found for this category</p>
            <button onClick={() => setSelectedCategory("All")} className="text-[#E07856] font-semibold text-sm">
              See all guides →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeatured.map((guide) => (
              <button
                key={guide.id}
                onClick={() => navigate(`/guide/${guide.id}`)}
                className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow text-left"
              >
                {/* Cover Image */}
                <div className="relative h-32">
                  <img src={guide.coverImage} alt={guide.city} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-semibold text-sm">{guide.city}, {guide.country}</span>
                  </div>
                  {!guide.available && (
                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      Offline
                    </div>
                  )}
                </div>

                {/* Guide Info */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={guide.avatar} alt={guide.name} className="w-14 h-14 rounded-full object-cover border-2 border-white -mt-10 relative z-10 shadow-md" />
                      {guide.available && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4CAF50] rounded-full border-2 border-white z-20" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#1E3A5F]">{guide.name}</h4>
                        {guide.verified && (
                          <div className="w-4 h-4 bg-[#4CAF50] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-[#6B7C93] mt-0.5">{guide.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {guide.expertise.slice(0, 2).map((exp) => (
                          <Badge key={exp} variant="secondary" className="bg-[#FFF8F0] text-[#E07856] border-none text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FF8C42] text-[#FF8C42]" />
                      <span className="font-semibold text-[#1E3A5F]">{guide.rating}</span>
                      <span className="text-sm text-[#6B7C93]">({guide.reviewCount})</span>
                    </div>
                    <span className="text-xl font-bold text-[#E07856]">${guide.price}/hr</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Group Tours Banner */}
      <div className="px-4 py-4">
        <button
          onClick={() => navigate("/group-tours")}
          className="w-full bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] rounded-3xl p-5 flex items-center justify-between shadow-lg"
        >
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-[#FF8C42]" />
              <span className="text-white font-semibold">Group Tours</span>
            </div>
            <p className="text-white/70 text-sm">Join shared experiences with other travelers</p>
            <span className="text-[#FF8C42] text-sm font-semibold mt-1 block">From $22/person →</span>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-md mx-auto flex items-center justify-around py-3 px-2">
          <button
            onClick={() => { setActiveTab("home"); navigate("/home"); }}
            className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-[#E07856]" : "text-[#6B7C93]"}`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => { setActiveTab("explore"); navigate("/map"); }}
            className={`flex flex-col items-center gap-1 ${activeTab === "explore" ? "text-[#E07856]" : "text-[#6B7C93]"}`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>
          <button
            onClick={() => { setActiveTab("reels"); navigate("/reels"); }}
            className={`flex flex-col items-center gap-1 ${activeTab === "reels" ? "text-[#E07856]" : "text-[#6B7C93]"}`}
          >
            <Play className="w-6 h-6" />
            <span className="text-xs">Reels</span>
          </button>
          <button
            onClick={() => { setActiveTab("messages"); navigate("/messages"); }}
            className={`flex flex-col items-center gap-1 relative ${activeTab === "messages" ? "text-[#E07856]" : "text-[#6B7C93]"}`}
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E07856] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold" style={{ fontSize: "9px" }}>3</span>
              </div>
            </div>
            <span className="text-xs">Messages</span>
          </button>
          <button
            onClick={() => { setActiveTab("profile"); navigate("/profile"); }}
            className={`flex flex-col items-center gap-1 ${activeTab === "profile" ? "text-[#E07856]" : "text-[#6B7C93]"}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}