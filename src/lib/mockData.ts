import { Activity, WorkoutHistory } from "@/contexts/UserContext";

export interface MockUser {
  id: number;
  username: string;
  avatar: string;
  activities: Activity[];
  bio?: string;
  photos?: string[];
}

export interface Comment {
  id: string;
  userId: number;
  username: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

export interface WorkoutPost {
  id: string;
  userId: number;
  workout: WorkoutHistory;
  photos?: string[];
  caption?: string;
  kudos: number[];
  comments: Comment[];
  timestamp: Date;
}

// Mock users database
export const mockUsers: MockUser[] = [
  {
    id: 1,
    username: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    activities: ["running", "walking"],
    bio: "Marathon runner 🏃‍♀️ | Fitness enthusiast | Coffee lover ☕",
  },
  {
    id: 2,
    username: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    activities: ["cycling", "running"],
    bio: "Cyclist | Trail explorer | Weekend warrior 🚴",
  },
  {
    id: 3,
    username: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=3",
    activities: ["walking", "running"],
    bio: "Walking enthusiast | Nature lover 🌲 | Wellness coach",
  },
  {
    id: 4,
    username: "James Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    activities: ["running"],
    bio: "Ultra runner | Mountain lover | Always training 💪",
  },
  {
    id: 5,
    username: "Lisa Anderson",
    avatar: "https://i.pravatar.cc/150?img=5",
    activities: ["walking", "cycling"],
    bio: "Fitness instructor | Motivating others daily ✨",
  },
  {
    id: 6,
    username: "Tom Roberts",
    avatar: "https://i.pravatar.cc/150?img=6",
    activities: ["cycling"],
    bio: "Road cyclist | Weekend rides | Chasing PRs 🚴‍♂️",
  },
  {
    id: 7,
    username: "Rachel Green",
    avatar: "https://i.pravatar.cc/150?img=7",
    activities: ["running", "walking"],
    bio: "Morning runner | Sunset walker | Living healthy 🌅",
  },
  {
    id: 8,
    username: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=8",
    activities: ["running", "cycling"],
    bio: "Triathlete in training | Always moving forward 🏊‍♂️",
  },
  {
    id: 9,
    username: "Sophie Martin",
    avatar: "https://i.pravatar.cc/150?img=9",
    activities: ["walking"],
    bio: "Daily walker | 10k steps minimum | Health first 🚶‍♀️",
  },
  {
    id: 10,
    username: "Alex Turner",
    avatar: "https://i.pravatar.cc/150?img=10",
    activities: ["running", "cycling", "walking"],
    bio: "All-around athlete | Outdoor adventurer | Never stopping 🎯",
  },
];

// Function to merge user workouts into feed
export const mergeUserWorkoutsIntoFeed = (userWorkouts: WorkoutHistory[], currentUserId: number): WorkoutPost[] => {
  const feedPosts = [...mockWorkoutPosts];
  
  // Convert user workouts to posts
  const userPosts: WorkoutPost[] = userWorkouts.map((workout, idx) => ({
    id: `user-post-${workout.id}`,
    userId: currentUserId,
    workout,
    caption: undefined, // User workouts don't have captions by default
    kudos: [],
    comments: [],
    timestamp: new Date(workout.date),
  }));

  // Merge and sort by date
  const allPosts = [...feedPosts, ...userPosts];
  return allPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate mock workout posts
const generateMockPosts = (): WorkoutPost[] => {
  const posts: WorkoutPost[] = [];
  const now = new Date();
  
  const captions = [
    "Great morning run! Feeling energized 💪",
    "New personal record today!",
    "Beautiful weather for a workout ☀️",
    "Pushed through and finished strong!",
    "Training for my next race 🏃",
    "Weekend warrior mode activated!",
    "Love this route! 🌳",
    "Tired but happy 😊",
    "Another one in the books!",
    "Making progress every day 📈",
  ];

  // Create 25 posts from various users over the past 7 days
  for (let i = 0; i < 25; i++) {
    const user = mockUsers[i % mockUsers.length];
    const activity = user.activities[Math.floor(Math.random() * user.activities.length)];
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    
    const duration = 1200 + Math.floor(Math.random() * 3600); // 20-80 min
    const distance = activity === "running" 
      ? 5 + Math.random() * 10 
      : activity === "cycling" 
      ? 15 + Math.random() * 30 
      : 3 + Math.random() * 7;
    const avgSpeed = (distance / duration) * 3600;
    const calories = Math.floor(duration / 60 * (activity === "cycling" ? 8 : activity === "running" ? 10 : 4));
    
    const workout: WorkoutHistory = {
      id: `workout-${i}`,
      activity,
      date: timestamp,
      duration,
      distance,
      avgSpeed,
      calories,
      location: ["Central Park", "Riverside Trail", "City Loop", "Mountain Path", "Beach Road"][Math.floor(Math.random() * 5)],
    };
    
    // Random kudos (3-15 users)
    const kudosCount = 3 + Math.floor(Math.random() * 12);
    const kudos = Array.from({ length: kudosCount }, (_, idx) => (idx + i) % 10 + 1);
    
    posts.push({
      id: `post-${i}`,
      userId: user.id,
      workout,
      caption: Math.random() > 0.3 ? captions[i % captions.length] : undefined,
      kudos,
      comments: [],
      timestamp,
    });
  }
  
  return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const mockWorkoutPosts = generateMockPosts();

// Helper to get user by ID
export const getMockUserById = (id: number): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Mock conversation data with message request status
export interface MockConversation {
  id: number;
  userId: number;
  userName: string;
  avatar: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
  isRequest?: boolean; // true if this is a message request
}

export const mockConversations: MockConversation[] = [
  {
    id: 1,
    userId: 1,
    userName: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hi! Want to workout together?",
    timestamp: Date.now() - 2 * 60 * 1000, // 2 minutes ago
    unreadCount: 1,
    isRequest: false, // Friends - goes to Chats
  },
  {
    id: 2,
    userId: 2,
    userName: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Great to see another runner nearby!",
    timestamp: Date.now() - 5 * 60 * 1000,
    unreadCount: 0,
    isRequest: false, // Friends - goes to Chats
  },
  {
    id: 3,
    userId: 3,
    userName: "Emma Davis",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Would you like to join me for a run?",
    timestamp: Date.now() - 60 * 60 * 1000,
    unreadCount: 2,
    isRequest: false, // Friends - goes to Chats
  },
  {
    id: 4,
    userId: 4,
    userName: "James Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "That sounds great! What time works for you?",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    unreadCount: 0,
    isRequest: false, // Friends - goes to Chats
  },
  {
    id: 5,
    userId: 5,
    userName: "Lisa Anderson",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Thanks for the run today! Let's do it again soon.",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    unreadCount: 0,
    isRequest: false, // Friends - goes to Chats
  },
  {
    id: 6,
    userId: 7,
    userName: "Rachel Green",
    avatar: "https://i.pravatar.cc/150?img=7",
    lastMessage: "Hey! I saw you're into running too 🏃‍♀️",
    timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
    unreadCount: 1,
    isRequest: true, // Not friends - goes to Requests
  },
  {
    id: 7,
    userId: 9,
    userName: "Sophie Martin",
    avatar: "https://i.pravatar.cc/150?img=9",
    lastMessage: "Want to be walking buddies?",
    timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
    unreadCount: 1,
    isRequest: true, // Not friends - goes to Requests
  },
];
