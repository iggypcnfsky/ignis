"use client";

import AddProblemCapture from "@/components/AddProblemCapture";
import { useRouter } from "next/navigation";

export default function AddProblemPage() {
  const router = useRouter();
  return (
    <div className="h-dvh w-full bg-black">
      <AddProblemCapture
        autoOpen
        hideTrigger
        onClose={() => router.push("/")}
        onViewProblem={(id) => router.push(`/problems/${id}`)}
      />
    </div>
  );
}


