"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import SharedHeader from "@/components/SharedHeader";
import IdeaCard from "@/components/IdeaCard";
import { getDemoProblems, getDemoIdeas, type DemoContext } from "@/lib/demoContext";

const CONTEXT: DemoContext = 'cities';

export default function CitiesProblemIdeasPage() {
	const router = useRouter();
	const params = useParams<{ problemId: string }>();
	const problemId = Array.isArray(params?.problemId)
		? params?.problemId[0]
		: params?.problemId;
	
	const demoProblems = getDemoProblems(CONTEXT);
	const demoIdeas = getDemoIdeas(CONTEXT);
	
	const problem = demoProblems.find((p) => p.id === problemId) ?? demoProblems[0];
	const problemIdeas = demoIdeas.filter((idea) => idea.problemId === problemId);

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
			const initiallyVisible = new Set(problemIdeas.map(idea => idea.id));
			setVisibleCards(initiallyVisible);
		}, 100);

		return () => {
			clearTimeout(timeout);
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [problemIdeas]);

	const cardRef = (element: HTMLDivElement | null, cardId: string) => {
		if (element && observerRef.current) {
			element.setAttribute('data-card-id', cardId);
			observerRef.current.observe(element);
		}
	};

	return (
		<div className="relative min-h-dvh w-full bg-[#141414] text-white">
			{/* Shared Header */}
			<SharedHeader mode="back" backHref={`/demo/cities/mobile/problems/${problem.id}`} />
			
			{/* Navigation */}
			<div className="relative z-10 px-3 pt-20 pb-2">
				<ProblemPillNav problemId={problem.id} active="ideas" context="cities" />
			</div>

		<main className="px-3 pb-16">
				{/* Background glow removed */}

				<div className="space-y-4">
					{problemIdeas.map((idea, index) => (
						<div
							key={idea.id}
							ref={(el) => cardRef(el, idea.id)}
							className={`transform transition-all duration-700 ease-out ${
								visibleCards.has(idea.id) 
									? 'opacity-100 translate-y-0' 
									: 'opacity-0 translate-y-8'
							}`}
							style={{ transitionDelay: `${index * 100}ms` }}
						>
							<IdeaCard
								className=""
								href={`/demo/cities/mobile/problems/${problem.id}/ideas/${idea.id}`}
								description={idea.description}
								votesCount={idea.votesCount}
							/>
						</div>
					))}
				</div>

				{/* Sticky CTA: Add your idea */}
				<div className="sticky bottom-0 left-0 right-0 pb-4 z-5">
					<button
						type="button"
						onClick={() => router.push(`/ideas/add?problemId=${problem.id}&context=cities`)}
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
