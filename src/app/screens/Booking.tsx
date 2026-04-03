import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar } from "../components/ui/calendar";
import { 
  ArrowLeft, 
  Send, 
  Clock, 
  Calendar as CalendarIcon,
  CheckCircle
} from "lucide-react";
import { allGuides } from "../data/guides";

const durations = [
  { id: "hour", label: "1 Hour", price: 35 },
  { id: "halfDay", label: "Half Day (4hrs)", price: 120 },
  { id: "fullDay", label: "Full Day (8hrs)", price: 200 },
];

const guideInfo = {
  name: "Sophie Laurent",
  avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB0b3VyaXN0JTIwdHJhdmVsfGVufDF8fHx8MTc3NDg1MDExNHww&ixlib=rb-4.1.0&q=80&w=400",
};

const chatMessages = [
  {
    id: 1,
    from: "guide",
    message: "Hi! Thanks for your interest. I'd love to show you around Paris! What areas are you most interested in?",
    time: "10:30 AM",
  },
  {
    id: 2,
    from: "user",
    message: "Hi Sophie! I'm really interested in the local food scene and hidden cafés.",
    time: "10:32 AM",
  },
  {
    id: 3,
    from: "guide",
    message: "Perfect! I know all the best spots. I can take you to some amazing local markets and cafés that tourists never find 😊",
    time: "10:33 AM",
  },
];

export function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDuration, setSelectedDuration] = useState("halfDay");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [message, setMessage] = useState("");
  const [showBookingConfirmed, setShowBookingConfirmed] = useState(false);

  const guide = allGuides.find((g) => g.id === Number(id)) ?? allGuides[0];
  const durations = [
    { id: "hour", label: "1 Hour", price: guide.pricing.hour },
    { id: "halfDay", label: "Half Day (4hrs)", price: guide.pricing.halfDay },
    { id: "fullDay", label: "Full Day (8hrs)", price: guide.pricing.fullDay },
  ];

  const selectedOption = durations.find((d) => d.id === selectedDuration);

  const handleBooking = () => {
    const formattedDate = date?.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) || "TBD";

    // Store booking details for payment page
    const bookingDetails = {
      guideId: guide.id,
      guideName: guide.name,
      guideAvatar: guide.avatar,
      date: formattedDate,
      time: selectedTime,
      duration: selectedOption?.label || "",
      totalPrice: (selectedOption?.price || 0) + 5,
      tourType: "Custom Tour",
    };

    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingDetails));
    navigate(`/payment/${guide.id}`);
  };

  if (showBookingConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#1E3A5F] mb-3">
            Booking Confirmed!
          </h2>
          <p className="text-[#6B7C93] text-lg">
            {guide.name} will be in touch soon. Check your messages for details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-6 py-4">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button onClick={() => navigate(`/guide/${id}`)} className="text-[#1E3A5F]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={guide.avatar}
              alt={guide.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-[#1E3A5F]">{guide.name}</h2>
              <span className="text-sm text-[#4CAF50]">• {guide.available ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        {/* Date Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-[#E07856]" />
            <h3 className="text-xl font-semibold text-[#1E3A5F]">Select Date</h3>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-2xl"
          />
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#E07856]" />
            <h3 className="text-xl font-semibold text-[#1E3A5F]">Select Time</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map(
              (time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-2xl font-medium transition-all ${
                    selectedTime === time
                      ? "bg-[#E07856] text-white"
                      : "bg-[#FFF8F0] text-[#1E3A5F] hover:bg-[#E07856]/10"
                  }`}
                >
                  {time}
                </button>
              )
            )}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mb-6">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">Duration</h3>
          <div className="space-y-3">
            {durations.map((duration) => (
              <button
                key={duration.id}
                onClick={() => setSelectedDuration(duration.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  selectedDuration === duration.id
                    ? "border-[#E07856] bg-[#E07856]/5"
                    : "border-border bg-white hover:border-[#E07856]/30"
                }`}
              >
                <span className="font-medium text-[#1E3A5F]">{duration.label}</span>
                <span className="font-bold text-[#E07856]">${duration.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-[#E07856] to-[#FF8C42] rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80">Subtotal</span>
            <span className="text-white font-semibold">${selectedOption?.price}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80">Service Fee</span>
            <span className="text-white font-semibold">$5</span>
          </div>
          <div className="border-t border-white/20 my-3" />
          <div className="flex items-center justify-between">
            <span className="text-white text-xl font-bold">Total</span>
            <span className="text-white text-2xl font-bold">
              ${(selectedOption?.price || 0) + 5}
            </span>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border mb-6">
          <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">
            Chat with {guide.name.split(" ")[0]}
          </h3>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            {[
              { id: 1, from: "guide", message: `Hi! Thanks for your interest. I'd love to show you around ${guide.city}! What areas are you most interested in?`, time: "10:30 AM" },
              { id: 2, from: "user", message: "Hi! I'm really interested in the local food scene and hidden gems.", time: "10:32 AM" },
              { id: 3, from: "guide", message: "Perfect! I know all the best spots. I can take you to some amazing places that tourists never find 😊", time: "10:33 AM" },
            ].map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] ${msg.from === "user" ? "bg-[#E07856] text-white rounded-2xl rounded-br-sm" : "bg-[#FFF8F0] text-[#1E3A5F] rounded-2xl rounded-bl-sm"} px-4 py-3`}>
                  <p className="text-sm">{msg.message}</p>
                  <span className={`text-xs mt-1 block ${msg.from === "user" ? "text-white/70" : "text-[#6B7C93]"}`}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-2xl border-border"
            />
            <button className="w-12 h-12 bg-[#E07856] rounded-2xl flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-6">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleBooking}
            className="w-full h-14 bg-[#E07856] hover:bg-[#E07856]/90 text-white rounded-2xl text-lg"
          >
            Confirm Booking — ${(selectedOption?.price || 0) + 5}
          </Button>
        </div>
      </div>
    </div>
  );
}