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
    rank: 6,
    name: "You",
    location: "Warszawa, Polska",
    totalPoints: 1450,
    contributions: {
      problems: 8,
      ideas: 12,
      meetups: 3,
      chatMessages: 67,
    },
    pointsBreakdown: {
      problems: 400,
      ideas: 1200,
      meetups: 600,
      chatMessages: 335,
    },
    isCurrentUser: true,
  },
  {
    id: "user-1",
    rank: 1,
    name: "Anna Kowalska",
    location: "Kraków, Polska",
    totalPoints: 2890,
    contributions: {
      problems: 22,
      ideas: 18,
      meetups: 6,
      chatMessages: 134,
    },
    pointsBreakdown: {
      problems: 1100,
      ideas: 1800,
      meetups: 1200,
      chatMessages: 670,
    },
  },
  {
    id: "user-2",
    rank: 2,
    name: "Michał Nowak",
    location: "Gdańsk, Polska",
    totalPoints: 2650,
    contributions: {
      problems: 18,
      ideas: 15,
      meetups: 8,
      chatMessages: 156,
    },
    pointsBreakdown: {
      problems: 900,
      ideas: 1500,
      meetups: 1600,
      chatMessages: 780,
    },
  },
  {
    id: "user-3",
    rank: 3,
    name: "Karolina Wiśniewska",
    location: "Wrocław, Polska",
    totalPoints: 2340,
    contributions: {
      problems: 16,
      ideas: 14,
      meetups: 5,
      chatMessages: 188,
    },
    pointsBreakdown: {
      problems: 800,
      ideas: 1400,
      meetups: 1000,
      chatMessages: 940,
    },
  },
  {
    id: "user-4",
    rank: 4,
    name: "Jakub Zieliński",
    location: "Poznań, Polska",
    totalPoints: 2115,
    contributions: {
      problems: 25,
      ideas: 8,
      meetups: 4,
      chatMessages: 123,
    },
    pointsBreakdown: {
      problems: 1250,
      ideas: 800,
      meetups: 800,
      chatMessages: 615,
    },
  },
  {
    id: "user-5",
    rank: 5,
    name: "Martyna Lewandowska",
    location: "Łódź, Polska",
    totalPoints: 1875,
    contributions: {
      problems: 14,
      ideas: 11,
      meetups: 3,
      chatMessages: 145,
    },
    pointsBreakdown: {
      problems: 700,
      ideas: 1100,
      meetups: 600,
      chatMessages: 725,
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
