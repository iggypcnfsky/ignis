"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoSymbol from "@/components/Logo";
import { Monitor, Smartphone } from "lucide-react";

export default function SchoolsPlatformSelector() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans min-h-dvh w-full bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div 
        className={`mb-8 transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
        style={{ transitionDelay: '50ms' }}
      >
        <LogoSymbol size={60} color="white" />
      </div>

      {/* Title */}
      <h1 
        className={`text-xl font-medium text-center mb-2 max-w-md transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '100ms' }}
      >
        Ignis for Schools
      </h1>

      {/* Subtitle */}
      <p 
        className={`text-sm text-white/60 text-center mb-12 max-w-md transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '130ms' }}
      >
        Wybierz platformę
      </p>

      {/* Platform Options */}
      <div className="w-full max-w-sm space-y-4">
        <Link
          href="/demo/schools/mobile"
          className="block w-full"
        >
          <button 
            className={`w-full py-6 px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 text-left transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '160ms', transitionDuration: '350ms' }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-xl bg-white/10">
                <Smartphone size={24} className="text-white" />
              </div>
              <div className="text-lg font-medium">Aplikacja Mobilna</div>
            </div>
            <div className="text-sm text-white/60 ml-12">
              Interfejs dla uczniów do zgłaszania problemów szkolnych i proponowania rozwiązań
            </div>
          </button>
        </Link>

        <Link
          href="/demo/schools/desktop"
          className="block w-full"
        >
          <button 
            className={`w-full py-6 px-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 text-left transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '190ms', transitionDuration: '350ms' }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-xl bg-white/10">
                <Monitor size={24} className="text-white" />
              </div>
              <div className="text-lg font-medium">Panel Administracyjny</div>
            </div>
            <div className="text-sm text-white/60 ml-12">
              Interfejs dla dyrekcji do śledzenia aktywności uczniów i wdrażania rozwiązań
            </div>
          </button>
        </Link>
      </div>

      {/* Back Link */}
      <div 
        className={`mt-12 text-center transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '220ms' }}
      >
        <Link 
          href="/demo-selector"
          className="text-xs text-white/40 hover:text-white/60 transition-colors"
        >
          ← Powrót do wyboru demo
        </Link>
      </div>
    </div>
  );
}
