// Two layered sine waves, each drawn 200% wide so that translating by -50% loops seamlessly.
// Presentational only: the parent animates the layers via [data-wave].

const W = 400; // viewBox width = 2 container widths
const H = 24;
const PERIOD = 100; // two periods per container width, so -50% x is exactly two whole periods

function wavePath(amp: number, phase: number): string {
  const mid = H / 2;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 5) {
    const y = mid + Math.sin(((x + phase) / PERIOD) * Math.PI * 2) * amp;
    pts.push(`${x} ${y.toFixed(2)}`);
  }
  return `M${pts.join("L")}L${W} ${H}L0 ${H}Z`;
}

const FRONT = wavePath(5, 0);
const BACK = wavePath(4, 35);

type Props = {
  className?: string;
};

export default function Wave({ className = "" }: Props) {
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      {/* Back layer is dropped on small screens: fewer layers on mobile. */}
      <svg
        data-wave="2"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-0 hidden h-full w-[200%] opacity-60 sm:block"
        focusable="false"
      >
        <path d={BACK} fill="var(--drop)" />
      </svg>
      <svg
        data-wave="1"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-0 h-full w-[200%]"
        focusable="false"
      >
        <path d={FRONT} fill="var(--drop)" />
      </svg>
    </div>
  );
}
