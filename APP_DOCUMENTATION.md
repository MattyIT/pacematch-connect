# PaceMatch Connect - App Documentation

## Overview
PaceMatch Connect is a fitness social networking application that combines workout tracking, social features, and event discovery. Think Strava meets social networking with a focus on connecting athletes through shared activities and events.

**Target Users**: Runners, cyclists, walkers, and fitness enthusiasts who want to track workouts and connect with like-minded people.

**Core Value**: Connect with nearby athletes, discover local events, share workouts, and build a fitness community.

---

## Technology Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for build tooling and dev server
- **React Router v6** for client-side routing

### UI & Styling
- **Tailwind CSS** - utility-first CSS framework
- **Radix UI** (@radix-ui/*) - accessible component primitives (used via shadcn/ui pattern)
- **Material UI Icons** (@mui/icons-material) - icon library
- **Framer Motion** - animation library for smooth transitions
- **Lucide React** - additional icon set

### Form Handling & Validation
- **React Hook Form** - performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - form validation integration

### State Management
- **React Context API** - UserContext, NotificationContext
- **localStorage** - persistent data storage (prototype only)

### Data Visualization
- **Recharts** - charting library for workout stats

### Additional Libraries
- **date-fns** - date utility library
- **sonner** - toast notifications
- **vaul** - drawer component

---

## Design System

### Color Palette (HSL Format)
All colors are defined in `src/index.css` using CSS variables and HSL format:

#### Light Mode
- **Primary Blue**: `207 79% 47%` (#1976d2) - Main brand color
- **Success Green**: `123 50% 34%` (#2e7d32) - Running activities, success states
- **Warning Orange**: `36 100% 50%` (#ff9800) - Walking activities, warnings
- **Purple**: `291 64% 42%` (#9c27b0) - Accent color
- **Background**: `0 0% 100%` (white)
- **Foreground**: `0 0% 13%` (near black text)

#### Activity Colors
- **Running**: `122 39% 49%` (green)
- **Cycling**: `207 90% 54%` (blue)
- **Walking**: `45 100% 51%` (yellow/orange)

### Design Principles

#### 1. Mobile-First & Touch-Friendly
- All interactive elements minimum 48x48px touch targets
- Bottom navigation for easy thumb access
- Swipe gestures for drawers and modals
- Pull-to-refresh patterns

#### 2. Glassmorphism & Depth
- Backdrop blur effects: `backdrop-blur-md`, `backdrop-blur-xl`
- Elevated cards: `shadow-elevation-1` through `shadow-elevation-4`
- Translucent overlays: `bg-card/80`, `bg-card/90`

#### 3. Smooth Animations
- Framer Motion for page transitions and micro-interactions
- Stagger animations for lists (delay: index * 0.05)
- Spring physics for natural movement
- Scale transforms on tap: `whileTap={{ scale: 0.95 }}`

#### 4. Consistent Spacing
- Base unit: 4px (Tailwind default)
- Section padding: `px-4` or `px-6`
- Card padding: `p-4` or `p-5`
- Gap between elements: `gap-2`, `gap-3`, `gap-4`

#### 5. Typography
- System font stack (San Francisco on iOS, Roboto on Android)
- Headings: `text-2xl`, `text-3xl` with `font-bold`
- Body: `text-sm` or `text-base`
- Muted text: `text-muted-foreground`

### Key UI Patterns

#### Cards
```tsx
<Card className="overflow-hidden hover:shadow-elevation-2 transition-all border border-border/50">
  {/* Content */}
</Card>
```

#### Filter Chips (Horizontal Scroll)
```tsx
<div className="flex gap-2 overflow-x-auto scrollbar-hide">
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="px-4 py-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50"
  >
    Filter
  </motion.button>
</div>
```

#### Bottom Drawer
```tsx
<motion.div
  initial={{ y: "60%" }}
  animate={{ y: "0%" }}
  className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl rounded-t-3xl"
>
  {/* Drawer handle */}
  <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full"></div>
  {/* Content */}
</motion.div>
```

#### Floating Action Button (FAB)
```tsx
<motion.button
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring" }}
  className="fixed bottom-32 right-6 z-40 rounded-2xl shadow-elevation-4"
>
  <AddIcon />
</motion.button>
```

---

## Authentication System

### Current State: Mock Authentication
- No real backend authentication
- Login screen displays Google Sign-in button (non-functional)
- User proceeds directly to ProfileSetup after "login"

### Login Flow
1. **LoginScreen** (`/login`) - Entry point with branding
2. **ProfileSetup** (`/profile-setup`) - Onboarding flow
   - Username input
   - Activity selection (running, cycling, walking)
   - Gender selection
   - Photo upload (2 photos required)
3. **Index/Home** (`/`) - Main feed after setup

### User Profile Structure
```typescript
interface UserProfile {
  username: string;
  activities: string[];
  gender: string;
  photos: string[];
  bio?: string;
  useMetric: boolean;
  workoutHistory: Workout[];
  friends: number[]; // Array of user IDs
}
```

### Storage
- Profile stored in localStorage: `userProfile`
- Accessed via `UserContext` provider
- User ID hardcoded as `999` for current user

---

## Application Structure

### Routes & Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginScreen | Entry point, mock Google login |
| `/profile-setup` | ProfileSetup | Onboarding wizard |
| `/` | Index | Activity feed, home page |
| `/map` | MapScreen | GPS workout tracking |
| `/events` | Events | Discover events (Strava-style UI) |
| `/my-events` | MyEvents | User's joined events |
| `/workout-history` | WorkoutHistory | Personal workout log |
| `/messages` | Messages | Conversations (Chats/Requests tabs) |
| `/chat` | Chat | 1-on-1 messaging |
| `/friends` | Friends | Friend management |
| `/edit-profile` | EditProfile | Update profile settings |
| `/settings` | Settings | App preferences |

### Navigation
- **BottomNavigation**: Fixed bottom bar on most pages
  - Home, Events, Map, Messages, Profile icons
  - Active state highlighting
  - Material UI icons

---

## Core Features

### 1. Activity Feed (`/`)
**Purpose**: Central hub displaying user's workouts and friend activity

**Features**:
- Merged feed: user workouts + friend workouts
- Filter by activity type (running, cycling, walking)
- Kudos system (like button with heart icon)
- Comment system with drawer UI
- Weekly stats summary
- Total distance counter
- Friends online indicator

**Data Structure**:
```typescript
interface WorkoutPost {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  activityType: "running" | "cycling" | "walking";
  distance: string;
  duration: string;
  speed: string;
  calories: number;
  date: string;
  time: string;
  location: string;
  photos?: string[];
  caption?: string;
  kudos: number;
  comments: number;
  hasGivenKudos?: boolean;
}
```

**Storage**:
- Posts in `mockData.ts` (mock data)
- Kudos: `localStorage.getItem('kudos-{postId}')`
- Comments: `localStorage.getItem('comments-{postId}')`

### 2. Workout Tracking (`/map`)
**Purpose**: Record new workouts with GPS tracking

**Features**:
- Activity type selection (run, cycle, walk)
- Mock GPS tracking with map display
- Real-time stats: duration, distance, speed, calories
- Nearby users detection (map markers)
- Photo upload capability
- Caption/note input
- Save to workout history

**Current Limitations**:
- GPS is mocked (not real location tracking)
- Map is placeholder (needs Google Maps API integration)
- Nearby users are hardcoded

### 3. Social Features

#### Friends System (`/friends`)
**Features**:
- View all friends list
- Incoming friend requests
- Outgoing friend requests
- Add friend by clicking profiles
- Accept/decline requests
- Remove friends

**Storage**: `src/lib/socialStorage.ts`
```typescript
friendRequests: {
  incoming: Array<{ userId: number; username: string; avatar: string; timestamp: number }>;
  outgoing: number[];
}
```

**Access**: Via `UserContext` - `userProfile.friends` array

#### Messaging System (`/messages`, `/chat`)
**Features**:
- Two tabs: "Chats" (friends only) and "Requests" (non-friends)
- Message request handling (accept/decline)
- Block/unblock users
- Mute/unmute conversations
- Archive conversations
- Unread message badges
- Click username/avatar to view profile

**Storage**: `src/lib/messageStorage.ts`
```typescript
// Message requests
messageRequests: {
  [userId: string]: 'pending' | 'accepted' | 'declined'
}

// Blocked users
blockedUsers: number[]

// Conversation metadata
conversation-{userId}: {
  isMuted: boolean;
  isArchived: boolean;
  lastMessageTime: number;
}
```

**Mock Conversations**: Defined in `src/lib/mockData.ts`
```typescript
interface Conversation {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isRequest?: boolean;
}
```

#### Profile Viewing
**Component**: `src/pages/ProfileView.tsx`

**Features**:
- View user photos, bio, activities
- Friend status indicator
- Action buttons based on relationship:
  - Not friends: "Add Friend"
  - Request sent: "Request Sent" (disabled)
  - Request received: "Accept Friend" / "Decline"
  - Already friends: "Send Message"

**Access Points**:
- Click username/avatar in feed
- Click user in chat header
- Click friend in friends list

### 4. Events System (`/events`, `/my-events`)

#### Events Discovery (`/events`)
**UI Style**: Strava-inspired with map background and bottom drawer

**Features**:
- Map background with blur overlay
- Search locations bar
- Horizontal scrolling filter chips:
  - Activity type
  - Distance
  - Date
  - Category (Community/Sponsored)
- Bottom drawer with event cards
- Floating "Create Event" button
- Event details modal

**Event Structure**:
```typescript
interface Event {
  id: number;
  title: string;
  description: string;
  type: "running" | "cycling" | "walking";
  category: "user" | "sponsored";
  date: string;
  time: string;
  location: string;
  distance: string;
  distanceValue: number;
  participants: number;
  maxParticipants?: number;
  hostName?: string;
  hostAvatar?: string;
  sponsorLogo?: string;
  lat: number;
  lng: number;
  isJoined?: boolean;
}
```

**Filtering Logic**:
- Activity filter: all, running, cycling, walking
- Category filter: all, user-hosted, sponsored
- Distance filter (UI only, not implemented)
- Date filter (UI only, not implemented)
- Sort by distance (closest first)

#### Event Cards
**Compact Design** (in drawer):
```
[Icon] Title
       Badge | Distance · Participants
       Location
                                    [Join Button]
```

**Features**:
- Gradient icon background
- Activity badge
- Join/Joined state
- Click to open detail modal

#### Event Detail Modal
**Component**: `src/components/EventDetailModal.tsx`

**Tabs**:
1. Details - Full description, date/time, location, distance
2. Participants - List of attendees with avatars
3. Comments - Discussion thread

**Actions**:
- Join/Leave event
- Share event
- Copy link

#### Create Event Modal
**Component**: `src/components/CreateEventModal.tsx`

**Form Fields**:
- Title (required, max 100 chars)
- Description (required, max 500 chars)
- Activity type (running/cycling/walking)
- Date (required)
- Time (required)
- Location (required)
- Max participants (optional)

**Validation**: Zod schema with React Hook Form

#### My Events (`/my-events`)
**Features**:
- Filter: Upcoming vs Past events
- Shows only user's joined events
- Same card design as Events page

### 5. Workout History (`/workout-history`)
**Features**:
- Chronological list of all user workouts
- Filter by activity type
- Weekly/monthly stats
- Click to view workout details

---

## Context Providers

### UserContext (`src/contexts/UserContext.tsx`)
**Purpose**: Manage user profile and authentication state

**Provides**:
```typescript
{
  userProfile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
  logout: () => void;
}
```

**Usage**:
```tsx
import { useUser } from '@/contexts/UserContext';

const { userProfile, updateProfile, logout } = useUser();
```

### NotificationContext (`src/contexts/NotificationContext.tsx`)
**Purpose**: Handle in-app notifications

**Provides**:
```typescript
{
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  dismissNotification: (id: string) => void;
  handleNotificationTap: (notification: Notification) => void;
}
```

**Notification Types**:
- Friend requests
- Message notifications
- Event invites
- Kudos on posts
- Comments on posts

**Component**: `src/components/NotificationSystem.tsx`
- Banner style notifications at top of screen
- Auto-dismiss after 5 seconds
- Tap to navigate to relevant screen

---

## Key Components

### Bottom Navigation
**File**: `src/components/BottomNavigation.tsx`

**Icons & Routes**:
- Home → `/`
- Events → `/events`
- Map → `/map`
- Messages → `/messages` (with unread badge)
- Profile → user dropdown menu

**Styling**:
- Fixed at bottom with blur backdrop
- Active state with primary color
- Unread message badge in red

### Workout Post
**File**: `src/components/WorkoutPost.tsx`

**Structure**:
```
[Avatar] Username | Following
         Activity Badge | Location
         
Photo Grid (optional)
Caption (optional)

Distance | Duration | Speed | Calories

[Kudos Button] 123  [Comment Button] 45  [Share]
```

**Interactions**:
- Kudos: Click heart icon (toggle)
- Comment: Opens CommentDrawer
- Share: Shows share options
- Click post: Opens WorkoutDetailModal

### Comment Drawer
**File**: `src/components/CommentDrawer.tsx`

**Features**:
- Bottom sheet drawer (vaul library)
- List of comments with avatars
- Input field with send button
- Real-time comment addition
- Stored in localStorage

### Profile View Modal
**File**: `src/pages/ProfileView.tsx`

**Sections**:
- Photo carousel/grid
- Bio text
- Activities chips
- Stats (distance, workouts)
- Action buttons

### Event Detail Modal
**File**: `src/components/EventDetailModal.tsx`

**Tabs**: Details, Participants, Comments

### Create Event Modal
**File**: `src/components/CreateEventModal.tsx`

**Form with validation and error handling**

---

## Mock Data

### Current User
```typescript
const CURRENT_USER_ID = 999;
```

### Mock Conversations (`src/lib/mockData.ts`)
```typescript
export const mockConversations: Conversation[] = [
  {
    id: 1,
    userId: 101,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "See you at the marathon!",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    isRequest: false // Friend
  },
  {
    id: 2,
    userId: 102,
    name: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Hi! Would love to join your run",
    timestamp: "1 hour ago",
    unread: 1,
    online: false,
    isRequest: true // Message request
  }
];
```

### Mock Workout Posts
Defined in `src/lib/mockData.ts` with sample running, cycling, and walking posts

### Mock Events
Hardcoded in `src/pages/Events.tsx` with variety of user-hosted and sponsored events

### Mock Nearby Users
Hardcoded in `src/pages/MapScreen.tsx` for GPS feature

---

## Data Storage Architecture

### localStorage Keys
```typescript
// User profile
'userProfile': UserProfile

// Social features
'friendRequests': { incoming, outgoing }
'messageRequests': { [userId]: status }
'blockedUsers': number[]

// Activity interactions
'kudos-{postId}': number[] // Array of user IDs
'comments-{postId}': Comment[]

// Conversation metadata
'conversation-{userId}': { isMuted, isArchived, lastMessageTime }
```

### Accessing Storage
**Social Storage**: `src/lib/socialStorage.ts`
```typescript
export const socialStorage = {
  getFriendRequests,
  addFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  isFriend
};
```

**Message Storage**: `src/lib/messageStorage.ts`
```typescript
export const messageStorage = {
  getMessageRequests,
  setMessageRequest,
  isUserBlocked,
  blockUser,
  unblockUser,
  getConversationSettings,
  updateConversationSettings
};
```

---

## Ready for Backend Integration

### Features Ready for Real Backend
1. **Authentication**: Replace mock login with real OAuth/JWT
2. **Database**: 
   - Users table
   - Workouts table
   - Events table
   - Messages table
   - Friend relationships table
3. **Real-time Features**:
   - Live messaging (WebSocket)
   - Live workout tracking
   - Push notifications
4. **File Storage**: User photos, workout photos
5. **GPS Integration**: Real location tracking with Google Maps API

### Recommended Backend: Supabase or Lovable Cloud
- PostgreSQL database
- Row Level Security (RLS) policies
- Authentication with social providers
- Real-time subscriptions
- File storage buckets
- Edge functions for serverless logic

---

## Code Conventions

### File Organization
```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── [Feature]*.tsx  # Feature components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── mockData.ts
│   ├── socialStorage.ts
│   ├── messageStorage.ts
│   └── utils.ts
├── pages/              # Route components
├── index.css           # Global styles & design tokens
└── main.tsx            # App entry point
```

### Component Patterns
```tsx
// Use function declarations
const ComponentName = () => {
  // State
  const [state, setState] = useState();
  
  // Contexts
  const { userProfile } = useUser();
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleAction = () => {};
  
  // Render
  return <div>...</div>;
};

export default ComponentName;
```

### Styling Patterns
- Use Tailwind utility classes
- Use design system tokens (colors, shadows)
- Responsive: Mobile-first with `sm:`, `md:`, `lg:`
- Animations: Framer Motion for complex, CSS for simple
- Never hardcode colors - always use HSL tokens

### TypeScript
- Define interfaces for all data structures
- Use `type` for unions and intersections
- Props interfaces: `ComponentNameProps`
- Avoid `any` - use `unknown` or proper types

---

## Common Patterns

### Modal/Drawer Opening
```tsx
const [showModal, setShowModal] = useState(false);

<AnimatePresence>
  {showModal && (
    <Modal onClose={() => setShowModal(false)}>
      {/* Content */}
    </Modal>
  )}
</AnimatePresence>
```

### Friend Status Check
```tsx
import { socialStorage } from '@/lib/socialStorage';
import { useUser } from '@/contexts/UserContext';

const { userProfile } = useUser();
const isFriend = userProfile?.friends?.includes(userId) || false;
```

### Toast Notifications
```tsx
import { toast } from 'sonner';

toast.success("Event joined!");
toast.error("Failed to load events");
```

### List Animations
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    {/* Item content */}
  </motion.div>
))}
```

---

## Performance Considerations

### Current Optimizations
- React Context for state (lightweight)
- localStorage for persistence (synchronous)
- Lazy loading images with placeholders
- Debounced search inputs
- Memoized expensive calculations

### Future Optimizations Needed
- Virtual scrolling for long lists
- Image optimization and lazy loading
- Code splitting with React.lazy()
- Service worker for offline support
- IndexedDB for large datasets

---

## Testing Strategy (Not Implemented)

### Recommended Tests
1. **Unit Tests**: Utility functions, storage helpers
2. **Component Tests**: React Testing Library
3. **Integration Tests**: User flows (login → profile → post)
4. **E2E Tests**: Cypress or Playwright

---

## Design References

### UI Inspiration
- **Strava**: Events page with map and bottom drawer
- **Instagram**: Feed with photos, likes, comments
- **WhatsApp**: Messaging UI and chat interface
- **Apple Fitness**: Workout stats and tracking

### Key Design Features
1. **Glassmorphism**: Frosted glass effect with backdrop blur
2. **Card-based layouts**: Elevated surfaces with shadows
3. **Bottom sheets**: Drawer UI for mobile-first design
4. **Horizontal scrolling**: Filter chips and photo carousels
5. **Gradient accents**: Subtle color transitions
6. **Micro-interactions**: Scale on tap, smooth transitions

---

## Browser Support
- **Primary**: Chrome, Safari (iOS/macOS)
- **Mobile**: iOS Safari 14+, Chrome Android 90+
- **Desktop**: Chrome 90+, Safari 14+, Firefox 88+

---

## Environment Variables (None Required Currently)
Future environment variables for production:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_MAPS_API_KEY=
VITE_API_BASE_URL=
```

---

## Deployment
Currently configured for:
- **Vite build**: `npm run build`
- **Preview**: `npm run preview`
- **Static hosting**: Vercel, Netlify, or similar
- **No backend required** (pure frontend prototype)

---

## Future Enhancements

### High Priority
1. Real authentication with OAuth
2. Backend database integration
3. Real GPS tracking
4. Push notifications
5. Real-time messaging

### Medium Priority
1. Activity challenges
2. Leaderboards
3. Training plans
4. Workout recommendations
5. Social sharing to external platforms

### Low Priority
1. Dark mode improvements
2. Accessibility enhancements
3. Internationalization (i18n)
4. Analytics integration
5. A/B testing framework

---

## Getting Started for Developers

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Key Files to Start With
1. `src/App.tsx` - Route configuration
2. `src/pages/Index.tsx` - Home/feed page
3. `src/contexts/UserContext.tsx` - User state
4. `src/lib/mockData.ts` - Sample data
5. `src/index.css` - Design system tokens

### Making Changes
1. Check design tokens in `src/index.css` first
2. Use existing UI components from `src/components/ui/`
3. Follow mobile-first responsive design
4. Test on mobile viewport (375px width)
5. Use TypeScript strictly
6. Keep components focused and small

---

## Contact & Support
This is a prototype application. For questions about implementation details, refer to the source code or this documentation.

---

**Last Updated**: November 2024
**Version**: 1.0.0 (Prototype)
**Status**: Active Development
