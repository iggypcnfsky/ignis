"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LogoSymbol from "@/components/Logo";
import { ChevronLeft, Plus } from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import IdeaCard from "@/components/IdeaCard";
import { demoProblems } from "@/lib/demoProblems";

export default function ProblemIdeasPage() {
	const router = useRouter();
	const params = useParams<{ problemId: string }>();
	const problemId = Array.isArray(params?.problemId)
		? params?.problemId[0]
		: params?.problemId;
	const problem = demoProblems.find((p) => p.id === problemId) ?? demoProblems[0];

	return (
		<div className="relative min-h-dvh w-full bg-[#141414] text-white">
			{/* Fixed header with centered logo and back button */}
			<div className="relative z-10 px-6 pt-16 pb-4">
			<div className="flex items-center justify-between mb-8">
				<button
					type="button"
					onClick={() => router.push(`/problems/${problem.id}`)}
					aria-label="Back to Problem"
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
			<ProblemPillNav problemId={problem.id} active="ideas" />
		</div>

		<main className="px-6 pb-32">
				{/* Background glow removed */}

				<div className="space-y-3">
					{/* First idea card */}
					<IdeaCard
						className=""
						href={`/problems/${problem.id}/ideas/idea-1`}
						description={
							"We could launch a 'Sponsor-a-Bench' program. Local businesses and families could fund a new, durable bench in exchange for a small dedication plaque. To foster community spirit, we could also organize a 'Park Pride Day' where volunteers help assemble and install the new benches, and maybe even give the existing ones a fresh coat of paint. This would be a great way to get everyone involved in improving our park."
						}
						votesCount={12}
					/>

					{/* Second idea card */}
					<IdeaCard
						className=""
						href={`/problems/${problem.id}/ideas/idea-2`}
						description={
							"As a local woodworker, I'd be happy to lead this repair effort. I can first assess all the benches to create a precise materials list—we'll need specific types of treated lumber and rust-proof hardware. Once we have the supplies, I can host a weekend workshop at the park to guide volunteers in safely cutting, assembling, and sealing the new bench slats. We'll get them fixed properly and built to last."
						}
						votesCount={3}
					/>

					{/* Third idea card (demo) */}
					<IdeaCard
						className=""
						href={`/problems/${problem.id}/ideas/idea-3`}
						description={
							"Partner with the local high school shop class to rebuild benches as a semester project. Students gain hands-on experience while the park receives durable replacements at minimal cost."
						}
						votesCount={8}
					/>

					{/* Fourth idea card (demo) */}
					<IdeaCard
						className=""
						href={`/problems/${problem.id}/ideas/idea-4`}
						description={
							"Host a community fundraiser and adopt-a-bench drive with a public tracker. Each sponsored bench includes a small engraved tag acknowledging contributors."
						}
						votesCount={15}
					/>

					{/* Fifth idea card (demo) */}
					<IdeaCard
						className=""
						href={`/problems/${problem.id}/ideas/idea-5`}
						description={
							"Switch to recycled-plastic lumber for future benches to reduce maintenance and extend lifespan. It resists rot and requires fewer replacements over time."
						}
						votesCount={21}
					/>

					{/* Sixth idea card (demo) */}
					<IdeaCard
						className=""
						href={`/problems/${problem.id}/ideas/idea-6`}
						description={
							"Create a monthly 'Fix-It in the Park' meetup. Each session focuses on small repairs—starting with benches—building regular momentum and volunteer ownership."
						}
						votesCount={5}
					/>
				</div>

				{/* Sticky CTA: Add your idea */}
				<div className="sticky bottom-0 left-0 right-0 pb-8 z-5">
					<button
						type="button"
						onClick={() => router.push(`/ideas/add?problemId=${problem.id}`)}
						className="w-full h-12 border-4 border-[#FF8400] bg-[#212121] rounded-[100px] flex items-center justify-center gap-2 shadow-lg"
					>
						<Plus size={18} />
						<span className="text-[16px] leading-[1.25] font-sans text-white font-medium">Add your idea</span>
					</button>
				</div>
			</main>
		</div>
	);
}


