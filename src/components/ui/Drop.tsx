/** Drop outline in a 100 x 124 box. Shared by the logo and the hero water-fill clip. */
export const DROP_PATH = "M50 4C50 4 10 52 10 82a40 40 0 0 0 80 0C90 52 50 4 50 4Z";

type Props = {
  /** Rendered width in px. Height follows the viewBox. */
  size?: number;
  /** Decorative drops are hidden from assistive tech. Give the logo a title instead. */
  title?: string;
  className?: string;
  /** Draw "top up" inside the drop. Turn off where the drop sits next to a "Top Up" wordmark. */
  showText?: boolean;
};

/**
 * Top Up mark, recreated as inline SVG. PLACEHOLDER until the client supplies the vector logo
 * (see docs/open-questions.md). Swap the paths here and every use updates.
 */
export default function Drop({ size = 48, title, className, showText = true }: Props) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 100 124"
      width={size}
      height={(size * 124) / 100}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      className={className}
      focusable="false"
    >
      <path d={DROP_PATH} fill="var(--drop)" />
      {showText ? (
        <text
          x="50"
          y="88"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill="var(--navy)"
          style={{ fontFamily: "var(--ff-display)" }}
        >
          top up
        </text>
      ) : null}
    </svg>
  );
}
