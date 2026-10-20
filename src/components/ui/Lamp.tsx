import { DROP_PATH } from "./Drop";

/**
 * Hanging cane lamp with a blue drop inside. Decorative: the step text carries the meaning.
 * Default markup is the lit state. The parent toggles [data-lamp-glow] and [data-lamp-amber] by opacity.
 */
export default function Lamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true" focusable="false">
      {/* Cap and hanging ring */}
      <circle cx="60" cy="5" r="4" fill="none" stroke="var(--navy)" strokeWidth="2" />
      <path d="M38 28Q60 6 82 28Z" fill="var(--navy)" />
      {/* Body */}
      <path d="M36 28C20 52 22 102 40 126H80C98 102 100 52 84 28Z" fill="var(--sand)" />
      {/* Light */}
      <circle data-lamp-glow cx="60" cy="78" r="30" fill="var(--amber)" opacity="0.45" />
      <g transform="translate(43 57) scale(0.34)">
        <path d={DROP_PATH} fill="var(--drop)" />
        <path data-lamp-amber d={DROP_PATH} fill="var(--amber)" />
      </g>
      {/* Cane weave: horizontal bands and curved ribs */}
      <g fill="none" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M31 48C48 54 72 54 89 48" />
        <path d="M27 68C46 75 74 75 93 68" />
        <path d="M27 90C46 97 74 97 93 90" />
        <path d="M33 110C50 116 70 116 87 110" />
        <path d="M60 30V124" />
        <path d="M48 29C40 60 40 96 46 125" />
        <path d="M72 29C80 60 80 96 74 125" />
        <path d="M36 28C20 52 22 102 40 126H80C98 102 100 52 84 28Z" strokeWidth="2.4" strokeLinejoin="round" />
      </g>
      {/* Base and tassel */}
      <path d="M60 126V140" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="144" r="4" fill="var(--navy)" />
    </svg>
  );
}
