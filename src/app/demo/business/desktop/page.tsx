"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoSymbol from "@/components/Logo";
import { ArrowLeft, BarChart3, Users, Lightbulb, Calendar, TrendingUp, AlertCircle, MapPin, Clock, Vote } from "lucide-react";
import { getDemoProblems, getDemoIdeas, getDemoMeetups, getDemoLeaderboard, type DemoContext } from "@/lib/demoContext";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const OfficeMap = dynamic(() => import("@/components/OfficeMap"), { 
  ssr: false,
  loading: () => <div className="aspect-[16/9] bg-[#1a1a1a] rounded-xl border border-white/10 flex items-center justify-center">
    <div className="text-white/60">Loading map...</div>
  </div>
});

const CONTEXT: DemoContext = 'business';

export default function BusinessDesktopDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  const demoProblems = getDemoProblems(CONTEXT);
  const demoIdeas = getDemoIdeas(CONTEXT);
  const demoMeetups = getDemoMeetups(CONTEXT);
  const demoLeaderboard = getDemoLeaderboard(CONTEXT);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    totalProblems: demoProblems.length,
    totalIdeas: demoIdeas.length,
    totalMeetups: demoMeetups.length,
    activeUsers: demoLeaderboard.length,
    engagementRate: 78,
    solutionImplementation: 45
  };

  return (
    <div className="font-sans min-h-dvh w-full bg-[#0a0a0a] text-white" style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LogoSymbol size={32} color="white" />
            <div>
              <h1 className="text-xl font-medium">Ignis for Business</h1>
              <p className="text-sm text-white/60">Administrative Dashboard</p>
            </div>
          </div>
          <Link 
            href="/demo/business"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to platform selection
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8 transform transition-all duration-[350ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle size={20} className="text-orange-400" />
              <span className="text-sm text-white/60">Active Issues</span>
            </div>
            <div className="text-2xl font-semibold">{stats.totalProblems}</div>
            <div className="text-xs text-green-400 mt-1">+12% this month</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb size={20} className="text-yellow-400" />
              <span className="text-sm text-white/60">Solutions</span>
            </div>
            <div className="text-2xl font-semibold">{stats.totalIdeas}</div>
            <div className="text-xs text-green-400 mt-1">+18% this month</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={20} className="text-blue-400" />
              <span className="text-sm text-white/60">Meetings</span>
            </div>
            <div className="text-2xl font-semibold">{stats.totalMeetups}</div>
            <div className="text-xs text-green-400 mt-1">+5% this month</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-purple-400" />
              <span className="text-sm text-white/60">Active Users</span>
            </div>
            <div className="text-2xl font-semibold">{stats.activeUsers}</div>
            <div className="text-xs text-green-400 mt-1">+8% this month</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-green-400" />
              <span className="text-sm text-white/60">Engagement</span>
            </div>
            <div className="text-2xl font-semibold">{stats.engagementRate}%</div>
            <div className="text-xs text-green-400 mt-1">+15% this month</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={20} className="text-cyan-400" />
              <span className="text-sm text-white/60">Implemented</span>
            </div>
            <div className="text-2xl font-semibold">{stats.solutionImplementation}%</div>
            <div className="text-xs text-green-400 mt-1">+22% this month</div>
          </div>
        </div>

        {/* Map Section */}
        <div 
          className={`mb-8 transform transition-all duration-[350ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-blue-400" />
              Office Locations & Issues Map
            </h3>
            <div className="aspect-[16/9] bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
              <OfficeMap />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-white/60">High Priority (2)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-white/60">Medium Priority (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-white/60">Low Priority (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/60">Resolved (2)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Problems Overview */}
        <div 
          className={`transform transition-all duration-[350ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
            <AlertCircle size={24} className="text-orange-400" />
            Problem-Solution-Meeting Connections
          </h3>
          
          <div className="space-y-6">
            {demoProblems.slice(0, 4).map((problem, problemIndex) => {
              const relatedIdeas = demoIdeas.filter(idea => idea.problemId === problem.id);
              const relatedMeetups = demoMeetups.filter(meetup => meetup.problemIds.includes(problem.id));
              
              return (
                <div key={problem.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  {/* Problem Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-red-500/30 flex items-center justify-center">
                          <AlertCircle size={20} className="text-red-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{problem.title}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            problemIndex < 2 
                              ? 'bg-red-500/20 text-red-400' 
                              : problemIndex < 3 
                              ? 'bg-orange-500/20 text-orange-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {problemIndex < 2 ? 'High Priority' : problemIndex < 3 ? 'Medium Priority' : 'Low Priority'}
                          </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-3">
                          {problem.description.slice(0, 200)}...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-white/50">
                          <span>{relatedIdeas.length} solutions proposed</span>
                          <span>{relatedMeetups.length} meetings scheduled</span>
                          <span>Created {problemIndex === 0 ? '2h ago' : problemIndex === 1 ? '4h ago' : problemIndex === 2 ? '1d ago' : '2d ago'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Solutions and Meetings Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Related Solutions */}
                    <div className="p-6 border-r border-white/10">
                      <h5 className="text-sm font-medium text-yellow-400 mb-4 flex items-center gap-2">
                        <Lightbulb size={16} />
                        Proposed Solutions ({relatedIdeas.length})
                      </h5>
                      {relatedIdeas.length > 0 ? (
                        <div className="space-y-3">
                          {relatedIdeas.slice(0, 3).map((idea) => (
                            <div key={idea.id} className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                  <Lightbulb size={12} className="text-yellow-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h6 className="font-medium text-sm mb-1 group-hover:text-white transition-colors">
                                    {idea.title}
                                  </h6>
                                  <p className="text-xs text-white/60 line-clamp-2 mb-2">
                                    {idea.description.slice(0, 100)}...
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <Vote size={10} className="text-green-400" />
                                    <span className="text-xs text-green-400 font-medium">{idea.votesCount} votes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {relatedIdeas.length > 3 && (
                            <div className="text-center">
                              <button className="text-xs text-white/40 hover:text-white/60 transition-colors">
                                +{relatedIdeas.length - 3} more solutions
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-white/40">
                          <Lightbulb size={24} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No solutions proposed yet</p>
                        </div>
                      )}
                    </div>

                    {/* Related Meetings */}
                    <div className="p-6">
                      <h5 className="text-sm font-medium text-blue-400 mb-4 flex items-center gap-2">
                        <Calendar size={16} />
                        Related Meetings ({relatedMeetups.length})
                      </h5>
                      {relatedMeetups.length > 0 ? (
                        <div className="space-y-3">
                          {relatedMeetups.map((meetup) => (
                            <div key={meetup.id} className="bg-white/5 rounded-lg p-3 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                  {meetup.isLive ? (
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                  ) : (
                                    <Calendar size={12} className="text-blue-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h6 className="font-medium text-sm group-hover:text-white transition-colors">
                                      {meetup.title}
                                    </h6>
                                    {meetup.isLive && (
                                      <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                                        LIVE
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-white/60 mb-1">
                                    <div className="flex items-center gap-1">
                                      <Clock size={10} />
                                      <span>{meetup.date} at {meetup.time}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs">
                                      <Users size={10} className="text-purple-400" />
                                      <span className="text-purple-400">{meetup.participants} people</span>
                                    </div>
                                    <span className="text-xs text-white/40">{meetup.duration}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-white/40">
                          <Calendar size={24} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No meetings scheduled yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}

