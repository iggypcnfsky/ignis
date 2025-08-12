import React from "react";

export type LogoSymbolProps = {
  size?: number; // width in px; height derived from aspect ratio
  color?: string; // CSS color; defaults to currentColor
  className?: string;
  strokeWidth?: number;
  title?: string;
};

const ASPECT_RATIO = 41 / 29; // height / width from the original SVG

export default function LogoSymbol({
  size = 32,
  color = "currentColor",
  className,
  strokeWidth = 4.41459,
  title = "Ignis logo",
}: LogoSymbolProps) {
  const width = size;
  const height = Math.round(size * ASPECT_RATIO);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
      style={{ color }}
    >
      <title>{title}</title>
      <path
        d="M26 21.0197L3 34.2987"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M26 34.2987L3 21.0196"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.32617 2.66426L10.4168 14.1988"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M21.7183 2.66409L18.6276 14.1987"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}


