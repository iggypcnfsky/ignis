import Image from "next/image";
import Link from "next/link";
import LogoSymbol from "@/components/Logo";
import { Compass, CalendarDays, Info } from "lucide-react";
import AddProblemCapture from "@/components/AddProblemCapture";
import { demoProblems, type Problem } from "@/lib/demoProblems";


function ProblemSlide({ problem }: { problem: Problem }) {
  return (
    <article className="relative h-screen w-full snap-start">
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

      {/* Header and bottom overlays are fixed in the page, not per slide */}

      {/* Question text */}
      <div className="absolute inset-x-0 bottom-[140px] p-4 sm:p-6">
        <p className={`font-display mx-auto max-w-[337px] text-center text-white text-[30px] leading-none`}>{problem.question}</p>
      </div>

      {/* Bottom overlays are fixed in the page, not per slide */}
    </article>
  );
}

export default function Home() {
  return (
    <div className="font-display h-dvh w-full overflow-hidden bg-black">
      {/* Sticky header */}
      <div className="fixed inset-x-0 top-0 z-20 pt-6 px-4 sm:px-6">
        <div className="relative mx-auto flex max-w-[380px] items-center justify-center">
          <div
            aria-label="Discover"
            className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FF8400" }}
          >
            <Compass size={20} className="text-white" strokeWidth={1.7} />
          </div>
          <LogoSymbol size={24} className="text-white" />
          <div className="absolute right-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-[20px] bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]">
            <CalendarDays size={20} className="text-white" strokeWidth={1.7} />
          </div>
        </div>
      </div>

      {/* Scrollable backgrounds */}
      <main className="h-full w-full overflow-y-auto snap-y snap-mandatory">
        {demoProblems.map((p) => (
          <ProblemSlide key={p.id} problem={p} />
        ))}
      </main>

      {/* Sticky info bar */}
      <div className="fixed inset-x-0 bottom-[110px] z-20 flex items-center justify-center px-4 sm:px-6">
        <div className="flex w-full max-w-[380px] items-center justify-center gap-1.5">
          <Info size={14} className="text-white" strokeWidth={1.2} />
          <span className={`text-[12px] leading-[1.17] text-white`}>
            Click to learn more
          </span>
        </div>
      </div>

      {/* Sticky bottom actions */}
      <div className="fixed inset-x-0 bottom-6 z-20 px-4 sm:px-6">
        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="h-20 w-full rounded-[100px] bg-black/20 backdrop-blur-[50px]" />
          <AddProblemCapture />
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <button
              type="button"
              className={`h-20 w-20 rounded-full text-white text-[20px]`}
              style={{
                backgroundImage: "linear-gradient(180deg, #FF8400 0%, #FF2F00 100%)",
              }}
            >
              Yes
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              type="button"
              className={`h-20 w-20 rounded-full text-[#BABABA] text-[20px]`}
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
