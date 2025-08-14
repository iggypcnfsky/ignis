"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUp, ArrowRight } from "lucide-react";

export type IdeaCardProps = {
	/** Short description/body of the idea */
	description: string;
	/** Initial upvote count */
	votesCount?: number;
	/** Optional link target; if provided the card becomes a link */
	href?: string;
	/** Optional className to position the card in parent layout */
	className?: string;
};

export default function IdeaCard({
	description,
	votesCount = 0,
	href,
	className,
}: IdeaCardProps) {

	const [localVotes, setLocalVotes] = useState<number>(votesCount);
	const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
    const router = useRouter();

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
			<div className="relative">
				<article
					onClick={(e) => {
						if (!href) return;
						// clicking the article navigates; inner buttons stopPropagation
						router.push(href);
					}}
					className={
						"relative overflow-hidden rounded-[30px] bg-[#212121] p-4 text-white " +
						(href ? " cursor-pointer " : " ") +
						(className ?? "")
					}
					aria-label="Idea card"
				>
				{/* Removed in-card vote badge per request */}

				<p className="text-[16px] leading-[1.25]">
					{description}
				</p>

				{/* Bottom controls inside panel (flow layout to avoid overlapping text) */}
				<div className="mt-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleUpvoteClick}
                        aria-pressed={hasUpvoted}
                        aria-label="Upvote idea"
                        className="inline-flex h-10 items-center justify-center gap-1 rounded-full px-3 text-white backdrop-blur-[100px]"
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

					{href && (
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								router.push(href);
							}}
							aria-label="Open idea"
							className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-[100px]"
						>
							<ArrowRight size={18} className="text-white" />
						</button>
					)}
                </div>
			</article>
        </div>
	);
}


