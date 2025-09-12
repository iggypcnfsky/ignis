"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoSymbol from "@/components/Logo";

export default function DemoSelector() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans min-h-dvh w-full bg-black text-white flex flex-col items-center justify-center px-6 pt-8 md:pt-0">
      {/* Logo */}
      <div 
        className={`mb-8 md:mb-16 transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
        style={{ transitionDelay: '50ms' }}
      >
        <LogoSymbol size={60} color="white" className="md:hidden" />
        <LogoSymbol size={80} color="white" className="hidden md:block" />
      </div>

      {/* Title */}
      <h1 
        className={`text-xl md:text-2xl font-medium text-center mb-6 md:mb-12 max-w-md transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '100ms' }}
      >
        Choose your IGNIS experience
      </h1>

      {/* Demo Options */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <Link
          href="/demo/business"
          className="block w-full"
        >
          <button 
            className={`w-full rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-200 text-center transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '150ms', 
              transitionDuration: '350ms',
              border: 'none',
              background: 'none'
            }}
          >
            {/* Large Image */}
            <div 
              className="w-full h-[200px] md:h-[300px] relative overflow-hidden rounded-t-2xl flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #5a5a5a 0%, #878787 100%)'
              }}
            >
              <div className="relative w-[80%] h-[80%] md:w-[92%] md:h-[92%]">
                <Image 
                  src="/demo-icons/business-icon.png" 
                  alt="Business" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80vw, 300px"
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div 
              className="p-4 md:p-8 rounded-b-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #5a5a5a 0%, #878787 100%)'
              }}
            >
              <h3 className="text-lg md:text-2xl font-semibold text-black mb-2 md:mb-3" style={{ letterSpacing: '-0.03em' }}>Ignis for Business</h3>
              <p className="text-xs md:text-sm text-black/80 leading-relaxed" style={{ letterSpacing: '-0.03em' }}>Empower employees to proactively solve workplace problems and improve culture through collaborative deliberation</p>
            </div>
          </button>
        </Link>

        <Link
          href="/demo/schools"
          className="block w-full"
        >
          <button 
            className={`w-full rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-200 text-center transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '200ms', 
              transitionDuration: '350ms',
              border: 'none',
              background: 'none'
            }}
          >
            {/* Large Image */}
            <div 
              className="w-full h-[200px] md:h-[300px] relative overflow-hidden rounded-t-2xl flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #cc6600 0%, #FF8400 100%)'
              }}
            >
              <div className="relative w-[80%] h-[80%] md:w-[92%] md:h-[92%]">
                <Image 
                  src="/demo-icons/school-icon.png" 
                  alt="Schools" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80vw, 300px"
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div 
              className="p-4 md:p-8 rounded-b-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #cc6600 0%, #FF8400 100%)'
              }}
            >
              <h3 className="text-lg md:text-2xl font-semibold text-black mb-2 md:mb-3" style={{ letterSpacing: '-0.03em' }}>Ignis for Schools</h3>
              <p className="text-xs md:text-sm text-black/80 leading-relaxed" style={{ letterSpacing: '-0.03em' }}>Teach students proactive civic engagement and collaborative problem-solving for their school community</p>
            </div>
          </button>
        </Link>

        <Link
          href="/demo/cities"
          className="block w-full"
        >
          <button 
            className={`w-full rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-200 text-center transform ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transitionDelay: '250ms', 
              transitionDuration: '350ms',
              border: 'none',
              background: 'none'
            }}
          >
            {/* Large Image */}
            <div 
              className="w-full h-[200px] md:h-[300px] relative overflow-hidden rounded-t-2xl flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #357a3b 0%, #44A34E 100%)'
              }}
            >
              <div className="relative w-[80%] h-[80%] md:w-[92%] md:h-[92%]">
                <Image 
                  src="/demo-icons/city-icon.png" 
                  alt="Cities" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80vw, 300px"
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div 
              className="p-4 md:p-8 rounded-b-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #357a3b 0%, #44A34E 100%)'
              }}
            >
              <h3 className="text-lg md:text-2xl font-semibold text-black mb-2 md:mb-3" style={{ letterSpacing: '-0.03em' }}>Ignis for Cities</h3>
              <p className="text-xs md:text-sm text-black/80 leading-relaxed" style={{ letterSpacing: '-0.03em' }}>Enable proactive citizens to identify and solve community problems through deliberative democracy</p>
            </div>
          </button>
        </Link>
      </div>

      {/* Footer */}
      <div 
        className={`mt-8 md:mt-16 text-center transform transition-all duration-[350ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        <p className="text-xs text-white/40">
          Select a demo to explore how IGNIS works in different contexts
        </p>
      </div>
    </div>
  );
}
