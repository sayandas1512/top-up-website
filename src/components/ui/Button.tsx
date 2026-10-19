import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-center font-semibold leading-tight transition-transform duration-150 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // Amber is the single accent, so it is reserved for the primary call to action.
  primary: "bg-amber text-navy hover:brightness-95",
  secondary: "border-2 border-navy text-navy hover:bg-navy hover:text-sand",
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type Props = (AnchorProps | NativeButtonProps) & { variant?: Variant };

export default function Button({ variant = "primary", className = "", ...rest }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if ("href" in rest && rest.href !== undefined) {
    return <a {...(rest as AnchorProps)} className={classes} />;
  }
  return <button type="button" {...(rest as NativeButtonProps)} className={classes} />;
}
