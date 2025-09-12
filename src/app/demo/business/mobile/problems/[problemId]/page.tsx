"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Calendar, ZoomIn, FileText, BarChart3, MapPin, Grid3X3 } from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import SharedHeader from "@/components/SharedHeader";
import ImageZoomModal from "@/components/ImageZoomModal";
import { getDemoProblems, type DemoContext } from "@/lib/demoContext";

const CONTEXT: DemoContext = 'business';

export default function BusinessProblemDetails() {
  const params = useParams<{ problemId: string }>();
  const problemId = Array.isArray(params?.problemId) ? params?.problemId[0] : params?.problemId;
  
  const demoProblems = getDemoProblems(CONTEXT);
  const problem = demoProblems.find((p) => p.id === problemId) ?? demoProblems[0];
  const similarProblems = demoProblems.filter((p) => p.id !== problem.id).slice(0, 3);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [visiblePanels, setVisiblePanels] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const panelId = entry.target.getAttribute('data-panel-id');
            if (panelId) {
              setVisiblePanels(prev => new Set([...prev, panelId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Show initially visible panels after a short delay
    const timeout = setTimeout(() => {
      const initiallyVisible = new Set(['hero', 'location', 'description', 'poll', 'similar']);
      setVisiblePanels(initiallyVisible);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const panelRef = (element: HTMLElement | null, panelId: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-panel-id', panelId);
      observerRef.current.observe(element);
    }
  };

  return (
    <div className="relative min-h-dvh w-full bg-[#141414] text-white">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Shared Header */}
      <SharedHeader mode="back" backHref="/demo/business/mobile" />
      
      {/* Navigation */}
      <div className="relative z-10 px-3 pt-20 pb-2">
        <ProblemPillNav problemId={problem.id} active="problem" context="business" />
      </div>

      {/* Content */}
      <main className="px-3 pb-3 problem-detail-page">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-3">

          {/* Hero card */}
          <div 
            ref={(el) => panelRef(el, 'hero')}
            className={`rounded-[30px] bg-transparent lg:col-span-12 overflow-hidden transform transition-all duration-700 ease-out ${
              visiblePanels.has('hero') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="relative aspect-[16/12] w-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-0 border-0 outline-none"
              aria-label={`Zoom into ${problem.title} image`}
              style={{ border: 'none' }}
            >
              <Image
                src={problem.imagePath}
                alt={problem.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 60vw, 800px"
                priority
                style={{ width: '100%', height: '100%' }}
              />
              {/* Zoom indicator - visible on mobile, hover on desktop */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>

              {/* Hover overlay for desktop */}
              <div className="absolute inset-0 hidden lg:flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-black/50 rounded-full px-4 py-2 text-white text-sm">
                  Click to zoom
                </div>
              </div>
            </button>
          </div>

          {/* Location/Map */}
          <section 
            ref={(el) => panelRef(el, 'location')}
            className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-7 transform transition-all duration-700 ease-out ${
              visiblePanels.has('location') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-white/60" />
              <span className="font-display text-[16px] leading-5">Location</span>
            </div>
            <div className="mt-4 aspect-video bg-[#1a1a1a] rounded-[20px] flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="w-12 h-12 mx-auto mb-3 bg-[#333] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm">Office Location</p>
                <p className="text-xs text-white/40 mt-1">Coming Soon</p>
              </div>
            </div>
          </section>

          {/* Description card */}
          <section 
            ref={(el) => panelRef(el, 'description')}
            className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-5 transform transition-all duration-700 ease-out ${
              visiblePanels.has('description') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-white/60" />
                <span className="font-display text-[16px] leading-5">Issue Report</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-white/60">
              <Calendar size={12} className="text-white/40" />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at {new Date().toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
            <p className="mt-3 text-[16px] leading-[1.125]">
              {problem.description}
            </p>
          </section>

          {/* Poll */}
          <section 
            ref={(el) => panelRef(el, 'poll')}
            className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-5 transform transition-all duration-700 ease-out ${
              visiblePanels.has('poll') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-white/60" />
              <span className="font-display text-[16px] leading-5">Poll</span>
            </div>
            <h2 className="mt-3 text-[16px]">{problem.question}</h2>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-10 rounded-full bg-[#FF8400] text-white flex items-center justify-center px-4 transition-all hover:bg-[#FF8400]/90"
                  style={{ width: `${(15 / 23) * 100}%` }}
                >
                  Yes (15)
                </button>
                <span className="text-xs text-white/60 ml-2">65%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-10 rounded-full bg-black text-white flex items-center justify-center px-4 transition-all hover:bg-black/90"
                  style={{ width: `${(8 / 23) * 100}%` }}
                >
                  No (8)
                </button>
                <span className="text-xs text-white/60 ml-2">35%</span>
              </div>
            </div>
          </section>

          {/* Similar problems */}
          <section 
            ref={(el) => panelRef(el, 'similar')}
            className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-12 overflow-hidden transform transition-all duration-700 ease-out ${
              visiblePanels.has('similar') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid3X3 size={18} className="text-white/60" />
                <span className="font-display text-[16px] leading-5">Similar Issues</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <span>{similarProblems.length}</span>
              </div>
            </div>
            <div className="mt-4">
              <div
                className="flex gap-3 snap-x snap-mandatory pb-2 hide-scrollbar"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {similarProblems.map((sp) => (
                  <Link
                    key={sp.id}
                    href={`/demo/business/mobile/problems/${sp.id}`}
                    className="relative flex-shrink-0 w-[160px] h-[160px] overflow-hidden rounded-[20px] snap-center hover:scale-[1.02] transition-transform duration-200"
                    aria-label={`Open details for ${sp.title}`}
                  >
                    <Image
                      src={sp.imagePath}
                      alt={sp.title}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={problem.imagePath}
        imageAlt={problem.title}
      />
    </div>
  );
}
