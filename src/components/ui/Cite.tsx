import { citationOrder, sources, type SourceId } from "@/content/sources";

/** Superscript number that links to the Sources section. Numbers follow `citationOrder`. */
export default function Cite({ id }: { id: SourceId }) {
  const index = citationOrder.indexOf(id);
  if (index === -1) {
    throw new Error(`<Cite id="${id}" /> is missing from citationOrder in src/content/sources.ts`);
  }
  const source = sources.find((s) => s.id === id);
  if (!source) throw new Error(`Unknown source id: ${id}`);

  return (
    <sup className="ml-0.5 text-[0.7em] font-semibold leading-none">
      <a
        href={`#source-${id}`}
        aria-label={`Source ${index + 1}: ${source.title}`}
        className="relative inline-block rounded px-0.5 underline decoration-2 underline-offset-2 hover:bg-navy hover:text-sand after:absolute after:-inset-3 after:content-['']"
      >
        {index + 1}
      </a>
    </sup>
  );
}
