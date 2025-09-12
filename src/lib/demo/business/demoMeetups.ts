export type Meetup = {
  id: string;
  title: string;
  date: string;
  time: string;
  isLive?: boolean;
  isOnline?: boolean;
  participants: number;
  problemsCount: number;
  ideasCount: number;
  duration: string;
  problemIds: string[];
  ideaIds: string[];
  description?: string;
  location?: string;
  whatsapp?: string;
  organizer: string;
};

export const demoMeetups: Meetup[] = [
  {
    id: "bm1",
    title: "Remote Work Strategy Session",
    date: "Today",
    time: "2:00 PM",
    isLive: true,
    isOnline: true,
    participants: 12,
    problemsCount: 2,
    ideasCount: 3,
    duration: "90min",
    problemIds: ["b1", "b7"],
    ideaIds: ["b-idea-1", "b-idea-2", "b-idea-15"],
    description: "Discussing tools and policies to improve remote work productivity while maintaining work-life balance.",
    organizer: "Sarah Chen, HR Director",
  },
  {
    id: "bm2",
    title: "Innovation Workshop",
    date: "Tomorrow",
    time: "10:00 AM",
    isLive: false,
    isOnline: false,
    participants: 8,
    problemsCount: 1,
    ideasCount: 2,
    duration: "120min",
    problemIds: ["b5"],
    ideaIds: ["b-idea-11", "b-idea-12"],
    description: "Brainstorming session to implement innovation time policy and rapid prototyping budget.",
    organizer: "Marcus Rodriguez, Product Manager",
    location: "Conference Room A",
  },
  {
    id: "bm3",
    title: "Office Space Planning Meeting",
    date: "Next Monday",
    time: "9:00 AM",
    isLive: false,
    isOnline: false,
    participants: 15,
    problemsCount: 1,
    ideasCount: 2,
    duration: "60min",
    problemIds: ["b2"],
    ideaIds: ["b-idea-4", "b-idea-5"],
    description: "Planning the transition to hot-desking and modular furniture for our hybrid work model.",
    organizer: "Jennifer Kim, Operations Manager",
    location: "Main Conference Room",
  },
  {
    id: "bm4",
    title: "Cross-Department Collaboration",
    date: "September 15",
    time: "3:00 PM",
    isLive: false,
    isOnline: true,
    participants: 20,
    problemsCount: 1,
    ideasCount: 2,
    duration: "75min",
    problemIds: ["b6"],
    ideaIds: ["b-idea-13", "b-idea-14"],
    description: "All-hands meeting to discuss breaking down silos and improving cross-functional communication.",
    organizer: "David Thompson, CEO",
  },
  {
    id: "bm5",
    title: "Employee Engagement Focus Group",
    date: "September 20",
    time: "4:00 PM",
    isLive: false,
    isOnline: false,
    participants: 10,
    problemsCount: 1,
    ideasCount: 3,
    duration: "90min",
    problemIds: ["b3"],
    ideaIds: ["b-idea-6", "b-idea-7", "b-idea-8"],
    description: "Small group discussion on career development, recognition programs, and flexible work arrangements.",
    organizer: "Lisa Park, People Operations",
    location: "Collaboration Space B",
  },
  {
    id: "bm6",
    title: "Meeting Culture Reform Workshop",
    date: "September 25",
    time: "11:00 AM",
    isLive: false,
    isOnline: true,
    participants: 18,
    problemsCount: 1,
    ideasCount: 2,
    duration: "75min",
    problemIds: ["b4"],
    ideaIds: ["b-idea-9", "b-idea-10"],
    description: "Interactive workshop to establish new meeting guidelines, implement no-meeting blocks, and create meeting audit processes.",
    organizer: "Michael Chen, Operations Director",
  },
  {
    id: "bm7",
    title: "Technology Infrastructure Planning",
    date: "October 3",
    time: "2:30 PM",
    isLive: false,
    isOnline: false,
    participants: 14,
    problemsCount: 1,
    ideasCount: 2,
    duration: "120min",
    problemIds: ["b8"],
    ideaIds: ["b-idea-17", "b-idea-18"],
    description: "Strategic planning session for cloud migration and employee technology allowances to modernize our infrastructure.",
    organizer: "Rachel Torres, IT Director",
    location: "Executive Conference Room",
  },
];

// Helper function to get meetups for a specific problem
export function getMeetupsForProblem(problemId: string): Meetup[] {
  return demoMeetups.filter(meetup =>
    meetup.problemIds.includes(problemId)
  );
}

// Helper function to get all meetups
export function getAllMeetups(): Meetup[] {
  return demoMeetups;
}
