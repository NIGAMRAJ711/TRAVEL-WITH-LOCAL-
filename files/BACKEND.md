# LocalLens — Backend Architecture & Deployment Guide

## Overview

LocalLens uses a **localStorage-based persistent backend** architecture — all data is stored per-email in the browser's localStorage, tied to an `AuthContext` that acts as the single source of truth. This means every message, booking, notification, reel upload, and profile change persists across sessions for the same email address.

---

## Data Storage Architecture

### Storage Keys

| Key | Purpose |
|-----|---------|
| `ll_session` | Currently logged-in user (JSON) |
| `ll_accounts` | All registered accounts, keyed by email (JSON) |
| `ll_reels_global` | All user-uploaded reels (shared across all users) |

### Data Hierarchy

```
ll_accounts
└── [email@example.com]
    ├── password: string
    └── user: User
        ├── id, name, email, avatar, role
        ├── savedGuides: number[]
        ├── markedPlaces: MarkedPlace[]
        ├── notifications: AppNotification[]
        ├── bookings: BookingRecord[]
        ├── conversations: Conversation[]     ← NEW: persistent messages
        ├── toursBooked, citiesVisited, reviewsGiven
        └── bio, city, phone, website, joinDate
```

---

## Feature: Persistent Messaging

### How it works
1. Every conversation is stored inside the user's account object under `conversations[]`
2. When a traveler sends a message, `sendMessage()` in `AuthContext` writes to `ll_accounts[email].conversations`
3. On login, the full account (with all past conversations) is loaded — so messages are always available
4. Guide auto-replies fire after 1.5s and also write back to the same account store
5. `markConversationRead()` sets unread count to 0 and marks all messages as read

### Conversation type
```typescript
type Conversation = {
  guideId: number;
  messages: ChatMessage[];
  unread: number;
  lastUpdated: number; // epoch ms
};

type ChatMessage = {
  id: string;
  from: "user" | "guide";
  text: string;
  time: string;
  read: boolean;
  createdAt: number; // epoch ms for reliable sorting
};
```

### New auth methods
```typescript
getConversation(guideId: number): Conversation | undefined
sendMessage(guideId, text, guideName, guideAvatar, guideCity): void
markConversationRead(guideId: number): void
totalUnreadMessages: number
```

---

## Feature: Reel Uploads

### How it works
1. User taps the **+ button** on the Reels screen
2. Upload modal lets them pick a photo (file input + drag-and-drop)
3. File is converted to a base64 data URL and stored in `ll_reels_global`
4. User-uploaded reels appear **at the top** of the feed, before the static seeded reels
5. Likes and saves on user reels are tracked by email arrays (`likedByEmails`, `savedByEmails`)

### UserReel type
```typescript
type UserReel = {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userAvatar: string;
  imageDataUrl: string;     // base64 — stored in localStorage
  location: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  likedByEmails: string[];  // tracks who liked it
  savedByEmails: string[];  // tracks who saved it
  createdAt: number;
};
```

### New auth methods
```typescript
userReels: UserReel[]
uploadReel(data): void
toggleReelLike(reelId: string): void
toggleReelSave(reelId: string): void
```

---

## Login & Session Persistence

When a user logs in via `login(email, password)`:
1. It reads from `ll_accounts[email]` — the **authoritative store** (not stale session)
2. This ensures all data written by other parts of the app (messages, notifications) is picked up
3. Session is saved to `ll_session` for auto-login on next visit
4. All account changes use `persistUser()` which updates both `ll_session` AND `ll_accounts[email]`

---

## Deployment Instructions

### Option 1 — Netlify (Recommended)

```bash
# 1. Install dependencies
pnpm install

# 2. Build
pnpm build

# 3. Deploy
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

Add `netlify.toml` in project root:
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 2 — Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Option 3 — GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# In package.json, add:
"homepage": "https://yourusername.github.io/locallens",
"scripts": {
  "predeploy": "pnpm build",
  "deploy": "gh-pages -d dist"
}

# Deploy
pnpm deploy
```

Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/locallens/', // your repo name
  plugins: [react()],
});
```

### Option 4 — Docker + Any VPS

```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install && pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

`nginx.conf`:
```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

```bash
docker build -t locallens .
docker run -p 80:80 locallens
```

---

## Upgrading to Real Backend (Future)

When ready to move beyond localStorage to a real backend (Supabase, Firebase, custom API), replace the functions in `AuthContext.tsx`:

| localStorage function | Real backend equivalent |
|----------------------|------------------------|
| `getAccounts()` | `GET /api/users` |
| `saveAccounts()` | `PUT /api/users/:email` |
| `getSession()` | JWT token + `GET /api/me` |
| `saveSession()` | Store JWT in httpOnly cookie |
| `getGlobalReels()` | `GET /api/reels` |
| `saveGlobalReels()` | `POST /api/reels` |

### Recommended stack for real backend:
- **Database**: Supabase (Postgres + auth) or Firebase Firestore
- **Storage**: Supabase Storage or Firebase Storage (for reel images instead of base64)
- **Auth**: Supabase Auth or Firebase Auth
- **Deployment**: Vercel (frontend) + Supabase (backend)

---

## Environment Variables

For production, create `.env.local`:
```env
VITE_APP_NAME=LocalLens
VITE_API_URL=https://your-api.com  # if using real backend later
```

---

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| traveler@demo.com | traveler123 | Traveler |
| guide@demo.com | guide123 | Guide |

Demo accounts are seeded automatically on first load and include sample messages, bookings, and notifications.

