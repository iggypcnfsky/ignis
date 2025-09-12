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
    rank: 8,
    name: "You",
    location: "Springfield, IL",
    totalPoints: 1247,
    contributions: {
      problems: 12,
      ideas: 7,
      meetups: 2,
      chatMessages: 89,
    },
    pointsBreakdown: {
      problems: 600,
      ideas: 700,
      meetups: 400,
      chatMessages: 445,
    },
    isCurrentUser: true,
  },
  {
    id: "user-1",
    rank: 1,
    name: "Maria Santos",
    location: "Phoenix, AZ",
    totalPoints: 3420,
    contributions: {
      problems: 28,
      ideas: 25,
      meetups: 8,
      chatMessages: 164,
    },
    pointsBreakdown: {
      problems: 1400,
      ideas: 2500,
      meetups: 1600,
      chatMessages: 820,
    },
  },
  {
    id: "user-2",
    rank: 2,
    name: "Robert Chen",
    location: "Portland, OR",
    totalPoints: 2890,
    contributions: {
      problems: 22,
      ideas: 20,
      meetups: 6,
      chatMessages: 138,
    },
    pointsBreakdown: {
      problems: 1100,
      ideas: 2000,
      meetups: 1200,
      chatMessages: 690,
    },
  },
  {
    id: "user-3",
    rank: 3,
    name: "Linda Rodriguez",
    location: "Miami, FL",
    totalPoints: 2650,
    contributions: {
      problems: 18,
      ideas: 22,
      meetups: 5,
      chatMessages: 210,
    },
    pointsBreakdown: {
      problems: 900,
      ideas: 2200,
      meetups: 1000,
      chatMessages: 1050,
    },
  },
  {
    id: "user-4",
    rank: 4,
    name: "James Wilson",
    location: "Nashville, TN",
    totalPoints: 2340,
    contributions: {
      problems: 16,
      ideas: 18,
      meetups: 7,
      chatMessages: 168,
    },
    pointsBreakdown: {
      problems: 800,
      ideas: 1800,
      meetups: 1400,
      chatMessages: 840,
    },
  },
  {
    id: "user-5",
    rank: 5,
    name: "Patricia Davis",
    location: "Minneapolis, MN",
    totalPoints: 2115,
    contributions: {
      problems: 25,
      ideas: 14,
      meetups: 4,
      chatMessages: 123,
    },
    pointsBreakdown: {
      problems: 1250,
      ideas: 1400,
      meetups: 800,
      chatMessages: 615,
    },
  },
  {
    id: "user-6",
    rank: 6,
    name: "Michael Brown",
    location: "Salt Lake City, UT",
    totalPoints: 1875,
    contributions: {
      problems: 14,
      ideas: 17,
      meetups: 3,
      chatMessages: 155,
    },
    pointsBreakdown: {
      problems: 700,
      ideas: 1700,
      meetups: 600,
      chatMessages: 775,
    },
  },
  {
    id: "user-7",
    rank: 7,
    name: "Jennifer Taylor",
    location: "Richmond, VA",
    totalPoints: 1560,
    contributions: {
      problems: 8,
      ideas: 15,
      meetups: 2,
      chatMessages: 132,
    },
    pointsBreakdown: {
      problems: 400,
      ideas: 1500,
      meetups: 400,
      chatMessages: 660,
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
