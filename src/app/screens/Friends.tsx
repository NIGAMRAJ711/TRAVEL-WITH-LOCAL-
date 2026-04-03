import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  UserPlus,
  Users,
  MessageCircle,
  MapPin,
  CheckCircle,
  X,
  User,
  Globe,
  Heart,
  Calendar,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";

type Tab = "suggestions" | "friends" | "requests";

const suggestedPeople = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMGd1aWRlJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    location: "Barcelona, Spain",
    mutualFriends: 3,
    toursCompleted: 12,
    commonInterests: ["Food Tours", "Architecture"],
  },
  {
    id: 2,
    name: "James Chen",
    avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NzQ4NTAxMTR8MA&ixlib=rb-4.1.0&q=80&w=200",
    location: "Tokyo, Japan",
    mutualFriends: 5,
    toursCompleted: 18,
    commonInterests: ["Street Food", "Culture"],
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
    location: "Mexico City, Mexico",
    mutualFriends: 2,
    toursCompleted: 9,
    commonInterests: ["History", "Art"],
  },
  {
    id: 4,
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    location: "London, UK",
    mutualFriends: 4,
    toursCompleted: 15,
    commonInterests: ["Coffee Culture", "Markets"],
  },
];

const friendRequests = [
  {
    id: 5,
    name: "Anna Petrov",
    avatar: "https://images.unsplash.com/photo-1765987592329-517788f8f39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwbG9jYWwlMjBndWlkZSUyMGNpdHklMjB0b3VyJTIwc21pbGV8ZW58MXx8fHwxNzc0OTkwOTU4fDA&ixlib=rb-4.1.0&q=80&w=200",
    location: "Prague, Czech Republic",
    mutualFriends: 1,
    requestDate: "2 days ago",
  },
  {
    id: 6,
    name: "Tom Bradley",
    avatar: "https://images.unsplash.com/photo-1632660352036-439e70bb013f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGd1aWRlJTIwdHJhdmVsZXIlMjBvdXRkb29yfGVufDF8fHx8MTc3NDk5MDk1OHww&ixlib=rb-4.1.0&q=80&w=200",
    location: "Amsterdam, Netherlands",
    mutualFriends: 2,
    requestDate: "1 week ago",
  },
];

const currentFriends = [
  {
    id: 7,
    name: "Olivia Parker",
    avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=200",
    location: "Paris, France",
    status: "online",
    lastTour: "Hidden Paris Food Walk",
    friendsSince: "Jan 2026",
  },
  {
    id: 8,
    name: "Lucas Brown",
    avatar: "https://images.unsplash.com/photo-1564829550852-d1d5353ea6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMGJhY2twYWNrJTIwY2l0eXxlbnwxfHx8fDE3NzQ4NTAxMTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    location: "Rome, Italy",
    status: "offline",
    lastTour: "Ancient Rome History Walk",
    friendsSince: "Feb 2026",
  },
];

export function Friends() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("suggestions");
  const [searchQuery, setSearchQuery] = useState("");
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());
  const [acceptedRequests, setAcceptedRequests] = useState<Set<number>>(new Set());
  const [rejectedRequests, setRejectedRequests] = useState<Set<number>>(new Set());

  const handleSendRequest = (id: number) => {
    setSentRequests((prev) => new Set(prev).add(id));
    setTimeout(() => {
      alert("Friend request sent!");
    }, 500);
  };

  const handleAcceptRequest = (id: number) => {
    setAcceptedRequests((prev) => new Set(prev).add(id));
  };

  const handleRejectRequest = (id: number) => {
    setRejectedRequests((prev) => new Set(prev).add(id));
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "suggestions", label: "Suggestions", count: suggestedPeople.length },
    { id: "friends", label: "Friends", count: currentFriends.length },
    { id: "requests", label: "Requests", count: friendRequests.filter(r => !acceptedRequests.has(r.id) && !rejectedRequests.has(r.id)).length },
  ];

  const visibleRequests = friendRequests.filter(
    (req) => !acceptedRequests.has(req.id) && !rejectedRequests.has(req.id)
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-8" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Friends</h1>
            <p className="text-white/70 text-sm">Connect with fellow travelers</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
          <Input
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-2xl bg-white border-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4 bg-white border-b border-[#E5E7EB]">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#E07856] text-white"
                  : "bg-[#F3F4F6] text-[#6B7C93]"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-[#E5E7EB] text-[#6B7C93]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4 space-y-3">
        {/* Suggestions Tab */}
        {activeTab === "suggestions" && (
          <>
            {suggestedPeople.map((person) => {
              const hasSent = sentRequests.has(person.id);
              return (
                <div
                  key={person.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-[#E5E7EB]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#1E3A5F]">{person.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#6B7C93] mb-1">
                        <MapPin className="w-3 h-3" />
                        {person.location}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#6B7C93]">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {person.mutualFriends} mutual
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {person.toursCompleted} tours
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Common Interests */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {person.commonInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#FFF8F0] text-[#E07856] text-[10px] font-medium rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSendRequest(person.id)}
                      disabled={hasSent}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                        hasSent
                          ? "bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/30"
                          : "bg-[#E07856] text-white hover:bg-[#E07856]/90"
                      }`}
                    >
                      {hasSent ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Add Friend
                        </>
                      )}
                    </button>
                    <button className="px-4 py-2.5 border border-[#E5E7EB] rounded-2xl text-sm font-semibold text-[#1E3A5F] hover:bg-[#FFF8F0]">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <>
            {currentFriends.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#B0BAC4]" />
                </div>
                <p className="text-[#1E3A5F] font-semibold mb-1">No friends yet</p>
                <p className="text-[#6B7C93] text-sm mb-6">
                  Start connecting with fellow travelers
                </p>
                <button
                  onClick={() => setActiveTab("suggestions")}
                  className="px-6 py-3 bg-[#E07856] text-white rounded-2xl text-sm font-semibold shadow-sm"
                >
                  Find Friends
                </button>
              </div>
            ) : (
              currentFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-[#E5E7EB]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />
                      {friend.status === "online" && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4CAF50] border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#1E3A5F]">{friend.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#6B7C93] mb-1">
                        <MapPin className="w-3 h-3" />
                        {friend.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#6B7C93]">
                        <Calendar className="w-3 h-3" />
                        Friends since {friend.friendsSince}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF8F0] rounded-2xl px-3 py-2 mb-3">
                    <div className="text-xs text-[#6B7C93] mb-0.5">Last tour together</div>
                    <div className="text-sm font-semibold text-[#E07856]">{friend.lastTour}</div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#E07856] text-white rounded-2xl text-sm font-semibold hover:bg-[#E07856]/90">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                    <button className="px-4 py-2.5 border border-[#E5E7EB] rounded-2xl text-sm font-semibold text-[#1E3A5F] hover:bg-[#FFF8F0]">
                      <User className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <>
            {visibleRequests.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-[#B0BAC4]" />
                </div>
                <p className="text-[#1E3A5F] font-semibold mb-1">No pending requests</p>
                <p className="text-[#6B7C93] text-sm">
                  Friend requests will appear here
                </p>
              </div>
            ) : (
              visibleRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-[#E5E7EB]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#1E3A5F]">{request.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#6B7C93] mb-1">
                        <MapPin className="w-3 h-3" />
                        {request.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B7C93]">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {request.mutualFriends} mutual
                        </div>
                        <span>•</span>
                        <span>{request.requestDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#4CAF50] text-white rounded-2xl text-sm font-semibold hover:bg-[#4CAF50]/90"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#E5E7EB] rounded-2xl text-sm font-semibold text-[#6B7C93] hover:bg-[#F3F4F6]"
                    >
                      <X className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
