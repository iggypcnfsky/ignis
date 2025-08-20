"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import SharedHeader from "@/components/SharedHeader";
import IdeaCard from "@/components/IdeaCard";
import { demoProblems } from "@/lib/demoProblems";

export default function ProblemIdeasPage() {
	const router = useRouter();
	const params = useParams<{ problemId: string }>();
	const problemId = Array.isArray(params?.problemId)
		? params?.problemId[0]
		: params?.problemId;
	const problem = demoProblems.find((p) => p.id === problemId) ?? demoProblems[0];

	const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const cardId = entry.target.getAttribute('data-card-id');
						if (cardId) {
							setVisibleCards(prev => new Set([...prev, cardId]));
						}
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '50px'
			}
		);

		// Show initially visible cards after a short delay
		const timeout = setTimeout(() => {
			const initiallyVisible = new Set(['idea-1', 'idea-2', 'idea-3', 'idea-4', 'idea-5', 'idea-6']);
			setVisibleCards(initiallyVisible);
		}, 100);

		return () => {
			clearTimeout(timeout);
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	const cardRef = (element: HTMLDivElement | null, cardId: string) => {
		if (element && observerRef.current) {
			element.setAttribute('data-card-id', cardId);
			observerRef.current.observe(element);
		}
	};

	return (
		<div className="relative min-h-dvh w-full bg-[#141414] text-white">
			{/* Shared Header */}
			<SharedHeader mode="back" backHref={`/problems/${problem.id}`} />
			
			{/* Navigation */}
			<div className="relative z-10 px-3 pt-20 pb-2">
				<ProblemPillNav problemId={problem.id} active="ideas" />
			</div>

		<main className="px-3 pb-16">
				{/* Background glow removed */}

				<div className="space-y-4">
					{/* First idea card */}
					<div
						ref={(el) => cardRef(el, 'idea-1')}
						className={`transform transition-all duration-700 ease-out ${
							visibleCards.has('idea-1') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0ms' }}
					>
						<IdeaCard
							className=""
							href={`/problems/${problem.id}/ideas/idea-1`}
							description={
								"We could launch a 'Sponsor-a-Bench' program. Local businesses and families could fund a new, durable bench in exchange for a small dedication plaque. To foster community spirit, we could also organize a 'Park Pride Day' where volunteers help assemble and install the new benches, and maybe even give the existing ones a fresh coat of paint. This would be a great way to get everyone involved in improving our park."
							}
							votesCount={12}
						/>
					</div>

					{/* Second idea card */}
					<div
						ref={(el) => cardRef(el, 'idea-2')}
						className={`transform transition-all duration-700 ease-out ${
							visibleCards.has('idea-2') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '100ms' }}
					>
						<IdeaCard
							className=""
							href={`/problems/${problem.id}/ideas/idea-2`}
							description={
								"As a local woodworker, I'd be happy to lead this repair effort. I can first assess all the benches to create a precise materials list—we'll need specific types of treated lumber and rust-proof hardware. Once we have the supplies, I can host a weekend workshop at the park to guide volunteers in safely cutting, assembling, and sealing the new bench slats. We'll get them fixed properly and built to last."
							}
							votesCount={3}
						/>
					</div>

					{/* Third idea card (demo) */}
					<div
						ref={(el) => cardRef(el, 'idea-3')}
						className={`transform transition-all duration-700 ease-out ${
							visibleCards.has('idea-3') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '200ms' }}
					>
						<IdeaCard
							className=""
							href={`/problems/${problem.id}/ideas/idea-3`}
							description={
								"Partner with the local high school shop class to rebuild benches as a semester project. Students gain hands-on experience while the park receives durable replacements at minimal cost."
							}
							votesCount={8}
						/>
					</div>

					{/* Fourth idea card (demo) */}
					<div
						ref={(el) => cardRef(el, 'idea-4')}
						className={`transform transition-all duration-700 ease-out ${
							visibleCards.has('idea-4') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '300ms' }}
					>
						<IdeaCard
							className=""
							href={`/problems/${problem.id}/ideas/idea-4`}
							description={
								"Host a community fundraiser and adopt-a-bench drive with a public tracker. Each sponsored bench includes a small engraved tag acknowledging contributors."
							}
							votesCount={15}
						/>
					</div>

					{/* Fifth idea card (demo) */}
					<div
						ref={(el) => cardRef(el, 'idea-5')}
						className={`transform transition-all duration-700 ease-out ${
							visibleCards.has('idea-5') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '400ms' }}
					>
						<IdeaCard
							className=""
							href={`/problems/${problem.id}/ideas/idea-5`}
							description={
								"Switch to recycled-plastic lumber for future benches to reduce maintenance and extend lifespan. It resists rot and requires fewer replacements over time."
							}
							votesCount={21}
						/>
					</div>

					{/* Sixth idea card (demo) */}
					<div
						ref={(el) => cardRef(el, 'idea-6')}
						className={`transform transition-all duration-700 ease-out ${
							visibleCards.has('idea-6') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '500ms' }}
					>
						<IdeaCard
							className=""
							href={`/problems/${problem.id}/ideas/idea-6`}
							description={
								"Create a monthly 'Fix-It in the Park' meetup. Each session focuses on small repairs—starting with benches—building regular momentum and volunteer ownership."
							}
							votesCount={5}
						/>
					</div>
				</div>

				{/* Sticky CTA: Add your idea */}
				<div className="sticky bottom-0 left-0 right-0 pb-4 z-5">
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


