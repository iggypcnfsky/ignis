"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Trophy, 
  Medal, 
  MapPin, 
  Users, 
  MessageCircle, 
  Lightbulb, 
  AlertTriangle,
  Calendar,
  Flame,
  Crown
} from "lucide-react";
import SharedHeader from "@/components/SharedHeader";
import { 
  pointsStructure, 
  getCurrentUser, 
  getTopUsers, 
  type LeaderboardUser 
} from "@/lib/demoLeaderboard";

export default function LeaderboardPage() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const currentUser = getCurrentUser();
  const topUsers = getTopUsers(9); // Get top 9 to show current user separately

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Show initially visible elements after DOM ready
    const timeout = setTimeout(() => {
      const initiallyVisible = new Set(['header', 'current-user', 'points-guide']);
      setVisibleCards(initiallyVisible);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const cardRef = (element: HTMLElement | null, cardId: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', cardId);
      observerRef.current.observe(element);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={20} className="text-yellow-500" strokeWidth={1.7} />;
    if (rank === 2) return <Medal size={20} className="text-gray-400" strokeWidth={1.7} />;
    if (rank === 3) return <Medal size={20} className="text-amber-600" strokeWidth={1.7} />;
    return <Trophy size={18} className="text-[#FF8400]" strokeWidth={1.7} />;
  };

  const UserCard = ({ user, index }: { user: LeaderboardUser; index: number }) => (
    <div
      ref={(el) => cardRef(el, `user-${user.id}`)}
      className={`transform transition-all duration-700 ease-out ${
        visibleCards.has(`user-${user.id}`) 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`bg-[#2a2a2a] rounded-[30px] p-4 ${
        user.isCurrentUser ? 'border-2 border-[#FF8400] bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f]' : ''
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1f1f1f]">
              {getRankIcon(user.rank)}
            </div>
            <div>
              <h3 className="text-white font-medium text-[16px]">
                {user.isCurrentUser ? (
                  <span className="flex items-center gap-2">
                    {user.name}
                    <span className="text-[#FF8400] text-[12px] font-bold">(YOU)</span>
                  </span>
                ) : (
                  user.name
                )}
              </h3>
              <div className="flex items-center gap-1 text-gray-400 text-[12px]">
                <MapPin size={12} strokeWidth={1.5} />
                {user.location}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[#FF8400] font-bold text-[18px]">
              {user.totalPoints.toLocaleString()}
              <Flame size={16} className="text-[#FF8400]" />
            </div>
            <div className="text-gray-400 text-[12px]">#{user.rank}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mt-3">
          <div className="text-center">
            <div className="text-white text-[14px] font-medium">{user.contributions.problems}</div>
            <div className="text-gray-400 text-[10px]">Problems</div>
          </div>
          <div className="text-center">
            <div className="text-white text-[14px] font-medium">{user.contributions.ideas}</div>
            <div className="text-gray-400 text-[10px]">Ideas</div>
          </div>
          <div className="text-center">
            <div className="text-white text-[14px] font-medium">{user.contributions.meetups}</div>
            <div className="text-gray-400 text-[10px]">Meetups</div>
          </div>
          <div className="text-center">
            <div className="text-white text-[14px] font-medium">{user.contributions.chatMessages}</div>
            <div className="text-gray-400 text-[10px]">Messages</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <SharedHeader mode="back" backHref="/" />
      
      <div className="pt-20 pb-2 px-3">
        {/* Header */}
        <div
          ref={(el) => cardRef(el, 'header')}
          className={`transform transition-all duration-500 ease-out ${
            visibleCards.has('header') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-white font-display text-[32px] text-center mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-400 text-[14px] text-center mb-6">
            Community champions making a difference
          </p>
        </div>

        {/* Current User Card */}
        <div
          ref={(el) => cardRef(el, 'current-user')}
          className={`transform transition-all duration-700 ease-out mb-6 ${
            visibleCards.has('current-user') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <UserCard user={currentUser} index={0} />
        </div>

        {/* Points Guide */}
        <div
          ref={(el) => cardRef(el, 'points-guide')}
          className={`transform transition-all duration-700 ease-out mb-6 ${
            visibleCards.has('points-guide') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="bg-[#2a2a2a] rounded-[30px] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={18} className="text-[#FF8400]" strokeWidth={1.7} />
              <h3 className="text-white font-medium text-[16px]">How to earn points</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-red-400" strokeWidth={1.5} />
                  <span className="text-gray-300 text-[14px]">Report a problem</span>
                </div>
                <span className="text-[#FF8400] font-medium text-[14px]">{pointsStructure.problem} pts</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Lightbulb size={16} className="text-yellow-400" strokeWidth={1.5} />
                  <span className="text-gray-300 text-[14px]">Share an idea</span>
                </div>
                <span className="text-[#FF8400] font-medium text-[14px]">{pointsStructure.idea} pts</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-blue-400" strokeWidth={1.5} />
                  <span className="text-gray-300 text-[14px]">Organize a meetup</span>
                </div>
                <span className="text-[#FF8400] font-medium text-[14px]">{pointsStructure.meetup} pts</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-green-400" strokeWidth={1.5} />
                  <span className="text-gray-300 text-[14px]">Chat message</span>
                </div>
                <span className="text-[#FF8400] font-medium text-[14px]">{pointsStructure.chatMessage} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div
          ref={(el) => cardRef(el, 'top-users-header')}
          className={`transform transition-all duration-500 ease-out mb-4 ${
            visibleCards.has('top-users-header') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[#FF8400]" strokeWidth={1.7} />
            <h2 className="text-white font-medium text-[18px]">Top Contributors</h2>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4 pb-8">
          {topUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index + 4} />
          ))}
        </div>
      </div>
    </div>
  );
}
