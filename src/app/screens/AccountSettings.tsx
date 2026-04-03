import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Eye,
  EyeOff,
  Lock,
  Compass,
  ChevronRight,
  Shield,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function AccountSettings() {
  const navigate = useNavigate();
  const { user, updateProfile, toggleRole, logout } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [activeSection, setActiveSection] = useState<"profile" | "account" | "privacy">("profile");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Profile fields
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [website, setWebsite] = useState(user?.website ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const getInitials = (n: string) =>
    n.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setError("");
    if (!name.trim()) { setError("Name cannot be empty."); return; }
    if (!email.trim()) { setError("Email cannot be empty."); return; }
    updateProfile({ name: name.trim(), bio: bio.trim(), city: city.trim(), phone: phone.trim(), website: website.trim(), email: email.trim().toLowerCase() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePassword = () => {
    setError("");
    if (!currentPassword || !newPassword || !confirmPassword) { setError("Please fill in all password fields."); return; }
    if (newPassword.length < 6) { setError("New password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords don't match."); return; }
    // In real app: validate currentPassword against stored hash
    setSaved(true);
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      logout();
      navigate("/");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-10" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#1E3A5F]" />
          </button>
          <h1 className="text-xl font-bold text-[#1E3A5F] flex-1">Account Settings</h1>
          {saved && (
            <div className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Saved!</span>
            </div>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-2xl p-1 flex shadow-sm border border-[#E5E7EB]">
          {(["profile", "account", "privacy"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setActiveSection(s); setError(""); }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                activeSection === s ? "bg-[#E07856] text-white shadow-sm" : "text-[#6B7C93]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* ── PROFILE SECTION ── */}
      {activeSection === "profile" && (
        <div className="px-4 pt-4 space-y-4">
          {/* Avatar */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB]">
            <p className="text-xs font-semibold text-[#6B7C93] uppercase tracking-wide mb-4">Profile Photo</p>
            <div className="flex items-center gap-4">
              <div className="relative">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-[#FFF8F0]" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E07856] to-[#FF8C42] flex items-center justify-center border-4 border-[#FFF8F0]">
                    <span className="text-2xl font-bold text-white">{getInitials(user.name)}</span>
                  </div>
                )}
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#E07856] rounded-full flex items-center justify-center shadow-md"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F]">{user.name}</p>
                <p className="text-xs text-[#6B7C93] mt-0.5">{user.email}</p>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="text-[#E07856] text-xs font-semibold mt-1.5"
                >
                  Change photo
                </button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] space-y-4">
            <p className="text-xs font-semibold text-[#6B7C93] uppercase tracking-wide">Personal Information</p>

            <Field icon={User} label="Full Name" value={name} onChange={setName} placeholder="Your full name" />
            <Field icon={Mail} label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
            <Field icon={Phone} label="Phone" value={phone} onChange={setPhone} placeholder="+1 (555) 000-0000" type="tel" />
            <Field icon={MapPin} label="City" value={city} onChange={setCity} placeholder="Your city, Country" />
            <Field icon={Globe} label="Website" value={website} onChange={setWebsite} placeholder="yourwebsite.com" />

            {/* Bio */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#1E3A5F] mb-1.5">
                <FileText className="w-3.5 h-3.5 text-[#6B7C93]" />
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell travelers about yourself..."
                rows={3}
                className="w-full px-3.5 py-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 resize-none"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full py-3.5 bg-gradient-to-r from-[#E07856] to-[#FF8C42] text-white rounded-2xl font-semibold text-sm shadow-sm active:scale-[0.98] transition-transform"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ── ACCOUNT SECTION ── */}
      {activeSection === "account" && (
        <div className="px-4 pt-4 space-y-4">
          {/* Role */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB]">
            <p className="text-xs font-semibold text-[#6B7C93] uppercase tracking-wide mb-4">Your Role</p>
            <div className="flex items-center gap-3 p-3 bg-[#F7F8FA] rounded-2xl mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${user.role === "traveler" ? "bg-[#E07856]" : "bg-[#1E3A5F]"}`}>
                {user.role === "traveler" ? <Compass className="w-5 h-5 text-white" /> : <MapPin className="w-5 h-5 text-white" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1E3A5F] capitalize">{user.role}</p>
                <p className="text-xs text-[#6B7C93]">
                  {user.role === "traveler" ? "Exploring the world with local guides" : "Sharing your city with travelers"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleRole}
              className="w-full py-3 border-2 border-dashed border-[#E5E7EB] rounded-2xl text-sm font-semibold text-[#6B7C93] flex items-center justify-center gap-2 hover:border-[#E07856] hover:text-[#E07856] transition-colors"
            >
              Switch to {user.role === "traveler" ? "Guide" : "Traveler"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] space-y-4">
            <p className="text-xs font-semibold text-[#6B7C93] uppercase tracking-wide">Change Password</p>

            <PasswordField label="Current Password" value={currentPassword} onChange={setCurrentPassword} show={showPw} onToggle={() => setShowPw(!showPw)} placeholder="Current password" />
            <PasswordField label="New Password" value={newPassword} onChange={setNewPassword} show={showPw} onToggle={() => setShowPw(!showPw)} placeholder="At least 6 characters" />
            <PasswordField label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} show={showPw} onToggle={() => setShowPw(!showPw)} placeholder="Repeat new password" />

            <button
              onClick={handleChangePassword}
              className="w-full py-3.5 bg-[#1E3A5F] text-white rounded-2xl font-semibold text-sm"
            >
              Update Password
            </button>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB]">
            <p className="text-xs font-semibold text-[#6B7C93] uppercase tracking-wide mb-4">Account Info</p>
            <div className="space-y-3">
              <InfoRow label="Member since" value={user.joinDate} />
              <InfoRow label="Account type" value={user.role === "traveler" ? "Traveler" : "Local Guide"} />
              <InfoRow label="Tours booked" value={String(user.toursBooked)} />
            </div>
          </div>
        </div>
      )}

      {/* ── PRIVACY SECTION ── */}
      {activeSection === "privacy" && (
        <div className="px-4 pt-4 space-y-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB]">
            <p className="text-xs font-semibold text-[#6B7C93] uppercase tracking-wide p-5 pb-3">Privacy & Safety</p>
            {[
              { icon: Shield, label: "Privacy Policy", desc: "Read our data practices" },
              { icon: FileText, label: "Terms of Service", desc: "LocalLens terms & conditions" },
              { icon: Globe, label: "Data & Cookies", desc: "Manage your data preferences" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-5 py-4 border-t border-[#F3F4F6] hover:bg-[#FFF8F0] transition-colors">
                <div className="w-9 h-9 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#6B7C93]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#1E3A5F]">{item.label}</p>
                  <p className="text-xs text-[#6B7C93]">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B0BAC4]" />
              </button>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-red-100">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-4">Danger Zone</p>
            <p className="text-xs text-[#6B7C93] mb-4">
              Once you delete your account, all your data will be permanently removed. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-red-200 rounded-2xl text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = "text" }: {
  icon: React.FC<any>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] mb-1.5">
        <Icon className="w-3.5 h-3.5 text-[#6B7C93]" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
      />
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggle, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] mb-1.5">
        <Lock className="w-3.5 h-3.5 text-[#6B7C93]" />
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-3.5 pr-10 py-3 bg-[#F7F8FA] border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
        />
        <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7C93]">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#6B7C93]">{label}</span>
      <span className="text-sm font-semibold text-[#1E3A5F]">{value}</span>
    </div>
  );
}
