import Drop from "@/components/ui/Drop";
import { copy } from "@/content/copy";

// Skeleton only. Contact details, the privacy note and final links arrive in Phase 5.
export default function Footer() {
  return (
    <footer className="border-t border-navy/15 py-12">
      <div className="container-page grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="max-w-xl">
          <div className="flex items-center">
            <Drop size={36} title="Top Up" />
            <span className="ml-2 whitespace-nowrap font-display text-xl font-bold">Top Up</span>
          </div>
          <p className="mt-4">{copy.closing}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-1">
            {[
              ["#find", copy.hero.ctaSecondary],
              ["#join", copy.hero.ctaPrimary],
              ["#sources", "Sources"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="container-page mt-8 text-[0.95em]">Built with care in India</p>
    </footer>
  );
}
