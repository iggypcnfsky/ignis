import Link from "next/link";
import { Plus } from "lucide-react";
import SharedHeader from "@/components/SharedHeader";
import MeetupCard from "@/components/MeetupCard";
import { getAllMeetups } from "@/lib/demoMeetups";

export default function GlobalMeetupsPage() {
  const allMeetups = getAllMeetups();

  // Group all meetups by date
  const meetupsByDate = allMeetups.reduce((acc, meetup) => {
    if (!acc[meetup.date]) {
      acc[meetup.date] = [];
    }
    acc[meetup.date].push(meetup);
    return acc;
  }, {} as Record<string, typeof allMeetups>);

  return (
    <div className="font-display min-h-dvh w-full overflow-hidden bg-black text-white">
      {/* Shared Header */}
      <SharedHeader activeTab="meetups" />

      {/* Content */}
      <main className="w-full overflow-y-auto">
        <div className="px-6 pb-8 pt-32 min-h-screen">
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
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 z-40" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
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
