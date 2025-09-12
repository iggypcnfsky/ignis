// Demo context types and data loaders
export type DemoContext = 'business' | 'schools' | 'cities';

// Import all demo data
import { demoProblems as businessProblems } from './demo/business/demoProblems';
import { demoIdeas as businessIdeas } from './demo/business/demoIdeas';
import { demoMeetups as businessMeetups } from './demo/business/demoMeetups';
import { demoLeaderboardUsers as businessLeaderboard } from './demo/business/demoLeaderboard';

import { demoProblems as schoolsProblems } from './demo/schools/demoProblems';
import { demoIdeas as schoolsIdeas } from './demo/schools/demoIdeas';
import { demoMeetups as schoolsMeetups } from './demo/schools/demoMeetups';
import { demoLeaderboardUsers as schoolsLeaderboard } from './demo/schools/demoLeaderboard';

import { demoProblems as citiesProblems } from './demo/cities/demoProblems';
import { demoIdeas as citiesIdeas } from './demo/cities/demoIdeas';
import { demoMeetups as citiesMeetups } from './demo/cities/demoMeetups';
import { demoLeaderboardUsers as citiesLeaderboard } from './demo/cities/demoLeaderboard';

// Re-export types
export type { Problem } from './demo/business/demoProblems';
export type { Idea } from './demo/business/demoIdeas';
export type { Meetup } from './demo/business/demoMeetups';
export type { LeaderboardUser } from './demo/business/demoLeaderboard';

// Demo data loader functions
export function getDemoProblems(context: DemoContext) {
  switch (context) {
    case 'business':
      return businessProblems;
    case 'schools':
      return schoolsProblems;
    case 'cities':
      return citiesProblems;
    default:
      return schoolsProblems;
  }
}

export function getDemoIdeas(context: DemoContext) {
  switch (context) {
    case 'business':
      return businessIdeas;
    case 'schools':
      return schoolsIdeas;
    case 'cities':
      return citiesIdeas;
    default:
      return schoolsIdeas;
  }
}

export function getDemoMeetups(context: DemoContext) {
  switch (context) {
    case 'business':
      return businessMeetups;
    case 'schools':
      return schoolsMeetups;
    case 'cities':
      return citiesMeetups;
    default:
      return schoolsMeetups;
  }
}

export function getDemoLeaderboard(context: DemoContext) {
  switch (context) {
    case 'business':
      return businessLeaderboard;
    case 'schools':
      return schoolsLeaderboard;
    case 'cities':
      return citiesLeaderboard;
    default:
      return schoolsLeaderboard;
  }
}

// Helper functions for specific problem/idea lookups
export function getDemoIdeasForProblem(context: DemoContext, problemId: string) {
  const ideas = getDemoIdeas(context);
  return ideas.filter(idea => idea.problemId === problemId);
}

export function getDemoMeetupsForProblem(context: DemoContext, problemId: string) {
  const meetups = getDemoMeetups(context);
  return meetups.filter(meetup => meetup.problemIds.includes(problemId));
}

// Context display names
export function getContextDisplayName(context: DemoContext): string {
  switch (context) {
    case 'business':
      return 'Ignis for Business';
    case 'schools':
      return 'Ignis for Schools';
    case 'cities':
      return 'Ignis for Cities';
    default:
      return 'Ignis';
  }
}
