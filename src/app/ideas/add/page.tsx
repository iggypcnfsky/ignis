"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import LogoSymbol from "@/components/Logo";
import { ChevronLeft, ArrowRight, ScanEye, Upload, Trash2 } from "lucide-react";

function AddIdeaPageInner() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const problemId = searchParams.get('problemId') || 'p1';

	const [step, setStep] = useState<"idea" | "congrats">("idea");
	const [ideaText, setIdeaText] = useState("");
	const [selectedMediaUrls, setSelectedMediaUrls] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const onAddMedia = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const onFilesSelected = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
		const files = ev.target.files ? Array.from(ev.target.files) : [];
		if (files.length === 0) return;
		const newUrls = files.map((f) => URL.createObjectURL(f));
		setSelectedMediaUrls((prev) => [...prev, ...newUrls]);
	
		console.log("[add-media-placeholder] added:", newUrls);
	}, []);

	const removeMediaAt = useCallback((index: number) => {
		setSelectedMediaUrls((prev) => {
			const url = prev[index];
			if (url) URL.revokeObjectURL(url);
			const copy = prev.slice();
			copy.splice(index, 1);
			return copy;
		});
	}, []);

	const handleShare = () => {
		// Placeholder submit - in real implementation this would save to database
		console.log("[submit-placeholder] Add idea:", {
			problemId,
			ideaText,
			selectedMediaUrls
		});
		setStep("congrats");
	};

	const handleGoToIdea = () => {
		// Navigate to the ideas list for this problem
		router.push(`/problems/${problemId}/ideas`);
	};

	// Cleanup object URLs on unmount
	useEffect(() => {
		return () => {
			selectedMediaUrls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [selectedMediaUrls]);

	return (
		<div className="relative min-h-dvh w-full bg-[#141414] text-white">
			{/* Glow ellipse background per design */}
			<div
				aria-hidden
				className="pointer-events-none absolute left-[-180px] top-[278px] h-[332px] w-[269px] rounded-full"
				style={{
					backgroundColor: "rgba(255,132,0,0.8)",
					filter: "blur(300px)",
				}}
			/>

			{/* Fixed header with centered logo and back button */}
			<div className="fixed inset-x-0 top-0 z-20 pt-6 px-4 sm:px-6">
				<div className="relative mx-auto flex max-w-[380px] items-center justify-center">
					<button
						type="button"
						onClick={() => router.push(`/problems/${problemId}/ideas`)}
						aria-label="Back to Ideas"
						className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
					>
						<ChevronLeft size={20} className="text-white" strokeWidth={1.7} />
					</button>
					          <Link
            href="/"
            aria-label="Go to explore page"
            className="flex items-center justify-center"
          >
            <LogoSymbol size={24} className="text-white" />
          </Link>
				</div>
			</div>

			<main className="mx-auto h-full w-full max-w-[402px] px-4 pt-[88px] pb-[120px] sm:px-6">
				{step === "idea" ? (
					<div className="flex flex-col gap-6">
						{/* Step indicator */}
						<div className="text-center">
							<span className="font-display text-[16px] text-white">Step 1</span>
						</div>

						{/* Header */}
						<div className="px-1">
							<h1 className="font-display text-[30px] leading-none text-white">
								What&apos;s your idea?
							</h1>
						</div>

						{/* Idea textarea */}
						<div className="rounded-[30px] bg-[#212121] p-6">
							<textarea
								value={ideaText}
								onChange={(e) => setIdeaText(e.target.value)}
								placeholder="Describe your idea..."
								className="min-h-[200px] w-full resize-none bg-transparent text-white placeholder-white/50 outline-none font-sans text-[16px] leading-snug"
							/>
						</div>

						{/* Media row */}
						<div className="flex items-center gap-3 overflow-x-auto">
							{selectedMediaUrls.map((url, idx) => (
								<div key={url + idx} className="relative h-[121px] w-[93px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#D9D9D9]">
									<Image src={url} alt={`media-${idx}`} fill className="object-cover" sizes="93px" />
									<button
										type="button"
										onClick={() => removeMediaAt(idx)}
										className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60"
									>
										<Trash2 size={14} className="text-white" strokeWidth={2} />
									</button>
								</div>
							))}
							{/* Add more tile */}
							<button
								type="button"
								onClick={onAddMedia}
								className="relative h-[121px] w-[93px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#212121]"
							>
								<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
									<Upload size={24} className="text-white" strokeWidth={2} />
								</div>
							</button>
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*,video/*"
								multiple
								className="hidden"
								onChange={onFilesSelected}
							/>
						</div>

						{/* Share button */}
						<div className="flex justify-end">
							<button
								type="button"
								onClick={handleShare}
								disabled={!ideaText.trim()}
								className="flex h-[60px] min-w-[180px] items-center justify-center gap-2 rounded-[100px] bg-gradient-to-r from-[#FF8400] to-[#FF2F00] px-6 text-white font-sans text-[16px] leading-none tracking-[-0.03em] disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ArrowRight size={24} strokeWidth={2} />
								<span>Share</span>
							</button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center gap-6 px-4">
						{/* Stylized preview */}
						<div className="relative mt-8 h-[200px] w-[200px]">
							<div className="absolute -inset-3 rounded-full border-[10px] border-[#FF2F00] opacity-80 blur-[30px]" />
							<div className="absolute -inset-1.5 rounded-full border-[6px] border-[#FF8400] opacity-90 blur-[15px]" />
							<div className="relative h-full w-full overflow-hidden rounded-full bg-[#212121] flex items-center justify-center">
								<span className="text-4xl">💡</span>
							</div>
						</div>

						{/* Congrats text */}
						<div className="text-center">
							<h1 className="font-display text-white text-[40px] leading-[1.05] break-words">
								Congrats!
							</h1>
							<p className="mt-2 font-display text-white text-[20px] leading-snug">
								Your idea has been shared!
							</p>
						</div>

						{/* Go to idea button */}
						<button
							type="button"
							onClick={handleGoToIdea}
							className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[100px] bg-gradient-to-r from-[#FF8400] to-[#FF2F00] px-6 text-white font-sans text-[16px] leading-none tracking-[-0.03em]"
						>
							<ScanEye size={24} strokeWidth={2} />
							<span>See your idea</span>
						</button>
					</div>
				)}
			</main>
		</div>
	);
}

export default function AddIdeaPage() {
	return (
		<Suspense fallback={null}>
			<AddIdeaPageInner />
		</Suspense>
	);
}
