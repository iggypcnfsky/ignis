"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SharedHeader from "@/components/SharedHeader";
import MeetupCard from "@/components/MeetupCard";
import { getAllMeetups } from "@/lib/demoMeetups";

export default function GlobalMeetupsPage() {
  const allMeetups = getAllMeetups();
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Group all meetups by date
  const meetupsByDate = allMeetups.reduce((acc, meetup) => {
    if (!acc[meetup.date]) {
      acc[meetup.date] = [];
    }
    acc[meetup.date].push(meetup);
    return acc;
  }, {} as Record<string, typeof allMeetups>);

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
    <div className="font-display min-h-dvh w-full overflow-hidden bg-black text-white scrollbar-hide">
      {/* Shared Header */}
      <SharedHeader activeTab="meetups" />

      {/* Content */}
      <main className="w-full overflow-y-auto scrollbar-hide">
        <div className="px-3 pt-20 pb-16 min-h-screen">
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
        {allMeetups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[16px] leading-[1.3] font-sans text-[rgba(255,255,255,0.6)] mb-4">
              No meetups scheduled yet
            </p>
            <p className="text-[14px] leading-[1.3] font-sans text-[rgba(255,255,255,0.4)]">
              Be the first to organize a meetup for any problem!
            </p>
          </div>
        )}
        </div>
      </main>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 px-3 pb-4 z-40">
        <Link
          href="/problems/add"
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
