import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Play,
  Volume2,
  VolumeX,
  ArrowLeft,
  MoreHorizontal,
  Star,
  Send,
  X,
  Calendar,
} from "lucide-react";
import { allGuides } from "../data/guides";
import { useAuth } from "../context/AuthContext";

type Reel = {
  id: number;
  image: string;
  guideId: number;
  location: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  savedDefault: boolean;
  likedDefault: boolean;
  tags: string[];
};

const reels: Reel[] = [
  {
    id: 1,
    guideId: 3,
    image: "https://images.unsplash.com/photo-1730385835399-4d0f24898919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0JTIwbmlnaHQlMjBuZW9ufGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Tokyo, Japan",
    description: "Hidden gem: The secret ramen alley that only locals know about 🍜 Come with me for a late night adventure through Shinjuku's neon-lit streets!",
    likes: 2847, comments: 134, shares: 89, savedDefault: false, likedDefault: false,
    tags: ["#tokyo", "#nightlife", "#hiddengems", "#foodie"],
  },
  {
    id: 2,
    guideId: 6,
    image: "https://images.unsplash.com/photo-1662128406983-e9c949797f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzcGFpbiUyMGFyY2hpdGVjdHVyZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NDg1MDkwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Barcelona, Spain",
    description: "Gaudí's masterpiece like you've never seen it 🌈 I'll take you to the secret sunrise spot where this incredible view is completely empty of tourists!",
    likes: 5213, comments: 287, shares: 342, savedDefault: true, likedDefault: true,
    tags: ["#barcelona", "#gaudi", "#architecture", "#sunrise"],
  },
  {
    id: 3,
    guideId: 2,
    image: "https://images.unsplash.com/photo-1679161058888-0f0dc825e8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwaXRhbHklMjBjb2xvc3NldW0lMjBhbmNpZW50JTIwcnVpbnN8ZW58MXx8fHwxNzc0ODUwOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Rome, Italy",
    description: "The real Colosseum experience — no crowds, no rush 🏛️ The early morning light hitting the ancient stones is absolutely breathtaking. Book a dawn tour with me!",
    likes: 3654, comments: 198, shares: 215, savedDefault: false, likedDefault: false,
    tags: ["#rome", "#colosseum", "#history", "#ancientrome"],
  },
  {
    id: 4,
    guideId: 1,
    image: "https://images.unsplash.com/photo-1758346971333-c6945f490e06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBjaXR5JTIwc3RyZWV0JTIwbG9jYWwlMjBtYXJrZXR8ZW58MXx8fHwxNzc0ODUwOTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Paris, France",
    description: "Sunday morning at Marché d'Aligre — the city's best-kept secret market 🥐🌹 The freshest produce, vintage finds, and the best croissant you'll ever taste!",
    likes: 6891, comments: 415, shares: 523, savedDefault: true, likedDefault: true,
    tags: ["#paris", "#market", "#sunday", "#frenchlife"],
  },
  {
    id: 5,
    guideId: 4,
    image: "https://images.unsplash.com/photo-1647868044625-5637ff8abd1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBzdHJlZXQlMjBtYXJrZXQlMjB2aW50YWdlfGVufDF8fHx8MTc3NDk5MDk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "London, UK",
    description: "Portobello Road on a Saturday morning — antique treasure hunting with a local 🎸 Found a first-edition book and a vintage vinyl record for £2 each!",
    likes: 4127, comments: 223, shares: 178, savedDefault: false, likedDefault: false,
    tags: ["#london", "#portobello", "#vintage", "#streetmarket"],
  },
  {
    id: 6,
    guideId: 5,
    image: "https://images.unsplash.com/photo-1636682489073-125e6855a665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmUlMjBicm9va2x5bnxlbnwxfHx8fDE3NzQ5OTA5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "New York, USA",
    description: "This rooftop bar has zero tourists and the best view of Manhattan 🗽 My Brooklyn insiders' guide will change how you see NYC forever.",
    likes: 7543, comments: 512, shares: 634, savedDefault: false, likedDefault: false,
    tags: ["#newyork", "#brooklyn", "#rooftop", "#nyc"],
  },
  {
    id: 7,
    guideId: 3,
    image: "https://images.unsplash.com/photo-1649957866905-bef01af303da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGphcGFuJTIwdGVtcGxlJTIwY2hlcnJ5JTIwYmxvc3NvbXxlbnwxfHx8fDE3NzQ5OTA5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Kyoto, Japan",
    description: "Cherry blossom season at a temple with zero tourists 🌸 I know the secret timing and the hidden path that 99% of visitors never find. DM me for details!",
    likes: 9832, comments: 701, shares: 892, savedDefault: true, likedDefault: false,
    tags: ["#kyoto", "#sakura", "#cherryblossom", "#japan"],
  },
  {
    id: 8,
    guideId: 6,
    image: "https://images.unsplash.com/photo-1770359646967-1d008a71e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91ciUyMHN0cmVldCUyMGZvb2QlMjBjb29raW5nJTIwY2xhc3N8ZW58MXx8fHwxNzc0ODUwOTA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Barcelona, Spain",
    description: "La Boqueria is overrated — THIS is where Barcelonans actually buy their ingredients 🍅 My neighbourhood market tour is a foodie's dream come true.",
    likes: 3201, comments: 167, shares: 245, savedDefault: false, likedDefault: false,
    tags: ["#barcelona", "#market", "#food", "#spain"],
  },
  {
    id: 9,
    guideId: 1,
    image: "https://images.unsplash.com/photo-1720988583730-1191f37e5fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzc0NzcyMjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Paris, France",
    description: "The Eiffel Tower at 5am — just me, a coffee, and absolute magic ✨ I know exactly where to stand for this shot. Let me show you Paris before it wakes up.",
    likes: 11230, comments: 834, shares: 1102, savedDefault: false, likedDefault: true,
    tags: ["#paris", "#eiffeltower", "#dawn", "#magic"],
  },
  {
    id: 10,
    guideId: 2,
    image: "https://images.unsplash.com/photo-1629212093584-6e1769fb1598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMHR1cmtleSUyMGJhemFhciUyMG1hcmtldCUyMGN1bHR1cmV8ZW58MXx8fHwxNzc0ODUwOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Istanbul, Turkey",
    description: "The Grand Bazaar through a local's eyes 🕌✨ 4,000 shops and I know which ones have the real deals — and which ones to avoid. Turkish tea included!",
    likes: 4127, comments: 223, shares: 178, savedDefault: false, likedDefault: false,
    tags: ["#istanbul", "#grandbazaar", "#culture", "#shopping"],
  },
];

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function Reels() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReels, setLikedReels] = useState<Set<number>>(
    new Set(reels.filter((r) => r.likedDefault).map((r) => r.id))
  );
  const [savedReels, setSavedReels] = useState<Set<number>>(
    new Set(reels.filter((r) => r.savedDefault).map((r) => r.id))
  );
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [contactSheet, setContactSheet] = useState<number | null>(null); // guideId
  const [shareMsg, setShareMsg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLike = (id: number) => setLikedReels((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleSave = (id: number) => setSavedReels((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const handleScroll = () => {
    if (!containerRef.current) return;
    const idx = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
    setCurrentIndex(idx);
  };

  const contactGuide = allGuides.find((g) => g.id === contactSheet);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {reels.map((reel, index) => {
          const guide = allGuides.find((g) => g.id === reel.guideId)!;
          const isLiked = likedReels.has(reel.id);
          const isSaved = savedReels.has(reel.id);
          const likeCount = reel.likes + (isLiked && !reel.likedDefault ? 1 : !isLiked && reel.likedDefault ? -1 : 0);

          return (
            <div key={reel.id} className="relative h-screen w-full snap-start snap-always flex-shrink-0">
              {/* Background image */}
              <img src={reel.image} alt={reel.location} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 pt-12 px-4 flex items-center justify-between z-20">
                <button
                  onClick={() => navigate("/home")}
                  className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                {/* Reel progress dots */}
                <div className="flex items-center gap-1">
                  {reels.map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-full transition-all ${i === currentIndex ? "w-5 h-1 bg-white" : "w-1.5 h-1 bg-white/40"}`}
                    />
                  ))}
                </div>
                <button className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MoreHorizontal className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Play/Pause overlay */}
              <button className="absolute inset-0 z-10" onClick={() => setIsPlaying((p) => !p)}>
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center">
                      <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
              </button>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-52 flex flex-col items-center gap-5 z-20">
                {/* Guide avatar */}
                <button
                  onClick={() => navigate(`/guide/${guide.id}`)}
                  className="relative"
                >
                  <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E07856] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold" style={{ fontSize: "11px" }}>+</span>
                  </div>
                </button>

                {/* Like */}
                <button className="flex flex-col items-center gap-1 z-30" onClick={(e) => { e.stopPropagation(); toggleLike(reel.id); }}>
                  <Heart className={`w-7 h-7 transition-all ${isLiked ? "fill-[#E07856] text-[#E07856] scale-110" : "text-white"}`} />
                  <span className="text-white text-xs font-semibold">{formatCount(likeCount)}</span>
                </button>

                {/* Comment */}
                <button className="flex flex-col items-center gap-1 z-30" onClick={(e) => { e.stopPropagation(); setContactSheet(reel.guideId); }}>
                  <MessageCircle className="w-7 h-7 text-white" />
                  <span className="text-white text-xs font-semibold">{formatCount(reel.comments)}</span>
                </button>

                {/* Share */}
                <button className="flex flex-col items-center gap-1 z-30" onClick={(e) => e.stopPropagation()}>
                  <Share2 className="w-7 h-7 text-white" />
                  <span className="text-white text-xs font-semibold">{formatCount(reel.shares)}</span>
                </button>

                {/* Save */}
                <button className="flex flex-col items-center gap-1 z-30" onClick={(e) => { e.stopPropagation(); toggleSave(reel.id); }}>
                  <Bookmark className={`w-7 h-7 transition-colors ${isSaved ? "fill-[#FF8C42] text-[#FF8C42]" : "text-white"}`} />
                </button>

                {/* Mute */}
                <button
                  className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center z-30"
                  onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                >
                  {muted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-16 p-5 pb-10 z-20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-semibold">@{guide.name.toLowerCase().replace(" ", "_")}</span>
                  {guide.verified && (
                    <div className="w-4 h-4 bg-[#4CAF50] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                    <span className="text-white text-xs">{guide.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-4 h-4 text-[#FF8C42]" />
                  <span className="text-[#FF8C42] text-sm font-semibold">{reel.location}</span>
                </div>
                <p className="text-white text-sm leading-relaxed mb-2 line-clamp-2">{reel.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {reel.tags.map((tag) => (
                    <span key={tag} className="text-[#FF8C42]/80 text-xs">{tag}</span>
                  ))}
                </div>
                {/* CTA Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setContactSheet(reel.guideId)}
                    className="flex-1 h-10 bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact
                  </button>
                  <button
                    onClick={() => navigate(`/booking/${reel.guideId}`)}
                    className="flex-1 h-10 bg-[#E07856] rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Guide Bottom Sheet */}
      {contactSheet !== null && contactGuide && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setContactSheet(null)} />
          <div className="relative bg-white rounded-t-3xl p-6 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={contactGuide.avatar} alt={contactGuide.name} className="w-12 h-12 rounded-full object-cover" />
                  {contactGuide.available && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#4CAF50] rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#1E3A5F]">{contactGuide.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                    <span className="text-xs text-[#6B7C93]">{contactGuide.rating} · {contactGuide.city}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setContactSheet(null)} className="w-8 h-8 bg-[#FFF8F0] rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-[#6B7C93]" />
              </button>
            </div>

            {/* Quick message input */}
            <p className="text-sm text-[#6B7C93] mb-3">Send a quick message to {contactGuide.name.split(" ")[0]}</p>
            <div className="flex gap-2 mb-4">
              <input
                value={shareMsg}
                onChange={(e) => setShareMsg(e.target.value)}
                placeholder={`Hi ${contactGuide.name.split(" ")[0]}! I saw your reel...`}
                className="flex-1 h-11 px-4 rounded-2xl bg-[#FFF8F0] border border-border outline-none text-[#1E3A5F] text-sm placeholder:text-[#6B7C93]"
              />
              <button
                onClick={() => { navigate(`/messages?guideId=${contactGuide.id}`); setContactSheet(null); }}
                className="w-11 h-11 bg-[#E07856] rounded-2xl flex items-center justify-center"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Quick reply chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[`Hi ${contactGuide.name.split(" ")[0]}! I loved your reel 😍`, "What are your rates?", "Are you available this week?", "Tell me more about your tours!"].map((q) => (
                <button
                  key={q}
                  onClick={() => setShareMsg(q)}
                  className="px-3 py-1.5 bg-[#FFF8F0] border border-[#E07856]/30 text-[#E07856] rounded-full text-xs font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/guide/${contactGuide.id}`)}
                className="flex-1 h-12 border-2 border-[#1E3A5F] text-[#1E3A5F] rounded-2xl font-semibold"
              >
                View Profile
              </button>
              <button
                onClick={() => navigate(`/booking/${contactGuide.id}`)}
                className="flex-1 h-12 bg-[#E07856] text-white rounded-2xl font-semibold"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}