import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type NotificationType = "booking" | "message" | "review" | "promo" | "system";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  guideId?: number;
  avatar?: string;
};

export type MarkedPlace = {
  id: string;
  name: string;
  city: string;
  x: number;
  y: number;
  note: string;
  color: string;
  emoji?: string;
};

export type BookingRecord = {
  id: string;
  guideId: number;
  guideName: string;
  guideAvatar: string;
  city: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  tourType: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "traveler" | "guide";
  savedGuides: number[];
  markedPlaces: MarkedPlace[];
  notifications: AppNotification[];
  bookings: BookingRecord[];
  toursBooked: number;
  citiesVisited: number;
  reviewsGiven: number;
  joinDate: string;
  bio: string;
  city: string;
  phone: string;
  website: string;
};

type StoredAccount = {
  user: User;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "traveler" | "guide"
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  toggleRole: () => void;
  saveGuide: (id: number) => void;
  unsaveGuide: (id: number) => void;
  markPlace: (place: Omit<MarkedPlace, "id">) => void;
  unmarkPlace: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  addBooking: (booking: Omit<BookingRecord, "id">) => void;
  unreadNotificationCount: number;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  SESSION: "ll_session",
  ACCOUNTS: "ll_accounts",
};

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "booking",
    title: "Booking Confirmed! 🎉",
    body: "Your tour with Sophie Laurent in Paris on April 5th is confirmed.",
    time: "2 hours ago",
    read: false,
    guideId: 1,
    avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
  },
  {
    id: "n2",
    type: "message",
    title: "New message from Marco Rossi",
    body: "\"The Colosseum at dawn is truly magical — you'll have the arena to yourself!\"",
    time: "5 hours ago",
    read: false,
    guideId: 2,
    avatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
  },
  {
    id: "n3",
    type: "review",
    title: "Review Request",
    body: "How was your tour with Emma Wilson in London? Share your experience!",
    time: "1 day ago",
    read: true,
    guideId: 4,
    avatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
  },
  {
    id: "n4",
    type: "promo",
    title: "🌟 Special Offer",
    body: "Get 20% off your next booking in Tokyo! Use code TOKYO20. Limited time only.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "n5",
    type: "system",
    title: "Welcome to LocalLens!",
    body: "Your account is verified. Start exploring local guides around the world.",
    time: "3 days ago",
    read: true,
  },
];

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "b1",
    guideId: 4,
    guideName: "Emma Wilson",
    guideAvatar: "https://images.unsplash.com/photo-1759572987527-ee1692f1aab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    city: "London, UK",
    date: "March 22, 2026",
    time: "10:00 AM",
    duration: "Full Day",
    price: 210,
    status: "completed",
    tourType: "Street Art & Coffee",
  },
  {
    id: "b2",
    guideId: 1,
    guideName: "Sophie Laurent",
    guideAvatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    city: "Paris, France",
    date: "April 5, 2026",
    time: "9:00 AM",
    duration: "Half Day",
    price: 120,
    status: "confirmed",
    tourType: "Food & Hidden Gems",
  },
  {
    id: "b3",
    guideId: 2,
    guideName: "Marco Rossi",
    guideAvatar: "https://images.unsplash.com/photo-1591953996491-ea0d5ff3db59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    city: "Rome, Italy",
    date: "April 12, 2026",
    time: "6:30 AM",
    duration: "Half Day",
    price: 135,
    status: "pending",
    tourType: "Dawn Colosseum Tour",
  },
];

const DEMO_TRAVELER: StoredAccount = {
  password: "traveler123",
  user: {
    id: "demo-traveler",
    name: "Alex Johnson",
    email: "traveler@demo.com",
    avatar: "",
    role: "traveler",
    savedGuides: [1, 3],
    markedPlaces: [
      { id: "mp1", name: "Eiffel Tower", city: "Paris", x: 48, y: 38, note: "Must visit at sunset!", color: "#E07856" },
      { id: "mp2", name: "Colosseum", city: "Rome", x: 68, y: 55, note: "Book dawn tour", color: "#1E3A5F" },
    ],
    notifications: DEFAULT_NOTIFICATIONS,
    bookings: DEFAULT_BOOKINGS,
    toursBooked: 12,
    citiesVisited: 8,
    reviewsGiven: 15,
    joinDate: "January 2025",
    bio: "Adventure seeker and travel enthusiast exploring the world one city at a time.",
    city: "San Francisco, USA",
    phone: "+1 (415) 555-0123",
    website: "",
  },
};

const DEMO_GUIDE: StoredAccount = {
  password: "guide123",
  user: {
    id: "demo-guide",
    name: "Sophie Laurent",
    email: "guide@demo.com",
    avatar: "https://images.unsplash.com/photo-1514189672269-0e46fbfd9260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    role: "guide",
    savedGuides: [],
    markedPlaces: [],
    notifications: [
      {
        id: "gn1",
        type: "booking",
        title: "New Booking Request",
        body: "Alex Johnson wants to book your Food & Hidden Gems tour on April 5th.",
        time: "1 hour ago",
        read: false,
      },
      {
        id: "gn2",
        type: "review",
        title: "New 5-Star Review ⭐",
        body: "Michael R. left you a 5-star review: \"Sophie was absolutely amazing!\"",
        time: "3 hours ago",
        read: false,
      },
    ],
    bookings: [],
    toursBooked: 0,
    citiesVisited: 1,
    reviewsGiven: 0,
    joinDate: "March 2018",
    bio: "Born and raised in Paris, I've been showing travelers the hidden gems of this beautiful city for 8 years.",
    city: "Paris, France",
    phone: "+33 1 23 45 67 89",
    website: "sophieparis.com",
  },
};

function getAccounts(): Record<string, StoredAccount> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    const stored = raw ? JSON.parse(raw) : {};
    if (!stored["traveler@demo.com"]) stored["traveler@demo.com"] = DEMO_TRAVELER;
    if (!stored["guide@demo.com"]) stored["guide@demo.com"] = DEMO_GUIDE;
    return stored;
  } catch {
    return { "traveler@demo.com": DEMO_TRAVELER, "guide@demo.com": DEMO_GUIDE };
  }
}

function saveAccounts(accounts: Record<string, StoredAccount>) {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
}

function getSession(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setIsLoading(false);
  }, []);

  const persistUser = (updatedUser: User) => {
    setUser(updatedUser);
    saveSession(updatedUser);
    // Also update in accounts store
    const accounts = getAccounts();
    if (accounts[updatedUser.email]) {
      accounts[updatedUser.email].user = updatedUser;
      saveAccounts(accounts);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    const accounts = getAccounts();
    const account = accounts[email.toLowerCase()];
    if (!account) return { success: false, error: "No account found with this email address." };
    if (account.password !== password) return { success: false, error: "Incorrect password. Please try again." };
    persistUser(account.user);
    return { success: true };
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "traveler" | "guide"
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800));
    const accounts = getAccounts();
    const lowerEmail = email.toLowerCase();
    if (accounts[lowerEmail]) return { success: false, error: "An account with this email already exists." };

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email: lowerEmail,
      avatar: "",
      role,
      savedGuides: [],
      markedPlaces: [],
      notifications: [
        {
          id: "welcome",
          type: "system",
          title: `Welcome to LocalLens, ${name.split(" ")[0]}! 🎉`,
          body: "Your account is ready. Start exploring local guides around the world.",
          time: "Just now",
          read: false,
        },
      ],
      bookings: [],
      toursBooked: 0,
      citiesVisited: 0,
      reviewsGiven: 0,
      joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      bio: "",
      city: "",
      phone: "",
      website: "",
    };

    accounts[lowerEmail] = { user: newUser, password };
    saveAccounts(accounts);
    persistUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    saveSession(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    persistUser(updated);
    // If email changed, re-key in accounts
    if (data.email && data.email !== user.email) {
      const accounts = getAccounts();
      accounts[data.email.toLowerCase()] = { ...accounts[user.email], user: updated };
      delete accounts[user.email];
      saveAccounts(accounts);
    }
  };

  const toggleRole = () => {
    if (!user) return;
    updateProfile({ role: user.role === "traveler" ? "guide" : "traveler" });
  };

  const saveGuide = (id: number) => {
    if (!user) return;
    if (!user.savedGuides.includes(id)) {
      updateProfile({ savedGuides: [...user.savedGuides, id] });
    }
  };

  const unsaveGuide = (id: number) => {
    if (!user) return;
    updateProfile({ savedGuides: user.savedGuides.filter((g) => g !== id) });
  };

  const markPlace = (place: Omit<MarkedPlace, "id">) => {
    if (!user) return;
    const newPlace: MarkedPlace = { ...place, id: `place-${Date.now()}` };
    updateProfile({ markedPlaces: [...user.markedPlaces, newPlace] });
  };

  const unmarkPlace = (id: string) => {
    if (!user) return;
    updateProfile({ markedPlaces: user.markedPlaces.filter((p) => p.id !== id) });
  };

  const markNotificationRead = (id: string) => {
    if (!user) return;
    updateProfile({
      notifications: user.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    });
  };

  const markAllNotificationsRead = () => {
    if (!user) return;
    updateProfile({ notifications: user.notifications.map((n) => ({ ...n, read: true })) });
  };

  const clearAllNotifications = () => {
    if (!user) return;
    updateProfile({ notifications: [] });
  };

  const addBooking = (booking: Omit<BookingRecord, "id">) => {
    if (!user) return;
    const newBooking: BookingRecord = { ...booking, id: `booking-${Date.now()}` };
    updateProfile({
      bookings: [newBooking, ...user.bookings],
      toursBooked: user.toursBooked + 1,
    });
  };

  const unreadNotificationCount = user
    ? user.notifications.filter((n) => !n.read).length
    : 0;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        toggleRole,
        saveGuide,
        unsaveGuide,
        markPlace,
        unmarkPlace,
        markNotificationRead,
        markAllNotificationsRead,
        clearAllNotifications,
        addBooking,
        unreadNotificationCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
