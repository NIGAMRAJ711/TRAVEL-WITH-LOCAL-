import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronRight,
  Clock,
  Shield,
  CreditCard,
  MapPin,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Input } from "../components/ui/input";

export function HelpSupport() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with support",
      action: () => alert("Opening live chat..."),
      color: "bg-[#4CAF50]",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "24/7 Support Line",
      action: () => alert("Calling: +1-800-LOCALLENS"),
      color: "bg-[#2196F3]",
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@locallens.com",
      action: () => alert("Opening email client..."),
      color: "bg-[#FF8C42]",
    },
  ];

  const faqCategories = [
    {
      id: "bookings",
      title: "Bookings & Payments",
      icon: CreditCard,
      questions: [
        {
          q: "How do I book a guide?",
          a: "Browse guides, select your desired date and duration, then click 'Book Now'. You'll receive confirmation within 24 hours.",
        },
        {
          q: "What payment methods are accepted?",
          a: "We accept credit cards, debit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
        },
        {
          q: "Can I get a refund?",
          a: "Yes! Free cancellation up to 48 hours before your tour. Within 48 hours, cancellation fees may apply. See our refund policy for details.",
        },
        {
          q: "When will I be charged?",
          a: "Your payment is processed immediately upon booking confirmation. Guides receive payment after your tour is completed.",
        },
      ],
    },
    {
      id: "safety",
      title: "Safety & Trust",
      icon: Shield,
      questions: [
        {
          q: "Are all guides verified?",
          a: "Guides with a verified badge have completed ID verification and background checks. We recommend booking verified guides for added safety.",
        },
        {
          q: "What if I feel unsafe during a tour?",
          a: "Your safety is our top priority. You can end any tour immediately and contact our 24/7 emergency support line. We take all safety reports seriously.",
        },
        {
          q: "How do I report a problem?",
          a: "Use the 'Report Issue' button in your booking details, or contact support directly. We investigate all reports within 24 hours.",
        },
        {
          q: "Can I share my live location?",
          a: "Yes! Enable location sharing in Safety Settings to share your live tour location with trusted contacts.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Profile",
      icon: User,
      questions: [
        {
          q: "How do I update my profile?",
          a: "Go to Profile → Account Settings. You can edit your name, email, phone, bio, and upload a profile picture.",
        },
        {
          q: "Can I switch between traveler and guide modes?",
          a: "Yes! If you're registered as both, you can switch roles anytime from your profile page.",
        },
        {
          q: "How do I reset my password?",
          a: "Go to Login screen → Forgot Password, enter your email, and we'll send you a reset link.",
        },
        {
          q: "How do I delete my account?",
          a: "Go to Profile → Safety & Privacy → Delete Account. Note: This action is permanent and cannot be undone.",
        },
      ],
    },
    {
      id: "tours",
      title: "Tours & Experiences",
      icon: MapPin,
      questions: [
        {
          q: "What's included in a tour?",
          a: "Each guide's profile lists what's included. Generally: personal guide, custom itinerary, and local recommendations. Food, transport, and entry fees are usually separate unless stated.",
        },
        {
          q: "Can I request a custom tour?",
          a: "Absolutely! Message any guide with your interests and they can create a personalized experience just for you.",
        },
        {
          q: "What if my guide cancels?",
          a: "You'll receive a full refund immediately. We'll also help you find another guide in the same city for your dates.",
        },
        {
          q: "How long are tours?",
          a: "Tours range from 1-hour walks to full-day experiences. Check each guide's pricing options for available durations.",
        },
      ],
    },
    {
      id: "guides",
      title: "For Guides",
      icon: BookOpen,
      questions: [
        {
          q: "How do I become a guide?",
          a: "Click 'Become a Guide' from your profile, complete the registration form, verify your identity, and set your rates. Approval typically takes 2-3 business days.",
        },
        {
          q: "When do I receive payment?",
          a: "Payments are released 24 hours after tour completion, allowing time for traveler feedback. Funds transfer to your account within 3-5 business days.",
        },
        {
          q: "What fees does LocalLens charge?",
          a: "We charge a 15% service fee on completed bookings. This covers payment processing, insurance, 24/7 support, and platform maintenance.",
        },
        {
          q: "Can I set my own prices?",
          a: "Yes! You have complete control over your hourly, half-day, and full-day rates. We provide pricing suggestions based on your city and experience.",
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.filter((cat) =>
    searchQuery
      ? cat.questions.some(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true
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
            <h1 className="text-2xl font-bold text-white">Help & Support</h1>
            <p className="text-white/70 text-sm">We're here to help 24/7</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-2xl bg-white border-none"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-3 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-2xl p-4 shadow-lg border border-[#E5E7EB] flex flex-col items-center gap-2 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-[#1E3A5F] text-sm">{action.title}</div>
                  <div className="text-[10px] text-[#6B7C93]">{action.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Response Time Banner */}
      <div className="px-4 mb-6">
        <div className="bg-[#4CAF50]/10 rounded-2xl p-4 flex items-center gap-3 border border-[#4CAF50]/20">
          <div className="w-10 h-10 bg-[#4CAF50]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-[#4CAF50]" />
          </div>
          <div>
            <div className="font-semibold text-[#1E3A5F] text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
              Average Response Time: 2 minutes
            </div>
            <div className="text-xs text-[#6B7C93]">Our support team is currently online</div>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="px-4">
        <h2 className="font-bold text-[#1E3A5F] mb-3 px-1">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const isOpen = activeCategory === category.id;
            const visibleQuestions = searchQuery
              ? category.questions.filter(
                  (q) =>
                    q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.a.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : category.questions;

            if (searchQuery && visibleQuestions.length === 0) return null;

            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB]"
              >
                <button
                  onClick={() => setActiveCategory(isOpen ? null : category.id)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#FFF8F0] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#FFF8F0] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#E07856]" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-[#1E3A5F]">{category.title}</span>
                    <span className="text-xs text-[#6B7C93] block">
                      {visibleQuestions.length} question{visibleQuestions.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-[#B0BAC4] transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#F3F4F6] divide-y divide-[#F3F4F6]">
                    {visibleQuestions.map((item, qIndex) => (
                      <details key={qIndex} className="group">
                        <summary className="px-5 py-4 cursor-pointer hover:bg-[#FFF8F0] transition-colors list-none">
                          <div className="flex items-start gap-3">
                            <HelpCircle className="w-5 h-5 text-[#E07856] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="font-semibold text-[#1E3A5F] text-sm">{item.q}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#B0BAC4] flex-shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-5 pb-4 pl-16">
                          <p className="text-sm text-[#6B7C93] leading-relaxed">{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="px-4 mt-6 mb-6">
        <div className="bg-gradient-to-br from-[#E07856] to-[#FF8C42] rounded-3xl p-5 text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Still need help?</h3>
              <p className="text-sm text-white/90 mb-3">
                Can't find what you're looking for? Our support team is standing by.
              </p>
              <button
                onClick={() => alert("Opening live chat with support...")}
                className="bg-white text-[#E07856] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/95 transition-colors"
              >
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Safety Issue */}
      <div className="px-4 mb-6">
        <div className="bg-red-50 rounded-3xl p-5 border border-red-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Safety Emergency?</h3>
              <p className="text-sm text-red-700 mb-3">
                If you're in immediate danger or have a safety concern, contact us immediately.
              </p>
              <button
                onClick={() => alert("Contacting emergency support...")}
                className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Emergency Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
