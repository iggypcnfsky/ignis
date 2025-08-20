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
    <div className={`relative bg-[#212121] rounded-[30px] p-6 ${className ?? ""}`}>
      {/* Status indicator - positioned absolutely in top right */}
      <div className="absolute top-4 right-4">
        {meetup.isLive && (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 border-[#FF8400] bg-transparent">
            <div className="w-2 h-2 bg-[#FF8400] rounded-full animate-pulse"></div>
            <span className="text-[12px] leading-[1] font-sans text-white font-medium">
              Live
            </span>
          </div>
        )}
        {meetup.isOnline && !meetup.isLive && (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 border-[#FF8400] bg-transparent">
            <span className="text-[12px] leading-[1] font-sans text-white font-medium">
              Online
            </span>
          </div>
        )}
      </div>

      {/* Time info for specific date/time meetups */}
      {meetup.time && (
        <div className="absolute top-4 left-4">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 border-[#353535] bg-transparent">
            <span className="text-[12px] leading-[1] font-sans text-white font-medium">
              {meetup.time}
            </span>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="pt-12 pb-4">
        <h3 className="text-[16px] leading-[1.17] font-display text-white">
          {meetup.title}
        </h3>
      </div>

      {/* Description - if available */}
      {meetup.description && (
        <div className="pb-4">
          <p className="text-[14px] leading-[1.3] font-sans text-white/80 line-clamp-2">
            {meetup.description}
          </p>
        </div>
      )}

      {/* Location - if available */}
      {meetup.location && (
        <div className="pb-4">
          <div className="flex items-center gap-2 text-[12px] leading-[1] font-sans text-white/60">
            <span>📍</span>
            <span>{meetup.location}</span>
          </div>
        </div>
      )}

      {/* WhatsApp - if available */}
      {meetup.whatsapp && (
        <div className="pb-4">
          <div className="flex items-center gap-2 text-[12px] leading-[1] font-sans text-white/60">
            <span>📱</span>
            <span>{meetup.whatsapp}</span>
          </div>
        </div>
      )}

      {/* Ideas to be discussed */}
      {meetup.ideaIds.length > 0 && (
        <div className="pb-6 px-2">
          <div className="text-[12px] leading-[1] font-sans text-white/60 mb-3">
            💡 Ideas to discuss:
          </div>
          <div className="space-y-3">
            {meetup.ideaIds.map((ideaId) => {
              const idea = demoIdeas.find(i => i.id === ideaId);
              return idea ? (
                <div key={ideaId} className="bg-[#1a1a1a] rounded-[12px] p-4">
                  <div className="text-[13px] leading-[1.2] font-display text-white/90 mb-2">
                    {idea.title}
                  </div>
                  <div className="text-[12px] leading-[1.3] font-sans text-white/70 line-clamp-2 mb-2">
                    {idea.description}
                  </div>
                  <div className="text-[11px] leading-[1] font-sans text-white/50">
                    {idea.votesCount} votes
                  </div>
                </div>
              ) : (
                <div key={ideaId} className="text-[12px] leading-[1.2] font-sans text-white/80">
                  • Idea not found
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Problem Images */}
      {meetup.problemIds.length > 0 && (
        <div className="pt-4">
          <div className="flex gap-3 overflow-hidden w-full">
            {meetup.problemIds.slice(0, 3).map((problemId, index) => {
              const problem = demoProblems.find(p => p.id === problemId);
              return problem ? (
                <div
                  key={problemId}
                  className="relative flex-1 min-w-0 h-40 rounded-[12px] overflow-hidden bg-[#1a1a1a]"
                  style={{ zIndex: 3 - index, maxWidth: '200px' }}
                >
                  <Image
                    src={problem.imagePath}
                    alt={problem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 200px"
                  />
                </div>
              ) : null;
            })}
            {meetup.problemIds.length > 3 && (
              <div className="flex-1 min-w-0 h-40 rounded-[12px] bg-[#1a1a1a] flex items-center justify-center"
                style={{ maxWidth: '200px' }}
              >
                <span className="text-[12px] leading-[1] font-sans text-white/60">
                  +{meetup.problemIds.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
