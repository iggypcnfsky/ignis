export type Idea = {
  id: string;
  problemId: string;
  title: string;
  description: string;
  votesCount: number;
};

export const demoIdeas: Idea[] = [
  {
    id: "idea-1",
    problemId: "p1",
    title: "Sponsor-a-Bench Program",
    description: "Launch a 'Sponsor-a-Bench' program where local businesses and families could fund new benches in exchange for a dedication plaque.",
    votesCount: 12,
  },
  {
    id: "idea-2",
    problemId: "p1",
    title: "Community Workshop",
    description: "Host a weekend workshop led by local woodworkers to guide volunteers in repairing and rebuilding the benches.",
    votesCount: 3,
  },
  {
    id: "idea-3",
    problemId: "p1",
    title: "School Partnership",
    description: "Partner with the local high school shop class to rebuild benches as a semester project for hands-on learning.",
    votesCount: 8,
  },
  {
    id: "idea-4",
    problemId: "p1",
    title: "Fundraiser Drive",
    description: "Host a community fundraiser and adopt-a-bench drive with a public tracker for sponsored benches.",
    votesCount: 15,
  },
  {
    id: "idea-5",
    problemId: "p1",
    title: "Recycled Materials",
    description: "Switch to recycled-plastic lumber for future benches to reduce maintenance and extend lifespan.",
    votesCount: 21,
  },
  {
    id: "idea-6",
    problemId: "p1",
    title: "Monthly Fix-It Meetups",
    description: "Create a monthly 'Fix-It in the Park' meetup to focus on small repairs and build regular volunteer momentum.",
    votesCount: 5,
  },
];
