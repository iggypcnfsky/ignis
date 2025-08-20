"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import LogoSymbol from "@/components/Logo";
import { ChevronLeft, ArrowRight, Calendar, Clock, Users, MapPin, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { demoProblems } from "@/lib/demoProblems";
import { demoIdeas, type Idea } from "@/lib/demoIdeas";

type Step = "description" | "ideas" | "datetime" | "review" | "congrats";

export default function AddMeetupPage() {
  const router = useRouter();
  const params = useParams<{ problemId: string }>();
  const problemId = Array.isArray(params?.problemId)
    ? params?.problemId[0]
    : params?.problemId;
  const currentProblem = demoProblems.find(p => p.id === problemId);

  const [step, setStep] = useState<Step>("description");
  const [meetupDescription, setMeetupDescription] = useState("");
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);
  // Set default date to 1 week from now
  const getDefaultDate = () => {
    const today = new Date();
    const oneWeekFromNow = new Date(today);
    oneWeekFromNow.setDate(today.getDate() + 7);
    return oneWeekFromNow.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const [meetupDate, setMeetupDate] = useState(getDefaultDate());
  const [meetupTime, setMeetupTime] = useState("17:00");
  const [meetupLocation, setMeetupLocation] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [locationType, setLocationType] = useState<"offline" | "online">("offline");
  const [onlineLink, setOnlineLink] = useState("");

  // Get ideas related to current problem
  const relatedIdeas = demoIdeas.filter(idea => idea.problemId === problemId);

  const toggleIdeaSelection = useCallback((ideaId: string) => {
    setSelectedIdeas(prev =>
      prev.includes(ideaId)
        ? prev.filter(id => id !== ideaId)
        : [...prev, ideaId]
    );
  }, []);

  const handleContinue = () => {
    console.log("[debug] handleContinue called - current step:", step);
    console.log("[debug] Current state:", {
      meetupDescription: meetupDescription.trim(),
      selectedIdeas,
      meetupDate,
      meetupTime,
      locationType,
      meetupLocation,
      onlineLink,
      whatsappNumber
    });

    if (step === "description" && meetupDescription.trim()) {
      console.log("[debug] Moving from description to ideas");
      setStep("ideas");
    } else if (step === "ideas") {
      console.log("[debug] Moving from ideas to datetime");
      setStep("datetime");
    } else if (step === "datetime" && meetupDate && meetupTime) {
      console.log("[debug] Moving from datetime to review");
      setStep("review");
    } else if (step === "review") {
      // Submit meetup
      console.log("[submit-placeholder] Add meetup:", {
        problemId,
        description: meetupDescription,
        selectedIdeas,
        date: meetupDate,
        time: meetupTime,
        location: locationType === "offline" ? meetupLocation : onlineLink,
        locationType,
        whatsapp: whatsappNumber
      });
      setStep("congrats");
    } else {
      console.log("[debug] Cannot continue - validation failed");
    }
  };

  const handleBack = () => {
    if (step === "ideas") {
      setStep("description");
    } else if (step === "datetime") {
      setStep("ideas");
    } else if (step === "review") {
      setStep("datetime");
    }
  };

  const handleSkip = () => {
    setStep("datetime");
  };

  const handleGoToMeetup = () => {
    router.push(`/problems/${problemId}/meetups`);
  };

  const canContinue = () => {
    switch (step) {
      case "description":
        const hasDescription = meetupDescription.trim().length > 0;
        console.log("[debug] Step description - hasDescription:", hasDescription);
        return hasDescription;
      case "ideas":
        console.log("[debug] Step ideas - always true (optional)");
        return true; // Ideas are optional
      case "datetime":
        const hasDate = meetupDate && meetupDate.trim() !== "";
        const hasTime = meetupTime && meetupTime.trim() !== "";
        console.log("[debug] Step datetime - hasDate:", hasDate, "hasTime:", hasTime, "meetupDate:", meetupDate, "meetupTime:", meetupTime);
        return hasDate && hasTime;
      case "review":
        console.log("[debug] Step review - always true");
        return true; // Always allow from review step
      default:
        console.log("[debug] Step default - returning false");
        return false;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "description":
        return "What's the meetup about?";
      case "ideas":
        return "Which ideas to discuss?";
      case "datetime":
        return "When should we meet?";
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case "description":
        return "Describe the purpose and agenda of your meetup";
      case "ideas":
        return "Select ideas to focus on (optional)";
      case "datetime":
        return "Pick a date and time that works for everyone";
      default:
        return "";
    }
  };

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
        <div className="relative mx-auto flex max-w-2xl items-center justify-center">
          <button
            type="button"
            onClick={() => router.push(`/problems/${problemId}/meetups`)}
            aria-label="Close meetup creation"
            className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(36,36,36,0.3)] backdrop-blur-[100px]"
          >
            <X size={20} className="text-white" strokeWidth={1.7} />
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

      <main className="mx-auto h-full w-full px-4 pt-[88px] pb-[120px] sm:px-6 max-w-2xl">
        {step === "congrats" ? (
          /* Congrats Screen */
          <div className="flex flex-col items-center gap-6 px-4">
            {/* Stylized preview */}
            <div className="relative mt-8 h-[200px] w-[200px]">
              <div className="absolute -inset-3 rounded-full border-[10px] border-[#FF2F00] opacity-80 blur-[30px]" />
              <div className="absolute -inset-1.5 rounded-full border-[6px] border-[#FF8400] opacity-90 blur-[15px]" />
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#212121] flex items-center justify-center">
                <span className="text-4xl">📅</span>
              </div>
            </div>

            {/* Congrats text */}
            <div className="text-center">
              <h1 className="font-display text-white text-[40px] leading-[1.05] break-words">
                Congrats!
              </h1>
              <p className="mt-2 font-display text-white text-[20px] leading-snug">
                Your meetup has been created!
              </p>
            </div>

            {/* Go to meetup button */}
            <button
              type="button"
              onClick={handleGoToMeetup}
              className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[100px] bg-gradient-to-r from-[#FF8400] to-[#FF2F00] px-6 text-white font-sans text-[16px] leading-none tracking-[-0.03em]"
            >
              <Calendar size={24} strokeWidth={2} />
              <span>See your meetup</span>
            </button>
          </div>
        ) : (
          /* Multi-step form */
          <div className="flex flex-col gap-6">
            {/* Step indicator */}
            <div className="text-left">
              <span className="font-display text-[16px] text-white">
                Step {step === "description" ? "1" : step === "ideas" ? "2" : step === "datetime" ? "3" : "4"}
              </span>
            </div>

            {/* Header */}
            <div className="px-1">
              <h1 className="font-display text-[30px] leading-none text-white">
                {getStepTitle()}
              </h1>
              <p className="mt-2 font-display text-[16px] text-white/80">
                {getStepSubtitle()}
              </p>
            </div>

            {/* Problem Context */}
            {currentProblem && (
              <div className="rounded-[20px] bg-[#212121] p-4">
                <p className="text-[14px] leading-[1.3] font-sans text-[rgba(255,255,255,0.8)]">
                  for &ldquo;{currentProblem.title}&rdquo;
                </p>
              </div>
            )}

            {/* Step Content */}
            {step === "description" && (
              <div className="rounded-[30px] bg-[#212121] p-6">
                <textarea
                  value={meetupDescription}
                  onChange={(e) => setMeetupDescription(e.target.value)}
                  placeholder="Describe what this meetup will be about, what topics will be discussed, and what participants can expect..."
                  className="min-h-[200px] w-full resize-none bg-transparent text-white placeholder-white/50 outline-none font-sans text-[16px] leading-snug"
                />
              </div>
            )}

            {step === "ideas" && (
              <div className="space-y-4">
                <div className="rounded-[30px] bg-[#212121] p-6">
                  <div className="mb-6">
                    <p className="text-[14px] text-white/60 mb-2">
                      {selectedIdeas.length} idea{selectedIdeas.length !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-[14px] text-white/80">
                      Select specific ideas to focus your meetup discussion. This helps participants know what topics will be covered and makes your meetup more targeted and productive.
                    </p>
                  </div>
                  {relatedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {relatedIdeas.map((idea) => (
                        <div
                          key={idea.id}
                          className={`p-4 rounded-[20px] border-2 transition-colors cursor-pointer ${
                            selectedIdeas.includes(idea.id)
                              ? 'border-[#FF8400] bg-[#FF8400]/10'
                              : 'border-[#333] bg-transparent'
                          }`}
                          onClick={() => toggleIdeaSelection(idea.id)}
                        >
                          <h3 className="font-display text-[16px] text-white mb-2">
                            {idea.title}
                          </h3>
                          <p className="text-[14px] text-white/70 line-clamp-2">
                            {idea.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex items-center gap-1">
                              <ArrowRight size={12} className="text-white/50" />
                              <span className="text-[12px] text-white/50">
                                {idea.votesCount} votes
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[14px] text-white/50 text-center py-8">
                      No ideas available for this problem yet.
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full h-[50px] border-2 border-[#444] bg-[#212121] rounded-[100px] flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
                >
                  <span className="text-[16px] font-sans text-white">Skip for now</span>
                </button>
              </div>
            )}

            {step === "datetime" && (
              <div className="space-y-6">
                <div className="rounded-[30px] bg-[#212121] p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[16px] font-display text-white mb-2">
                        Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                        <input
                          type="date"
                          value={meetupDate}
                          onChange={(e) => setMeetupDate(e.target.value)}
                          className="w-full h-[50px] bg-[#333] border border-[#444] rounded-[20px] pl-12 pr-4 text-white placeholder-white/50 font-sans text-[16px] outline-none focus:border-[#FF8400]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[16px] font-display text-white mb-2">
                        Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                        <input
                          type="time"
                          value={meetupTime}
                          onChange={(e) => setMeetupTime(e.target.value)}
                          className="w-full h-[50px] bg-[#333] border border-[#444] rounded-[20px] pl-12 pr-4 text-white placeholder-white/50 font-sans text-[16px] outline-none focus:border-[#FF8400]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[16px] font-display text-white mb-2">
                        Location Type
                      </label>
                      <div className="flex gap-2 p-1 bg-[#333] rounded-[20px] border border-[#444]">
                        <button
                          type="button"
                          onClick={() => setLocationType("offline")}
                          className={`flex-1 h-[44px] rounded-[16px] font-sans text-[14px] font-medium transition-colors ${
                            locationType === "offline"
                              ? "bg-[#FF8400] text-white"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          Offline
                        </button>
                        <button
                          type="button"
                          onClick={() => setLocationType("online")}
                          className={`flex-1 h-[44px] rounded-[16px] font-sans text-[14px] font-medium transition-colors ${
                            locationType === "online"
                              ? "bg-[#FF8400] text-white"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          Online
                        </button>
                      </div>
                    </div>

                    {locationType === "offline" && (
                      <div>
                        <label className="block text-[16px] font-display text-white mb-2">
                          Location (optional)
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                          <input
                            type="text"
                            value={meetupLocation}
                            onChange={(e) => setMeetupLocation(e.target.value)}
                            placeholder="e.g., Central Park, Community Center"
                            className="w-full h-[50px] bg-[#333] border border-[#444] rounded-[20px] pl-12 pr-4 text-white placeholder-white/50 font-sans text-[16px] outline-none focus:border-[#FF8400]"
                          />
                        </div>
                      </div>
                    )}

                    {locationType === "online" && (
                      <div>
                        <label className="block text-[16px] font-display text-white mb-2">
                          Meeting Link (optional)
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                          <input
                            type="url"
                            value={onlineLink}
                            onChange={(e) => setOnlineLink(e.target.value)}
                            placeholder="e.g., https://meet.google.com/abc-123"
                            className="w-full h-[50px] bg-[#333] border border-[#444] rounded-[20px] pl-12 pr-4 text-white placeholder-white/50 font-sans text-[16px] outline-none focus:border-[#FF8400]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[16px] font-display text-white mb-2">
                        WhatsApp for communication (optional)
                      </label>
                      <div className="relative">
                        <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                        <input
                          type="tel"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="e.g., +1234567890"
                          className="w-full h-[50px] bg-[#333] border border-[#444] rounded-[20px] pl-12 pr-4 text-white placeholder-white/50 font-sans text-[16px] outline-none focus:border-[#FF8400]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-6">
                <div className="rounded-[30px] bg-[#212121] p-6">
                  <h2 className="text-[20px] font-display text-white mb-6">Review Your Meetup</h2>

                  <div className="space-y-4">
                    <div className="border-b border-[#333] pb-4">
                      <h3 className="text-[16px] font-display text-[#FF8400] mb-2">Description</h3>
                      <p className="text-[14px] text-white/80">{meetupDescription}</p>
                    </div>

                    {selectedIdeas.length > 0 && (
                      <div className="border-b border-[#333] pb-4">
                        <h3 className="text-[16px] font-display text-[#FF8400] mb-2">Selected Ideas ({selectedIdeas.length})</h3>
                        <div className="space-y-2">
                          {selectedIdeas.map((ideaId) => {
                            const idea = relatedIdeas.find(i => i.id === ideaId);
                            return idea ? (
                              <div key={ideaId} className="text-[14px] text-white/80">
                                • {idea.title}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    <div className="border-b border-[#333] pb-4">
                      <h3 className="text-[16px] font-display text-[#FF8400] mb-2">Date & Time</h3>
                      <p className="text-[14px] text-white/80">
                        {new Date(meetupDate).toLocaleDateString()} at {meetupTime}
                      </p>
                    </div>

                    <div className="border-b border-[#333] pb-4">
                      <h3 className="text-[16px] font-display text-[#FF8400] mb-2">Location</h3>
                      <p className="text-[14px] text-white/80">
                        {locationType === "offline"
                          ? (meetupLocation || "No location specified")
                          : (onlineLink || "No meeting link provided")
                        }
                      </p>
                      <p className="text-[12px] text-white/60 capitalize">({locationType})</p>
                    </div>

                    {whatsappNumber && (
                      <div className="border-b border-[#333] pb-4">
                        <h3 className="text-[16px] font-display text-[#FF8400] mb-2">WhatsApp</h3>
                        <p className="text-[14px] text-white/80">{whatsappNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1">
                {(step === "ideas" || step === "datetime" || step === "review") && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex h-[60px] items-center justify-center gap-2 rounded-[100px] border-2 border-[#444] bg-[#212121] px-6 text-white font-sans text-[16px] leading-none hover:bg-[#333] transition-colors"
                  >
                    <ChevronLeft size={20} strokeWidth={2} />
                    <span>Back</span>
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleContinue}
                disabled={!canContinue()}
                className="flex h-[60px] min-w-[180px] items-center justify-center gap-2 rounded-[100px] bg-gradient-to-r from-[#FF8400] to-[#FF2F00] px-6 text-white font-sans text-[16px] leading-none tracking-[-0.03em] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight size={24} strokeWidth={2} />
                <span>{step === "datetime" ? "Review" : step === "review" ? "Create Meetup" : "Continue"}</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
