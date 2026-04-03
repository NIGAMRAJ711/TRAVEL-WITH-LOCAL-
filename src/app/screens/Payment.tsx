import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { allGuides } from "../data/guides";

export function Payment() {
  const navigate = useNavigate();
  const { guideId } = useParams();
  const { user, addBooking } = useAuth();

  const guide = allGuides.find((g) => g.id === Number(guideId));

  // Get booking details from sessionStorage (set from Booking page)
  const [bookingDetails] = useState(() => {
    const stored = sessionStorage.getItem("pendingBooking");
    return stored ? JSON.parse(stored) : null;
  });

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    // Payment Information
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    // Billing Address
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    // Additional
    specialRequests: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!guide || !bookingDetails) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-[#E07856] mx-auto mb-4" />
          <h2 className="font-bold text-[#1E3A5F] mb-2">Booking not found</h2>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-[#E07856] text-white rounded-2xl font-semibold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ").substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + "/" + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (!formData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "Invalid CVV";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add booking to user's bookings
    addBooking({
      guideId: guide.id,
      guideName: guide.name,
      guideAvatar: guide.avatar,
      city: guide.city + ", " + guide.country,
      date: bookingDetails.date,
      time: bookingDetails.time,
      duration: bookingDetails.duration,
      price: bookingDetails.totalPrice,
      status: "confirmed",
      tourType: bookingDetails.tourType || "Custom Tour",
    });

    setPaymentSuccess(true);
    sessionStorage.removeItem("pendingBooking");

    // Redirect after success
    setTimeout(() => {
      navigate("/my-bookings");
    }, 2500);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">Payment Successful!</h2>
          <p className="text-[#6B7C93] mb-4">
            Your booking with {guide.name} has been confirmed. Check your email for details.
          </p>
          <div className="w-8 h-1 bg-[#E07856] rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-8" style={{ maxWidth: 390, margin: "0 auto" }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8E] pt-12 pb-6 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Complete Payment</h1>
            <p className="text-white/70 text-sm">Secure checkout</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3">
        {/* Booking Summary */}
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-[#E5E7EB] mb-4">
          <h3 className="font-bold text-[#1E3A5F] mb-4">Booking Summary</h3>

          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#F3F4F6]">
            <img src={guide.avatar} alt={guide.name} className="w-14 h-14 rounded-2xl object-cover" />
            <div>
              <div className="font-bold text-[#1E3A5F]">{guide.name}</div>
              <div className="text-sm text-[#6B7C93] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {guide.city}, {guide.country}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-[#E07856]" />
              <span className="text-[#6B7C93]">Date:</span>
              <span className="font-semibold text-[#1E3A5F] ml-auto">{bookingDetails.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-[#E07856]" />
              <span className="text-[#6B7C93]">Time:</span>
              <span className="font-semibold text-[#1E3A5F] ml-auto">{bookingDetails.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-[#E07856]" />
              <span className="text-[#6B7C93]">Duration:</span>
              <span className="font-semibold text-[#1E3A5F] ml-auto">{bookingDetails.duration}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
            <span className="font-bold text-[#1E3A5F]">Total Amount</span>
            <span className="text-2xl font-bold text-[#E07856]">${bookingDetails.totalPrice}</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <h3 className="font-bold text-[#1E3A5F] mb-4">Personal Information</h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Full Name</label>
              <Input
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Phone Number</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#E07856]" />
            <h3 className="font-bold text-[#1E3A5F]">Payment Information</h3>
            <Lock className="w-4 h-4 text-[#4CAF50] ml-auto" />
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Card Number</label>
              <Input
                value={formData.cardNumber}
                onChange={(e) =>
                  handleInputChange("cardNumber", formatCardNumber(e.target.value))
                }
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Cardholder Name</label>
              <Input
                value={formData.cardName}
                onChange={(e) => handleInputChange("cardName", e.target.value)}
                placeholder="John Doe"
                className={errors.cardName ? "border-red-500" : ""}
              />
              {errors.cardName && <p className="text-xs text-red-600 mt-1">{errors.cardName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Expiry Date</label>
                <Input
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", formatExpiryDate(e.target.value))
                  }
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && <p className="text-xs text-red-600 mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">CVV</label>
                <Input
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <h3 className="font-bold text-[#1E3A5F] mb-4">Billing Address</h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Street Address</label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="123 Main Street"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">City</label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="New York"
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">ZIP Code</label>
                <Input
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="10001"
                  className={errors.zipCode ? "border-red-500" : ""}
                />
                {errors.zipCode && <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1E3A5F] mb-1.5 block">Country</label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#1E3A5F] bg-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#E5E7EB] mb-4">
          <h3 className="font-bold text-[#1E3A5F] mb-3">Special Requests (Optional)</h3>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleInputChange("specialRequests", e.target.value)}
            placeholder="Any special requirements or preferences for your tour?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1E3A5F] text-sm resize-none"
          />
        </div>

        {/* Security Badge */}
        <div className="bg-[#4CAF50]/10 rounded-2xl p-4 mb-4 flex items-center gap-3 border border-[#4CAF50]/20">
          <Shield className="w-6 h-6 text-[#4CAF50]" />
          <div className="flex-1">
            <div className="font-semibold text-[#1E3A5F] text-sm">Secure Payment</div>
            <div className="text-xs text-[#6B7C93]">Your payment information is encrypted and secure</div>
          </div>
          <Lock className="w-5 h-5 text-[#4CAF50]" />
        </div>

        {/* Terms Agreement */}
        <div className="mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[#E5E7EB] text-[#E07856] mt-0.5"
            />
            <span className="text-sm text-[#6B7C93]">
              I agree to the{" "}
              <span className="text-[#E07856] font-medium">Terms of Service</span> and{" "}
              <span className="text-[#E07856] font-medium">Cancellation Policy</span>
            </span>
          </label>
          {errors.agreeTerms && <p className="text-xs text-red-600 mt-2 ml-8">{errors.agreeTerms}</p>}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-[#E07856] to-[#FF8C42] text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ${bookingDetails.totalPrice}
            </>
          )}
        </button>

        <p className="text-center text-xs text-[#6B7C93] mt-4 mb-6">
          You won't be charged until the guide confirms your booking
        </p>
      </div>
    </div>
  );
}
