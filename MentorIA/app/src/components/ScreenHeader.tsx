import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function ScreenHeader({
  title,
  subtitle,
  back = true,
  variant = "primary",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  back?: boolean;
  variant?: "primary" | "info" | "success";
}) {
  const bg =
    variant === "info"
      ? "bg-[image:var(--gradient-info)]"
      : variant === "success"
        ? "bg-[image:var(--gradient-success)]"
        : "bg-[image:var(--gradient-primary)]";

  return (
    <div className={`${bg} text-primary-foreground px-5 pt-4 pb-7 rounded-b-3xl`}>
      {back && (
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs font-medium bg-white/15 hover:bg-white/25 transition-colors rounded-lg px-2.5 py-1 mb-3"
        >
          <ArrowLeft className="size-3.5" /> Voltar
        </Link>
      )}
      <h1 className="text-xl font-bold leading-tight">{title}</h1>
      {subtitle && <p className="text-[13px] opacity-80 mt-0.5">{subtitle}</p>}
    </div>
  );
}
