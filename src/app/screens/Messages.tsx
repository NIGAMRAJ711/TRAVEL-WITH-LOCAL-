import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Send, Phone, Video, MoreHorizontal, Search, Check, CheckCheck } from "lucide-react";
import { allGuides } from "../data/guides";

type Message = {
  id: number;
  from: "user" | "guide";
  text: string;
  time: string;
  read: boolean;
};

type Conversation = {
  guideId: number;
  messages: Message[];
  unread: number;
};

const initialConversations: Conversation[] = [
  {
    guideId: 1,
    unread: 2,
    messages: [
      { id: 1, from: "guide", text: "Hi! Thanks for your interest. I'd love to show you around Paris! What areas are you most interested in?", time: "10:30 AM", read: true },
      { id: 2, from: "user", text: "Hi Sophie! I'm really interested in the local food scene and hidden cafés.", time: "10:32 AM", read: true },
      { id: 3, from: "guide", text: "Perfect! I know all the best spots. I can take you to some amazing local markets and cafés that tourists never find 😊", time: "10:33 AM", read: true },
      { id: 4, from: "user", text: "That sounds amazing! What dates are you available in April?", time: "11:05 AM", read: true },
      { id: 5, from: "guide", text: "I'm free April 5th, 8th, and 12th! Morning slots work best for the markets — they're at their freshest before noon ☀️", time: "11:08 AM", read: false },
      { id: 6, from: "guide", text: "Also, I have a special food walk I designed exclusively for small groups. Interested?", time: "11:09 AM", read: false },
    ],
  },
  {
    guideId: 2,
    unread: 0,
    messages: [
      { id: 1, from: "user", text: "Hi Marco! I saw your profile and I'm visiting Rome next month.", time: "Yesterday", read: true },
      { id: 2, from: "guide", text: "Benvenuto! Rome is stunning in April. The light at golden hour on the ancient ruins is simply breathtaking 🏛️", time: "Yesterday", read: true },
      { id: 3, from: "user", text: "I'm particularly interested in the early morning Colosseum tour you mentioned!", time: "Yesterday", read: true },
      { id: 4, from: "guide", text: "Great choice! We go just as the sun rises — you'll have the entire arena practically to yourself. It's truly magical.", time: "Yesterday", read: true },
    ],
  },
  {
    guideId: 4,
    unread: 1,
    messages: [
      { id: 1, from: "guide", text: "Hello! I saw you checked out my profile. London is absolutely buzzing right now — perfect time to visit!", time: "Mon", read: true },
      { id: 2, from: "user", text: "Hey Emma! Yes, I'm planning a trip in mid-April. Your street art tour looks incredible.", time: "Mon", read: true },
      { id: 3, from: "guide", text: "You'll love it! Shoreditch has some brand new murals this season. I booked you in for April 14th — does that work? 🎨", time: "Mon", read: false },
    ],
  },
  {
    guideId: 6,
    unread: 0,
    messages: [
      { id: 1, from: "user", text: "Isabella, your Gaudí tour description blew my mind. I'm an architecture student!", time: "Sun", read: true },
      { id: 2, from: "guide", text: "How wonderful! Architecture students are my favourite guests — you'll see things others completely miss. Let's go deep into Sagrada Família's symbolism 🌟", time: "Sun", read: true },
      { id: 3, from: "user", text: "I can't wait! Booking confirmed for April 10th!", time: "Sun", read: true },
      { id: 4, from: "guide", text: "¡Perfecto! See you then. I'll send over a prep guide with some background reading. You're in for a treat! 🏛️", time: "Sun", read: true },
    ],
  },
  {
    guideId: 5,
    unread: 0,
    messages: [
      { id: 1, from: "user", text: "Alex! Visiting NYC for the first time next month. Super nervous!", time: "Sat", read: true },
      { id: 2, from: "guide", text: "Don't be nervous — New York WANTS to be discovered! I'll make sure you fall in love with this city 🗽", time: "Sat", read: true },
    ],
  },
];

function timeString() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function Messages() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initGuideId = searchParams.get("guideId");

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    // If coming from a guide profile with a guideId that doesn't have a conversation yet, create one
    if (initGuideId) {
      const gid = Number(initGuideId);
      const exists = initialConversations.find((c) => c.guideId === gid);
      if (!exists) {
        const guide = allGuides.find((g) => g.id === gid);
        if (guide) {
          return [
            {
              guideId: gid,
              unread: 1,
              messages: [{ id: 1, from: "guide", text: `Hi! I'm ${guide.name}. Thanks for reaching out! I'd love to show you around ${guide.city}. What kind of experience are you looking for?`, time: timeString(), read: false }],
            },
            ...initialConversations,
          ];
        }
      }
    }
    return initialConversations;
  });

  const [activeConvId, setActiveConvId] = useState<number | null>(
    initGuideId ? Number(initGuideId) : null
  );
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.guideId === activeConvId);
  const activeGuide = allGuides.find((g) => g.id === activeConvId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages.length]);

  // Mark messages as read when opening a conversation
  useEffect(() => {
    if (activeConvId) {
      setConversations((prev) =>
        prev.map((c) =>
          c.guideId === activeConvId
            ? { ...c, unread: 0, messages: c.messages.map((m) => ({ ...m, read: true })) }
            : c
        )
      );
    }
  }, [activeConvId]);

  const sendMessage = () => {
    if (!inputText.trim() || !activeConvId) return;
    const text = inputText.trim();
    setInputText("");

    const newMsg: Message = { id: Date.now(), from: "user", text, time: timeString(), read: true };
    setConversations((prev) =>
      prev.map((c) =>
        c.guideId === activeConvId ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );

    // Simulate guide typing + reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "That sounds great! Let me check my availability for you 📅",
        "Perfect! I have some amazing spots in mind for exactly that experience 🗺️",
        "Wonderful choice! I'll put together a custom itinerary and send it over shortly.",
        "Absolutely! I've done this tour many times and it never disappoints 😊",
        "Great question! The best time to visit that spot is early morning before the crowds arrive.",
      ];
      const reply: Message = {
        id: Date.now() + 1,
        from: "guide",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: timeString(),
        read: true,
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.guideId === activeConvId ? { ...c, messages: [...c.messages, reply] } : c
        )
      );
    }, 1500);
  };

  const filteredConvs = conversations.filter((c) => {
    if (!searchQuery) return true;
    const guide = allGuides.find((g) => g.id === c.guideId);
    return guide?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide?.city.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  // ── Chat View ──
  if (activeConvId && activeGuide && activeConv) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-border pt-12 pb-3 px-4 flex items-center gap-3">
          <button onClick={() => setActiveConvId(null)} className="text-[#1E3A5F]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate(`/guide/${activeGuide.id}`)}
            className="flex items-center gap-3 flex-1"
          >
            <div className="relative">
              <img src={activeGuide.avatar} alt={activeGuide.name} className="w-10 h-10 rounded-full object-cover" />
              {activeGuide.available && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4CAF50] rounded-full border-2 border-white" />
              )}
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#1E3A5F]">{activeGuide.name}</p>
              <p className="text-xs text-[#4CAF50]">
                {activeGuide.available ? "● Online now" : "○ Offline"}
              </p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 bg-[#FFF8F0] rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#E07856]" />
            </button>
            <button className="w-9 h-9 bg-[#FFF8F0] rounded-full flex items-center justify-center">
              <Video className="w-4 h-4 text-[#E07856]" />
            </button>
          </div>
        </div>

        {/* Guide intro card */}
        <div className="px-4 py-3 bg-[#FFF8F0] border-b border-border">
          <div className="flex items-center gap-3">
            <img src={activeGuide.avatar} alt={activeGuide.name} className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-[#1E3A5F] text-sm">{activeGuide.name} · {activeGuide.city}, {activeGuide.country}</p>
              <p className="text-xs text-[#6B7C93]">⭐ {activeGuide.rating} · {activeGuide.reviewCount} reviews · ${activeGuide.price}/hr</p>
            </div>
            <button
              onClick={() => navigate(`/booking/${activeGuide.id}`)}
              className="px-3 py-1.5 bg-[#E07856] text-white rounded-xl text-xs font-semibold"
            >
              Book
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {activeConv.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}>
              {msg.from === "guide" && (
                <img src={activeGuide.avatar} alt="" className="w-8 h-8 rounded-full object-cover self-end flex-shrink-0" />
              )}
              <div className={`max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.from === "user"
                    ? "bg-[#E07856] text-white rounded-br-sm"
                    : "bg-white border border-border text-[#1E3A5F] rounded-bl-sm shadow-sm"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <span className="text-xs text-[#6B7C93]">{msg.time}</span>
                  {msg.from === "user" && (
                    msg.read
                      ? <CheckCheck className="w-3 h-3 text-[#4CAF50]" />
                      : <Check className="w-3 h-3 text-[#6B7C93]" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2">
              <img src={activeGuide.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-[#6B7C93] rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {["What's your availability? 📅", "Tell me more about your tours", "What's included in the price?", "Can you do a custom tour?"].map((q) => (
              <button
                key={q}
                onClick={() => setInputText(q)}
                className="px-3 py-2 bg-white border border-[#E07856]/40 text-[#E07856] rounded-2xl text-xs whitespace-nowrap hover:bg-[#FFF8F0] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="bg-white border-t border-border px-4 py-3 pb-8">
          <div className="flex items-center gap-2">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 h-11 px-4 rounded-2xl bg-[#FFF8F0] border border-border outline-none text-[#1E3A5F] placeholder:text-[#6B7C93]"
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className="w-11 h-11 bg-[#E07856] rounded-2xl flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Conversation List ──
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border pt-12 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/home")} className="text-[#1E3A5F]">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1E3A5F]">Messages</h1>
              {totalUnread > 0 && (
                <p className="text-sm text-[#E07856] font-medium">{totalUnread} unread message{totalUnread > 1 ? "s" : ""}</p>
              )}
            </div>
          </div>
          <button className="w-9 h-9 bg-[#FFF8F0] rounded-full flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-[#1E3A5F]" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-10 pl-9 pr-4 rounded-2xl bg-[#FFF8F0] border border-border outline-none text-sm text-[#1E3A5F] placeholder:text-[#6B7C93]"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="divide-y divide-border">
        {filteredConvs.map((conv) => {
          const guide = allGuides.find((g) => g.id === conv.guideId);
          if (!guide) return null;
          const lastMsg = conv.messages[conv.messages.length - 1];
          return (
            <button
              key={conv.guideId}
              onClick={() => setActiveConvId(conv.guideId)}
              className="w-full flex items-center gap-3 px-4 py-4 bg-white hover:bg-[#FFF8F0] transition-colors text-left"
            >
              <div className="relative flex-shrink-0">
                <img src={guide.avatar} alt={guide.name} className="w-14 h-14 rounded-full object-cover" />
                {guide.available && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#4CAF50] rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-semibold ${conv.unread > 0 ? "text-[#1E3A5F]" : "text-[#1E3A5F]"}`}>
                    {guide.name}
                  </span>
                  <span className="text-xs text-[#6B7C93] flex-shrink-0">{lastMsg.time}</span>
                </div>
                <p className="text-xs text-[#6B7C93] mb-1">{guide.city}, {guide.country}</p>
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${conv.unread > 0 ? "font-medium text-[#1E3A5F]" : "text-[#6B7C93]"}`}>
                    {lastMsg.from === "user" ? "You: " : ""}{lastMsg.text}
                  </p>
                  {conv.unread > 0 && (
                    <div className="ml-2 w-5 h-5 bg-[#E07856] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{conv.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {filteredConvs.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#E07856]" />
            </div>
            <p className="font-semibold text-[#1E3A5F] mb-2">No conversations found</p>
            <p className="text-sm text-[#6B7C93]">Try a different search or start a new conversation from a guide's profile.</p>
          </div>
        )}
      </div>

      {/* Start new conversation hint */}
      <div className="px-4 py-6 text-center">
        <p className="text-sm text-[#6B7C93] mb-3">Want to chat with a new guide?</p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 bg-[#E07856] text-white rounded-2xl font-semibold"
        >
          Browse Guides
        </button>
      </div>
    </div>
  );
}
