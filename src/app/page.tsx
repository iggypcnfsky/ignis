"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [infoBarBottom, setInfoBarBottom] = useState(160);
  const [votes, setVotes] = useState<Record<string, { yes: number; no: number }>>({});
  const [userVotes, setUserVotes] = useState<Record<string, 'yes' | 'no' | null>>({});

  const handleVote = (problemId: string, voteType: 'yes' | 'no') => {
    const currentVote = userVotes[problemId];
    
    // Initialize votes for this problem if they don't exist
    if (!votes[problemId]) {
      setVotes(prev => ({
        ...prev,
        [problemId]: { yes: 0, no: 0 }
      }));
    }

    setVotes(prev => {
      const currentVotes = prev[problemId] || { yes: 0, no: 0 };
      const newVotes = { ...currentVotes };

      // Remove previous vote if exists
      if (currentVote === 'yes') newVotes.yes = Math.max(0, newVotes.yes - 1);
      if (currentVote === 'no') newVotes.no = Math.max(0, newVotes.no - 1);

      // Add new vote
      if (voteType === 'yes') newVotes.yes += 1;
      if (voteType === 'no') newVotes.no += 1;

      return {
        ...prev,
        [problemId]: newVotes
      };
    });

    // Update user's vote
    setUserVotes(prev => ({
      ...prev,
      [problemId]: currentVote === voteType ? null : voteType
    }));
  };

  // Show initial slide text on mount and set up resize observer
  useEffect(() => {
    const showElements = () => {
      const infoBar = document.getElementById('info-bar') as HTMLElement;
      const questionText = document.getElementById('question-text') as HTMLElement;

      if (infoBar && questionText) {
        infoBar.style.opacity = '1';
        questionText.style.opacity = '1';
        
        // Initial position calculation
        const questionHeight = questionText.offsetHeight;
        const baseQuestionBottom = 80;
        const spacing = 20;
        const newInfoBarBottom = baseQuestionBottom + questionHeight + spacing;
        setInfoBarBottom(newInfoBarBottom);
      }
    };

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(showElements, 100);
    
    // Set up resize observer to recalculate on window resize
    const resizeObserver = new ResizeObserver(() => {
      const questionElement = document.getElementById('question-text') as HTMLElement;
      if (questionElement) {
        const questionHeight = questionElement.offsetHeight;
        const baseQuestionBottom = 80;
        const spacing = 20;
        const newInfoBarBottom = baseQuestionBottom + questionHeight + spacing;
        setInfoBarBottom(newInfoBarBottom);
      }
    });

    const questionElement = document.getElementById('question-text') as HTMLElement;
    if (questionElement) {
      resizeObserver.observe(questionElement);
    }

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
    };
  }, []);

  // Monitor current slide changes for question updates
  useEffect(() => {
    // Calculate dynamic positioning after question updates
    const updateInfoBarPosition = () => {
      const questionElement = document.getElementById('question-text') as HTMLElement;
      if (questionElement) {
        const questionHeight = questionElement.offsetHeight;
        const baseQuestionBottom = 80; // bottom-[80px] = 320px from bottom
        const spacing = 20; // Desired spacing between question and info bar
        const newInfoBarBottom = baseQuestionBottom + questionHeight + spacing;
        setInfoBarBottom(newInfoBarBottom);
      }
    };

    // Small delay to ensure DOM has updated
    const timeout = setTimeout(updateInfoBarPosition, 50);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
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

        // Simplified visibility logic
        if (infoBar && questionText) {
          // Calculate distance from the exact slide position
          const targetScrollPosition = currentSlideIndex * slideHeight;
          const distanceFromTarget = Math.abs(scrollTop - targetScrollPosition);
          const threshold = slideHeight * 0.1; // Show when within 10% of target position

          if (distanceFromTarget < threshold) {
            // Near the slide position - show elements
            infoBar.style.opacity = '1';
            questionText.style.opacity = '1';
          } else {
            // Far from slide position - hide elements
            infoBar.style.opacity = '0';
            questionText.style.opacity = '0';
          }
        }

        isScrolling = false;
      }, 100);
    };

    // Initialize scroll listener
    const main = document.getElementById('problems-scroll-container') as HTMLElement;
    if (main) {
      main.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (main) {
        main.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="font-display min-h-dvh w-full overflow-hidden bg-black text-white">
      {/* Shared Header */}
      <SharedHeader activeTab="problems" />

      {/* Scrollable backgrounds */}
      <main
        id="problems-scroll-container"
        className="w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
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
        className="fixed inset-x-0 z-10 flex items-center justify-center px-6 transition-all duration-300 ease-out"
        style={{ opacity: 0, bottom: `${infoBarBottom}px` }}
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
        className="fixed inset-x-0 bottom-[80px] z-10 transition-opacity duration-300 ease-out flex justify-center"
        style={{ opacity: 0 }}
      >
        <p className={`font-display text-center text-white text-[30px] leading-tight pb-5`} style={{ width: '50vw' }}>
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
          
          {/* Yes Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-[85px] -translate-y-1/2">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleVote(demoProblems[currentSlide]?.id || demoProblems[0].id, 'yes')}
                className={`h-10 w-10 rounded-full text-white text-[12px] font-medium flex items-center justify-center transition-all duration-200 ${
                  userVotes[demoProblems[currentSlide]?.id || demoProblems[0].id] === 'yes' 
                    ? 'scale-110' 
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundImage: "linear-gradient(180deg, #FF8400 0%, #FF2F00 100%)",
                }}
              >
                Yes
              </button>
              {votes[demoProblems[currentSlide]?.id || demoProblems[0].id]?.yes > 0 && (
                <span className="mt-1 text-[10px] text-white/60 font-medium">
                  {votes[demoProblems[currentSlide]?.id || demoProblems[0].id].yes}
                </span>
              )}
            </div>
          </div>
          
          {/* No Button */}
          <div className="absolute right-1/2 top-1/2 translate-x-[85px] -translate-y-1/2">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleVote(demoProblems[currentSlide]?.id || demoProblems[0].id, 'no')}
                className={`h-10 w-10 rounded-full text-[#BABABA] text-[12px] font-medium flex items-center justify-center transition-all duration-200 ${
                  userVotes[demoProblems[currentSlide]?.id || demoProblems[0].id] === 'no' 
                    ? 'scale-110' 
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundImage: "linear-gradient(180deg, #2B2B2B 0%, #000000 100%)",
                }}
              >
                No
              </button>
              {votes[demoProblems[currentSlide]?.id || demoProblems[0].id]?.no > 0 && (
                <span className="mt-1 text-[10px] text-white/60 font-medium">
                  {votes[demoProblems[currentSlide]?.id || demoProblems[0].id].no}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
