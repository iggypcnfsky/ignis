export type Problem = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  question: string;
};

export const demoProblems: Problem[] = [
  {
    id: "b1",
    title: "Remote Work Productivity",
    description: "Our team's productivity has decreased since moving to remote work. Communication gaps, unclear expectations, and lack of proper collaboration tools are creating frustration. We need better systems to maintain our high performance standards. 💼📊",
    imagePath: "/demo-business/remote-work.png",
    question: "Should we invest in better remote collaboration tools and training?",
  },
  {
    id: "b2",
    title: "Office Space Optimization",
    description: "With hybrid work becoming permanent, our office space feels underutilized yet cramped when everyone's in. We're paying for space we don't fully use while lacking proper meeting rooms and collaboration areas when needed. 🏢💡",
    imagePath: "/demo-business/office-space-optimization.png",
    question: "Should we redesign our office layout for hybrid work efficiency?",
  },
  {
    id: "b3",
    title: "Employee Engagement",
    description: "Recent surveys show declining employee satisfaction and engagement. People feel disconnected from company culture, career growth seems stagnant, and many are considering leaving. We need to address this before we lose key talent. 📈👥",
    imagePath: "/demo-business/employee-engagement.png",
    question: "Should we implement new employee engagement and retention programs?",
  },
  {
    id: "b4",
    title: "Meeting Overload",
    description: "Everyone complains about too many meetings cutting into actual work time. Back-to-back calls, unclear agendas, and meetings that could be emails are burning out our teams. We need a meeting culture reset. ⏰📅",
    imagePath: "/demo-business/remote-work.png",
    question: "Should we implement strict meeting guidelines and no-meeting time blocks?",
  },
  {
    id: "b5",
    title: "Innovation Stagnation",
    description: "We're falling behind competitors in innovation. Our processes are too rigid, new ideas get stuck in bureaucracy, and employees don't feel empowered to experiment. We need to foster a more innovative culture. 🚀💡",
    imagePath: "/demo-business/innovation-stagnation.png",
    question: "Should we create dedicated innovation time and streamlined idea implementation?",
  },
  {
    id: "b6",
    title: "Cross-Department Communication",
    description: "Silos between departments are creating inefficiencies and duplicated work. Marketing doesn't know what Sales is promising clients, Engineering is surprised by Product roadmaps, and HR is out of sync with everyone. 🔄📢",
    imagePath: "/demo-business/office-space-optimization.png",
    question: "Should we implement cross-functional teams and regular alignment meetings?",
  },
  {
    id: "b7",
    title: "Work-Life Balance",
    description: "Burnout is becoming a serious issue. People are working late, skipping vacations, and showing signs of stress. Our 'always-on' culture is unsustainable and affecting both performance and well-being. ⚖️🧘",
    imagePath: "/demo-business/employee-engagement.png",
    question: "Should we enforce stricter boundaries around work hours and availability?",
  },
  {
    id: "b8",
    title: "Technology Infrastructure",
    description: "Our systems are outdated and slowing us down. Frequent crashes, slow load times, and incompatible software are frustrating employees and impacting client service. We need a tech infrastructure overhaul. 💻⚡",
    imagePath: "/demo-business/innovation-stagnation.png",
    question: "Should we prioritize a comprehensive technology upgrade initiative?",
  },
];
