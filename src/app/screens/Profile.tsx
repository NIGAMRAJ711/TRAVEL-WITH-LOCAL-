import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  Heart,
  Calendar,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  Star,
  Home as HomeIcon,
  Map,
  Play,
  MessageCircle,
  User,
  Compass,
  Camera,
  Edit2,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const navigate = useNavigate();
  const { user, logout, toggleRole, unreadNotificationCount } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      icon: Bell,
      label: "Notifications",
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
      onClick: () => navigate("/notifications"),
    },
    {
      icon: Users,
      label: "Friends",
      sub: "Connect with travelers",
      onClick: () => navigate("/friends"),
    },
    {
      icon: Heart,
      label: "Saved Guides",
      sub: user.savedGuides.length > 0 ? `${user.savedGuides.length} saved` : undefined,
      onClick: () => navigate("/saved-guides"),
    },
    {
      icon: Calendar,
      label: "My Bookings",
      sub: user.bookings.length > 0 ? `${user.bookings.length} booking${user.bookings.length !== 1 ? "s" : ""}` : undefined,
      onClick: () => navigate("/my-bookings"),
    },
    {
      icon: Shield,
      label: "Safety & Privacy",
      onClick: () => navigate("/safety-privacy"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      onClick: () => navigate("/help-support"),
    },
    {
      icon: Settings,
      label: "Account Settings",
      onClick: () => navigate("/account-settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#E07856] to-[#FF8C42] pt-12 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <button
              onClick={() => navigate("/account-settings")}
              className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>
          </div>
          {/* Role badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${user.role === "traveler" ? "bg-white/20" : "bg-[#1E3A5F]/40"}`}>
            {user.role === "traveler"
              ? <Compass className="w-3.5 h-3.5 text-white" />
              : <MapPin className="w-3.5 h-3.5 text-white" />
            }
            <span className="text-white text-xs font-semibold capitalize">{user.role}</span>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-[#E5E7EB]">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#FFF8F0]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E07856] to-[#FF8C42] flex items-center justify-center border-4 border-[#FFF8F0]">
                  <span className="text-2xl font-bold text-white">{getInitials(user.name)}</span>
                </div>
              )}
              <button
                onClick={() => navigate("/account-settings")}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#E07856] rounded-full flex items-center justify-center shadow-md"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-[#1E3A5F] mb-0.5 truncate">{user.name}</h2>
              <p className="text-sm text-[#6B7C93] mb-0.5 truncate">{user.email}</p>
              {user.city && (
                <div className="flex items-center gap-1 mb-1.5">
                  <MapPin className="w-3 h-3 text-[#E07856]" />
                  <span className="text-xs text-[#6B7C93]">{user.city}</span>
                </div>
              )}
              <button
                onClick={() => navigate("/account-settings")}
                className="text-[#E07856] text-sm font-semibold"
              >
                Edit Profile →
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#F3F4F6]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E3A5F] mb-0.5">{user.toursBooked}</div>
              <div className="text-xs text-[#6B7C93]">Tours Taken</div>
            </div>
            <div className="text-center border-x border-[#F3F4F6]">
              <div className="text-2xl font-bold text-[#1E3A5F] mb-0.5">{user.citiesVisited}</div>
              <div className="text-xs text-[#6B7C93]">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1E3A5F] mb-0.5">{user.reviewsGiven}</div>
              <div className="text-xs text-[#6B7C93]">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Toggle Card */}
      <div className="px-4 mt-4">
        {user.role === "traveler" ? (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/guide-registration")}
              className="flex-1 bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] rounded-3xl p-4 shadow-md flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-[#FF8C42]" />
              </div>
              <div className="text-left">
                <span className="text-white font-semibold text-sm block">Become a Guide</span>
                <span className="text-white/70 text-xs">Share your city & earn</span>
              </div>
            </button>
            <button
              onClick={() => navigate("/group-tours")}
              className="flex-1 bg-gradient-to-r from-[#E07856] to-[#FF8C42] rounded-3xl p-4 shadow-md flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="text-white font-semibold text-sm block">Group Tours</span>
                <span className="text-white/90 text-xs">Explore together</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gradient-to-r from-[#E07856] to-[#FF8C42] rounded-3xl p-4 shadow-md flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="text-white font-semibold text-sm block">Guide Dashboard</span>
                <span className="text-white/90 text-xs">Bookings & earnings</span>
              </div>
            </button>
            <button
              onClick={toggleRole}
              className="flex-1 bg-gradient-to-r from-[#1E3A5F] to-[#2D5A8E] rounded-3xl p-4 shadow-md flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Compass className="w-6 h-6 text-[#FF8C42]" />
              </div>
              <div className="text-left">
                <span className="text-white font-semibold text-sm block">Switch to Traveler</span>
                <span className="text-white/70 text-xs">Browse guides</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-3xl shadow-sm border border-[#E5E7EB] overflow-hidden divide-y divide-[#F3F4F6]">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#FFF8F0] active:bg-[#FFF3EE] transition-colors text-left"
            >
              <div className="w-10 h-10 bg-[#FFF8F0] rounded-2xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-[#E07856]" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-[#1E3A5F] block">{item.label}</span>
                {item.sub && <span className="text-xs text-[#6B7C93]">{item.sub}</span>}
              </div>
              {item.badge != null && (
                <div className="w-6 h-6 bg-[#E07856] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{item.badge}</span>
                </div>
              )}
              <ChevronRight className="w-5 h-5 text-[#B0BAC4]" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4 mb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-white rounded-3xl border-2 border-[#E07856]/20 text-[#E07856] font-semibold hover:bg-[#E07856]/5 active:bg-[#E07856]/10 transition-colors shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50">
        <div className="max-w-[390px] mx-auto flex items-center justify-around py-3 px-2">
          <NavBtn icon={HomeIcon} label="Home" active={activeTab === "home"} onClick={() => { setActiveTab("home"); navigate("/home"); }} />
          <NavBtn icon={Map} label="Map" active={activeTab === "explore"} onClick={() => { setActiveTab("explore"); navigate("/map"); }} />
          <NavBtn icon={Play} label="Reels" active={activeTab === "reels"} onClick={() => { setActiveTab("reels"); navigate("/reels"); }} />
          <NavBtnBadge icon={MessageCircle} label="Messages" active={activeTab === "messages"} badge={3} onClick={() => { setActiveTab("messages"); navigate("/messages"); }} />
          <NavBtn icon={User} label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
        </div>
      </div>
    </div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick }: { icon: React.FC<any>; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-0.5 px-3 ${active ? "text-[#E07856]" : "text-[#6B7C93]"}`}>
      <Icon className="w-6 h-6" />
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

function NavBtnBadge({ icon: Icon, label, active, badge, onClick }: { icon: React.FC<any>; label: string; active: boolean; badge: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-0.5 px-3 ${active ? "text-[#E07856]" : "text-[#6B7C93]"}`}>
      <div className="relative">
        <Icon className="w-6 h-6" />
        {badge > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E07856] rounded-full flex items-center justify-center">
            <span className="text-white font-bold" style={{ fontSize: 9 }}>{badge}</span>
          </div>
        )}
      </div>
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
