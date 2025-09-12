export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  location: string;
  totalPoints: number;
  contributions: {
    problems: number;
    ideas: number;
    meetups: number;
    chatMessages: number;
  };
  pointsBreakdown: {
    problems: number;
    ideas: number;
    meetups: number;
    chatMessages: number;
  };
  isCurrentUser?: boolean;
}

export const demoLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "current-user",
    rank: 7,
    name: "You",
    location: "San Francisco, CA",
    totalPoints: 1560,
    contributions: {
      problems: 9,
      ideas: 11,
      meetups: 2,
      chatMessages: 82,
    },
    pointsBreakdown: {
      problems: 450,
      ideas: 1100,
      meetups: 400,
      chatMessages: 410,
    },
    isCurrentUser: true,
  },
  {
    id: "user-1",
    rank: 1,
    name: "Sarah Chen",
    location: "New York, NY",
    totalPoints: 3420,
    contributions: {
      problems: 28,
      ideas: 22,
      meetups: 8,
      chatMessages: 164,
    },
    pointsBreakdown: {
      problems: 1400,
      ideas: 2200,
      meetups: 1600,
      chatMessages: 820,
    },
  },
  {
    id: "user-2",
    rank: 2,
    name: "Marcus Rodriguez",
    location: "Austin, TX",
    totalPoints: 2890,
    contributions: {
      problems: 22,
      ideas: 18,
      meetups: 6,
      chatMessages: 138,
    },
    pointsBreakdown: {
      problems: 1100,
      ideas: 1800,
      meetups: 1200,
      chatMessages: 690,
    },
  },
  {
    id: "user-3",
    rank: 3,
    name: "Jennifer Kim",
    location: "Seattle, WA",
    totalPoints: 2650,
    contributions: {
      problems: 18,
      ideas: 20,
      meetups: 5,
      chatMessages: 210,
    },
    pointsBreakdown: {
      problems: 900,
      ideas: 2000,
      meetups: 1000,
      chatMessages: 1050,
    },
  },
  {
    id: "user-4",
    rank: 4,
    name: "David Thompson",
    location: "Boston, MA",
    totalPoints: 2340,
    contributions: {
      problems: 16,
      ideas: 14,
      meetups: 7,
      chatMessages: 168,
    },
    pointsBreakdown: {
      problems: 800,
      ideas: 1400,
      meetups: 1400,
      chatMessages: 840,
    },
  },
  {
    id: "user-5",
    rank: 5,
    name: "Lisa Park",
    location: "Chicago, IL",
    totalPoints: 2115,
    contributions: {
      problems: 25,
      ideas: 12,
      meetups: 4,
      chatMessages: 123,
    },
    pointsBreakdown: {
      problems: 1250,
      ideas: 1200,
      meetups: 800,
      chatMessages: 615,
    },
  },
  {
    id: "user-6",
    rank: 6,
    name: "Alex Johnson",
    location: "Denver, CO",
    totalPoints: 1875,
    contributions: {
      problems: 14,
      ideas: 16,
      meetups: 3,
      chatMessages: 155,
    },
    pointsBreakdown: {
      problems: 700,
      ideas: 1600,
      meetups: 600,
      chatMessages: 775,
    },
  },
];

export const pointsStructure = {
  problem: 50,
  idea: 100,
  meetup: 200,
  chatMessage: 5,
};

export function getCurrentUser(): LeaderboardUser {
  return demoLeaderboardUsers.find(user => user.isCurrentUser) || demoLeaderboardUsers[0];
}

export function getTopUsers(limit: number = 10): LeaderboardUser[] {
  return demoLeaderboardUsers
    .filter(user => !user.isCurrentUser)
    .slice(0, limit);
}

export function getAllUsers(): LeaderboardUser[] {
  return demoLeaderboardUsers.sort((a, b) => a.rank - b.rank);
}
