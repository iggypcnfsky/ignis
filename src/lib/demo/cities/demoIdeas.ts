export type Idea = {
  id: string;
  problemId: string;
  title: string;
  description: string;
  votesCount: number;
};

export const demoIdeas: Idea[] = [
  // Ideas for Public Transportation Delays (c1)
  {
    id: "c-idea-1",
    problemId: "c1",
    title: "Real-Time Bus Tracking App",
    description: "Implement GPS tracking on all buses with a public app showing real-time locations and delays. Many cities have this and it dramatically improves user experience.",
    votesCount: 67,
  },
  {
    id: "c-idea-2",
    problemId: "c1",
    title: "Express Bus Routes",
    description: "Create express routes during peak hours that skip less popular stops. This would speed up service for major corridors while maintaining local access.",
    votesCount: 54,
  },
  {
    id: "c-idea-3",
    problemId: "c1",
    title: "Bus Rapid Transit Lanes",
    description: "Dedicate lanes exclusively for buses during rush hours. This prevents buses from getting stuck in traffic and makes schedules more predictable.",
    votesCount: 43,
  },

  // Ideas for Park Maintenance Issues (c2)
  {
    id: "c-idea-4",
    problemId: "c2",
    title: "Adopt-a-Park Program",
    description: "Partner with local businesses and community groups to 'adopt' parks. They help with maintenance in exchange for small recognition signs and tax benefits.",
    votesCount: 58,
  },
  {
    id: "c-idea-5",
    problemId: "c2",
    title: "Community Volunteer Days",
    description: "Organize monthly volunteer clean-up and maintenance days. Provide tools and snacks, make it a community event. Many residents want to help but need organization.",
    votesCount: 49,
  },
  {
    id: "c-idea-6",
    problemId: "c2",
    title: "Park Maintenance App",
    description: "Create an app where residents can report maintenance issues with photos and GPS location. This helps prioritize repairs and track response times.",
    votesCount: 36,
  },

  // Ideas for Waste Management Problems (c3)
  {
    id: "c-idea-7",
    problemId: "c3",
    title: "Comprehensive Recycling Program",
    description: "Expand recycling to include composting, electronics, and hazardous materials. Partner with local organizations for specialized collection events.",
    votesCount: 71,
  },
  {
    id: "c-idea-8",
    problemId: "c3",
    title: "Smart Waste Bins",
    description: "Install sensors in public bins to alert when they're full. This optimizes collection routes and prevents overflow. Some cities have seen 30% efficiency gains.",
    votesCount: 42,
  },
  {
    id: "c-idea-9",
    problemId: "c3",
    title: "Zero Waste Initiative",
    description: "Set a goal to reduce city waste by 50% through education, composting programs, and partnerships with local businesses to reduce packaging.",
    votesCount: 55,
  },

  // Ideas for Road Infrastructure (c4)
  {
    id: "c-idea-10",
    problemId: "c4",
    title: "Citizen Reporting System",
    description: "Create an app for residents to report potholes and infrastructure issues with GPS coordinates. This helps prioritize repairs and track completion.",
    votesCount: 63,
  },
  {
    id: "c-idea-11",
    problemId: "c4",
    title: "LED Street Light Conversion",
    description: "Replace old street lights with LED fixtures. They last longer, use less energy, and provide better visibility. Many utilities offer rebates for this.",
    votesCount: 48,
  },
  {
    id: "c-idea-12",
    problemId: "c4",
    title: "Complete Streets Policy",
    description: "Redesign streets to accommodate pedestrians, cyclists, and public transit, not just cars. This improves safety and reduces infrastructure wear.",
    votesCount: 37,
  },

  // Ideas for Housing Affordability Crisis (c5)
  {
    id: "c-idea-13",
    problemId: "c5",
    title: "Inclusionary Zoning",
    description: "Require new developments to include a percentage of affordable units. This ensures mixed-income neighborhoods and prevents displacement.",
    votesCount: 59,
  },
  {
    id: "c-idea-14",
    problemId: "c5",
    title: "Community Land Trust",
    description: "Create a community-owned land trust that keeps housing permanently affordable. Residents own homes but the community owns the land.",
    votesCount: 44,
  },
  {
    id: "c-idea-15",
    problemId: "c5",
    title: "First-Time Buyer Program",
    description: "Offer down payment assistance and favorable loans for first-time homebuyers, especially teachers, nurses, and other essential workers.",
    votesCount: 52,
  },

  // Ideas for Downtown Revitalization (c6)
  {
    id: "c-idea-16",
    problemId: "c6",
    title: "Pop-Up Business Incubator",
    description: "Offer low-cost short-term leases to new businesses in empty storefronts. This brings activity downtown while helping entrepreneurs test their concepts.",
    votesCount: 46,
  },
  {
    id: "c-idea-17",
    problemId: "c6",
    title: "Monthly Street Festival",
    description: "Close main street to cars one Saturday per month for a festival with local vendors, music, and activities. This drives foot traffic to local businesses.",
    votesCount: 61,
  },
  {
    id: "c-idea-18",
    problemId: "c6",
    title: "Live-Work Lofts",
    description: "Convert upper floors of downtown buildings into live-work spaces for artists and entrepreneurs. This brings residents downtown and creates vibrant mixed-use areas.",
    votesCount: 38,
  },

  // Ideas for Digital Services Gap (c7)
  {
    id: "c-idea-19",
    problemId: "c7",
    title: "One-Stop Digital Portal",
    description: "Create a single website where residents can access all city services, pay bills, apply for permits, and track requests. Make it mobile-friendly and multilingual.",
    votesCount: 68,
  },
  {
    id: "c-idea-20",
    problemId: "c7",
    title: "Digital Literacy Program",
    description: "Offer free classes at the library to help residents use online city services. Partner with local tech companies for volunteers and equipment.",
    votesCount: 41,
  },

  // Ideas for Community Safety Concerns (c8)
  {
    id: "c-idea-21",
    problemId: "c8",
    title: "Neighborhood Watch 2.0",
    description: "Modernize neighborhood watch with apps for communication and coordination with police. Create community response teams for non-emergency issues.",
    votesCount: 53,
  },
  {
    id: "c-idea-22",
    problemId: "c8",
    title: "Community Safety Ambassadors",
    description: "Train local residents as safety ambassadors who can mediate conflicts, provide resources, and serve as liaisons between community and police.",
    votesCount: 45,
  },
  {
    id: "c-idea-23",
    problemId: "c8",
    title: "Improved Street Lighting",
    description: "Install brighter, more efficient lighting in high-crime areas and along pedestrian pathways. Good lighting is one of the most effective crime deterrents.",
    votesCount: 57,
  },
];
