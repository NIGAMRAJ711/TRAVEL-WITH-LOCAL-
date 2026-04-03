import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Check, 
  Coffee, 
  Landmark, 
  Moon, 
  Trees, 
  UtensilsCrossed,
  Camera,
  Music,
  ShoppingBag
} from "lucide-react";
import { Calendar } from "../components/ui/calendar";

const expertiseTags = [
  { id: "food", label: "Food Tours", icon: UtensilsCrossed },
  { id: "history", label: "History", icon: Landmark },
  { id: "nightlife", label: "Nightlife", icon: Moon },
  { id: "nature", label: "Nature", icon: Trees },
  { id: "coffee", label: "Coffee Culture", icon: Coffee },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "music", label: "Music & Arts", icon: Music },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
];

const cities = [
  "Paris, France",
  "Tokyo, Japan",
  "Barcelona, Spain",
  "Rome, Italy",
  "New York, USA",
  "London, UK",
  "Istanbul, Turkey",
  "Bangkok, Thailand",
];

const STEPS = {
  CITY: 0,
  BIO: 1,
  EXPERTISE: 2,
  AVAILABILITY: 3,
  PRICING: 4,
};

export function GuideRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(STEPS.CITY);
  const [selectedCity, setSelectedCity] = useState("");
  const [bio, setBio] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pricing, setPricing] = useState({ hour: "", halfDay: "", fullDay: "" });

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleNext = () => {
    if (currentStep < STEPS.PRICING) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete registration
      navigate("/dashboard");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case STEPS.CITY:
        return selectedCity !== "";
      case STEPS.BIO:
        return bio.length >= 50;
      case STEPS.EXPERTISE:
        return selectedTags.length >= 2;
      case STEPS.AVAILABILITY:
        return true;
      case STEPS.PRICING:
        return pricing.hour !== "" && pricing.halfDay !== "" && pricing.fullDay !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-6 py-4">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button onClick={() => navigate("/")} className="text-[#1E3A5F]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold text-[#1E3A5F]">Become a Guide</h2>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i <= currentStep ? "bg-[#E07856]" : "bg-[#F5E6D8]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-8 pb-32">
        {currentStep === STEPS.CITY && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">
                Select your city
              </h3>
              <p className="text-[#6B7C93]">
                Where will you guide travelers?
              </p>
            </div>

            <div className="space-y-3">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    selectedCity === city
                      ? "border-[#E07856] bg-[#E07856]/5"
                      : "border-border bg-white hover:border-[#E07856]/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin
                      className={`w-5 h-5 ${
                        selectedCity === city ? "text-[#E07856]" : "text-[#6B7C93]"
                      }`}
                    />
                    <span className="text-[#1E3A5F] font-medium">{city}</span>
                  </div>
                  {selectedCity === city && (
                    <Check className="w-5 h-5 text-[#E07856]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === STEPS.BIO && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">
                Tell us about yourself
              </h3>
              <p className="text-[#6B7C93]">
                Help travelers get to know you (min 50 characters)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#6B7C93] mb-2 block">Your bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="I've lived in this city for 10 years and love showing visitors the hidden spots that only locals know about..."
                  className="min-h-[200px] rounded-2xl border-border"
                />
                <p className="text-sm text-[#6B7C93] mt-2">
                  {bio.length}/50 characters
                </p>
              </div>

              <div>
                <label className="text-sm text-[#6B7C93] mb-2 block">
                  Languages spoken
                </label>
                <Input
                  placeholder="e.g., English, Spanish, French"
                  className="rounded-2xl border-border"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === STEPS.EXPERTISE && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">
                Your expertise
              </h3>
              <p className="text-[#6B7C93]">
                Select at least 2 areas you specialize in
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {expertiseTags.map((tag) => {
                const Icon = tag.icon;
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "border-[#E07856] bg-[#E07856]/5"
                        : "border-border bg-white hover:border-[#E07856]/30"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        isSelected ? "text-[#E07856]" : "text-[#6B7C93]"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium text-center ${
                        isSelected ? "text-[#E07856]" : "text-[#1E3A5F]"
                      }`}
                    >
                      {tag.label}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-[#E07856]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === STEPS.AVAILABILITY && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">
                Your availability
              </h3>
              <p className="text-[#6B7C93]">
                Mark the days you're available to guide
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-2xl"
              />
            </div>

            <div className="bg-[#FFF8F0] rounded-2xl p-4 border border-[#E07856]/20">
              <p className="text-sm text-[#1E3A5F]">
                💡 <strong>Tip:</strong> You can always update your availability later in your dashboard
              </p>
            </div>
          </div>
        )}

        {currentStep === STEPS.PRICING && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">
                Set your pricing
              </h3>
              <p className="text-[#6B7C93]">
                How much do you charge for tours?
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-border">
                <label className="text-sm text-[#6B7C93] mb-2 block">
                  Per Hour
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-[#1E3A5F]">$</span>
                  <Input
                    type="number"
                    value={pricing.hour}
                    onChange={(e) =>
                      setPricing({ ...pricing, hour: e.target.value })
                    }
                    placeholder="25"
                    className="text-2xl font-semibold border-none p-0 h-auto"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-border">
                <label className="text-sm text-[#6B7C93] mb-2 block">
                  Half Day (4 hours)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-[#1E3A5F]">$</span>
                  <Input
                    type="number"
                    value={pricing.halfDay}
                    onChange={(e) =>
                      setPricing({ ...pricing, halfDay: e.target.value })
                    }
                    placeholder="85"
                    className="text-2xl font-semibold border-none p-0 h-auto"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-border">
                <label className="text-sm text-[#6B7C93] mb-2 block">
                  Full Day (8 hours)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-[#1E3A5F]">$</span>
                  <Input
                    type="number"
                    value={pricing.fullDay}
                    onChange={(e) =>
                      setPricing({ ...pricing, fullDay: e.target.value })
                    }
                    placeholder="150"
                    className="text-2xl font-semibold border-none p-0 h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#E6F2ED] rounded-2xl p-4 border border-[#4CAF50]/20">
              <p className="text-sm text-[#1E3A5F]">
                ✨ Average guides in your area charge $30-40/hour
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-6">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-14 bg-[#E07856] hover:bg-[#E07856]/90 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === STEPS.PRICING ? "Complete Registration" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
