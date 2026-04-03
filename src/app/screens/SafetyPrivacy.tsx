import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Bell,
  MapPin,
  Users,
  Phone,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Switch } from "../components/ui/switch";
import { useAuth } from "../context/AuthContext";

export function SafetyPrivacy() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showLocation: true,
    showActivity: false,
    allowMessages: true,
    showInSearch: true,
  });

  const safetyTips = [
    {
      icon: UserCheck,
      title: "Verify Your Identity",
      description: "Upload ID for verified badge and increased trust",
      action: "Verify Now",
      status: user?.id === "demo-guide" ? "verified" : "pending",
    },
    {
      icon: Users,
      title: "Meet in Public Places",
      description: "Always meet guides in public, well-lit areas",
      action: "Learn More",
      status: "info",
    },
    {
      icon: Phone,
      title: "Share Your Plans",
      description: "Tell friends/family about your tour details",
      action: "Share Location",
      status: "info",
    },
    {
      icon: Shield,
      title: "Trust Your Instincts",
      description: "If something feels off, you can cancel anytime",
      action: "Safety Guidelines",
      status: "info",
    },
  ];

  const privacyOptions = [
    {
      key: "showProfile" as const,
      title: "Public Profile",
      description: "Let other users see your profile and reviews",
      icon: Eye,
    },
    {
      key: "showLocation" as const,
      title: "Location Sharing",
      description: "Share your general location with guides",
      icon: MapPin,
    },
    {
      key: "showActivity" as const,
      title: "Activity Status",
      description: "Show when you're active on LocalLens",
      icon: Bell,
    },
    {
      key: "allowMessages" as const,
      title: "Direct Messages",
      description: "Allow guides to send you messages",
      icon: Users,
    },
    {
      key: "showInSearch" as const,
      title: "Search Visibility",
      description: "Appear in guide search results",
      icon: Shield,
    },
  ];

  const legalDocs = [
    { title: "Privacy Policy", icon: FileText },
    { title: "Terms of Service", icon: FileText },
    { title: "Community Guidelines", icon: FileText },
    { title: "Cookie Policy", icon: FileText },
  ];

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <h1 className="text-2xl font-bold text-white">Safety & Privacy</h1>
            <p className="text-white/70 text-sm">Your safety is our priority</p>
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-3xl p-4 shadow-lg border border-[#E5E7EB]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#4CAF50]" />
            </div>
            <div>
              <h2 className="font-bold text-[#1E3A5F]">Safety Tips</h2>
              <p className="text-xs text-[#6B7C93]">Stay safe while traveling</p>
            </div>
          </div>

          <div className="space-y-3">
            {safetyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-[#F7F8FA] rounded-2xl"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#E07856]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-[#1E3A5F] text-sm">{tip.title}</h3>
                      {tip.status === "verified" && (
                        <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
                      )}
                    </div>
                    <p className="text-xs text-[#6B7C93] mb-2">{tip.description}</p>
                    <button className="text-xs font-semibold text-[#E07856]">
                      {tip.action} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="px-4 mt-4">
        <h2 className="font-bold text-[#1E3A5F] mb-3 px-1">Privacy Settings</h2>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB] divide-y divide-[#F3F4F6]">
          {privacyOptions.map((option) => {
            const Icon = option.icon;
            const isEnabled = privacySettings[option.key];
            return (
              <div key={option.key} className="flex items-center gap-3 px-5 py-4">
                <div className="w-10 h-10 bg-[#FFF8F0] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#E07856]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#1E3A5F] text-sm">{option.title}</h3>
                  <p className="text-xs text-[#6B7C93]">{option.description}</p>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => toggleSetting(option.key)}
                  className="data-[state=checked]:bg-[#4CAF50]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Data & Account */}
      <div className="px-4 mt-4">
        <h2 className="font-bold text-[#1E3A5F] mb-3 px-1">Data & Account</h2>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB] divide-y divide-[#F3F4F6]">
          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#FFF8F0] transition-colors text-left">
            <div className="w-10 h-10 bg-[#FFF8F0] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-[#E07856]" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-[#1E3A5F] block text-sm">Download Your Data</span>
              <span className="text-xs text-[#6B7C93]">Get a copy of your LocalLens data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#B0BAC4]" />
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#FFF8F0] transition-colors text-left">
            <div className="w-10 h-10 bg-[#FFF8F0] rounded-2xl flex items-center justify-center flex-shrink-0">
              <EyeOff className="w-5 h-5 text-[#E07856]" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-[#1E3A5F] block text-sm">Deactivate Account</span>
              <span className="text-xs text-[#6B7C93]">Temporarily disable your account</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#B0BAC4]" />
          </button>

          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors text-left">
            <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <span className="font-medium text-red-600 block text-sm">Delete Account</span>
              <span className="text-xs text-[#6B7C93]">Permanently remove your account</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#B0BAC4]" />
          </button>
        </div>
      </div>

      {/* Legal Documents */}
      <div className="px-4 mt-4 mb-6">
        <h2 className="font-bold text-[#1E3A5F] mb-3 px-1">Legal</h2>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB] divide-y divide-[#F3F4F6]">
          {legalDocs.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#FFF8F0] transition-colors text-left"
              >
                <div className="w-10 h-10 bg-[#FFF8F0] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#E07856]" />
                </div>
                <span className="font-medium text-[#1E3A5F] flex-1 text-sm">{doc.title}</span>
                <ChevronRight className="w-5 h-5 text-[#B0BAC4]" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Help Banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-[#E07856] to-[#FF8C42] rounded-3xl p-5 text-white">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold mb-1">Need Help?</h3>
              <p className="text-sm text-white/90 mb-3">
                Our safety team is available 24/7 to assist you with any concerns.
              </p>
              <button
                onClick={() => navigate("/help-support")}
                className="bg-white text-[#E07856] px-4 py-2 rounded-xl text-sm font-semibold"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
