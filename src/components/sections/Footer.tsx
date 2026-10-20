import Drop from "@/components/ui/Drop";
import { copy } from "@/content/copy";

export default function Footer() {
  const f = copy.footer;
  return (
    <footer className="border-t border-navy/15 py-12">
      <div className="container-page grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="max-w-xl">
          <div className="flex items-center">
            <Drop size={36} title="Top Up" />
            <span className="ml-2 whitespace-nowrap font-display text-xl font-bold">Top Up</span>
          </div>
          <p className="mt-4">{copy.closing}</p>
          {/* No public email or phone yet (see docs/open-questions.md), so contact goes through the form. */}
          <p className="mt-4">{f.contactIntro}</p>
          <a href="#join" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
            {f.contactLink}
          </a>
        </div>
        <nav aria-label={f.navLabel}>
          <ul className="grid gap-1">
            {f.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page mt-10 grid gap-2 text-[0.95em]">
        <p>{f.privacy}</p>
        <p>{f.built}</p>
      </div>
    </footer>
  );
}
