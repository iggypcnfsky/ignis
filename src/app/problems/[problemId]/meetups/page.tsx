import Link from "next/link";
import { ChevronLeft, Plus } from "lucide-react";
import LogoSymbol from "@/components/Logo";
import ProblemPillNav from "@/components/ProblemPillNav";
import MeetupCard from "@/components/MeetupCard";
import { getMeetupsForProblem } from "@/lib/demoMeetups";
import { demoProblems } from "@/lib/demoProblems";

type MeetupsPageProps = {
  params: Promise<{
    problemId: string;
  }>;
};

export default async function MeetupsPage({ params }: MeetupsPageProps) {
  const { problemId } = await params;
  const meetups = getMeetupsForProblem(problemId);

  // Group meetups by date
  const meetupsByDate = meetups.reduce((acc, meetup) => {
    if (!acc[meetup.date]) {
      acc[meetup.date] = [];
    }
    acc[meetup.date].push(meetup);
    return acc;
  }, {} as Record<string, typeof meetups>);

  // Get current problem for context
  const currentProblem = demoProblems.find(p => p.id === problemId);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Header */}
      <div className="relative">
        {/* Background glow removed */}

        {/* Logo and Navigation */}
        <div className="relative z-10 px-6 pt-16 pb-4">
          <div className="flex items-center justify-between mb-8">
            {/* Back button */}
            <Link
              href={`/problems/${problemId}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </Link>

            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link
              href="/"
              aria-label="Go to explore page"
              className="flex items-center justify-center"
            >
              <LogoSymbol size={24} className="text-white" />
            </Link>
            </div>

            {/* Spacer for centering */}
            <div className="w-10 h-10" />
          </div>

          {/* Pill Navigation */}
          <ProblemPillNav problemId={problemId} active="meet" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-32">


        {/* Meetups by Date */}
        <div className="space-y-8">
          {Object.entries(meetupsByDate).map(([date, dateMeetups]) => (
            <div key={date} className="space-y-4">
              {/* Date Header */}
              <h2 className="text-[14px] leading-[1.17] font-display text-[#9A9A9A]">
                {date}
              </h2>

              {/* Meetup Cards */}
              <div className="space-y-4">
                {dateMeetups.map((meetup) => (
                  <MeetupCard
                    key={meetup.id}
                    meetup={meetup}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          ))}
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
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8">
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
