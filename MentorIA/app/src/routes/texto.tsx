import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Rocket } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ResponseBox } from "@/components/MentorResponse";
import { askMentor } from "@/lib/mentor.functions";

export const Route = createFileRoute("/texto")({
  head: () => ({
    meta: [
      { title: "Digitar pergunta — MentorIA" },
      { name: "description", content: "Escreva sua dúvida de tecnologia e receba uma resposta simples." },
    ],
  }),
  component: TextoPage,
});

function TextoPage() {
  const ask = useServerFn(askMentor);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    const q = text.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    const res = await ask({ data: { text: q } });
    if (res.ok) setResponse(res.text);
    else setError(res.error);
    setLoading(false);
  };

  const reset = () => {
    setText("");
    setResponse(null);
    setError(null);
  };

  return (
    <>
      <ScreenHeader title="✍️ Digitar pergunta" subtitle="Escreva sua dúvida de tecnologia" variant="success" />
      <div className="px-4 -mt-4 pb-6 space-y-3">
        <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block px-1">
          Qual é sua dúvida?
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Ex: Como faço para entrar no wifi? Como aumento o volume do celular? Como acesso o e-mail?"
          className="w-full text-sm rounded-xl border border-input bg-card p-3 resize-none focus:outline-none focus:border-success focus:ring-2 focus:ring-success/20"
        />
        <button
          onClick={send}
          disabled={!text.trim() || loading}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[image:var(--gradient-success)] text-white active:scale-[0.98] transition-transform shadow-sm disabled:opacity-50 disabled:active:scale-100"
        >
          <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Rocket className="size-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-[15px]">Enviar para o mentor IA</div>
            <div className="text-xs opacity-80">Resposta rápida e simples</div>
          </div>
        </button>
        <ResponseBox loading={loading} text={response} error={error} onReset={reset} />
      </div>
    </>
  );
}
