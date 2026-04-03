import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Star,
  MapPin,
  MessageCircle,
  Share2,
  Languages,
  Heart,
  Clock,
  CheckCircle,
} from "lucide-react";
import { allGuides } from "../data/guides";

export function GuideProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hearted, setHearted] = useState(false);

  const guide = allGuides.find((g) => g.id === Number(id)) ?? allGuides[0];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Cover Image */}
      <div className="relative h-64">
        <img
          src={guide.coverImage}
          alt={guide.city}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Header Icons */}
        <div className="absolute top-12 left-0 right-0 px-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E3A5F]" />
          </button>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Share2 className="w-5 h-5 text-[#1E3A5F]" />
            </button>
            <button
              onClick={() => setHearted((h) => !h)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${hearted ? "fill-[#E07856] text-[#E07856]" : "text-[#E07856]"}`}
              />
            </button>
          </div>
        </div>

        {/* City / availability badge */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-sm font-medium">{guide.city}, {guide.country}</span>
          </div>
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${guide.available ? "bg-[#4CAF50]" : "bg-[#6B7C93]"}`}>
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white text-xs font-semibold">{guide.available ? "Available" : "Offline"}</span>
          </div>
        </div>
      </div>

      {/* Profile Info Card */}
      <div className="px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-border">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 mb-5">
            <img
              src={guide.avatar}
              alt={guide.name}
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-[#1E3A5F]">{guide.name}</h2>
                {guide.verified && (
                  <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FF8C42] text-[#FF8C42]" />
                  <span className="font-semibold text-[#1E3A5F]">{guide.rating}</span>
                  <span className="text-sm text-[#6B7C93]">({guide.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[#6B7C93]">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-sm">{guide.experience} experience</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-[#FFF8F0] rounded-2xl p-3">
              <div className="flex items-center gap-2 text-[#6B7C93] mb-1">
                <Languages className="w-4 h-4" />
                <span className="text-sm">Languages</span>
              </div>
              <p className="font-semibold text-[#1E3A5F] text-sm">{guide.languages.join(", ")}</p>
            </div>
            <div className="bg-[#FFF8F0] rounded-2xl p-3">
              <div className="flex items-center gap-2 text-[#6B7C93] mb-1">
                <Star className="w-4 h-4" />
                <span className="text-sm">Starting from</span>
              </div>
              <p className="font-semibold text-[#E07856]">${guide.price}/hour</p>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-2">
            {guide.expertise.map((exp) => (
              <Badge key={exp} variant="secondary" className="bg-[#E07856]/10 text-[#E07856] border-none">
                {exp}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-6 mt-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-3">About</h3>
          <p className="text-[#6B7C93] leading-relaxed">{guide.bio}</p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="px-6 mt-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">Places I'll Take You</h3>
          <div className="grid grid-cols-3 gap-3">
            {guide.gallery.map((img, index) => (
              <div key={index} className="aspect-square rounded-2xl overflow-hidden">
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-6 mt-5">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">Pricing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="font-medium text-[#1E3A5F]">Per Hour</p>
                <p className="text-sm text-[#6B7C93]">Flexible drop-in session</p>
              </div>
              <span className="text-xl font-bold text-[#E07856]">${guide.pricing.hour}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <p className="font-medium text-[#1E3A5F]">Half Day</p>
                <p className="text-sm text-[#6B7C93]">4 hours of exploration</p>
              </div>
              <span className="text-xl font-bold text-[#E07856]">${guide.pricing.halfDay}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-[#1E3A5F]">Full Day</p>
                <p className="text-sm text-[#6B7C93]">8 hours, full immersion</p>
              </div>
              <span className="text-xl font-bold text-[#E07856]">${guide.pricing.fullDay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-6 mt-5 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-[#1E3A5F]">Reviews</h3>
            <div className="flex items-center gap-1 bg-[#FFF8F0] rounded-full px-3 py-1">
              <Star className="w-3.5 h-3.5 fill-[#FF8C42] text-[#FF8C42]" />
              <span className="text-sm font-semibold text-[#1E3A5F]">{guide.rating}</span>
              <span className="text-sm text-[#6B7C93]">· {guide.reviews.length} shown</span>
            </div>
          </div>
          <div className="space-y-5">
            {guide.reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#1E3A5F]">{review.name}</span>
                      <span className="text-sm text-[#6B7C93]">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-[#FF8C42] text-[#FF8C42]" : "text-border fill-border"}`} />
                      ))}
                    </div>
                    <p className="text-[#6B7C93] text-sm leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-5">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/messages?guideId=${guide.id}`)}
            className="flex-1 h-14 border-2 border-[#E07856] text-[#E07856] hover:bg-[#E07856]/5 rounded-2xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </Button>
          <Button
            onClick={() => navigate(`/booking/${guide.id}`)}
            className="flex-1 h-14 bg-[#E07856] hover:bg-[#E07856]/90 text-white rounded-2xl"
          >
            Book This Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
