"use client";

import dynamic from "next/dynamic";
import WhenNear from "@/components/ui/WhenNear";

// The forms (and the zod validation they pull in) are loaded only when their section is near the viewport.
const JoinFormInner = dynamic(() => import("./LeadForms").then((m) => m.JoinForm), { ssr: false });
const SuggestFormInner = dynamic(() => import("./LeadForms").then((m) => m.SuggestForm), { ssr: false });

export function LazyJoinForm({ audience }: { audience: "business" | "institution" }) {
  return (
    <WhenNear minHeight={700}>
      <JoinFormInner audience={audience} />
    </WhenNear>
  );
}

export function LazySuggestForm() {
  return (
    <WhenNear minHeight={420}>
      <SuggestFormInner />
    </WhenNear>
  );
}
