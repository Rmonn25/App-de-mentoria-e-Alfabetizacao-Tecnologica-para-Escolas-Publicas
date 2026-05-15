import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ImageIcon, Search, AlertTriangle, X } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ResponseBox } from "@/components/MentorResponse";
import { askMentor } from "@/lib/mentor.functions";
import { fileToBase64 } from "@/lib/file";

export const Route = createFileRoute("/foto")({
  head: () => ({
    meta: [
      { title: "Enviar foto — MentorIA" },
      { name: "description", content: "Tire uma foto da tela ou do aparelho e a IA explica o que está vendo." },
    ],
  }),
  component: FotoPage,
});

function FotoPage() {
  const ask = useServerFn(askMentor);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = (f: File | null) => {
    setResponse(null);
    setError(null);
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const imageBase64 = await fileToBase64(file);
      const res = await ask({
        data: {
          text: question.trim() || "Analise esta imagem. Explique o que está vendo de forma simples e me diga como resolver qualquer problema ou usar melhor o que aparece na tela.",
          imageBase64,
          imageMimeType: file.type || "image/jpeg",
        },
      });
      if (res.ok) setResponse(res.text);
      else setError(res.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setQuestion("");
    setResponse(null);
    setError(null);
  };

  return (
    <>
      <ScreenHeader title="📷 Enviar foto" subtitle="Tire foto da tela ou do problema que está vendo" />
      <div className="px-4 -mt-4 pb-6 space-y-3">
        <div className="flex items-start gap-2 bg-warning/15 border border-warning/40 rounded-xl px-3 py-2.5 text-[12px] text-[oklch(0.35_0.08_75)]">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
          <p>A IA vai analisar a imagem e explicar em linguagem simples o que está vendo.</p>
        </div>

        {!preview ? (
          <label className="block relative border-2 border-dashed border-primary/40 bg-primary-soft rounded-2xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary-soft/70 transition-colors">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <ImageIcon className="size-9 mx-auto text-primary mb-2" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-primary">Toque para escolher foto</p>
            <p className="text-[11px] text-muted-foreground mt-1">JPG, PNG, HEIC — qualquer tela ou aparelho</p>
          </label>
        ) : (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full max-h-52 object-cover rounded-2xl border border-border" />
            <button
              onClick={() => onFile(null)}
              className="absolute top-2 right-2 size-7 rounded-full bg-black/60 text-white flex items-center justify-center"
              aria-label="Remover foto"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        <div>
          <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5 block px-1">
            Pergunta adicional (opcional)
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            placeholder="Ex: como faço para aumentar a fonte? como entro no wifi?"
            className="w-full text-sm rounded-xl border border-input bg-card p-3 resize-none focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {file && !loading && !response && (
          <button
            onClick={onAnalyze}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground active:scale-[0.98] transition-transform shadow-sm"
          >
            <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Search className="size-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-[15px]">Analisar com IA</div>
              <div className="text-xs opacity-80">Resposta em segundos</div>
            </div>
          </button>
        )}

        <ResponseBox loading={loading} text={response} error={error} onReset={reset} />
      </div>
    </>
  );
}
