"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
	Share2,
	Link as LinkIcon,
	QrCode,
	Download,
	Copy,
	Check,
} from "lucide-react";
import ProblemPillNav from "@/components/ProblemPillNav";
import SharedHeader from "@/components/SharedHeader";
import { getDemoProblems, type DemoContext } from "@/lib/demoContext";

const CONTEXT: DemoContext = 'schools';

export default function SchoolsShareProblemPage() {
	const params = useParams<{ problemId: string }>();
	const problemId = Array.isArray(params?.problemId)
		? params?.problemId[0]
		: params?.problemId;
	
	const demoProblems = getDemoProblems(CONTEXT);
	const problem = useMemo(
		() => demoProblems.find((p) => p.id === problemId) ?? demoProblems[0],
		[problemId, demoProblems]
	);

	const [shareUrl, setShareUrl] = useState("");
	const [copiedLink, setCopiedLink] = useState(false);
	const [copiedPost, setCopiedPost] = useState(false);
	const [visiblePanels, setVisiblePanels] = useState<Set<string>>(new Set());
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// Prefer window origin when available to generate a canonical link
		if (typeof window !== "undefined") {
			setShareUrl(`${window.location.origin}/demo/schools/mobile/problems/${problem.id}`);
		}
	}, [problem.id]);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const panelId = entry.target.getAttribute('data-panel-id');
						if (panelId) {
							setVisiblePanels(prev => new Set([...prev, panelId]));
						}
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '50px'
			}
		);

		// Show initially visible panels after a short delay
		const timeout = setTimeout(() => {
			const initiallyVisible = new Set(['share-link', 'qr-code', 'poster', 'social-post']);
			setVisiblePanels(initiallyVisible);
		}, 100);

		return () => {
			clearTimeout(timeout);
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	const panelRef = (element: HTMLElement | null, panelId: string) => {
		if (element && observerRef.current) {
			element.setAttribute('data-panel-id', panelId);
			observerRef.current.observe(element);
		}
	};

	const socialPostText = useMemo(() => {
		return `Pomóż poprawić naszą szkołę: ${problem.title}. Zobacz szczegóły i dołącz do działania: ${shareUrl}`.trim();
	}, [problem.title, shareUrl]);

	async function copyToClipboard(text: string, which: "link" | "post") {
		try {
			await navigator.clipboard.writeText(text);
			if (which === "link") {
				setCopiedLink(true);
				setTimeout(() => setCopiedLink(false), 1800);
			} else {
				setCopiedPost(true);
				setTimeout(() => setCopiedPost(false), 1800);
			}
		} catch (error) {
			// no-op; clipboard may be unavailable
			console.log('Copy failed:', error);
		}
	}

	async function nativeShare() {
		if (typeof navigator !== "undefined" && 'share' in navigator) {
			try {
				await navigator.share({ title: problem.title, url: shareUrl });
			} catch (error) {
				// user cancelled or unsupported
				console.log('Share cancelled or not supported:', error);
			}
		}
	}

	function downloadPosterPlaceholder() {
		// Placeholder: wire up real poster export later
		console.log("Poster download is coming soon for:", problem.id);
	}

	return (
		<div className="relative min-h-dvh w-full bg-[#141414] text-white">
			{/* Shared Header */}
			<SharedHeader mode="back" backHref={`/demo/schools/mobile/problems/${problem.id}`} />
			
			{/* Navigation */}
			<div className="relative z-10 px-3 pt-20 pb-2">
				<ProblemPillNav problemId={problem.id} active="share" context="schools" />
			</div>

			{/* Content */}
			<main className="px-3 pb-12">
				<div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-3">
					{/* Share link panel */}
					<section 
						ref={(el) => panelRef(el, 'share-link')}
						className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-7 transform transition-all duration-700 ease-out ${
							visiblePanels.has('share-link') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0ms' }}
					>
						<div className="flex items-center gap-2">
							<Share2 size={18} className="text-white/60" />
							<span className="font-display text-[16px] leading-5">Udostępnij link</span>
						</div>
						<div className="mt-4 flex items-center gap-2">
							<div className="flex-1 h-12 rounded-[14px] bg-[#1A1A1A] px-4 flex items-center text-[14px] overflow-hidden">
								<LinkIcon size={16} className="text-white/40 mr-2 shrink-0" />
								<span className="truncate select-all">{shareUrl || `/demo/schools/mobile/problems/${problem.id}`}</span>
							</div>
							<button
								type="button"
								onClick={() => copyToClipboard(shareUrl || `/demo/schools/mobile/problems/${problem.id}`, "link")}
								className="h-12 px-4 rounded-full bg-[#FF8400] text-white inline-flex items-center gap-2 hover:bg-[#FF8400]/90"
								aria-label="Copy link"
							>
								{copiedLink ? <Check size={16} /> : <Copy size={16} />}
								<span className="text-[14px]">{copiedLink ? "Skopiowano" : "Kopiuj"}</span>
							</button>
						</div>
						<div className="mt-3">
							<button
								type="button"
								onClick={nativeShare}
								className="text-[12px] text-white/70 underline"
							>
								Lub udostępnij przez natywne menu
							</button>
						</div>
					</section>

					{/* QR Code panel (placeholder) */}
					<section 
						ref={(el) => panelRef(el, 'qr-code')}
						className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-5 transform transition-all duration-700 ease-out ${
							visiblePanels.has('qr-code') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '100ms' }}
					>
						<div className="flex items-center gap-2">
							<QrCode size={18} className="text-white/60" />
							<span className="font-display text-[16px] leading-5">Kod QR</span>
						</div>
						<div className="mt-4 aspect-square bg-[#1A1A1A] rounded-[20px] flex items-center justify-center">
							<div className="text-center text-white/60">
								<div className="w-16 h-16 mx-auto mb-3 bg-[#333] rounded-md" />
								<p className="text-sm">Generowanie QR</p>
								<p className="text-xs text-white/40 mt-1">Wkrótce</p>
							</div>
						</div>
					</section>

					{/* Poster download (placeholder) */}
					<section 
						ref={(el) => panelRef(el, 'poster')}
						className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-7 transform transition-all duration-700 ease-out ${
							visiblePanels.has('poster') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '200ms' }}
					>
						<div className="flex items-center gap-2">
							<Download size={18} className="text-white/60" />
							<span className="font-display text-[16px] leading-5">Plakat A4</span>
						</div>
						<div className="mt-4 rounded-[20px] bg-[#1A1A1A] p-4 min-h-[140px] flex items-center justify-between gap-4">
							<div>
								<p className="text-[14px] text-white/90">Plakat z kodem QR i opisem</p>
								<p className="text-[12px] text-white/50 mt-1">Zoptymalizowany do druku. Eksport jako PDF.</p>
							</div>
							<button
								onClick={downloadPosterPlaceholder}
								className="h-10 px-4 rounded-full bg-[#FF8400] text-white inline-flex items-center gap-2 hover:bg-[#FF8400]/90"
							>
								<Download size={16} />
								<span className="text-[14px]">Pobierz</span>
							</button>
						</div>
					</section>

					{/* Social post text */}
					<section 
						ref={(el) => panelRef(el, 'social-post')}
						className={`rounded-[30px] bg-[#212121] p-4 lg:col-span-5 transform transition-all duration-700 ease-out ${
							visiblePanels.has('social-post') 
								? 'opacity-100 translate-y-0' 
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '300ms' }}
					>
						<div className="flex items-center gap-2">
							<Share2 size={18} className="text-white/60" />
							<span className="font-display text-[16px] leading-5">Post społecznościowy</span>
						</div>
						<div className="mt-4">
							<div className="rounded-[14px] bg-[#1A1A1A] p-4">
								<p className="text-[14px] leading-[1.3] whitespace-pre-wrap break-words">{socialPostText}</p>
							</div>
							<div className="mt-3 flex items-center justify-end">
								<button
									onClick={() => copyToClipboard(socialPostText, "post")}
									className="h-10 px-4 rounded-full bg-[#FF8400] text-white inline-flex items-center gap-2 hover:bg-[#FF8400]/90"
								>
									{copiedPost ? <Check size={16} /> : <Copy size={16} />}
									<span className="text-[14px]">{copiedPost ? "Skopiowano" : "Kopiuj tekst"}</span>
								</button>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
