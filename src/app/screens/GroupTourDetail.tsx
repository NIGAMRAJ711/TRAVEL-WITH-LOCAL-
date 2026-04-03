import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Clock,
  Calendar,
  Heart,
  Share2,
  CheckCircle,
  User,
  MessageCircle,
  Shield,
  Award,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Mock data - in a real app this would come from a database
const groupToursData = [
  {
    id: 1,
    title: "Hidden Paris Food Walk",
    description:
      "Explore the secret culinary soul of Paris — artisan cheese shops, unmarked bakeries, and the city's best wine caves. We'll visit 6 stops over 3 hours, tasting local specialties and meeting the artisans who make them.",
    guide: {
      id: 1,
      name: "Sophie Laurent",
      avatar:
        "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
      rating: 4.9,
      verified: true,
      toursLed: 127,
    },
    coverImage:
      "https://images.unsplash.com/photo-1770359646967-1d008a71e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91ciUyMHN0cmVldCUyMGZvb2QlMjBjb29raW5nJTIwY2xhc3N8ZW58MXx8fHwxNzc0ODUwOTA3fDA&ixlib=rb-4.1.0&q=80&w=800",
    location: "Paris, France",
    meetingPoint: "Le Bon Marché, 24 Rue de Sèvres, 75007 Paris",
    date: "April 5, 2026",
    time: "10:00 AM",
    duration: "3 hours",
    pricePerPerson: 28,
    maxSpots: 8,
    spotsLeft: 3,
    category: "Food",
    participants: [
      {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
        city: "San Francisco",
        joinedDate: "Mar 20",
      },
      {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
        city: "London",
        joinedDate: "Mar 21",
      },
      {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
        city: "Toronto",
        joinedDate: "Mar 22",
      },
      {
        name: "Sophia Martinez",
        avatar: "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
        city: "Barcelona",
        joinedDate: "Mar 23",
      },
      {
        name: "Jessica Brown",
        avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
        city: "Sydney",
        joinedDate: "Mar 24",
      },
    ],
    tags: ["Food", "Culture", "Hidden Gems", "Walking"],
    included: [
      "Expert local guide",
      "6 food tastings",
      "Artisan cheese selection",
      "French pastries",
      "Wine cave visit",
      "Recipe cards to take home",
    ],
    notIncluded: ["Transportation", "Additional food purchases", "Gratuities"],
    highlights: [
      "Visit a 200-year-old bakery",
      "Taste award-winning French cheese",
      "Discover hidden wine caves",
      "Meet local artisan makers",
      "Small group (max 8 people)",
      "Insider local knowledge",
    ],
  },
];

export function GroupTourDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, addBooking } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const tour = groupToursData[0]; // In real app, find by id

  const handleJoinTour = async () => {
    setIsJoining(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add to bookings
    if (user) {
      addBooking({
        guideId: tour.guide.id,
        guideName: tour.guide.name,
        guideAvatar: tour.guide.avatar,
        city: tour.location,
        date: tour.date,
        time: tour.time,
        duration: tour.duration,
        price: tour.pricePerPerson,
        status: "confirmed",
        tourType: tour.title,
      });
    }

    setHasJoined(true);
    setIsJoining(false);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Hero Image */}
      <div className="relative h-64">
        <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Header Actions */}
        <div className="absolute top-0 left-0 right-0 pt-12 px-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/group-tours")}
            className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-[#E07856] text-[#E07856]" : "text-white"}`} />
            </button>
            <button className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#E07856] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {tour.category}
          </span>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10">
        {/* Main Info Card */}
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-[#E5E7EB] mb-4">
          <h1 className="text-xl font-bold text-[#1E3A5F] mb-3">{tour.title}</h1>

          {/* Guide Info */}
          <button
            onClick={() => navigate(`/guide/${tour.guide.id}`)}
            className="flex items-center gap-3 mb-4 hover:bg-[#FFF8F0] -mx-2 px-2 py-2 rounded-2xl transition-colors w-full text-left"
          >
            <img
              src={tour.guide.avatar}
              alt={tour.guide.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E07856]/30"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#1E3A5F]">{tour.guide.name}</span>
                {tour.guide.verified && (
                  <div className="w-4 h-4 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <span className="text-white" style={{ fontSize: "8px" }}>
                      ✓
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6B7C93]">
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]" />
                  <span className="font-semibold">{tour.guide.rating}</span>
                </div>
                <span>•</span>
                <span>{tour.guide.toursLed} tours led</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#B0BAC4]" />
          </button>

          {/* Tour Details */}
          <div className="space-y-3 pt-3 border-t border-[#F3F4F6]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E07856] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-[#1E3A5F] text-sm">{tour.location}</div>
                <div className="text-xs text-[#6B7C93]">Meeting: {tour.meetingPoint}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#E07856]" />
              <div>
                <span className="font-medium text-[#1E3A5F] text-sm">{tour.date}</span>
                <span className="text-[#6B7C93] text-sm"> at {tour.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#E07856]" />
              <span className="font-medium text-[#1E3A5F] text-sm">{tour.duration}</span>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#1E3A5F]">Participants</h3>
              <p className="text-xs text-[#6B7C93]">
                {tour.maxSpots - tour.spotsLeft}/{tour.maxSpots} joined
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-sm font-bold ${
                  tour.spotsLeft <= 2 ? "text-[#E07856]" : "text-[#4CAF50]"
                }`}
              >
                {tour.spotsLeft} spot{tour.spotsLeft !== 1 ? "s" : ""} left
              </div>
              <div className="w-24 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full ${
                    tour.spotsLeft <= 2 ? "bg-[#E07856]" : "bg-[#4CAF50]"
                  }`}
                  style={{
                    width: `${((tour.maxSpots - tour.spotsLeft) / tour.maxSpots) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {tour.participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <div className="font-medium text-[#1E3A5F] text-sm">{participant.name}</div>
                  <div className="text-xs text-[#6B7C93]">From {participant.city}</div>
                </div>
                <div className="text-xs text-[#6B7C93]">Joined {participant.joinedDate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <h3 className="font-bold text-[#1E3A5F] mb-3">About This Tour</h3>
          <p className="text-sm text-[#6B7C93] leading-relaxed">{tour.description}</p>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#E07856]" />
            <h3 className="font-bold text-[#1E3A5F]">Highlights</h3>
          </div>
          <div className="space-y-2">
            {tour.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#6B7C93]">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <h3 className="font-bold text-[#1E3A5F] mb-3">What's Included</h3>
          <div className="space-y-2 mb-4">
            {tour.included.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#6B7C93]">{item}</span>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-[#1E3A5F] mb-3 pt-3 border-t border-[#F3F4F6]">
            Not Included
          </h3>
          <div className="space-y-2">
            {tour.notIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-[#E5E7EB] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#6B7C93]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <div className="flex flex-wrap gap-2">
            {tour.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-[#FFF8F0] text-[#E07856] text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 shadow-lg">
        <div className="max-w-[390px] mx-auto flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-[#6B7C93]">Price per person</div>
            <div className="text-2xl font-bold text-[#E07856]">${tour.pricePerPerson}</div>
          </div>
          <button
            onClick={handleJoinTour}
            disabled={isJoining || hasJoined || tour.spotsLeft === 0}
            className={`flex-1 h-12 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
              hasJoined
                ? "bg-[#4CAF50] text-white"
                : tour.spotsLeft === 0
                ? "bg-[#E5E7EB] text-[#B0BAC4] cursor-not-allowed"
                : "bg-gradient-to-r from-[#E07856] to-[#FF8C42] text-white hover:shadow-lg"
            }`}
          >
            {isJoining ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Joining...
              </>
            ) : hasJoined ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Joined!
              </>
            ) : tour.spotsLeft === 0 ? (
              "Fully Booked"
            ) : (
              <>
                <Users className="w-5 h-5" />
                Join Tour
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
