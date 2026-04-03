import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowRight, ChevronLeft, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Tab = "login" | "register";

export function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState<"traveler" | "guide">("traveler");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPassword) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    const result = await login(loginEmail.trim(), loginPassword);
    setIsLoading(false);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error || "Login failed.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!regName || !regEmail || !regPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    const result = await register(regName.trim(), regEmail.trim(), regPassword, regRole);
    setIsLoading(false);
    if (result.success) {
      navigate(regRole === "guide" ? "/dashboard" : "/home");
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  const fillDemo = (type: "traveler" | "guide") => {
    setTab("login");
    setLoginEmail(type === "traveler" ? "traveler@demo.com" : "guide@demo.com");
    setLoginPassword(type === "traveler" ? "traveler123" : "guide123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF8F0] flex flex-col" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Back to Onboarding */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
      >
        <ChevronLeft className="w-5 h-5 text-[#1E3A5F]" />
      </button>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#E07856] to-[#FF8C42] px-6 pt-14 pb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">LocalLens</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-1 relative z-10">
          {tab === "login" ? "Welcome back!" : "Join LocalLens"}
        </h1>
        <p className="text-white/80 text-sm relative z-10">
          {tab === "login" ? "Sign in to continue your journey" : "Create your account and start exploring"}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="px-6 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl p-1 flex shadow-md">
          <button
            onClick={() => { setTab("login"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "login"
                ? "bg-[#E07856] text-white shadow-sm"
                : "text-[#6B7C93]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab("register"); setError(""); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "register"
                ? "bg-[#E07856] text-white shadow-sm"
                : "text-[#6B7C93]"
            }`}
          >
            Register
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[#1E3A5F] text-sm font-semibold mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#1E3A5F] text-sm font-semibold mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7C93]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[#E07856] text-sm font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#E07856] to-[#FF8C42] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-[#1E3A5F] text-sm font-semibold mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRegRole("traveler")}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    regRole === "traveler"
                      ? "border-[#E07856] bg-[#FFF3EE]"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${regRole === "traveler" ? "bg-[#E07856]" : "bg-[#F3F4F6]"}`}>
                    <Compass className={`w-5 h-5 ${regRole === "traveler" ? "text-white" : "text-[#6B7C93]"}`} />
                  </div>
                  <span className={`text-sm font-semibold ${regRole === "traveler" ? "text-[#E07856]" : "text-[#6B7C93]"}`}>Traveler</span>
                  <span className="text-xs text-[#6B7C93] text-center leading-tight">Explore cities with local guides</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole("guide")}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    regRole === "guide"
                      ? "border-[#1E3A5F] bg-[#EEF2F8]"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${regRole === "guide" ? "bg-[#1E3A5F]" : "bg-[#F3F4F6]"}`}>
                    <MapPin className={`w-5 h-5 ${regRole === "guide" ? "text-white" : "text-[#6B7C93]"}`} />
                  </div>
                  <span className={`text-sm font-semibold ${regRole === "guide" ? "text-[#1E3A5F]" : "text-[#6B7C93]"}`}>Local Guide</span>
                  <span className="text-xs text-[#6B7C93] text-center leading-tight">Share your city & earn income</span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[#1E3A5F] text-sm font-semibold mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#1E3A5F] text-sm font-semibold mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#1E3A5F] text-sm font-semibold mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7C93]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-12 py-3.5 bg-white border border-[#E5E7EB] rounded-2xl text-[#1E3A5F] text-sm placeholder:text-[#B0BAC4] focus:outline-none focus:border-[#E07856] focus:ring-2 focus:ring-[#E07856]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7C93]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#E07856] to-[#FF8C42] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}

        {/* Demo Accounts */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-xs text-[#6B7C93] font-medium">Try demo accounts</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fillDemo("traveler")}
              className="p-3 bg-white border border-[#E5E7EB] rounded-2xl flex flex-col items-center gap-1 shadow-sm active:scale-95 transition-transform"
            >
              <Compass className="w-5 h-5 text-[#E07856]" />
              <span className="text-xs font-semibold text-[#1E3A5F]">Traveler Demo</span>
              <span className="text-[10px] text-[#6B7C93]">traveler@demo.com</span>
            </button>
            <button
              onClick={() => fillDemo("guide")}
              className="p-3 bg-white border border-[#E5E7EB] rounded-2xl flex flex-col items-center gap-1 shadow-sm active:scale-95 transition-transform"
            >
              <MapPin className="w-5 h-5 text-[#1E3A5F]" />
              <span className="text-xs font-semibold text-[#1E3A5F]">Guide Demo</span>
              <span className="text-[10px] text-[#6B7C93]">guide@demo.com</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
