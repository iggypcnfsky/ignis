import Link from "next/link";
import { Compass, CalendarDays } from "lucide-react";
import LogoSymbol from "@/components/Logo";

type SharedHeaderProps = {
  activeTab: "problems" | "meetups";
};

export default function SharedHeader({ activeTab }: SharedHeaderProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-6 bg-transparent" style={{ width: '100vw' }}>
      <div className="relative flex items-center justify-center pt-16" style={{ width: '100%' }}>
        {/* Compass icon - problems tab */}
        {activeTab === "problems" ? (
          <div
            aria-label="Explore problems"
            className="absolute left-0 top-16 inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FF8400" }}
          >
            <Compass size={20} className="text-white" strokeWidth={1.7} />
          </div>
        ) : (
          <Link
            href="/"
            aria-label="Explore problems"
            className="absolute left-0 top-16 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
          >
            <Compass size={20} className="text-white" strokeWidth={1.7} />
          </Link>
        )}

        {/* Centered Logo */}
        <Link
          href="/"
          aria-label="Go to explore page"
          className="flex items-center justify-center"
        >
          <LogoSymbol size={24} className="text-white" />
        </Link>

        {/* Calendar icon - meetups tab */}
        {activeTab === "meetups" ? (
          <div
            aria-label="View all meetups"
            className="absolute right-4 top-16 inline-flex h-10 w-10 items-center justify-center rounded-[20px]"
            style={{ backgroundColor: "#FF8400" }}
          >
            <CalendarDays size={20} className="text-white" strokeWidth={1.7} />
          </div>
        ) : (
          <Link
            href="/meetups"
            aria-label="View all meetups"
            className="absolute right-4 top-16 inline-flex h-10 w-10 items-center justify-center rounded-[20px] bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
          >
            <CalendarDays size={20} className="text-white" strokeWidth={1.7} />
          </Link>
        )}
      </div>
    </div>
  );
}
