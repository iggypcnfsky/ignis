# IGNIS Demo System

## Overview

The IGNIS application features a multi-context demo system that allows users to experience the platform from three different perspectives:

- **Ignis for Business** - Corporate problem-solving and innovation
- **Ignis for Schools** - Educational institution challenges and solutions  
- **Ignis for Cities** - Municipal and community-wide issues

## Architecture

### Demo Selector
When users first open the application, they are presented with a demo selector screen featuring:
- The Ignis logo at the top
- Three vertically stacked buttons for each demo context
- Clean, branded design consistent with the main application

### Demo Data Organization

Each demo context has its own set of:
- **Problems** - Context-specific challenges and issues
- **Ideas** - Custom solutions and proposals for each problem, relevant to that context
- **Meetups** - Gatherings and events appropriate for the audience
- **Leaderboard** - User rankings specific to the context

### Platform Types

Each demo context offers two platform experiences:

#### Mobile App
- **Current Implementation** - The existing mobile-first interface
- **User-focused** - For citizens, students, employees to report problems and propose solutions
- **Features**: Problem reporting, voting, idea submission, meetup participation
- **Interface**: Touch-optimized, scroll-based navigation, mobile-first design

#### Desktop Dashboard
- **New Implementation** - Administrative dashboard interface
- **Admin-focused** - For administrators, directors, municipalities to track and manage activities
- **Features**: Analytics overview, problem management, user activity tracking, solution implementation status
- **Interface**: Desktop-optimized, data-rich layouts, management tools
- **Typography**: DM Sans font for professional appearance
- **Common Elements**: Statistics overview, interactive maps, recent activity feeds

### Data Structure

```
src/lib/demo/
├── business/
│   ├── demoProblems.ts
│   ├── demoIdeas.ts
│   ├── demoMeetups.ts
│   └── demoLeaderboard.ts
├── schools/
│   ├── demoProblems.ts
│   ├── demoIdeas.ts
│   ├── demoMeetups.ts
│   └── demoLeaderboard.ts
└── cities/
    ├── demoProblems.ts
    ├── demoIdeas.ts
    ├── demoMeetups.ts
    └── demoLeaderboard.ts
```

### URL Structure

- `/` - Demo selector screen
- `/demo/business` - Business context platform selector
- `/demo/schools` - Schools context platform selector  
- `/demo/cities` - Cities context platform selector
- `/demo/business/mobile` - Business mobile app demo
- `/demo/business/desktop` - Business desktop dashboard demo
- `/demo/schools/mobile` - Schools mobile app demo
- `/demo/schools/desktop` - Schools desktop dashboard demo
- `/demo/cities/mobile` - Cities mobile app demo
- `/demo/cities/desktop` - Cities desktop dashboard demo

Each demo context offers both mobile and desktop experiences with context-appropriate content.

### Context Management

The application uses URL parameters to determine which demo context to load:
- Context is passed through the URL structure
- Demo data is loaded dynamically based on the selected context
- All existing functionality (problems, ideas, meetups, etc.) works the same across contexts

## Demo Contexts

### Ignis for Business
Focus on corporate innovation, workplace challenges, and business process improvements.
Example problems: office space optimization, employee engagement, workflow efficiency.

### Ignis for Schools  
Focus on educational challenges, student life, and academic environment improvements.
Example problems: cafeteria food, study spaces, student mental health, school facilities.

### Ignis for Cities
Focus on municipal issues, urban planning, and community-wide challenges.
Example problems: public transportation, park maintenance, waste management, community safety.

## Dashboard Specifications

### Business Desktop Dashboard
**Target Audience**: HR Directors, Operations Managers, C-Suite Executives
**Language**: English
**Key Features**:
- **Interactive Office Locations Map**: Dark-themed Leaflet map (zoom level 16) showing workplace problems across office locations with color-coded markers (red=high priority, orange=medium, yellow=low, green=resolved). No map controls visible.
- **6 Key Metrics**: Active Issues, Solutions, Meetings, Active Users, Engagement Rate, Implementation Rate
- **Connected Problem-Solution-Meeting View**: Each problem displays as a comprehensive card showing:
  - Problem header with priority badge and description
  - Related solutions with vote counts in left column
  - Related meetings with participant counts in right column
  - Connection metrics showing relationship counts
- **Real-time Meeting Indicators**: Live meeting badges for active sessions
- **Vote Tracking**: Community engagement metrics for proposed solutions
- **Professional Styling**: Dark theme with DM Sans typography, glass morphism design
- **Fast Animations**: 350ms duration with reduced delays for snappy interactions

### Schools Desktop Dashboard  
**Target Audience**: School Principals, Vice Principals, Department Heads
**Language**: Polish (Język Polski)
**Key Features**:
- **Interaktywna Mapa Szkoły**: Dark-themed Leaflet map (zoom level 16) showing school problems across different areas with color-coded markers. No map controls visible.
- **6 Key Metrics**: Aktywne Problemy, Rozwiązania, Spotkania, Aktywni Uczniowie, Zaangażowanie, Wdrożone
- **Connected Problem-Solution-Meeting View**: Each problem displays as a comprehensive card showing:
  - Problem header with priority badge and description (in Polish)
  - Related student solutions with vote counts in left column
  - Related meetings (student council, support groups) in right column
  - Connection metrics showing relationship counts
- **Real-time Meeting Indicators**: Live meeting badges for active sessions
- **Student Solution Tracking**: Vote counts for student-proposed solutions
- **Educational Styling**: Dark theme with DM Sans typography, glass morphism design
- **Fast Animations**: 350ms duration with reduced delays for snappy interactions

### Cities Desktop Dashboard
**Target Audience**: City Mayors, Municipal Directors, Department Heads
**Language**: English  
**Key Features**:
- **Interactive City Map**: Dark-themed Leaflet map (zoom level 16) showing municipal problems across neighborhoods with color-coded markers. No map controls visible.
- **6 Key Metrics**: Active Issues, Solutions, Town Halls, Active Citizens, Engagement Rate, Implementation Rate
- **Connected Problem-Solution-Meeting View**: Each problem displays as a comprehensive card showing:
  - Problem header with priority badge and description
  - Related citizen solutions with vote counts in left column
  - Related meetings (town halls, community forums) in right column
  - Connection metrics showing relationship counts
- **Real-time Meeting Indicators**: Live meeting badges for active town halls
- **Community Solution Tracking**: Citizen-proposed solutions with community vote tracking
- **Civic Styling**: Dark theme with DM Sans typography, glass morphism design
- **Fast Animations**: 350ms duration with reduced delays for snappy interactions

## Dashboard Design Patterns

### Common Elements Across All Dashboards:
- **DM Sans Typography**: Professional, readable font for administrative interfaces
- **Dark Theme**: Consistent with mobile app branding (#0a0a0a background)
- **Glass Morphism**: Semi-transparent panels with subtle borders (white/10 opacity)
- **Fast Animations**: 350ms duration with reduced delays (50-300ms stagger) for snappy interactions
- **Color-Coded Priorities**: Red (high), Orange (medium), Yellow (low), Green (resolved)
- **Interactive Leaflet Maps**: Dark-themed street-level maps (zoom 16) with hidden controls
- **Connected Data View**: Problem-centric cards showing related solutions and meetings
- **Real-time Indicators**: Live meeting badges and status updates
- **Responsive Grid Layouts**: Adaptive to different screen sizes

### Context-Specific Differentiation:
- **Language Localization**: English for Business/Cities, Polish for Schools
- **Icon Themes**: Office buildings (Business), School buildings (Schools), City infrastructure (Cities)
- **Metric Names**: Tailored to each context (Employees vs Students vs Citizens)
- **Meeting Types**: Corporate meetings vs School councils vs Town halls
- **Map Focus**: Office locations vs School areas vs City neighborhoods
- **Solution Sources**: Employee solutions vs Student solutions vs Citizen solutions

## Implementation Notes

- The demo selector is the new entry point of the application
- After selecting a context, users choose between Mobile App or Desktop Dashboard
- Existing mobile components remain unchanged but receive context-specific data
- New desktop dashboard components provide administrative views of the same data
- Demo data is organized by context but maintains the same TypeScript interfaces
- Each problem has custom ideas specific to its context and audience
- Navigation between contexts requires returning to the demo selector
- Each context provides a complete, immersive experience of the IGNIS platform on both platforms

## User Flow

1. **Demo Context Selection** - Choose Business, Schools, or Cities
2. **Platform Selection** - Choose Mobile App or Desktop Dashboard  
3. **Experience Demo** - Interact with context-appropriate content on selected platform
4. **Return to Selector** - Navigate back to try other contexts or platforms
