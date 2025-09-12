"use client";

import { Meetup } from "@/lib/demoMeetups";
import { demoIdeas } from "@/lib/demoIdeas";
import { demoProblems } from "@/lib/demoProblems";
import Image from "next/image";

type MeetupCardProps = {
  meetup: Meetup;
  className?: string;
};

export default function MeetupCard({ meetup, className }: MeetupCardProps) {
  return (
    <div className={`relative bg-[#212121] rounded-[20px] p-4 ${className ?? ""}`}>
      {/* Status and time in header row */}
      <div className="flex items-center justify-between mb-3">
        {/* Time */}
        {meetup.time && (
          <div className="px-3 py-1 rounded-full bg-[#2a2a2a]">
            <span className="text-[11px] font-sans text-white/80">
              {meetup.time}
            </span>
          </div>
        )}
        
        {/* Status indicators */}
        <div className="flex items-center gap-2">
          {meetup.isLive && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FF8400]/20">
              <div className="w-1.5 h-1.5 bg-[#FF8400] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-sans text-[#FF8400] font-medium">Live</span>
            </div>
          )}
          {meetup.isOnline && !meetup.isLive && (
            <div className="px-2 py-1 rounded-full bg-[#FF8400]/20">
              <span className="text-[10px] font-sans text-[#FF8400] font-medium">Online</span>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-3">
        <h3 className="text-[15px] leading-tight font-sans text-white font-medium">
          {meetup.title}
        </h3>
      </div>

      {/* Organizer */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FF8400] rounded-full flex items-center justify-center">
            <span className="text-[10px] font-sans text-white font-bold">
              {meetup.organizer.charAt(0)}
            </span>
          </div>
          <span className="text-[11px] font-sans text-white/60">
            Organizuje: {meetup.organizer}
          </span>
        </div>
      </div>

      {/* Description */}
      {meetup.description && (
        <div className="mb-4">
          <p className="text-[13px] leading-[1.4] font-sans text-white/70 line-clamp-2">
            {meetup.description}
          </p>
        </div>
      )}

      {/* Simplified ideas section */}
      {meetup.ideaIds.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-sans text-white/50 mb-2">
            {meetup.ideaIds.length} idea{meetup.ideaIds.length > 1 ? 's' : ''} to discuss
          </div>
          <div className="flex flex-wrap gap-1">
            {meetup.ideaIds.slice(0, 3).map((ideaId) => {
              const idea = demoIdeas.find(i => i.id === ideaId);
              return idea ? (
                <div key={ideaId} className="px-2 py-1 bg-[#2a2a2a] rounded-md">
                  <span className="text-[10px] font-sans text-white/60 truncate">
                    {idea.title}
                  </span>
                </div>
              ) : null;
            })}
            {meetup.ideaIds.length > 3 && (
              <div className="px-2 py-1 bg-[#2a2a2a] rounded-md">
                <span className="text-[10px] font-sans text-white/60">
                  +{meetup.ideaIds.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simplified problem images */}
      {meetup.problemIds.length > 0 && (
        <div>
          <div className="text-[11px] font-sans text-white/50 mb-2">
            {meetup.problemIds.length} problem{meetup.problemIds.length > 1 ? 's' : ''}
          </div>
          <div className="flex gap-2">
            {meetup.problemIds.slice(0, 4).map((problemId) => {
              const problem = demoProblems.find(p => p.id === problemId);
              return problem ? (
                <div
                  key={problemId}
                  className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#2a2a2a]"
                >
                  <Image
                    src={problem.imagePath}
                    alt={problem.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : null;
            })}
            {meetup.problemIds.length > 4 && (
              <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                <span className="text-[9px] font-sans text-white/50">
                  +{meetup.problemIds.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RSVP Button */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <button
          type="button"
          className="w-full py-2 px-4 bg-[#FF8400] hover:bg-[#FF8400]/90 rounded-lg transition-colors"
          onClick={() => {
            // TODO: Implement RSVP functionality
            console.log(`RSVP for meetup ${meetup.id}`);
          }}
        >
          <span className="text-[12px] font-sans text-white font-medium">
            Wezmę udział
          </span>
        </button>
      </div>
    </div>
  );
}
