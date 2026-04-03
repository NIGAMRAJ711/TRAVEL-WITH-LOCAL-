import { useNavigate } from "react-router";
import { ArrowLeft, Heart, Star, MapPin, MessageCircle, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { allGuides } from "../data/guides";

export function SavedGuides() {
  const navigate = useNavigate();
  const { user, unsaveGuide } = useAuth();

  const savedIds = user?.savedGuides ?? [];
  const savedGuides = allGuides.filter((g) => savedIds.includes(g.id));

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-8" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E3A5F]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#1E3A5F]">Saved Guides</h1>
            <p className="text-xs text-[#6B7C93]">{savedGuides.length} guide{savedGuides.length !== 1 ? "s" : ""} saved</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-3">
        {savedGuides.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#FFF3EE] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#E07856]/40" />
            </div>
            <p className="text-[#1E3A5F] font-semibold mb-1">No saved guides yet</p>
            <p className="text-[#6B7C93] text-sm mb-6">Tap the heart icon on any guide to save them here.</p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-[#E07856] text-white rounded-2xl text-sm font-semibold shadow-sm"
            >
              Explore Guides
            </button>
          </div>
        ) : (
          savedGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB]"
            >
              {/* Cover Image */}
              <div className="relative h-36">
                <img
                  src={guide.coverImage}
                  alt={guide.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Remove from saved */}
                <button
                  onClick={() => unsaveGuide(guide.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                >
                  <Heart className="w-4 h-4 text-[#E07856] fill-[#E07856]" />
                </button>
                {/* City badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <MapPin className="w-3 h-3 text-[#E07856]" />
                  <span className="text-xs font-semibold text-[#1E3A5F]">{guide.city}, {guide.country}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FFF8F0]"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1E3A5F]">{guide.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-[#1E3A5F]">{guide.rating}</span>
                      <span className="text-xs text-[#6B7C93]">({guide.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#E07856]">${guide.price}</div>
                    <div className="text-xs text-[#6B7C93]">/ hour</div>
                  </div>
                </div>

                <p className="text-xs text-[#6B7C93] line-clamp-2 mb-3">{guide.description}</p>

                {/* Languages */}
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {guide.languages.slice(0, 3).map((lang) => (
                    <span key={lang} className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7C93] rounded-full text-xs">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/messages?guide=${guide.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#E5E7EB] rounded-2xl text-sm font-semibold text-[#1E3A5F] hover:bg-[#F3F4F6] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </button>
                  <button
                    onClick={() => navigate(`/booking/${guide.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#E07856] rounded-2xl text-sm font-semibold text-white shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Book
                  </button>
                  <button
                    onClick={() => navigate(`/guide/${guide.id}`)}
                    className="px-3.5 py-2.5 bg-[#1E3A5F] rounded-2xl text-sm font-semibold text-white"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
