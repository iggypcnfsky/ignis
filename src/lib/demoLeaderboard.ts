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
    problems: number; // problems * 50
    ideas: number; // ideas * 100
    meetups: number; // meetups * 200
    chatMessages: number; // messages * 5
  };
  isCurrentUser?: boolean;
}

export const demoLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "current-user",
    rank: 8,
    name: "You",
    location: "San Francisco, CA",
    totalPoints: 1247,
    contributions: {
      problems: 12,
      ideas: 5,
      meetups: 2,
      chatMessages: 89,
    },
    pointsBreakdown: {
      problems: 600, // 12 * 50
      ideas: 500, // 5 * 100
      meetups: 400, // 2 * 200
      chatMessages: 445, // 89 * 5
    },
    isCurrentUser: true,
  },
  {
    id: "user-1",
    rank: 1,
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    totalPoints: 3420,
    contributions: {
      problems: 28,
      ideas: 15,
      meetups: 8,
      chatMessages: 164,
    },
    pointsBreakdown: {
      problems: 1400, // 28 * 50
      ideas: 1500, // 15 * 100
      meetups: 1600, // 8 * 200
      chatMessages: 820, // 164 * 5
    },
  },
  {
    id: "user-2",
    rank: 2,
    name: "Alex Chen",
    location: "Singapore",
    totalPoints: 2890,
    contributions: {
      problems: 22,
      ideas: 12,
      meetups: 6,
      chatMessages: 138,
    },
    pointsBreakdown: {
      problems: 1100, // 22 * 50
      ideas: 1200, // 12 * 100
      meetups: 1200, // 6 * 200
      chatMessages: 690, // 138 * 5
    },
  },
  {
    id: "user-3",
    rank: 3,
    name: "Emma Thompson",
    location: "London, UK",
    totalPoints: 2650,
    contributions: {
      problems: 18,
      ideas: 14,
      meetups: 5,
      chatMessages: 210,
    },
    pointsBreakdown: {
      problems: 900, // 18 * 50
      ideas: 1400, // 14 * 100
      meetups: 1000, // 5 * 200
      chatMessages: 1050, // 210 * 5
    },
  },
  {
    id: "user-4",
    rank: 4,
    name: "David Kim",
    location: "Seoul, South Korea",
    totalPoints: 2340,
    contributions: {
      problems: 16,
      ideas: 8,
      meetups: 7,
      chatMessages: 168,
    },
    pointsBreakdown: {
      problems: 800, // 16 * 50
      ideas: 800, // 8 * 100
      meetups: 1400, // 7 * 200
      chatMessages: 840, // 168 * 5
    },
  },
  {
    id: "user-5",
    rank: 5,
    name: "Sarah Johnson",
    location: "Toronto, Canada",
    totalPoints: 2115,
    contributions: {
      problems: 25,
      ideas: 6,
      meetups: 4,
      chatMessages: 123,
    },
    pointsBreakdown: {
      problems: 1250, // 25 * 50
      ideas: 600, // 6 * 100
      meetups: 800, // 4 * 200
      chatMessages: 615, // 123 * 5
    },
  },
  {
    id: "user-6",
    rank: 6,
    name: "Miguel Santos",
    location: "São Paulo, Brazil",
    totalPoints: 1875,
    contributions: {
      problems: 14,
      ideas: 9,
      meetups: 3,
      chatMessages: 155,
    },
    pointsBreakdown: {
      problems: 700, // 14 * 50
      ideas: 900, // 9 * 100
      meetups: 600, // 3 * 200
      chatMessages: 775, // 155 * 5
    },
  },
  {
    id: "user-7",
    rank: 7,
    name: "Priya Patel",
    location: "Mumbai, India",
    totalPoints: 1560,
    contributions: {
      problems: 8,
      ideas: 11,
      meetups: 2,
      chatMessages: 132,
    },
    pointsBreakdown: {
      problems: 400, // 8 * 50
      ideas: 1100, // 11 * 100
      meetups: 400, // 2 * 200
      chatMessages: 660, // 132 * 5
    },
  },
  {
    id: "user-9",
    rank: 9,
    name: "Ahmed Hassan",
    location: "Cairo, Egypt",
    totalPoints: 1120,
    contributions: {
      problems: 9,
      ideas: 4,
      meetups: 3,
      chatMessages: 94,
    },
    pointsBreakdown: {
      problems: 450, // 9 * 50
      ideas: 400, // 4 * 100
      meetups: 600, // 3 * 200
      chatMessages: 470, // 94 * 5
    },
  },
  {
    id: "user-10",
    rank: 10,
    name: "Lisa Wagner",
    location: "Berlin, Germany",
    totalPoints: 985,
    contributions: {
      problems: 11,
      ideas: 3,
      meetups: 2,
      chatMessages: 67,
    },
    pointsBreakdown: {
      problems: 550, // 11 * 50
      ideas: 300, // 3 * 100
      meetups: 400, // 2 * 200
      chatMessages: 335, // 67 * 5
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
