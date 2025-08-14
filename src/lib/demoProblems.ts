export type Problem = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  question: string;
};

export const demoProblems: Problem[] = [
  {
    id: "p1",
    title: "Overflowing trash bins",
    description: "Waste piling up near the walkway.",
    imagePath: "/demo-explore/trash.jpg",
    question: "Should we restore old buildings in our area?",
  },
  {
    id: "p2",
    title: "Broken benches at the park",
    description: "Damaged seating area makes it unusable for families.",
    imagePath: "/demo-explore/lake.jpg",
    question: "Should we add more bike lanes to reduce traffic and pollution?",
  },
  {
    id: "p3",
    title: "Graffiti on gym walls",
    description: "Community gym exterior needs cleanup.",
    imagePath: "/demo-explore/gym.jpg",
    question: "Should we plant more trees along our streets?",
  },
  {
    id: "p4",
    title: "Street lighting outage",
    description: "Dark area at night reduces safety.",
    imagePath: "/demo-explore/night.jpg",
    question: "Should we make all public spaces wheelchair accessible?",
  },
  {
    id: "p5",
    title: "Old playground equipment",
    description: "Aging structures require repair.",
    imagePath: "/demo-explore/old.jpg",
    question: "Should buses run later at night to support shift workers?",
  },
  {
    id: "p6",
    title: "Litter near the lake",
    description: "Shoreline cluttered with debris.",
    imagePath: "/demo-explore/dry.jpg",
    question: "Should we open our school gyms for community use in the evenings?",
  },
];


