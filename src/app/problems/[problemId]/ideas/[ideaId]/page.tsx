"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronLeft, ArrowUp, Flag as FlagIcon, Users } from "lucide-react";
import LogoSymbol from "@/components/Logo";
import ProblemPillNav from "@/components/ProblemPillNav";
import { demoProblems } from "@/lib/demoProblems";

export default function DetailedIdeaPage() {
	const router = useRouter();
	const params = useParams<{ problemId: string; ideaId: string }>();
	const problemId = Array.isArray(params?.problemId)
		? params?.problemId[0]
		: params?.problemId;
	const ideaId = Array.isArray(params?.ideaId) ? params?.ideaId[0] : params?.ideaId;

	const problem = useMemo(() => {
		return demoProblems.find((p) => p.id === problemId) ?? demoProblems[0];
	}, [problemId]);

	const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
	const [voteCount, setVoteCount] = useState<number>(3);
	const [flagged, setFlagged] = useState<boolean>(false);

	function handleUpvote() {
		if (hasUpvoted) {
			setHasUpvoted(false);
			setVoteCount((v) => Math.max(0, v - 1));
			return;
		}
		setHasUpvoted(true);
		setVoteCount((v) => v + 1);
	}

	function handleFlag() {
		setFlagged((f) => !f);
	}

	return (
		<div className="relative min-h-dvh w-full bg-[#141414] text-white">
			{/* Fixed header with centered logo */}
			<div className="fixed inset-x-0 top-0 z-20 pt-6 px-4 sm:px-6">
				<div className="relative mx-auto h-10 max-w-[380px]">
					{/* Back */}
					<button
						type="button"
						onClick={() => router.push(`/problems/${problem.id}/ideas`)}
						aria-label="Back to Ideas"
						className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
					>
						<ChevronLeft size={20} className="text-white" strokeWidth={1.7} />
					</button>
					{/* Centered logo */}
					<div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<LogoSymbol size={24} className="text-white" />
					</div>
					{/* Actions */}
					<div className="absolute right-0 top-0 flex items-center gap-2">
						<button
							type="button"
							onClick={handleUpvote}
							aria-pressed={hasUpvoted}
							className="inline-flex h-10 items-center justify-center gap-1 rounded-full px-3 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-[100px]"
							style={{
								backgroundImage: hasUpvoted
									? "linear-gradient(90deg, rgba(255,132,0,1) 0%, rgba(255,47,0,1) 100%)"
									: undefined,
								backgroundColor: hasUpvoted ? undefined : "rgba(255,255,255,0.3)",
							}}
						>
							<ArrowUp size={18} className="text-white" />
							<span className="text-[12px] leading-none">{voteCount}</span>
						</button>
						<button
							type="button"
							onClick={handleFlag}
							aria-pressed={flagged}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-[100px]"
							style={{ backgroundColor: "rgba(36,36,36,0.3)" }}
							aria-label="Flag this idea"
						>
							<FlagIcon size={18} className="text-white" />
						</button>
					</div>
				</div>

				<div className="mx-auto mt-2 mb-4 w-full max-w-[380px]">
					<ProblemPillNav problemId={problem.id} active="ideas" />
				</div>
			</div>

				<main className="mx-auto h-full w-full max-w-[402px] px-4 pt-[152px] pb-[120px] sm:px-6">
				{/* Glow ellipses */}
				<div aria-hidden className="pointer-events-none absolute left-[234px] top-[-26px] h-[332px] w-[269px] rounded-full" style={{ backgroundColor: "rgba(255,132,0,0.8)", filter: "blur(300px)" }} />
				<div aria-hidden className="pointer-events-none absolute left-[-150px] top-[905px] h-[640px] w-[269px] rounded-full" style={{ backgroundColor: "rgba(255,132,0,0.8)", filter: "blur(300px)" }} />

				{/* Idea section */}
				<section className="rounded-[30px] bg-[#212121] p-4">
					<h2 className="font-display text-[16px] leading-[1.25]">Idea</h2>
					<p className="mt-3 text-[16px] leading-[1.25]">
						As a local woodworker, I&apos;d be happy to lead this repair effort. I can first assess all the benches to create a precise materials list—we&apos;ll need specific types of treated lumber and rust-proof hardware. Once we have the supplies, I can host a weekend workshop at the park to guide volunteers in safely cutting, assembling, and sealing the new bench slats. We&apos;ll get them fixed properly and built to last.
					</p>
				</section>

				{/* Media section */}
				<section className="mt-4 rounded-[30px] bg-[#212121] p-4">
					<h2 className="font-display text-[16px] leading-[1.25]">Media</h2>
					<div className="mt-3 grid grid-cols-2 gap-3">
						<div className="relative h-[197px] w-full overflow-hidden rounded-[20px]">
							<Image src="/demo-images/wood1.png" alt="bench in studio" fill className="object-cover" sizes="(max-width: 480px) 50vw, 200px" />
						</div>
						<div className="relative h-[197px] w-full overflow-hidden rounded-[20px]">
							<Image src="/demo-images/wood2.png" alt="workshop in the park" fill className="object-cover" sizes="(max-width: 480px) 50vw, 200px" />
						</div>
					</div>
				</section>

				{/* Plan section */}
				<section className="mt-4 rounded-[30px] bg-[#212121] p-4">
					<h2 className="font-display text-[16px] leading-[1.25]">Plan</h2>
					<div className="mt-3 space-y-2">
						{[
							"Assess all park benches for specific repair needs.",
							"Create a detailed list of lumber and hardware required.",
							"Purchase all necessary materials and tools.",
							"Announce the weekend workshop on community boards.",
							"Pre-cut and prepare lumber for easy assembly.",
							"Host the workshop and guide volunteers in repairs.",
							"Apply weather-proof sealant and install the new benches.",
						].map((text, idx) => (
							<div key={idx} className="grid grid-cols-[20px_1fr] items-center gap-3 rounded-[15px] bg-[#353535] px-3 py-2">
								<span className="inline-flex h-5 w-5 items-center justify-center rounded-[10px] bg-[#FF8400] font-display text-[14px] leading-none text-white">
									{idx + 1}
								</span>
								<p className="text-[14px] leading-none">{text}</p>
							</div>
						))}
					</div>
				</section>

				{/* Costs & Resources section */}
				<section className="mt-4 rounded-[30px] bg-[#212121] p-4">
					<h2 className="font-display text-[16px] leading-[1.25]">Costs & Resources</h2>
					<div className="mt-3 space-y-2">
						{[
							"Pressure-treated lumber for slats",
							"Rust-proof hardware (screws, bolts)",
							"Weatherproof wood sealant and brushes",
							"Tool rental (power drills, sanders)",
							"Safety equipment (gloves & glasses)",
						].map((label, idx) => (
							<div key={idx} className="flex items-center justify-between rounded-[50px] border-2 border-[#353535] px-4 py-2">
								<span className="text-[14px] leading-none">{label}</span>
								<span className="inline-flex h-5 items-center justify-center rounded-[10px] bg-[#FF8400] px-2 text-[12px] leading-none text-black">200EUR</span>
							</div>
						))}
					</div>
					<p className="mt-3 text-right text-[16px] leading-none">Total of 1,500 EUR</p>
				</section>

				{/* Author section */}
				<section className="mt-4 rounded-[30px] bg-[#212121] p-4">
					<h2 className="font-display text-[16px] leading-[1.25]">Author</h2>
					<div className="mt-3 grid grid-cols-2 gap-3">
						<div className="relative h-[202px] w-full overflow-hidden rounded-[30px] bg-[#353535]">
							<Image src="/demo-images/wood-profile.png" alt="John profile" fill className="object-cover" sizes="200px" />
						</div>
						<div className="rounded-[30px] bg-[#353535] p-4">
							<p className="text-[16px] leading-none">I&apos;m John, a local carpenter passionate about restoring our shared spaces.</p>
							<p className="mt-6 text-[14px] leading-none">+48666042112</p>
							<p className="mt-3 text-[14px] leading-none">john@local.com</p>
						</div>
					</div>
				</section>

				{/* Meetups blurb */}
				<section className="mt-4 rounded-[30px] bg-[#212121] p-4">
					<h2 className="font-display text-[16px] leading-[1.25]">Join meetups to talk about this idea</h2>
					<div className="mt-3 rounded-[30px] bg-[#353535] p-4">
						<div className="flex items-center justify-between">
							<span className="inline-flex h-[30px] items-center justify-center rounded-full border-2 border-[#FF8400] px-4 text-[12px] leading-none">Live</span>
							<span className="inline-flex h-[30px] items-center justify-center rounded-full border-2 border-[#353535] px-4 text-[12px] leading-none">12th of August at 5pm</span>
						</div>
						<div className="mt-4 flex flex-wrap items-center gap-2">
							<span className="inline-flex h-[30px] items-center justify-center rounded-full px-4 text-[12px] leading-none" style={{ backgroundColor: "#353535" }}>4 people</span>
							<span className="inline-flex h-[30px] items-center justify-center rounded-full px-4 text-[12px] leading-none" style={{ backgroundColor: "#353535" }}>2 problems</span>
							<span className="inline-flex h-[30px] items-center justify-center rounded-full px-4 text-[12px] leading-none" style={{ backgroundColor: "#353535" }}>1 idea</span>
							<span className="inline-flex h-[30px] items-center justify-center rounded-full px-4 text-[12px] leading-none" style={{ backgroundColor: "#353535" }}>60min</span>
						</div>
					</div>
				</section>

				{/* Bottom CTA (sticky) */}
				<div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-6 sm:px-6">
					<div className="mx-auto w-full max-w-[380px]">
						<button
							type="button"
							onClick={() => router.push(`/problems/${problem.id}/meetups/add`)}
							className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-full border-4 border-[#FF8400] bg-[#212121] px-6 py-3 text-[16px] text-white"
						>
							<Users size={18} />
							<span>Organize meetup about this idea</span>
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}


