import { useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { 
  DollarSign, 
  Calendar, 
  Star, 
  TrendingUp, 
  User, 
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const upcomingBookings = [
  {
    id: 1,
    traveler: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
    date: "Mar 31, 2026",
    time: "10:00 AM",
    duration: "Half Day",
    price: 120,
    status: "confirmed",
  },
  {
    id: 2,
    traveler: "Emma Chen",
    avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    date: "Apr 2, 2026",
    time: "2:00 PM",
    duration: "Full Day",
    price: 200,
    status: "confirmed",
  },
  {
    id: 3,
    traveler: "David Park",
    avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    date: "Apr 5, 2026",
    time: "11:00 AM",
    duration: "1 Hour",
    price: 35,
    status: "pending",
  },
];

const recentReviews = [
  {
    id: 1,
    traveler: "Jessica L.",
    avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    date: "Feb 28, 2026",
    comment: "Best tour guide ever! So knowledgeable and friendly.",
  },
  {
    id: 2,
    traveler: "Michael R.",
    avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 5,
    date: "Feb 25, 2026",
    comment: "Amazing experience! Sophie took us to incredible hidden spots.",
  },
];

export function GuideDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const guideName = user?.name ?? "Sophie";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E07856] to-[#FF8C42] pt-12 pb-8 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Guide Dashboard
              </h1>
              <p className="text-white/80">Welcome back, {guideName.split(" ")[0]}!</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Availability Toggle */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold mb-1">Availability Status</p>
                <p className="text-white/80 text-sm">
                  {isAvailable ? "You're currently accepting bookings" : "You're offline"}
                </p>
              </div>
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-[#4CAF50]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-4 mb-6">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#E6F2ED] rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#4CAF50]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A5F] mb-1">$3,450</p>
            <p className="text-sm text-[#6B7C93]">This Month</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-[#4CAF50]" />
              <span className="text-xs text-[#4CAF50] font-semibold">+18%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FFF8F0] rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#E07856]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A5F] mb-1">24</p>
            <p className="text-sm text-[#6B7C93]">Total Bookings</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-[#4CAF50]" />
              <span className="text-xs text-[#4CAF50] font-semibold">+3 this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#FFF3E0] rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-[#FF8C42]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A5F] mb-1">4.9</p>
            <p className="text-sm text-[#6B7C93]">Avg Rating</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-[#6B7C93]">127 reviews</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-[#E3F2FD] rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#2196F3]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A5F] mb-1">5</p>
            <p className="text-sm text-[#6B7C93]">New Messages</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-[#2196F3] font-semibold">Reply now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="px-6 mb-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">
            Upcoming Bookings
          </h3>
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={booking.avatar}
                    alt={booking.traveler}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-[#1E3A5F]">
                          {booking.traveler}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-[#6B7C93] mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{booking.date}</span>
                          <span>•</span>
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed" ? "default" : "secondary"
                        }
                        className={
                          booking.status === "confirmed"
                            ? "bg-[#4CAF50] text-white"
                            : "bg-[#FFF8F0] text-[#E07856]"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-[#6B7C93]">
                        {booking.duration}
                      </span>
                      <span className="font-bold text-[#E07856]">
                        ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="px-6 mb-8">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">
            Recent Reviews
          </h3>
          <div className="space-y-3">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={review.avatar}
                    alt={review.traveler}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#1E3A5F]">
                        {review.traveler}
                      </span>
                      <span className="text-sm text-[#6B7C93]">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#FF8C42] text-[#FF8C42]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#6B7C93]">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="max-w-md mx-auto flex items-center justify-around py-3 px-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "dashboard" ? "text-[#E07856]" : "text-[#6B7C93]"
            }`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "bookings" ? "text-[#E07856]" : "text-[#6B7C93]"
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Bookings</span>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "messages" ? "text-[#E07856]" : "text-[#6B7C93]"
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "profile" ? "text-[#E07856]" : "text-[#6B7C93]"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}