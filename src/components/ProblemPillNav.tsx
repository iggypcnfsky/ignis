"use client";

import Link from "next/link";
import { FileText, Lightbulb, Users, Share2, MessageCircle } from "lucide-react";

type PillKey = "problem" | "ideas" | "meet" | "share" | "chat";

export default function ProblemPillNav({
  problemId,
  active = "problem",
  className,
}: {
  problemId: string;
  active?: PillKey;
  className?: string;
}) {
  const basePath = `/problems/${problemId}`;

  const pills: { key: PillKey; label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { key: "problem", label: "Problem", href: `${basePath}`, icon: FileText },
    { key: "ideas", label: "Ideas", href: `${basePath}/ideas`, icon: Lightbulb },
    { key: "meet", label: "Meet", href: `${basePath}/meetups`, icon: Users },
    { key: "share", label: "Share", href: `${basePath}/share`, icon: Share2 },
    { key: "chat", label: "Chat", href: `${basePath}/chat`, icon: MessageCircle },
  ];

  return (
    <nav className={"flex items-center gap-1.5 " + (className ?? "")}> 
      {pills.map(({ key, label, href, icon: Icon }) => {
        const isActive = key === active;
        return (
          <Link
            key={key}
            href={href}
            className={
              "rounded-full text-[12px] leading-[1.17] font-display " +
              (isActive
                ? "bg-[#FF8400] text-white px-[15px] h-10 inline-flex items-center justify-center gap-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                : "bg-[rgba(217,217,217,0.2)] text-[rgba(199,199,199,0.8)] px-[18px] h-10 inline-flex items-center justify-center gap-1.5 backdrop-blur-[100px]")
            }
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={14} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}


