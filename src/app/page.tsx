"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoSymbol from "@/components/Logo";
import SharedHeader from "@/components/SharedHeader";
import { Info, Plus } from "lucide-react";
import { demoProblems, type Problem } from "@/lib/demoProblems";


function ProblemSlide({ problem }: { problem: Problem }) {
  return (
    <article
      className="relative h-screen w-full snap-start snap-always"
      style={{
        scrollSnapStop: 'always',
        scrollSnapAlign: 'start',
        minHeight: '100vh',
        height: '100vh'
      }}
    >
      <Image
        src={problem.imagePath}
        alt={problem.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />

      {/* Clickable area to open details */}
      <Link
        href={`/problems/${problem.id}`}
        aria-label={`Open details for ${problem.title}`}
        className="absolute inset-0 z-10"
      />

      {/* Bottom overlays are fixed in the page, not per slide */}
    </article>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Show initial slide text on mount
  useEffect(() => {
    const infoBar = document.getElementById('info-bar') as HTMLElement;
    const questionText = document.getElementById('question-text') as HTMLElement;

    if (infoBar && questionText) {
      infoBar.style.opacity = '1';
      questionText.style.opacity = '1';
    }
  }, []);

  // Monitor current slide changes for question updates
  useEffect(() => {
    // Question will automatically update based on currentSlide state
  }, [currentSlide]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    let lastScrollTime = 0;
    const scrollThrottle = 100; // Simple throttle

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) {
        return; // Throttle scroll events
      }
      lastScrollTime = now;

      const main = document.getElementById('problems-scroll-container') as HTMLElement;
      if (!main || isScrolling) {
        return;
      }

      isScrolling = true;
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollTop = main.scrollTop;
        const slideHeight = window.innerHeight;
        const currentSlideIndex = Math.round(scrollTop / slideHeight);

        // Get elements
        const infoBar = document.getElementById('info-bar') as HTMLElement;
        const questionText = document.getElementById('question-text') as HTMLElement;

        // Update current slide state
        setCurrentSlide(currentSlideIndex);

        // Simple show/hide without animation
        if (infoBar && questionText) {
          // Calculate how far we are from the current slide center
          const slideCenter = currentSlideIndex * slideHeight + slideHeight / 2;
          const distanceFromCenter = Math.abs(scrollTop + slideHeight / 2 - slideCenter);
          const maxDistance = slideHeight * 0.3; // Fade out when 30% away from center

          const progress = Math.min(distanceFromCenter / maxDistance, 1);

          if (progress < 0.2) {
            // Near center - show elements immediately
            infoBar.style.opacity = '1';
            questionText.style.opacity = '1';
          } else {
            // Away from center - hide elements immediately
            infoBar.style.opacity = '0';
            questionText.style.opacity = '0';
          }
        }

        isScrolling = false;
      }, 150); // Simple delay
    };

    // Wait for DOM to be ready
    const initializeScroll = () => {
      const main = document.getElementById('problems-scroll-container') as HTMLElement;
      if (main) {
        main.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
          main.removeEventListener('scroll', handleScroll);
          clearTimeout(scrollTimeout);
        };
      } else {
        setTimeout(initializeScroll, 100);
      }
    };

    // Initialize after component mounts
    setTimeout(() => {
      initializeScroll();
    }, 100);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="font-display min-h-dvh w-full overflow-hidden bg-black text-white">
      {/* Shared Header */}
      <SharedHeader activeTab="problems" />

      {/* Scrollable backgrounds */}
      <main
        id="problems-scroll-container"
        className="w-full overflow-y-auto snap-y snap-mandatory"
        style={{
          scrollSnapType: 'y mandatory',
          scrollPadding: '0',
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapStop: 'always',
          height: '100vh',
          maxHeight: '100vh'
        }}
      >
        {demoProblems.map((p) => (
          <ProblemSlide key={p.id} problem={p} />
        ))}
      </main>

      {/* Fixed info bar above question */}
      <div
        id="info-bar"
        className="fixed inset-x-0 bottom-[154px] z-10 flex items-center justify-center px-6"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-center gap-1.5">
          <Info size={14} className="text-white" strokeWidth={1.2} />
          <span className={`text-[12px] leading-[1.17] text-white opacity-30`}>
            Click to learn more
          </span>
        </div>
      </div>

      {/* Fixed question text */}
      <div
        id="question-text"
        className="fixed inset-x-0 bottom-[88px] z-10 px-6"
        style={{ opacity: 0 }}
      >
        <p className={`font-display mx-auto text-center text-white text-[30px] leading-none`}>
          {demoProblems[currentSlide]?.question || demoProblems[0].question}
        </p>
      </div>

      {/* Sticky bottom actions */}
      <div className="fixed inset-x-0 bottom-10 z-20 px-6 py-2">
        <div className="relative mx-auto w-full">
          <div className="absolute left-1/2 top-1/2 h-16 w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-[100px] bg-black/20 backdrop-blur-[50px]" />
          <Link
            href="/problems/add"
            aria-label="Add problem"
            className="absolute left-1/2 top-1/2 z-20 flex h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10"
          >
            <Plus size={24} className="text-white" strokeWidth={4} />
          </Link>
          <div className="absolute left-1/2 top-1/2 -translate-x-[85px] -translate-y-1/2">
            <button
              type="button"
              className={`h-10 w-10 rounded-full text-white text-[12px] font-medium flex items-center justify-center`}
              style={{
                backgroundImage: "linear-gradient(180deg, #FF8400 0%, #FF2F00 100%)",
              }}
            >
              Yes
            </button>
          </div>
          <div className="absolute right-1/2 top-1/2 translate-x-[85px] -translate-y-1/2">
            <button
              type="button"
              className={`h-10 w-10 rounded-full text-[#BABABA] text-[12px] font-medium flex items-center justify-center`}
              style={{
                backgroundImage: "linear-gradient(180deg, #2B2B2B 0%, #000000 100%)",
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
