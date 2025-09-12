export type Idea = {
  id: string;
  problemId: string;
  title: string;
  description: string;
  votesCount: number;
};

export const demoIdeas: Idea[] = [
  // Ideas for Remote Work Productivity (b1)
  {
    id: "b-idea-1",
    problemId: "b1",
    title: "Implement Slack/Teams Integration",
    description: "Set up proper channels for different projects, use status updates, and create clear communication protocols. We could also add project management tools like Asana or Monday.com integration.",
    votesCount: 34,
  },
  {
    id: "b-idea-2",
    problemId: "b1",
    title: "Virtual Coworking Sessions",
    description: "Schedule daily 'work together' video calls where we're all online but working on our own tasks. It creates the office atmosphere remotely and makes it easier to ask quick questions.",
    votesCount: 28,
  },
  {
    id: "b-idea-3",
    problemId: "b1",
    title: "Remote Work Training Program",
    description: "Invest in training for time management, digital collaboration, and home office setup. Many people never learned how to work effectively from home.",
    votesCount: 22,
  },

  // Ideas for Office Space Optimization (b2)
  {
    id: "b-idea-4",
    problemId: "b2",
    title: "Hot-Desking System",
    description: "Implement a booking system for desks and meeting rooms. People can reserve space when they need it, and we can track usage patterns to optimize our layout.",
    votesCount: 41,
  },
  {
    id: "b-idea-5",
    problemId: "b2",
    title: "Modular Furniture Solution",
    description: "Replace fixed desks with modular furniture that can be reconfigured based on daily needs. Create spaces that can shift between individual work and collaboration.",
    votesCount: 29,
  },

  // Ideas for Employee Engagement (b3)
  {
    id: "b-idea-6",
    problemId: "b3",
    title: "Career Development Program",
    description: "Create clear career paths with mentorship, skill development budgets, and regular growth conversations. People stay when they see a future here.",
    votesCount: 45,
  },
  {
    id: "b-idea-7",
    problemId: "b3",
    title: "Employee Recognition Platform",
    description: "Implement a peer-to-peer recognition system where team members can highlight each other's contributions. Make achievements visible and celebrated.",
    votesCount: 33,
  },
  {
    id: "b-idea-8",
    problemId: "b3",
    title: "Flexible Work Arrangements",
    description: "Offer more flexibility in work hours and locations. Trust employees to manage their time and judge them on results, not hours logged.",
    votesCount: 38,
  },

  // Ideas for Meeting Overload (b4)
  {
    id: "b-idea-9",
    problemId: "b4",
    title: "No-Meeting Wednesdays",
    description: "Designate Wednesdays as meeting-free days for deep work. Only emergency meetings allowed. This gives everyone a guaranteed day for focused work.",
    votesCount: 52,
  },
  {
    id: "b-idea-10",
    problemId: "b4",
    title: "Meeting Audit System",
    description: "Require agenda and clear objectives for every meeting. If you can't define what decisions need to be made, it becomes an email instead.",
    votesCount: 36,
  },

  // Ideas for Innovation Stagnation (b5)
  {
    id: "b-idea-11",
    problemId: "b5",
    title: "Innovation Time Policy",
    description: "Give everyone 10% of their time (half day per week) to work on passion projects or explore new ideas. Google's 20% time created Gmail and AdSense.",
    votesCount: 43,
  },
  {
    id: "b-idea-12",
    problemId: "b5",
    title: "Rapid Prototyping Budget",
    description: "Create small budgets ($500-2000) that any employee can access to test ideas quickly without going through lengthy approval processes.",
    votesCount: 31,
  },

  // Ideas for Cross-Department Communication (b6)
  {
    id: "b-idea-13",
    problemId: "b6",
    title: "Cross-Functional Project Teams",
    description: "Form mixed teams with members from different departments for major projects. This breaks down silos and improves understanding between teams.",
    votesCount: 39,
  },
  {
    id: "b-idea-14",
    problemId: "b6",
    title: "Monthly All-Hands Updates",
    description: "Each department presents their current projects and priorities to the whole company. Creates transparency and identifies collaboration opportunities.",
    votesCount: 27,
  },

  // Ideas for Work-Life Balance (b7)
  {
    id: "b-idea-15",
    problemId: "b7",
    title: "Mandatory Vacation Policy",
    description: "Require employees to take their vacation days and truly disconnect. No emails or calls during time off. Lead by example from management.",
    votesCount: 44,
  },
  {
    id: "b-idea-16",
    problemId: "b7",
    title: "Core Hours Only",
    description: "Establish core collaboration hours (10am-3pm) and allow flexible scheduling outside those times. No expectation to respond to messages after 6pm.",
    votesCount: 35,
  },

  // Ideas for Technology Infrastructure (b8)
  {
    id: "b-idea-17",
    problemId: "b8",
    title: "Cloud Migration Strategy",
    description: "Move to cloud-based systems for better reliability and scalability. Start with the most problematic systems and migrate gradually.",
    votesCount: 40,
  },
  {
    id: "b-idea-18",
    problemId: "b8",
    title: "Employee Tech Allowance",
    description: "Give employees a budget to choose their own equipment and software tools. People are more productive with tools they're comfortable with.",
    votesCount: 32,
  },
];
