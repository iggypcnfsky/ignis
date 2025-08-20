export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  location: string;
  profileImageUrl?: string;
  accountType: 'guest' | 'user';
  joinDate: string;
  totalPoints: number;
  contributions: {
    problems: number;
    ideas: number;
    meetups: number;
    chatMessages: number;
  };
  recentActivity: ActivityItem[];
  achievements: Achievement[];
  preferences: {
    profileVisibility: 'public' | 'private';
    notifications: {
      newMeetups: boolean;
      newIdeas: boolean;
      chatMessages: boolean;
      weeklyDigest: boolean;
    };
  };
}

export interface ActivityItem {
  id: string;
  type: 'problem' | 'idea' | 'meetup' | 'chat';
  title: string;
  description: string;
  date: string;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  category: 'contributions' | 'engagement' | 'milestones';
}

export const demoUserProfile: UserProfile = {
  id: "current-user",
  name: "Alex Rivera",
  bio: "Urban planning enthusiast passionate about making cities more livable for everyone. Love cycling, sustainable transport, and community gardens.",
  location: "San Francisco, CA",
  profileImageUrl: undefined, // Will use default gradient avatar
  accountType: "guest",
  joinDate: "2024-01-15",
  totalPoints: 1247,
  contributions: {
    problems: 12,
    ideas: 5,
    meetups: 2,
    chatMessages: 89,
  },
  recentActivity: [
    {
      id: "activity-1",
      type: "meetup",
      title: "Created meetup: Fix Pothole Crisis",
      description: "Organized community action for Mission District road repairs",
      date: "2024-12-08",
      points: 200,
    },
    {
      id: "activity-2",
      type: "idea",
      title: "Shared idea: Smart Traffic Lights",
      description: "AI-powered traffic optimization for reduced congestion",
      date: "2024-12-06",
      points: 100,
    },
    {
      id: "activity-3",
      type: "problem",
      title: "Reported: Broken Bike Lane",
      description: "Unsafe cycling conditions on Valencia Street",
      date: "2024-12-04",
      points: 50,
    },
    {
      id: "activity-4",
      type: "chat",
      title: "Active in Park Cleanup discussion",
      description: "15 messages in Dolores Park meetup chat",
      date: "2024-12-03",
      points: 75,
    },
    {
      id: "activity-5",
      type: "idea",
      title: "Shared idea: Community Composting",
      description: "Neighborhood-scale organic waste processing",
      date: "2024-12-01",
      points: 100,
    },
  ],
  achievements: [
    {
      id: "achievement-1",
      title: "Community Organizer",
      description: "Created your first meetup",
      icon: "Users",
      unlockedDate: "2024-11-20",
      category: "milestones",
    },
    {
      id: "achievement-2",
      title: "Problem Spotter",
      description: "Reported 10+ civic issues",
      icon: "Eye",
      unlockedDate: "2024-11-15",
      category: "contributions",
    },
    {
      id: "achievement-3",
      title: "Idea Machine",
      description: "Shared 5+ creative solutions",
      icon: "Lightbulb",
      unlockedDate: "2024-11-10",
      category: "contributions",
    },
    {
      id: "achievement-4",
      title: "Chat Champion",
      description: "Sent 50+ helpful messages",
      icon: "MessageCircle",
      unlockedDate: "2024-10-25",
      category: "engagement",
    },
  ],
  preferences: {
    profileVisibility: "public",
    notifications: {
      newMeetups: true,
      newIdeas: true,
      chatMessages: false,
      weeklyDigest: true,
    },
  },
};

export const profileEditFields = {
  name: {
    maxLength: 50,
    required: true,
    placeholder: "Your display name",
  },
  bio: {
    maxLength: 200,
    required: false,
    placeholder: "Tell the community about yourself, your interests, and what you care about...",
  },
  location: {
    maxLength: 100,
    required: false,
    placeholder: "City, State/Country",
  },
};

export function calculatePointsFromContributions(contributions: UserProfile['contributions']): number {
  return (
    contributions.problems * 50 +
    contributions.ideas * 100 +
    contributions.meetups * 200 +
    contributions.chatMessages * 5
  );
}

export function getAchievementsByCategory(achievements: Achievement[]): Record<string, Achievement[]> {
  return achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);
}

export function getRecentActivityByType(activity: ActivityItem[]): Record<string, ActivityItem[]> {
  return activity.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ActivityItem[]>);
}
