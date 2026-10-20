import { citationOrder, sources } from "@/content/sources";

type Source = (typeof sources)[number];

const URL_RE = /(https?:\/\/[^\s]+)/g;

/** Renders a note as text, turning bare URLs into links. */
function Note({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} className="underline underline-offset-2 break-all" rel="noopener noreferrer">
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function Sources() {
  const ordered: Source[] = citationOrder.flatMap((id) => sources.filter((s) => s.id === id));

  return (
    <section id="sources" aria-labelledby="sources-heading" className="py-[var(--space-section)]">
      <div className="container-page">
        <h2 id="sources-heading" className="text-h2 font-bold">
          Sources
        </h2>
        <ol className="mt-8 grid max-w-3xl list-decimal gap-6 pl-6 marker:font-semibold">
          {ordered.map((s) => (
            <li key={s.id} id={`source-${s.id}`} className="pl-2">
              <p className="font-semibold">
                {s.url ? (
                  <a href={s.url} className="underline underline-offset-2" rel="noopener noreferrer">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
              </p>
              <p className="text-[0.95em]">{s.publisher}</p>
              <p className="mt-1 text-[0.95em] opacity-90">{s.claim}</p>
              {"note" in s && s.note ? (
                <p className="mt-1 text-[0.95em] opacity-90">
                  <Note text={s.note} />
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
