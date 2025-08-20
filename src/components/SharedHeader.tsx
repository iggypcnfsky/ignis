"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, CalendarDays, ChevronLeft, User, Flame } from "lucide-react";
import LogoSymbol from "@/components/Logo";

type SharedHeaderProps = {
  activeTab?: "problems" | "meetups";
  mode?: "tabs" | "back";
  backHref?: string;
  onBackClick?: () => void;
};

export default function SharedHeader({ 
  activeTab, 
  mode = "tabs", 
  backHref = "/", 
  onBackClick 
}: SharedHeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.push(backHref);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 px-3 pt-8 pb-2 bg-transparent" style={{ width: '100vw' }}>
      <div className="relative flex items-center justify-center" style={{ width: '100%' }}>
        {mode === "back" ? (
          /* Back button mode */
          <button
            type="button"
            onClick={handleBackClick}
            aria-label="Go back"
            className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
          >
            <ChevronLeft size={20} className="text-white" strokeWidth={1.7} />
          </button>
        ) : (
          /* Tab mode - Compass and Calendar buttons */
          <div className="absolute left-0 top-0 flex items-center gap-2">
            {activeTab === "problems" ? (
              <div
                aria-label="Explore problems"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FF8400" }}
              >
                <Compass size={20} className="text-white" strokeWidth={1.7} />
              </div>
            ) : (
              <Link
                href="/"
                aria-label="Explore problems"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
              >
                <Compass size={20} className="text-white" strokeWidth={1.7} />
              </Link>
            )}
            
            {activeTab === "meetups" ? (
              <div
                aria-label="View all meetups"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FF8400" }}
              >
                <CalendarDays size={20} className="text-white" strokeWidth={1.7} />
              </div>
            ) : (
              <Link
                href="/meetups"
                aria-label="View all meetups"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
              >
                <CalendarDays size={20} className="text-white" strokeWidth={1.7} />
              </Link>
            )}
          </div>
        )}

        {/* Centered Logo */}
        <Link
          href="/"
          aria-label="Go to explore page"
          className="flex items-center justify-center"
        >
          <LogoSymbol size={24} className="text-white" />
        </Link>

        {/* User Profile and Points - always shown on right side */}
        <div className="absolute right-0 top-0 flex items-center gap-2">
          {/* Points Button */}
          <Link
            href="/leaderboard"
            aria-label="View leaderboard"
            className="h-10 px-3 rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px] flex items-center gap-2 hover:bg-[rgba(36,36,36,0.5)] transition-colors"
          >
            <span className="text-[14px] font-medium text-white">1,247</span>
            <Flame size={14} className="text-[#FF8400]" />
          </Link>
          
          {/* Profile Picture */}
          <Link
            href="/profile"
            aria-label="View profile"
            className="h-10 w-10 rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px] flex items-center justify-center overflow-hidden hover:bg-[rgba(36,36,36,0.5)] transition-colors"
          >
            {/* Placeholder profile picture - could be replaced with actual image */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8400] to-[#FF2F00] flex items-center justify-center">
              <User size={16} className="text-white" strokeWidth={2} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
