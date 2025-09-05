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
    title: "Broken Water Fountain",
    description: "School water fountain dripping water onto the floor, making hallway slippery.",
    imagePath: "/demo-explore/1.png",
    question: "Should we ask the school to fix the broken water fountains?",
  },
  {
    id: "p2",
    title: "Cafeteria Food Options",
    description: "Limited healthy options in school cafeteria - mostly greasy fries and pizza.",
    imagePath: "/demo-explore/2.png",
    question: "Should we ask for healthier lunch options in the cafeteria?",
  },
  {
    id: "p3",
    title: "Unsafe Playground",
    description: "Rusty swing set with peeling paint poses safety risks for students.",
    imagePath: "/demo-explore/3.png",
    question: "Should we campaign for safer playground equipment?",
  },
  {
    id: "p4",
    title: "Too Much Homework",
    description: "Students overwhelmed with assignments, affecting work-life balance.",
    imagePath: "/demo-explore/4.png",
    question: "Should we ask teachers to reduce homework and focus on projects?",
  },
  {
    id: "p5",
    title: "Recycling Needed",
    description: "Overflowing trash bins with recyclable materials scattered around hallways.",
    imagePath: "/demo-explore/5.png",
    question: "Should we start a recycling program in our school?",
  },
  {
    id: "p6",
    title: "Loud Hallways",
    description: "Noisy crowded hallways make it difficult for students to focus.",
    imagePath: "/demo-explore/6.png",
    question: "Should we create quiet study spaces for students who need focus?",
  },
  {
    id: "p7",
    title: "Student Mental Health",
    description: "Students dealing with stress and anxiety need peer support.",
    imagePath: "/demo-explore/7.png",
    question: "Should we create a peer-support group for stressed students?",
  },
  {
    id: "p8",
    title: "Phone Use in Class",
    description: "Students distracted by phones during lessons, affecting learning.",
    imagePath: "/demo-explore/8.png",
    question: "Should we set fair rules together about phone use in class?",
  },
  {
    id: "p9",
    title: "School Transport",
    description: "Students crowded at bus stops in bad weather, need better transport options.",
    imagePath: "/demo-explore/9.png",
    question: "Should we ask for more buses or safer bike racks?",
  },
  {
    id: "p10",
    title: "Bullying in Hallways",
    description: "Students experiencing bullying near lockers, creating unsafe environment.",
    imagePath: "/demo-explore/10.png",
    question: "Should we organize anti-bullying workshops?",
  },
];


