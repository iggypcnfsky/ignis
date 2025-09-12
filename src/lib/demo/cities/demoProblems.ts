export type Problem = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  question: string;
};

export const demoProblems: Problem[] = [
  {
    id: "c1",
    title: "Public Transportation Delays",
    description: "Our city's bus system is consistently running 15-30 minutes behind schedule, making it unreliable for commuters. This forces more people to drive, increasing traffic congestion and pollution. We need better transit solutions. 🚌⏰",
    imagePath: "/demo-cities/public-transport-delays.png",
    question: "Should we invest in more buses and real-time tracking systems?",
  },
  {
    id: "c2",
    title: "Park Maintenance Issues",
    description: "Our city parks are in poor condition - broken playground equipment, overgrown grass, damaged benches, and overflowing trash bins. Families are avoiding these spaces, and community gatherings have declined significantly. 🏞️🔧",
    imagePath: "/demo-cities/park-issues.png",
    question: "Should we increase the parks and recreation budget for better maintenance?",
  },
  {
    id: "c3",
    title: "Waste Management Problems",
    description: "Garbage collection is inconsistent, recycling bins are often full, and there's no composting program. Litter is increasing in downtown areas, and residents are frustrated with the lack of environmental initiatives. ♻️🗑️",
    imagePath: "/demo-cities/waste.png",
    question: "Should we implement a comprehensive waste reduction and recycling program?",
  },
  {
    id: "c4",
    title: "Road Infrastructure",
    description: "Potholes, cracked sidewalks, and poor street lighting are safety hazards throughout the city. Winter damage hasn't been repaired, and pedestrian crossings need better visibility. Our infrastructure needs urgent attention. 🛣️⚠️",
    imagePath: "/demo-cities/road-infrastructure.png",
    question: "Should we prioritize a major infrastructure repair and upgrade project?",
  },
  {
    id: "c5",
    title: "Housing Affordability Crisis",
    description: "Rising rent prices are forcing long-time residents out of the city. Young professionals and families can't afford to live here anymore, while vacant luxury developments sit empty. We need affordable housing solutions. 🏠💰",
    imagePath: "/demo-cities/park-issues.png",
    question: "Should we implement rent control and affordable housing development incentives?",
  },
  {
    id: "c6",
    title: "Downtown Revitalization",
    description: "Our downtown core has too many empty storefronts, limited evening activities, and lacks the vibrancy that attracts residents and tourists. Local businesses are struggling while chain stores dominate the remaining spaces. 🏪✨",
    imagePath: "/demo-cities/road-infrastructure.png",
    question: "Should we create incentives for local businesses and cultural events downtown?",
  },
  {
    id: "c7",
    title: "Digital Services Gap",
    description: "Many city services still require in-person visits or paper forms. Online systems are outdated and confusing, making it difficult for residents to pay bills, apply for permits, or access information efficiently. 💻📱",
    imagePath: "/demo-cities/public-transport-delays.png",
    question: "Should we modernize city services with user-friendly digital platforms?",
  },
  {
    id: "c8",
    title: "Community Safety Concerns",
    description: "Residents report feeling unsafe in certain neighborhoods, especially at night. Poor lighting, limited police presence, and lack of community programs contribute to these concerns. We need comprehensive safety improvements. 🚨🌙",
    imagePath: "/demo-cities/waste.png",
    question: "Should we increase community policing and improve street lighting citywide?",
  },
];
