import { Sparkles, RotateCcw, ThumbsUp, AlertCircle, Loader2 } from "lucide-react";

export function ResponseBox({
  loading,
  text,
  error,
  onReset,
}: {
  loading?: boolean;
  text?: string | null;
  error?: string | null;
  onReset?: () => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 p-4 text-primary text-sm font-medium">
        <Loader2 className="size-4 animate-spin" />
        Pensando na melhor resposta…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive flex gap-2">
        <AlertCircle className="size-4 shrink-0 mt-0.5" />
        <p>{error}</p>
      </div>
    );
  }
  if (!text) return null;
  return (
    <div className="rounded-2xl border border-success/25 bg-success/5 p-4 animate-in fade-in slide-in-from-bottom-1">
      <h3 className="text-success font-semibold text-sm mb-2 flex items-center gap-1.5">
        <Sparkles className="size-4" /> Resposta do MentorIA
      </h3>
      <p className="text-[14px] leading-relaxed text-foreground/90 whitespace-pre-wrap">{text}</p>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 text-xs font-medium border border-border rounded-xl py-2 hover:bg-primary-soft hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5">
          <ThumbsUp className="size-3.5" /> Ajudou!
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="flex-1 text-xs font-medium border border-border rounded-xl py-2 hover:bg-primary-soft hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="size-3.5" /> Nova pergunta
          </button>
        )}
      </div>
    </div>
  );
}
