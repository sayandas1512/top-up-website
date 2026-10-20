import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: (a11y: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; className: string }) => ReactNode;
};

const control =
  "block min-h-11 w-full rounded-xl border-2 border-navy bg-white/70 px-4 py-2.5 text-[1rem] text-navy placeholder:text-navy/50 aria-[invalid=true]:border-[3px]";

/** Label, control, optional hint and error, wired together for screen readers. */
export default function Field({ id, label, error, hint, children }: Props) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-semibold">
        {label}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, className: control })}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.9em] opacity-80">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-[0.95em] font-semibold">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
