"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ProblemPillNav from "@/components/ProblemPillNav";
import SharedHeader from "@/components/SharedHeader";
import { getDemoProblems, type DemoContext } from "@/lib/demoContext";
import { Send } from "lucide-react";

const CONTEXT: DemoContext = 'cities';

type ChatMessage = {
	 id: string;
	 role: "self" | "other";
	 text: string;
};

export default function CitiesProblemChatPage() {
	const params = useParams<{ problemId: string }>();
	const problemId = Array.isArray(params?.problemId) ? params?.problemId[0] : params?.problemId;
	
	const demoProblems = getDemoProblems(CONTEXT);
	const problem = useMemo(() => (
		demoProblems.find((p) => p.id === problemId) ?? demoProblems[0]
	), [problemId, demoProblems]);

	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			id: "m1",
			role: "other",
			text:
				"Hey neighbors! Just saw the broken bench by the pond — looks dangerous 😬 Anyone know if it's been reported already?",
		},
		{
			id: "m2",
			role: "other",
			text: "Yeah, that one's been like that for weeks. I emailed parks & rec, no reply yet.",
		},
		{
			id: "m3",
			role: "other",
			text: "Maybe we can fix it ourselves? I've got tools. Just not sure if that's allowed 🤔",
		},
		{
			id: "m4",
			role: "self",
			text:
				"Great idea! Also shared the link in the neighborhood FB group. Hoping more folks chime in.",
		},
	]);

	const [draft, setDraft] = useState("");
	const [visibleMessages, setVisibleMessages] = useState<Set<string>>(new Set());
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [messages.length]);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const messageId = entry.target.getAttribute('data-message-id');
						if (messageId) {
							setVisibleMessages(prev => new Set([...prev, messageId]));
						}
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '50px'
			}
		);

		// Show initially visible messages after a short delay
		const timeout = setTimeout(() => {
			const initiallyVisible = new Set(messages.map(m => m.id));
			setVisibleMessages(initiallyVisible);
		}, 100);

		return () => {
			clearTimeout(timeout);
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [messages]);

	const messageRef = (element: HTMLDivElement | null, messageId: string) => {
		if (element && observerRef.current) {
			element.setAttribute('data-message-id', messageId);
			observerRef.current.observe(element);
		}
	};

	function handleSend() {
		const trimmed = draft.trim();
		if (!trimmed) return;
		const newMessageId = `m-${Date.now()}`;
		setMessages((prev) => [
			...prev,
			{ id: newMessageId, role: "self", text: trimmed },
		]);
		setDraft("");
		
		// Immediately show the new message as visible with a slight delay for animation
		setTimeout(() => {
			setVisibleMessages(prev => new Set([...prev, newMessageId]));
		}, 50);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	return (
		<div className="flex flex-col h-dvh w-full bg-[#141414] text-white">
			{/* Shared Header */}
			<SharedHeader mode="back" backHref={`/demo/cities/mobile/problems/${problem.id}`} />
			
			{/* Navigation */}
			<div className="relative z-10 px-3 pt-20 pb-2 flex-shrink-0">
				<ProblemPillNav problemId={problem.id} active="chat" context="cities" />
			</div>

			{/* Chat content - scrollable */}
			<main className="flex-1 overflow-y-auto px-3">
				<div className="space-y-3 pb-4">
					{messages.map((m, index) => {
						// Cycle through colors for other users' messages
						const colors = ["#FF2F00", "#FF8400", "#FFD900"]; // red, orange, yellow
						const borderColor = m.role === "other" ? colors[index % colors.length] : undefined;
						const isVisible = visibleMessages.has(m.id);
						
						return (
							<div 
								key={m.id} 
								ref={(el) => messageRef(el, m.id)}
								className={`flex ${m.role === "self" ? "justify-end" : "justify-start"} transform transition-all duration-500 ease-out ${
									isVisible 
										? 'opacity-100 translate-y-0' 
										: 'opacity-0 translate-y-4'
								}`}
								style={{ transitionDelay: `${index * 50}ms` }}
							>
								<div
									className={
										"inline-block w-fit max-w-[75%] rounded-[20px] px-4 py-3 text-[16px] leading-[1.125] " +
										(m.role === "self"
											? "bg-[#353535] text-white"
											: "bg-[#212121] text-white border-2")
									}
									style={
										m.role === "other" && borderColor
											? {
													borderColor: borderColor,
											  }
											: undefined
									}
								>
									{m.text}
								</div>
							</div>
						);
					})}
					<div ref={bottomRef} />
				</div>
			</main>

			{/* Sticky input bar */}
			<div className="flex-shrink-0 px-3 pt-3 pb-4 bg-[#141414]">
				<div className="rounded-[30px] bg-[#212121] px-3 py-2 flex items-center gap-2">
					<input
						type="text"
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Write a message"
						className="flex-1 bg-transparent outline-none border-0 text-[16px] placeholder:text-white/40"
						aria-label="Message input"
					/>
					<button
						type="button"
						onClick={handleSend}
						aria-label="Send message"
						className="inline-flex items-center justify-center w-10 h-10 rounded-full"
						style={{ background: "linear-gradient(180deg, #FF8400 0%, #FF2F00 100%)" }}
					>
						<Send size={18} className="text-white" />
					</button>
				</div>
				{/* Safe-area inset for iOS */}
				<div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
			</div>
		</div>
	);
}
