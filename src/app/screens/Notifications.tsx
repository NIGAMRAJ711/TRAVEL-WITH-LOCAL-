import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Bell,
  Calendar,
  MessageCircle,
  Star,
  Tag,
  Settings2,
  Check,
  CheckCheck,
  Trash2,
} from "lucide-react";
import { useAuth, NotificationType, AppNotification } from "../context/AuthContext";

const typeConfig: Record<NotificationType, { icon: React.FC<any>; color: string; bg: string; label: string }> = {
  booking: { icon: Calendar, color: "text-[#E07856]", bg: "bg-[#FFF3EE]", label: "Booking" },
  message: { icon: MessageCircle, color: "text-[#1E3A5F]", bg: "bg-[#EEF2F8]", label: "Message" },
  review: { icon: Star, color: "text-amber-500", bg: "bg-amber-50", label: "Review" },
  promo: { icon: Tag, color: "text-emerald-600", bg: "bg-emerald-50", label: "Promo" },
  system: { icon: Settings2, color: "text-[#6B7C93]", bg: "bg-[#F3F4F6]", label: "System" },
};

const filterTypes = ["All", "Bookings", "Messages", "Reviews", "Promos"] as const;
type FilterType = (typeof filterTypes)[number];

const filterMap: Record<FilterType, NotificationType | null> = {
  All: null,
  Bookings: "booking",
  Messages: "message",
  Reviews: "review",
  Promos: "promo",
};

export function Notifications() {
  const navigate = useNavigate();
  const { user, markNotificationRead, markAllNotificationsRead, clearAllNotifications } = useAuth();
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const notifications = user?.notifications ?? [];
  const filtered =
    filterMap[activeFilter] === null
      ? notifications
      : notifications.filter((n) => n.type === filterMap[activeFilter]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleTap = (n: AppNotification) => {
    if (!n.read) markNotificationRead(n.id);
    if (n.guideId) navigate(`/guide/${n.guideId}`);
    else if (n.type === "message") navigate("/messages");
    else if (n.type === "booking") navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-6" style={{ maxWidth: 390, margin: "0 auto" }}>
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
            <h1 className="text-xl font-bold text-[#1E3A5F]">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-[#6B7C93]">{unreadCount} unread</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#E07856]/10 rounded-full"
              >
                <CheckCheck className="w-3.5 h-3.5 text-[#E07856]" />
                <span className="text-xs font-semibold text-[#E07856]">All read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 text-[#6B7C93]" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterTypes.map((f) => (
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

      {/* List */}
      <div className="px-4 pt-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-[#B0BAC4]" />
            </div>
            <p className="text-[#1E3A5F] font-semibold mb-1">No notifications</p>
            <p className="text-[#6B7C93] text-sm">You're all caught up!</p>
          </div>
        ) : (
          filtered.map((n) => {
            const cfg = typeConfig[n.type];
            const Icon = cfg.icon;
            return (
              <button
                key={n.id}
                onClick={() => handleTap(n)}
                className={`w-full bg-white rounded-2xl p-4 flex gap-3 text-left shadow-sm border transition-all active:scale-[0.98] ${
                  !n.read ? "border-[#E07856]/20" : "border-transparent"
                }`}
              >
                {/* Avatar or Icon */}
                <div className="flex-shrink-0 relative">
                  {n.avatar ? (
                    <img
                      src={n.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-12 h-12 ${cfg.bg} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                  )}
                  {/* Type badge */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 ${cfg.bg} border-2 border-white rounded-full flex items-center justify-center`}>
                    <Icon className={`w-2.5 h-2.5 ${cfg.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-snug ${n.read ? "text-[#1E3A5F]" : "text-[#1E3A5F]"}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <div className="w-2 h-2 bg-[#E07856] rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-[#6B7C93] mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] text-[#B0BAC4]">{n.time}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
