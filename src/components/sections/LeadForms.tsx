"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { copy } from "@/content/copy";
import type { z } from "zod";
import { BOTTLE_INTERESTS, JOIN_TYPES, bottleSchema, joinSchema, suggestSchema } from "@/lib/lead";

type Status = "idle" | "sending" | "done" | "error";
type Errors = Record<string, string>;

/** Posts to /api/lead and tracks status. Field errors come from the same zod schema the server uses. */
function useLeadForm(schema: z.ZodType, extra: Record<string, string>) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = { ...extra, ...Object.fromEntries(new FormData(form).entries()) };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      // Move focus to the first field with a problem.
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string[]> };
      if (res.ok && body.ok) {
        setStatus("done");
        return;
      }
      if (res.status === 400 && body.fields) {
        const next: Errors = {};
        for (const [k, v] of Object.entries(body.fields)) if (v?.[0]) next[k] = v[0];
        setErrors(next);
      }
      setServerError(body.error || copy.join.form.error);
      setStatus("error");
    } catch {
      setServerError(copy.join.form.error);
      setStatus("error");
    }
  }

  return { status, errors, serverError, onSubmit, formRef };
}

/** Hidden from people (off screen, not focusable, ignored by assistive tech). Bots tend to fill it. */
function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

function StatusMessage({ status, error, done }: { status: Status; error: string; done: string }) {
  return (
    <div aria-live="polite" className="min-h-6">
      {status === "error" ? (
        <p role="alert" className="font-semibold">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      ) : null}
      {status === "sending" ? <p>{copy.join.form.sending}</p> : null}
      <span className="sr-only">{status === "done" ? done : ""}</span>
    </div>
  );
}

function Done({ text }: { text: string }) {
  return (
    <p role="status" className="rounded-2xl bg-drop/30 px-5 py-4 font-semibold" tabIndex={-1} ref={(el) => el?.focus()}>
      {text}
    </p>
  );
}

export function JoinForm({ audience }: { audience: "business" | "institution" }) {
  const f = copy.join.form;
  const { status, errors, serverError, onSubmit } = useLeadForm(joinSchema, { type: "join", audience });

  if (status === "done") return <Done text={f.done} />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Field id="join-name" label={f.name} error={errors.name}>
        {(a) => <input {...a} name="name" type="text" autoComplete="name" />}
      </Field>
      <Field id="join-venue" label={f.venue} error={errors.venue}>
        {(a) => <input {...a} name="venue" type="text" autoComplete="organization" />}
      </Field>
      <Field id="join-type" label={f.venueType} error={errors.venueType}>
        {(a) => (
          // Keyed by audience so the options reset cleanly when the tab changes.
          <select {...a} key={audience} name="venueType" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {JOIN_TYPES[audience].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="join-town" label={f.town} error={errors.town}>
        {(a) => <input {...a} name="town" type="text" autoComplete="address-level2" />}
      </Field>
      <Field id="join-contact" label={f.contact} hint={f.contactHint} error={errors.contact}>
        {(a) => <input {...a} name="contact" type="text" inputMode="email" autoComplete="email" />}
      </Field>
      <Field id="join-message" label={f.message} error={errors.message}>
        {(a) => <textarea {...a} name="message" rows={4} />}
      </Field>
      <Honeypot />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
        </Button>
        <StatusMessage status={status} error={serverError} done={f.done} />
      </div>
      <p className="text-[0.9em] opacity-80">{f.privacy}</p>
    </form>
  );
}

export function SuggestForm() {
  const f = copy.find.fields;
  const { status, errors, serverError, onSubmit } = useLeadForm(suggestSchema, { type: "suggest" });

  if (status === "done") return <Done text={copy.find.suggestDone} />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4">
      <Field id="suggest-name" label={f.name} error={errors.name}>
        {(a) => <input {...a} name="name" type="text" />}
      </Field>
      <Field id="suggest-place" label={f.place} error={errors.place}>
        {(a) => <input {...a} name="place" type="text" />}
      </Field>
      <Field id="suggest-contact" label={f.contact} error={errors.contact}>
        {(a) => <input {...a} name="contact" type="text" />}
      </Field>
      <Honeypot />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="secondary" disabled={status === "sending"}>
          {status === "sending" ? copy.join.form.sending : copy.find.suggestSubmit}
        </Button>
        <StatusMessage status={status} error={serverError} done={copy.find.suggestDone} />
      </div>
      <p className="text-[0.9em] opacity-80">{copy.join.form.privacy}</p>
    </form>
  );
}

/** Notify me / bulk enquiry for the Top Up bottle. Posts with type "bottle". */
export function BottleForm({ firstFieldId, focusOnMount = false }: { firstFieldId: string; focusOnMount?: boolean }) {
  const f = copy.bottle.form;

  // The form arrives after the click that opened it, so it moves focus into itself once it exists.
  useEffect(() => {
    if (focusOnMount) document.getElementById(firstFieldId)?.focus();
  }, [focusOnMount, firstFieldId]);

  const { status, errors, serverError, onSubmit } = useLeadForm(bottleSchema, { type: "bottle" });

  if (status === "done") return <Done text={f.done} />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Field id={firstFieldId} label={f.interest} error={errors.interest}>
        {(a) => (
          <select {...a} name="interest" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {Object.entries(BOTTLE_INTERESTS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="bottle-name" label={f.name} error={errors.name}>
        {(a) => <input {...a} name="name" type="text" autoComplete="name" />}
      </Field>
      <Field id="bottle-contact" label={f.contact} hint={f.contactHint} error={errors.contact}>
        {(a) => <input {...a} name="contact" type="text" inputMode="email" autoComplete="email" />}
      </Field>
      <Field id="bottle-message" label={f.message} error={errors.message}>
        {(a) => <textarea {...a} name="message" rows={3} />}
      </Field>
      <Honeypot />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? copy.join.form.sending : f.submit}
        </Button>
        <StatusMessage status={status} error={serverError} done={f.done} />
      </div>
      <p className="text-[0.9em] opacity-80">{copy.join.form.privacy}</p>
    </form>
  );
}
