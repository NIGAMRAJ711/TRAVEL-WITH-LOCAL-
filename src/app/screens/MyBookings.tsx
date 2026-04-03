import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useAuth, BookingRecord } from "../context/AuthContext";

type StatusFilter = "All" | "Upcoming" | "Completed" | "Cancelled";

const statusConfig: Record<BookingRecord["status"], { label: string; color: string; bg: string; icon: React.FC<any> }> = {
  confirmed: { label: "Confirmed", color: "text-emerald-700", bg: "bg-emerald-50", icon: CheckCircle },
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50", icon: AlertCircle },
  completed: { label: "Completed", color: "text-[#6B7C93]", bg: "bg-[#F3F4F6]", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
};

export function MyBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const bookings = user?.bookings ?? [];

  const filtered = bookings.filter((b) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Upcoming") return b.status === "confirmed" || b.status === "pending";
    if (activeFilter === "Completed") return b.status === "completed";
    if (activeFilter === "Cancelled") return b.status === "cancelled";
    return true;
  });

  const filters: StatusFilter[] = ["All", "Upcoming", "Completed", "Cancelled"];

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-8" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E3A5F]" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#1E3A5F]">My Bookings</h1>
            <p className="text-xs text-[#6B7C93]">{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium flex-shrink-0 transition-all ${
                activeFilter === f
                  ? "bg-[#E07856] text-white shadow-sm"
                  : "bg-[#F3F4F6] text-[#6B7C93]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings */}
      <div className="px-4 pt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#B0BAC4]" />
            </div>
            <p className="text-[#1E3A5F] font-semibold mb-1">No bookings found</p>
            <p className="text-[#6B7C93] text-sm mb-6">
              {activeFilter === "All" ? "Start exploring and book your first guide!" : `No ${activeFilter.toLowerCase()} bookings.`}
            </p>
            {activeFilter === "All" && (
              <button
                onClick={() => navigate("/home")}
                className="px-6 py-3 bg-[#E07856] text-white rounded-2xl text-sm font-semibold shadow-sm"
              >
                Find a Guide
              </button>
            )}
          </div>
        ) : (
          filtered.map((booking) => {
            const cfg = statusConfig[booking.status];
            const StatusIcon = cfg.icon;
            const isExpanded = expandedId === booking.id;

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB]"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={booking.guideAvatar}
                      alt={booking.guideName}
                      className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="font-bold text-[#1E3A5F] text-sm">{booking.guideName}</h3>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${cfg.bg}`}>
                          <StatusIcon className={`w-3 h-3 ${cfg.color}`} />
                          <span className={`text-[10px] font-semibold ${cfg.color}`}>{cfg.label}</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-[#E07856] mb-1">{booking.tourType}</p>
                      <div className="flex items-center gap-3 text-xs text-[#6B7C93]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{booking.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{booking.date}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#B0BAC4] flex-shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[#F3F4F6]">
                    <div className="grid grid-cols-3 gap-3 py-3">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-0.5">
                          <Clock className="w-3.5 h-3.5 text-[#6B7C93]" />
                          <span className="text-xs text-[#6B7C93]">Time</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E3A5F]">{booking.time}</span>
                      </div>
                      <div className="text-center border-x border-[#F3F4F6]">
                        <div className="flex items-center justify-center gap-1 mb-0.5">
                          <Calendar className="w-3.5 h-3.5 text-[#6B7C93]" />
                          <span className="text-xs text-[#6B7C93]">Duration</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1E3A5F]">{booking.duration}</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-0.5">
                          <span className="text-xs text-[#6B7C93]">Total</span>
                        </div>
                        <span className="text-sm font-bold text-[#E07856]">${booking.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/messages?guide=${booking.guideId}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#E5E7EB] rounded-2xl text-sm font-semibold text-[#1E3A5F]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                      {booking.status === "completed" && (
                        <button
                          onClick={() => navigate(`/guide/${booking.guideId}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-amber-50 rounded-2xl text-sm font-semibold text-amber-700"
                        >
                          <Star className="w-4 h-4" />
                          Leave Review
                        </button>
                      )}
                      {(booking.status === "confirmed" || booking.status === "pending") && (
                        <button
                          onClick={() => navigate(`/guide/${booking.guideId}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#1E3A5F] rounded-2xl text-sm font-semibold text-white"
                        >
                          View Guide
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
