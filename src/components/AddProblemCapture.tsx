"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Upload, Scan, X, ArrowRight, RefreshCw, ChevronLeft, Trash2, ScanEye } from "lucide-react";
import LogoSymbol from "@/components/Logo";

type CaptureKind = "photo"; // Extend later to include "video"

export default function AddProblemCapture({
  autoOpen = false,
  hideTrigger = false,
  onClose,
  onViewProblem,
}: {
  autoOpen?: boolean;
  hideTrigger?: boolean;
  onClose?: () => void;
  onViewProblem?: (problemId: string) => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState<"camera" | "preview" | "description" | "congrats">("camera");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [selectedMediaUrls, setSelectedMediaUrls] = useState<string[]>([]);
  const [descriptionText, setDescriptionText] = useState("");
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const [createdProblemId, setCreatedProblemId] = useState<string | null>(null);
  const hasAutoOpenedRef = useRef(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const openCamera = useCallback(async () => {
    try {
      setErrorMessage(null);
      setIsStarting(true);
      // Ensure overlay/video mounts before we attach the stream
      setIsOpen(true);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        const videoEl = videoRef.current;
        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.srcObject = stream;
        await new Promise<void>((resolve) => {
          const onLoaded = () => {
            videoEl.removeEventListener("loadedmetadata", onLoaded);
            resolve();
          };
          videoEl.addEventListener("loadedmetadata", onLoaded);
        });
        await videoEl.play();
      }
      setStep("camera");
    } catch (err) {
      setErrorMessage("Camera access denied or unavailable.");
      setIsOpen(true); // keep overlay open so user can upload
    } finally {
      setIsStarting(false);
    }
  }, []);

  const closeOverlay = useCallback(() => {
    setIsOpen(false);
    setErrorMessage(null);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
    setSelectedMediaUrls((urls) => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });
    setDescriptionText("");
    setStep("camera");
    stopStream();
    if (onClose) onClose();
  }, [stopStream, onClose]);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, [stopStream]);

  // Auto-open camera once when used as a dedicated route
  useEffect(() => {
    if (autoOpen && !isOpen && !hasAutoOpenedRef.current) {
      hasAutoOpenedRef.current = true;
      void openCamera();
    }
  }, [autoOpen, isOpen, openCamera]);

  const handleTrigger = useCallback(() => {
    void openCamera();
  }, [openCamera]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFilesSelected = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreviewUrl(url);
    setStep("preview");
  }, []);

  const captureFrame = useCallback(
    async (kind: CaptureKind = "photo") => {
      if (kind !== "photo") return;
      const video = videoRef.current;
      if (!video) return;
      const width = video.videoWidth;
      const height = video.videoHeight;
      if (!width || !height) return;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        const url = URL.createObjectURL(blob);
        previewUrlRef.current = url;
        setPreviewUrl(url);
        // Stop camera while previewing
        stopStream();
        setStep("preview");
      }, "image/jpeg", 0.92);
    },
    [stopStream]
  );

  const handleRetake = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
    // Re-open camera if needed
    if (!streamRef.current) {
      void openCamera();
    }
    setStep("camera");
  }, [openCamera]);

  // Placeholder: background upload trigger
  const startBackgroundUpload = useCallback(async (urls: string[]) => {
    setIsUploadingBg(true);
    // eslint-disable-next-line no-console
    console.log("[upload-placeholder] start background upload for:", urls);
    await new Promise((r) => setTimeout(r, 500));
    // eslint-disable-next-line no-console
    console.log("[upload-placeholder] done");
    setIsUploadingBg(false);
  }, []);

  const handleAddDescription = useCallback(() => {
    // Move from preview to description, carry over current preview media
    setSelectedMediaUrls((prev) => {
      const list = previewUrlRef.current ? [...prev, previewUrlRef.current] : prev.slice();
      return list;
    });
    setStep("description");
    void startBackgroundUpload(previewUrlRef.current ? [previewUrlRef.current] : []);
  }, [startBackgroundUpload]);

  const descFileInputRef = useRef<HTMLInputElement | null>(null);
  const onAddMoreMedia = useCallback(() => {
    descFileInputRef.current?.click();
  }, []);
  const onMoreFilesSelected = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files ? Array.from(ev.target.files) : [];
    if (files.length === 0) return;
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setSelectedMediaUrls((prev) => [...prev, ...newUrls]);
    // eslint-disable-next-line no-console
    console.log("[add-more-placeholder] added:", newUrls);
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

  // Placeholder submit
  const submitProblemPlaceholder = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log("[submit-placeholder] Add problem:", { descriptionText, selectedMediaUrls });
    // Simulate created problem id (fallback to demo problem id for now)
    const newId = "p1";
    setCreatedProblemId(newId);
    setStep("congrats");
  }, [descriptionText, selectedMediaUrls]);

  return (
    <>
      {/* Trigger button (center plus) */}
      {!hideTrigger && (
        <button
          type="button"
          aria-label="Add problem"
          onClick={handleTrigger}
          className="absolute left-1/2 top-1/2 z-20 flex h-[49px] w-[49px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10"
        >
          <Plus size={32} className="text-white" strokeWidth={4} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Camera/preview background */
          }
          <div className="absolute inset-0">
            {/* If camera/preview image, else subtle backdrop */}
            {step === "camera" ? (
              <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
            ) : step === "preview" && previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-[#141414]" />
            )}
            {(step === "camera" || step === "preview") && (
              <div className="absolute inset-0 bg-black/30" />
            )}
          </div>

          {/* Top bar with centered logo (same position as page header) */}
          <div className="absolute left-0 right-0 top-0 z-10 pt-6 px-4 sm:px-6">
            <div className="relative mx-auto flex max-w-[380px] items-center justify-center">
              <LogoSymbol size={24} className="text-white" />
            </div>
          </div>

          {/* Bottom controls / forms */}
          <div className="absolute inset-x-0 bottom-20 z-20 px-4 sm:px-6">
            <div className="relative mx-auto w-full max-w-[380px]">
              {step === "camera" ? (
                <>
                  {/* Upload (left) */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <button
                      type="button"
                      onClick={onUploadClick}
                      className="h-[80px] w-[80px] rounded-full text-white"
                      style={{
                        backgroundImage: "linear-gradient(180deg, #2B2B2B 0%, #000000 100%)",
                      }}
                    >
                      <Upload size={28} className="mx-auto" strokeWidth={2} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      capture="environment"
                      className="hidden"
                      onChange={onFilesSelected}
                    />
                  </div>

                  {/* Capture (center) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button
                      type="button"
                      disabled={isStarting}
                      onClick={() => captureFrame("photo")}
                      className="flex h-[110px] w-[110px] items-center justify-center rounded-full"
                      style={{
                        backgroundImage: "linear-gradient(180deg, #FF8400 0%, #FF2F00 100%)",
                      }}
                    >
                      <Scan size={40} className="text-white" strokeWidth={2.2} />
                    </button>
                  </div>

                  {/* Close (right) */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <button
                      type="button"
                      onClick={closeOverlay}
                      className="h-[80px] w-[80px] rounded-full text-[#BABABA]"
                      style={{
                        backgroundImage: "linear-gradient(180deg, #2B2B2B 0%, #000000 100%)",
                      }}
                    >
                      <X size={28} className="mx-auto" strokeWidth={2} />
                    </button>
                  </div>
                </>
              ) : step === "preview" ? (
                <div className="flex flex-col gap-4">
                  {/* Continue / Add Description (gradient, DM Sans) */}
                  <button
                    type="button"
                    onClick={handleAddDescription}
                    className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[100px] text-white font-sans text-[16px] leading-none tracking-[-0.03em]"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #FF8400 0%, #FF2F00 100%)",
                    }}
                  >
                    <ArrowRight size={24} strokeWidth={2} />
                    <span>Continue</span>
                  </button>

                  {/* Retake (dark translucent with blur, DM Sans) */}
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[100px] text-white font-sans text-[16px] leading-none tracking-[-0.03em] backdrop-blur-[50px]"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.10)",
                    }}
                  >
                    <RefreshCw size={24} strokeWidth={2} />
                    <span>Retake</span>
                  </button>
                </div>
              ) : step === "description" ? (
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div className="px-1">
                    <h2 className="font-display text-[30px] leading-none text-white">What’s the problem?</h2>
                  </div>

                  {/* Description */}
                  <div className="rounded-[30px] bg-[#212121] p-4">
                    <textarea
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                      placeholder="Describe the problem..."
                      className="min-h-[140px] w-full resize-none bg-transparent text-white placeholder-white/50 outline-none font-sans text-[16px] leading-snug"
                    />
                  </div>

                  {/* Media row */}
                  <div className="flex items-center gap-3 overflow-x-auto">
                    {selectedMediaUrls.map((url, idx) => (
                      <div key={url + idx} className="relative h-[121px] w-[93px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                        <img src={url} alt={`media-${idx}`} className="h-full w-full object-cover" />
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
                      onClick={onAddMoreMedia}
                      className="relative h-[121px] w-[93px] flex-shrink-0 overflow-hidden rounded-[16px] bg-[#212121]"
                    >
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Upload size={24} className="text-white" strokeWidth={2} />
                      </div>
                    </button>
                    <input
                      ref={descFileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={onMoreFilesSelected}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="inline-flex h-10 items-center gap-1 rounded-[20px] bg-[rgba(36,36,36,0.3)] px-3 text-white backdrop-blur-[100px]"
                    >
                      <ChevronLeft size={18} strokeWidth={1.8} /> Back
                    </button>

                    <button
                      type="button"
                      onClick={submitProblemPlaceholder}
                      className="flex h-[60px] min-w-[220px] items-center justify-center gap-2 rounded-[100px] bg-gradient-to-r from-[#FF8400] to-[#FF2F00] px-5 text-white font-sans text-[16px] leading-none tracking-[-0.03em]"
                    >
                      <ArrowRight size={24} strokeWidth={2} />
                      <span>Add this problem</span>
                    </button>
                  </div>
                  {isUploadingBg && (
                    <div className="text-center text-xs text-white/60">Uploading media...</div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log("[debug] See how it looks like clicked", {
                        createdProblemId,
                        hasOnViewProblem: Boolean(onViewProblem),
                      });
                      const targetId = createdProblemId ?? "p1";
                      if (onViewProblem) {
                        // eslint-disable-next-line no-console
                        console.log("[debug] navigating via onViewProblem", { targetId });
                        onViewProblem(targetId);
                      } else {
                        // eslint-disable-next-line no-console
                        console.log("[debug] navigating via router.push", { targetId });
                        router.push(`/problems/${targetId}`);
                      }
                    }}
                    className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[100px] text-white font-sans text-[16px] leading-none tracking-[-0.03em]"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #FF8400 0%, #FF2F00 100%)",
                    }}
                  >
                    <ScanEye size={24} strokeWidth={2} />
                    <span>See how it looks like</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeOverlay}
                    className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[100px] text-white font-sans text-[14px] leading-none tracking-[-0.03em] backdrop-blur-[50px]"
                    style={{ backgroundColor: "rgba(0,0,0,0.10)" }}
                  >
                    <span>Close</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error hint */}
            {errorMessage && (
              <div className="mt-3 text-center text-sm text-white/80">
                {errorMessage} You can still upload from your device.
              </div>
            )}
          </div>

          {/* Congrats content */}
          {step === "congrats" && (
            <div className="absolute inset-x-0 top-[88px] bottom-[120px] z-10 px-4 sm:px-6 pointer-events-none">
              <div className="mx-auto flex h-full w-full max-w-[380px] flex-col items-center justify-start gap-6">
                {/* Stylized preview */}
                <div className="relative mt-2 h-[316px] w-[316px]">
                  <div className="absolute -inset-4 rounded-full border-[15px] border-[#FF2F00] opacity-80 blur-[50px]" />
                  <div className="absolute -inset-2 rounded-full border-[8px] border-[#FF8400] opacity-90 blur-[20px]" />
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[#D9D9D9]">
                    <img
                      src={previewUrl || selectedMediaUrls[0]}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Texts */}
                <div className="px-2 text-center">
                  <h1 className="font-display text-white text-[40px] leading-[1.05] text-center break-words">
                    Congrats!
                    <br />
                    You’ve added new problem!
                  </h1>
                </div>
                <p className="px-4 text-center font-display text-white text-[20px] leading-snug">
                  Thanks to people like you we can make this world better!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}


