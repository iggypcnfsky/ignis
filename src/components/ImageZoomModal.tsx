"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, RotateCcw } from "lucide-react";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function ImageZoomModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt
}: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * delta, 0.5), 3);
    setScale(newScale);
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();

    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close zoom view"
      >
        <X size={24} />
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setScale(prev => Math.max(prev - 0.25, 0.5));
          }}
          className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Zoom out"
        >
          <Minus size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setScale(prev => Math.min(prev + 0.25, 3));
          }}
          className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Zoom in"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Reset zoom and position"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Image container */}
      <div
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        <p>Scroll to zoom • Drag to pan • Tap outside to close</p>
      </div>
    </div>
  );
}
