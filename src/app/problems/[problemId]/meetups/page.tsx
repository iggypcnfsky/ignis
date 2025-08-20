"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ProblemPillNav from "@/components/ProblemPillNav";
import SharedHeader from "@/components/SharedHeader";
import MeetupCard from "@/components/MeetupCard";
import { getMeetupsForProblem } from "@/lib/demoMeetups";


export default function MeetupsPage() {
  const params = useParams<{ problemId: string }>();
  const problemId = Array.isArray(params?.problemId) ? params?.problemId[0] : params?.problemId;
  const meetups = getMeetupsForProblem(problemId);

  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Group meetups by date
  const meetupsByDate = meetups.reduce((acc, meetup) => {
    if (!acc[meetup.date]) {
      acc[meetup.date] = [];
    }
    acc[meetup.date].push(meetup);
    return acc;
  }, {} as Record<string, typeof meetups>);

  // Get current problem for context
  // const currentProblem = demoProblems.find(p => p.id === problemId); // TODO: Use for problem-specific content

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

    // Show initially visible cards after a short delay
    const timeout = setTimeout(() => {
      const initiallyVisible = new Set<string>();
      
      // Check which cards are initially in view
      Object.entries(meetupsByDate).forEach(([date, dateMeetups]) => {
        initiallyVisible.add(`header-${date}`);
        dateMeetups.forEach((meetup) => {
          initiallyVisible.add(`${date}-${meetup.id}`);
        });
      });
      
      setVisibleCards(initiallyVisible);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [meetupsByDate]);

  const cardRef = (element: HTMLDivElement | null, cardId: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', cardId);
      observerRef.current.observe(element);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Shared Header */}
      <SharedHeader mode="back" backHref={`/problems/${problemId}`} />
      
      {/* Navigation */}
      <div className="relative z-10 px-3 pt-20 pb-2">
        <ProblemPillNav problemId={problemId} active="meet" />
      </div>

      {/* Content */}
      <div className="px-3 pb-16">


        {/* Meetups by Date */}
        <div className="space-y-8">
          {Object.entries(meetupsByDate).map(([date, dateMeetups], sectionIndex) => {
            const headerCardId = `header-${date}`;
            const isHeaderVisible = visibleCards.has(headerCardId);
            return (
            <div key={date} className="space-y-4">
              {/* Date Header */}
              <div
                ref={(el) => cardRef(el, headerCardId)}
                className={`transform transition-all duration-500 ease-out ${
                  isHeaderVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${sectionIndex * 50}ms`
                }}
              >
                <h2 className="text-[14px] leading-[1.17] font-display text-[#9A9A9A]">
                  {date}
                </h2>
              </div>

              {/* Meetup Cards */}
              <div className="space-y-4">
                {dateMeetups.map((meetup, index) => {
                  const cardId = `${date}-${meetup.id}`;
                  const isVisible = visibleCards.has(cardId);
                  return (
                    <div
                      key={meetup.id}
                      ref={(el) => cardRef(el, cardId)}
                      className={`transform transition-all duration-700 ease-out ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <MeetupCard
                        meetup={meetup}
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            );
          })}
        </div>

        {/* Empty State */}
        {meetups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[16px] leading-[1.3] font-sans text-[rgba(255,255,255,0.6)] mb-4">
              No meetups scheduled yet
            </p>
            <p className="text-[14px] leading-[1.3] font-sans text-[rgba(255,255,255,0.4)]">
              Be the first to organize a meetup for this problem!
            </p>
          </div>
        )}
      </div>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 px-3 pb-4">
        <Link
          href={`/problems/${problemId}/meetups/add`}
          className="w-full h-12 border-4 border-[#FF8400] bg-[#212121] rounded-[100px] flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus size={18} />
          <span className="text-[16px] leading-[1.25] font-sans text-white font-medium">
            Add New Meetup
          </span>
        </Link>
      </div>
    </div>
  );
}
