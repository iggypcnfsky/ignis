"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Calendar, ZoomIn, FileText, BarChart3, MapPin, Grid3X3 } from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import LogoSymbol from "@/components/Logo";
import ImageZoomModal from "@/components/ImageZoomModal";
import { demoProblems } from "@/lib/demoProblems";

export default function ProblemDetails() {
  const router = useRouter();
  const params = useParams<{ problemId: string }>();
  const problemId = Array.isArray(params?.problemId) ? params?.problemId[0] : params?.problemId;
  const problem = demoProblems.find((p) => p.id === problemId) ?? demoProblems[0];
  const similarProblems = demoProblems.filter((p) => p.id !== problem.id).slice(0, 3);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="relative min-h-dvh w-full bg-[#141414] text-white">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Header with centered logo and back button */}
      <div className="relative z-10 px-6 pt-16 pb-4">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            aria-label="Back to Discover"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
          >
            <ChevronLeft size={20} className="text-white" strokeWidth={1.7} />
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              aria-label="Go to explore page"
              className="flex items-center justify-center"
            >
              <LogoSymbol size={24} className="text-white" />
            </Link>
          </div>
          <div className="w-10 h-10" />
        </div>
        <ProblemPillNav problemId={problem.id} active="problem" />
      </div>

      {/* Content */}
      <main className="px-6 pb-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Hero card */}
          <div className="rounded-[30px] bg-[#212121] lg:col-span-7">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="relative h-[320px] w-full overflow-hidden rounded-[30px] lg:h-[520px] cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-0 border-0 outline-none"
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
          <section className="rounded-[30px] bg-[#212121] p-6 lg:col-span-7">
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
                <p className="text-sm">Google Maps</p>
                <p className="text-xs text-white/40 mt-1">Coming Soon</p>
              </div>
            </div>
          </section>

          {/* Description card */}
          <section className="rounded-[30px] bg-[#212121] p-6 lg:col-span-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-white/60" />
                <span className="font-display text-[16px] leading-5">Report</span>
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
              {problem.description} {" "}
              During my morning walk through Evergreen Commons, I noticed that at least four of the wooden benches along the pond trail are in significant disrepair. Several have splintered or missing slats, and one near the willow tree has collapsed entirely, posing a safety hazard. It&apos;s a popular spot for seniors and families, and it would be great to see these fixed so everyone can continue to enjoy the park safely.
            </p>
          </section>

          {/* Poll */}
          <section className="rounded-[30px] bg-[#212121] p-6 lg:col-span-5">
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
                  style={{ width: `${(12 / 18) * 100}%` }}
                >
                  Yes (12)
                </button>
                <span className="text-xs text-white/60 ml-2">60%</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="h-10 rounded-full bg-black text-white flex items-center justify-center px-4 transition-all hover:bg-black/90"
                  style={{ width: `${(6 / 18) * 100}%` }}
                >
                  No (6)
                </button>
                <span className="text-xs text-white/60 ml-2">40%</span>
              </div>
            </div>
          </section>

          {/* Similar problems */}
          <section className="rounded-[30px] bg-[#212121] p-6 lg:col-span-12 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid3X3 size={18} className="text-white/60" />
                <span className="font-display text-[16px] leading-5">Similar problems</span>
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
                    href={`/problems/${sp.id}`}
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


