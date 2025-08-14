"use client";

import { useParams, useRouter } from "next/navigation";
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
			<div className="fixed inset-x-0 top-0 z-20 pt-6 px-4 sm:px-6">
				<div className="relative mx-auto flex max-w-[380px] items-center justify-center">
					<button
						type="button"
						onClick={() => router.push(`/problems/${problem.id}`)}
						aria-label="Back to Problem"
						className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
					>
						<ChevronLeft size={20} className="text-white" strokeWidth={1.7} />
					</button>
					<LogoSymbol size={24} className="text-white" />
				</div>
				<div className="mx-auto mt-2 w-full max-w-[380px]">
					<ProblemPillNav problemId={problem.id} active="ideas" />
				</div>
			</div>

				<main className="mx-auto h-full w-full max-w-[402px] px-4 pt-[108px] pb-[120px] sm:px-6">
				{/* Glow ellipse background per design */}
				<div
					aria-hidden
					className="pointer-events-none absolute left-[-180px] top-[278px] h-[332px] w-[269px] rounded-full"
					style={{
						backgroundColor: "rgba(255,132,0,0.8)",
						filter: "blur(300px)",
					}}
				/>

				{/* First idea card */}
				<IdeaCard
					className="mt-3"
					href={`/problems/${problem.id}/ideas/idea-1`}
					description={
						"We could launch a 'Sponsor-a-Bench' program. Local businesses and families could fund a new, durable bench in exchange for a small dedication plaque. To foster community spirit, we could also organize a 'Park Pride Day' where volunteers help assemble and install the new benches, and maybe even give the existing ones a fresh coat of paint. This would be a great way to get everyone involved in improving our park."
					}
					votesCount={12}
				/>

				{/* Second idea card */}
				<IdeaCard
					className="mt-4"
					href={`/problems/${problem.id}/ideas/idea-2`}
					description={
						"As a local woodworker, I'd be happy to lead this repair effort. I can first assess all the benches to create a precise materials list—we'll need specific types of treated lumber and rust-proof hardware. Once we have the supplies, I can host a weekend workshop at the park to guide volunteers in safely cutting, assembling, and sealing the new bench slats. We'll get them fixed properly and built to last."
					}
					votesCount={3}
				/>

				{/* Third idea card (demo) */}
				<IdeaCard
					className="mt-4"
					href={`/problems/${problem.id}/ideas/idea-3`}
					description={
						"Partner with the local high school shop class to rebuild benches as a semester project. Students gain hands-on experience while the park receives durable replacements at minimal cost."
					}
					votesCount={8}
				/>

				{/* Fourth idea card (demo) */}
				<IdeaCard
					className="mt-4"
					href={`/problems/${problem.id}/ideas/idea-4`}
					description={
						"Host a community fundraiser and adopt-a-bench drive with a public tracker. Each sponsored bench includes a small engraved tag acknowledging contributors."
					}
					votesCount={15}
				/>

				{/* Fifth idea card (demo) */}
				<IdeaCard
					className="mt-4"
					href={`/problems/${problem.id}/ideas/idea-5`}
					description={
						"Switch to recycled-plastic lumber for future benches to reduce maintenance and extend lifespan. It resists rot and requires fewer replacements over time."
					}
					votesCount={21}
				/>

				{/* Sixth idea card (demo) */}
				<IdeaCard
					className="mt-4"
					href={`/problems/${problem.id}/ideas/idea-6`}
					description={
						"Create a monthly 'Fix-It in the Park' meetup. Each session focuses on small repairs—starting with benches—building regular momentum and volunteer ownership."
					}
					votesCount={5}
				/>

				{/* Sticky CTA: Add your idea */}
				<div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-6 sm:px-6">
					<div className="mx-auto w-full max-w-[380px]">
						<button
							type="button"
							onClick={() => router.push(`/ideas/add?problemId=${problem.id}`)}
							className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-full border-4 border-[#FF8400] bg-[#212121] px-6 py-3 text-[16px] text-white"
						>
							<Plus size={18} />
							<span>Add your idea</span>
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}


