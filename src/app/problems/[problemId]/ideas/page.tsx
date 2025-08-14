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

			<main className="mx-auto h-full w-full max-w-[402px] px-4 pt-[108px] pb-6 sm:px-6">
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
					className="mt-[167px]"
					description={
						"We could launch a 'Sponsor-a-Bench' program. Local businesses and families could fund a new, durable bench in exchange for a small dedication plaque. To foster community spirit, we could also organize a 'Park Pride Day' where volunteers help assemble and install the new benches, and maybe even give the existing ones a fresh coat of paint. This would be a great way to get everyone involved in improving our park."
					}
					eventsLabel="5 events"
					costLabel="~500€"
					durationLabel="2 weeks"
					votesCount={12}
				/>

				{/* Second idea card */}
				<IdeaCard
					className="mt-4"
					description={
						"As a local woodworker, I'd be happy to lead this repair effort. I can first assess all the benches to create a precise materials list—we'll need specific types of treated lumber and rust-proof hardware. Once we have the supplies, I can host a weekend workshop at the park to guide volunteers in safely cutting, assembling, and sealing the new bench slats. We'll get them fixed properly and built to last."
					}
					eventsLabel="2 events"
					costLabel="~1.500€"
					durationLabel="3 days"
					votesCount={3}
				/>

				{/* CTA: Got a better idea? */}
				<div className="mt-[10px]">
					<p className="font-display text-[16px] leading-[1.25]">Got a better idea?</p>
					<button
						type="button"
						onClick={() => router.push(`/ideas/add?problemId=${problem.id}`)}
						className="mt-2 inline-flex h-[60px] w-full items-center justify-center gap-2 rounded-full text-[16px]"
						style={{
							backgroundImage:
								"linear-gradient(90deg, rgba(255,132,0,1) 0%, rgba(255,47,0,1) 100%)",
						}}
					>
						<Plus size={20} className="text-white" />
						<span>Add your idea</span>
					</button>
				</div>
			</main>
		</div>
	);
}


