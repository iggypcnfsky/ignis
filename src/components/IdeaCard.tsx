"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUp } from "lucide-react";

export type IdeaCardProps = {
	/** Short description/body of the idea */
	description: string;
	/** Metric pills displayed at the bottom of the card */
	eventsLabel: string; // e.g., "5 events"
	costLabel: string; // e.g., "~500€"
	durationLabel: string; // e.g., "2 weeks"
	/** Small upvote count shown in a pill at the top-right */
	votesCount?: number;
	/** Optional link target; if provided the card becomes a link */
	href?: string;
	/** Optional className to position the card in parent layout */
	className?: string;
};

export default function IdeaCard({
	description,
	eventsLabel,
	costLabel,
	durationLabel,
	votesCount = 0,
	href,
	className,
}: IdeaCardProps) {
	const Wrapper = href ? Link : ("div" as any);
	const wrapperProps = href
		? { href, className: "relative block" }
		: { className: "relative" };

	const [localVotes, setLocalVotes] = useState<number>(votesCount);
	const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);

	function handleUpvoteClick(e: React.MouseEvent) {
		// Prevent navigating when wrapped by Link
		e.preventDefault();
		e.stopPropagation();
	if (hasUpvoted) {
		setHasUpvoted(false);
		setLocalVotes((v) => Math.max(0, v - 1));
		return;
	}
	setHasUpvoted(true);
	setLocalVotes((v) => v + 1);
	}

	return (
		<Wrapper {...(wrapperProps as any)}>
			<article
				className={
					"rounded-[30px] bg-[#212121] p-4 text-white " + (className ?? "")
				}
				aria-label="Idea card"
			>
				{/* Removed in-card vote badge per request */}

				<p className="text-[16px] leading-[1.25]">
					{description}
				</p>

				{/* Metric pills */}
				<div className="mt-3 flex items-center gap-[5px]">
					<span className="inline-flex h-10 items-center justify-center rounded-full bg-[#353535] px-[15px] text-[12px] leading-none">
						{eventsLabel}
					</span>
					<span className="inline-flex h-10 items-center justify-center rounded-full bg-[#353535] px-[15px] text-[12px] leading-none">
						{costLabel}
					</span>
					<span className="inline-flex h-10 items-center justify-center rounded-full bg-[#353535] px-[13px] text-[12px] leading-none">
						{durationLabel}
					</span>
				</div>
			</article>

			{/* Floating action: single upvote button with count (outside, top-right) */}
			<div className="pointer-events-none absolute left-full top-0 z-10 ml-3 flex flex-col">
				<button
					type="button"
					onClick={handleUpvoteClick}
					aria-pressed={hasUpvoted}
					aria-label="Upvote idea"
					className="pointer-events-auto inline-flex h-10 items-center justify-center gap-1 rounded-full px-3 text-white backdrop-blur-[100px]"
					style={{
						backgroundImage: hasUpvoted
							? "linear-gradient(180deg, #FF8400 0%, #FF2F00 100%)"
						: undefined,
						backgroundColor: hasUpvoted ? undefined : "rgba(255,255,255,0.3)",
					}}
				>
					<ArrowUp size={18} className="text-white" />
					<span className="text-[12px] leading-none">{localVotes}</span>
				</button>
			</div>
		</Wrapper>
	);
}


