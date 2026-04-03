import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Star,
  ArrowLeft,
  Navigation,
  Layers,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  X,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { allGuides } from "../data/guides";
import { useAuth } from "../context/AuthContext";

const mapPins = [
  { id: 1, x: 48, y: 38, color: "#E07856" },
  { id: 2, x: 68, y: 55, color: "#FF8C42" },
  { id: 3, x: 28, y: 62, color: "#1E3A5F" },
  { id: 4, x: 55, y: 28, color: "#E07856" },
  { id: 5, x: 75, y: 42, color: "#FF8C42" },
  { id: 6, x: 38, y: 50, color: "#E07856" },
];

const mapGuides = allGuides.map((g, i) => ({
  ...g,
  pinX: mapPins[i]?.x ?? 50,
  pinY: mapPins[i]?.y ?? 50,
  pinColor: mapPins[i]?.color ?? "#E07856",
}));

type SheetState = "collapsed" | "half" | "expanded";
type ActiveFilter = "All Guides" | "Available Now" | "Under $40/hr" | "Top Rated";

const mapBg =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwdG9wJTIwdmlld3xlbnwwfHx8fDE3NDQyMDYzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function MapScreen() {
  const navigate = useNavigate();
  const { user, markPlace, unmarkPlace } = useAuth();
  const [sheetState, setSheetState] = useState<SheetState>("half");
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("All Guides");
  const [mapStyle, setMapStyle] = useState<"satellite" | "street">("satellite");
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [markNote, setMarkNote] = useState("");
  const [activeSheet, setActiveSheet] = useState<"guides" | "myplaces">("guides");

  // Filter logic
  const filteredGuides = mapGuides.filter((g) => {
    const matchesSearch =
      !searchQuery ||
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All Guides" ||
      (activeFilter === "Available Now" && g.available) ||
      (activeFilter === "Under $40/hr" && g.price < 40) ||
      (activeFilter === "Top Rated" && g.rating >= 4.9);

    return matchesSearch && matchesFilter;
  });

  const visiblePinIds = new Set(filteredGuides.map((g) => g.id));
  const selectedGuide = mapGuides.find((g) => g.id === selectedPin);

  const sheetHeights: Record<SheetState, string> = {
    collapsed: "h-20",
    half: "h-72",
    expanded: "h-[72vh]",
  };

  const cycleSheet = () => {
    if (sheetState === "collapsed") setSheetState("half");
    else if (sheetState === "half") setSheetState("expanded");
    else setSheetState("collapsed");
  };

  const filters: ActiveFilter[] = ["All Guides", "Available Now", "Under $40/hr", "Top Rated"];
  const filterCounts: Record<ActiveFilter, number> = {
    "All Guides": mapGuides.length,
    "Available Now": mapGuides.filter((g) => g.available).length,
    "Under $40/hr": mapGuides.filter((g) => g.price < 40).length,
    "Top Rated": mapGuides.filter((g) => g.rating >= 4.9).length,
  };

  const handleMarkPlace = () => {
    markPlace({
      name: `Marked Spot`,
      city: "Current Location",
      x: 50 + Math.random() * 20 - 10,
      y: 50 + Math.random() * 20 - 10,
      note: markNote || "Interesting place",
      color: "#4CAF50",
    });
    setMarkNote("");
    setShowMarkModal(false);
  };

  const userPlaces = user?.markedPlaces ?? [];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <img
          src={mapBg}
          alt="City map"
          className="w-full h-full object-cover transition-all duration-500"
          style={{ filter: mapStyle === "street" ? "saturate(0.2) brightness(1.3) hue-rotate(30deg)" : "none" }}
        />
        <div className="absolute inset-0 bg-[#1E3A5F]/15" />

        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Guide Pins */}
        {mapGuides.map((guide) => {
          const isVisible = visiblePinIds.has(guide.id);
          const isSelected = selectedPin === guide.id;
          return (
            <button
              key={guide.id}
              onClick={() => {
                setSelectedPin(isSelected ? null : guide.id);
                if (!isSelected) setSheetState("half");
              }}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all duration-300"
              style={{
                left: `${guide.pinX}%`,
                top: `${guide.pinY}%`,
                opacity: isVisible ? 1 : 0.25,
                transform: `translate(-50%, -100%) scale(${isSelected ? 1.15 : 1})`,
              }}
            >
              {isSelected ? (
                <div className="flex flex-col items-center drop-shadow-xl">
                  <div className="px-3 py-2 rounded-2xl flex items-center gap-2" style={{ backgroundColor: guide.pinColor }}>
                    <img src={guide.avatar} alt={guide.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <div className="text-left">
                      <p className="text-white text-xs font-semibold leading-none">{guide.name.split(" ")[0]}</p>
                      <p className="text-white/80 text-xs">${guide.price}/hr</p>
                    </div>
                  </div>
                  <div className="w-0 h-0" style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `10px solid ${guide.pinColor}` }} />
                </div>
              ) : (
                <div className="flex flex-col items-center drop-shadow-lg">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: guide.pinColor, border: "3px solid white", opacity: guide.available ? 1 : 0.7 }}
                  >
                    <span className="text-white text-xs font-bold">${guide.price}</span>
                  </div>
                  <div className="w-0 h-0 mt-px" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `6px solid ${guide.pinColor}` }} />
                </div>
              )}
            </button>
          );
        })}

        {/* User's Marked Places */}
        {userPlaces.map((place) => (
          <div
            key={place.id}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-full"
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
          >
            <div className="flex flex-col items-center drop-shadow-lg">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border-3 border-white"
                style={{ backgroundColor: place.color ?? "#4CAF50", border: "3px solid white" }}
              >
                <Bookmark className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="w-0 h-0 mt-px" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `6px solid ${place.color ?? "#4CAF50"}` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 pt-12 px-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E3A5F]" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides or cities..."
              className="w-full pl-10 pr-10 h-11 rounded-2xl bg-white border-none shadow-lg outline-none text-[#1E3A5F] placeholder:text-[#6B7C93] text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[#6B7C93]" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedPin(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap shadow-md text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-[#E07856] text-white"
                  : "bg-white text-[#1E3A5F] hover:bg-[#FFF8F0]"
              }`}
            >
              {filter}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${activeFilter === filter ? "bg-white/20 text-white" : "bg-[#FFF8F0] text-[#E07856]"}`}>
                {filterCounts[filter]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-1/3 z-20 flex flex-col gap-3">
        <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          <Navigation className="w-5 h-5 text-[#1E3A5F]" />
        </button>
        <button
          onClick={() => setMapStyle((s) => (s === "satellite" ? "street" : "satellite"))}
          className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg"
        >
          <Layers className={`w-5 h-5 ${mapStyle === "street" ? "text-[#E07856]" : "text-[#1E3A5F]"}`} />
        </button>
        {user && (
          <button
            onClick={() => setShowMarkModal(true)}
            className="w-11 h-11 bg-[#4CAF50] rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Bookmark className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Results Badge */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-[#1E3A5F] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-xl">
          {filteredGuides.filter((g) => g.available).length} guides available
          {activeFilter !== "All Guides" ? ` · ${activeFilter}` : ""}
        </div>
      </div>

      {/* Mark Place Modal */}
      {showMarkModal && (
        <div className="absolute inset-0 z-40 bg-black/50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6">
            <h3 className="font-bold text-[#1E3A5F] mb-1">Mark this place</h3>
            <p className="text-sm text-[#6B7C93] mb-4">Save a location with a note</p>
            <input
              value={markNote}
              onChange={(e) => setMarkNote(e.target.value)}
              placeholder="Add a note (e.g. 'Great viewpoint!')"
              className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowMarkModal(false)}
                className="flex-1 py-3 border border-[#E5E7EB] rounded-2xl text-[#6B7C93] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkPlace}
                className="flex-1 py-3 bg-[#4CAF50] rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
              >
                <BookmarkCheck className="w-4 h-4" />
                Save Place
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20 transition-all duration-300 ${sheetHeights[sheetState]}`}>
        {/* Handle */}
        <div className="flex flex-col items-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[#E07856]/30 rounded-full" />
          <button onClick={cycleSheet} className="flex items-center gap-1 text-[#6B7C93] text-xs py-1.5">
            {sheetState === "expanded" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            <span>{sheetState === "collapsed" ? "Show guides" : sheetState === "half" ? "See all" : "Collapse"}</span>
          </button>
        </div>

        {sheetState !== "collapsed" && (
          <div className="overflow-y-auto h-full pb-6 px-4">
            {/* Sheet tabs if user has marked places */}
            {user && userPlaces.length > 0 && !selectedGuide && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setActiveSheet("guides")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${activeSheet === "guides" ? "bg-[#E07856] text-white" : "bg-[#F3F4F6] text-[#6B7C93]"}`}
                >
                  Guides ({filteredGuides.length})
                </button>
                <button
                  onClick={() => setActiveSheet("myplaces")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${activeSheet === "myplaces" ? "bg-[#4CAF50] text-white" : "bg-[#F3F4F6] text-[#6B7C93]"}`}
                >
                  My Places ({userPlaces.length})
                </button>
              </div>
            )}

            {selectedGuide ? (
              /* Selected guide detail */
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1E3A5F]">Selected Guide</h3>
                  <button onClick={() => setSelectedPin(null)} className="text-sm text-[#E07856] font-medium">
                    See all
                  </button>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <img src={selectedGuide.avatar} alt={selectedGuide.name} className="w-16 h-16 rounded-2xl object-cover" />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${selectedGuide.available ? "bg-[#4CAF50]" : "bg-[#6B7C93]"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#1E3A5F]">{selectedGuide.name}</h4>
                        {selectedGuide.verified && (
                          <div className="w-4 h-4 bg-[#4CAF50] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#6B7C93] mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{selectedGuide.city}, {selectedGuide.country}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                        <span className="text-sm font-semibold text-[#1E3A5F]">{selectedGuide.rating}</span>
                        <span className="text-xs text-[#6B7C93]">({selectedGuide.reviewCount})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#E07856]">${selectedGuide.price}</p>
                      <p className="text-xs text-[#6B7C93]">per hour</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/messages?guideId=${selectedGuide.id}`)}
                      className="flex-1 h-10 bg-white border-2 border-[#E07856] text-[#E07856] rounded-xl font-medium text-sm flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                    <button
                      onClick={() => navigate(`/guide/${selectedGuide.id}`)}
                      className="flex-1 h-10 bg-white border-2 border-[#1E3A5F] text-[#1E3A5F] rounded-xl font-medium text-sm"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => navigate(`/booking/${selectedGuide.id}`)}
                      className="flex-1 h-10 bg-[#E07856] text-white rounded-xl font-medium text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ) : activeSheet === "myplaces" && user ? (
              /* User's marked places */
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1E3A5F]">My Marked Places</h3>
                  <button onClick={() => setShowMarkModal(true)} className="text-sm text-[#4CAF50] font-semibold">
                    + Mark new
                  </button>
                </div>
                <div className="space-y-2">
                  {userPlaces.map((place) => (
                    <div key={place.id} className="bg-[#F7FAF8] rounded-2xl p-3 flex items-center gap-3 border border-[#E5E7EB]">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: place.color ?? "#4CAF50" }}>
                        <Bookmark className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1E3A5F] text-sm truncate">{place.name}</p>
                        <p className="text-xs text-[#6B7C93] truncate">{place.note}</p>
                      </div>
                      <button
                        onClick={() => unmarkPlace(place.id)}
                        className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Guide list */
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1E3A5F]">
                    {activeFilter === "All Guides" ? "Nearby Guides" : activeFilter}
                  </h3>
                  <span className="text-sm text-[#6B7C93]">{filteredGuides.length} found</span>
                </div>
                {filteredGuides.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#6B7C93] mb-2">No guides match this filter</p>
                    <button onClick={() => setActiveFilter("All Guides")} className="text-[#E07856] font-semibold text-sm">
                      Show all guides
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredGuides.map((guide) => (
                      <button
                        key={guide.id}
                        onClick={() => { setSelectedPin(guide.id); }}
                        className="w-full bg-white rounded-2xl p-3 border border-border shadow-sm flex items-center gap-3 text-left hover:shadow-md transition-shadow"
                      >
                        <div className="relative flex-shrink-0">
                          <img src={guide.avatar} alt={guide.name} className="w-14 h-14 rounded-xl object-cover" />
                          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${guide.available ? "bg-[#4CAF50]" : "bg-[#6B7C93]"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#1E3A5F] truncate">{guide.name}</span>
                            {guide.verified && (
                              <div className="w-3.5 h-3.5 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white" style={{ fontSize: "8px" }}>✓</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#6B7C93] mt-0.5">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{guide.city}, {guide.country}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                              <span className="text-xs font-semibold text-[#1E3A5F]">{guide.rating}</span>
                            </div>
                            <span className="text-xs bg-[#FFF8F0] text-[#E07856] px-2 py-0.5 rounded-full">
                              {guide.expertise[0]}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-[#E07856]">${guide.price}</p>
                          <p className="text-xs text-[#6B7C93]">/hr</p>
                          <span className={`text-xs font-medium ${guide.available ? "text-[#4CAF50]" : "text-[#6B7C93]"}`}>
                            {guide.available ? "Available" : "Offline"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}