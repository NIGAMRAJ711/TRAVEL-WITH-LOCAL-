import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Heart, Globe, ArrowRight, Star, Users, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const slides = [
  {
    id: 0,
    headline: "Explore like a local",
    sub: "Connect with verified local guides who know their city inside out",
    image: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accent: "#E07856",
    from: "#E07856",
    to: "#FF8C42",
  },
  {
    id: 1,
    headline: "Hidden gems await",
    sub: "Discover secret spots, authentic food, and unforgettable experiences",
    image: "https://images.unsplash.com/photo-1649957866905-bef01af303da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accent: "#1E3A5F",
    from: "#1E3A5F",
    to: "#2D5A8E",
  },
  {
    id: 2,
    headline: "Become a guide",
    sub: "Share your city with travelers from around the world and earn income",
    image: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accent: "#E07856",
    from: "#E07856",
    to: "#FF8C42",
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSplash, setIsSplash] = useState(true);

  // If already logged in, redirect
  useEffect(() => {
    if (!isLoading && user) {
      navigate(user.role === "guide" ? "/dashboard" : "/home", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Splash → slides after 1.8s
  useEffect(() => {
    const t = setTimeout(() => setIsSplash(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isSplash) return;
    const t = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [isSplash]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center" style={{ maxWidth: 390, margin: "0 auto" }}>
        <div className="w-8 h-8 border-3 border-[#E07856]/30 border-t-[#E07856] rounded-full animate-spin" />
      </div>
    );
  }

  // Splash Screen
  if (isSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E07856] to-[#FF8C42] flex flex-col items-center justify-center" style={{ maxWidth: 390, margin: "0 auto" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
            <MapPin className="w-14 h-14 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">LocalLens</h1>
            <p className="text-white/80 mt-2">Your city. Their story.</p>
          </div>
          <div className="mt-4 w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] relative overflow-hidden" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Slide Image */}
      <div className="relative h-[52vh] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FFF8F0]" />
          </div>
        ))}

        {/* Logo overlay */}
        <div className="absolute top-12 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <div className="w-7 h-7 bg-[#E07856] rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#1E3A5F]">LocalLens</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 -mt-6 relative z-10">
        {/* Slide dots */}
        <div className="flex gap-2 justify-center mb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-6 h-2 bg-[#E07856]" : "w-2 h-2 bg-[#E07856]/30"
              }`}
            />
          ))}
        </div>

        {/* Headline */}
        <div className="text-center mb-6 min-h-[80px]">
          <h1 className="text-3xl font-bold text-[#1E3A5F] mb-2 transition-all duration-500">
            {slide.headline}
          </h1>
          <p className="text-[#6B7C93] text-sm leading-relaxed">
            {slide.sub}
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          <Pill icon={Heart} label="Authentic" />
          <Pill icon={Globe} label="Local Experts" />
          <Pill icon={Shield} label="Verified" />
          <Pill icon={Star} label="Top Rated" />
          <Pill icon={Users} label="Community" />
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mt-auto pb-10">
          <button
            onClick={() => navigate("/login")}
            className="w-full h-14 bg-gradient-to-r from-[#E07856] to-[#FF8C42] text-white rounded-2xl font-semibold text-base shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full h-12 bg-white border-2 border-[#E07856]/20 text-[#E07856] rounded-2xl font-semibold text-sm shadow-sm hover:bg-[#FFF3EE] transition-colors"
          >
            Sign In to Your Account
          </button>

          {/* Demo shortcuts */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-2.5 bg-[#F3F4F6] rounded-2xl text-xs font-semibold text-[#6B7C93] flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E07856]" />
              Traveler Demo
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-2.5 bg-[#F3F4F6] rounded-2xl text-xs font-semibold text-[#6B7C93] flex items-center justify-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-[#1E3A5F]" />
              Guide Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label }: { icon: React.FC<any>; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#F3F4F6]">
      <Icon className="w-3.5 h-3.5 text-[#E07856]" />
      <span className="text-xs text-[#1E3A5F] font-medium">{label}</span>
    </div>
  );
}
