"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Info } from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import LogoSymbol from "@/components/Logo";
import { demoProblems } from "@/lib/demoProblems";

export default function ProblemDetails({ params }: { params: { problemId: string } }) {
  const router = useRouter();
  const problem = demoProblems.find((p) => p.id === params.problemId) ?? demoProblems[0];

  return (
    <div className="relative min-h-dvh w-full bg-[#141414] text-white">
      {/* Fixed header with centered logo (matches Discover) and back on left */}
      <div className="fixed inset-x-0 top-0 z-20 pt-6 px-4 sm:px-6">
        <div className="relative mx-auto flex max-w-[380px] items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back to Discover"
            className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
          >
            <ChevronLeft size={20} className="text-white" strokeWidth={1.7} />
          </button>
          <LogoSymbol size={24} className="text-white" />
        </div>
        <div className="mx-auto mt-2 w-full max-w-[380px]">
          <ProblemPillNav problemId={problem.id} active="problem" />
        </div>
      </div>

      {/* Responsive content */}
      <main className="mx-auto h-full w-full max-w-7xl px-4 pt-[108px] pb-6 sm:px-6 lg:pt-[120px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Hero card */}
          <div className="rounded-[30px] bg-[#212121] lg:col-span-7">
            <div className="relative h-[220px] w-full overflow-hidden rounded-[30px] lg:h-[420px]">
              <Image
                src={problem.imagePath}
                alt={problem.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 60vw, 800px"
                priority
              />
            </div>
          </div>

          {/* Description card */}
          <section className="rounded-[30px] bg-[#212121] p-4 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[16px] leading-5">Report</span>
              <div className="inline-flex items-center gap-1 text-xs opacity-80">
                <Info size={14} strokeWidth={1.5} />
                <span>More info</span>
              </div>
            </div>
            <p className="mt-3 text-[16px] leading-[1.125]">
              {problem.description} {" "}
              During my morning walk through Evergreen Commons, I noticed that at least four of the wooden benches along the pond trail are in significant disrepair. Several have splintered or missing slats, and one near the willow tree has collapsed entirely, posing a safety hazard. It's a popular spot for seniors and families, and it would be great to see these fixed so everyone can continue to enjoy the park safely.
            </p>
          </section>

          {/* Poll */}
          <section className="rounded-[30px] bg-[#212121] p-4 lg:col-span-5">
            <span className="font-display text-[16px] leading-5">Poll</span>
            <h2 className="mt-2 text-[16px]">{problem.question}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="h-10 rounded-full bg-[#4E4E4E] text-white"
              >
                Yes (12)
              </button>
              <button
                type="button"
                className="h-10 rounded-full bg-[#D9D9D9] text-black"
              >
                No (6)
              </button>
            </div>
          </section>

          {/* Similar problems */}
          <section className="rounded-[30px] bg-[#212121] p-4 lg:col-span-12">
            <span className="font-display text-[16px] leading-5">Similar problems</span>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative h-[180px] w-full overflow-hidden rounded-[20px]">
                <Image
                  src="/demo-images/park-dirty.png"
                  alt="picture of the park, by the lake, with trash on the ground"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="relative h-[180px] w-full overflow-hidden rounded-[20px]">
                <Image
                  src="/demo-images/park-cigs.png"
                  alt="picture of the park by the lake, with lots of cigarette buts on the ground next to the water"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="relative h-[180px] w-full overflow-hidden rounded-[20px]">
                <Image
                  src="/demo-images/park-holes.jpg"
                  alt="potholes in the road near the lake and park"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


