import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Mic, Square, Send, AlertTriangle } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ResponseBox } from "@/components/MentorResponse";
import { askMentor } from "@/lib/mentor.functions";

export const Route = createFileRoute("/voz")({
  head: () => ({
    meta: [
      { title: "Falar dúvida — MentorIA" },
      { name: "description", content: "Toque no microfone e fale sua pergunta de tecnologia." },
    ],
  }),
  component: VozPage,
});

type SR = typeof window extends { SpeechRecognition: infer T } ? T : unknown;

function VozPage() {
  const ask = useServerFn(askMentor);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [supported, setSupported] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef = useRef<any>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    if (!w.SpeechRecognition && !w.webkitSpeechRecognition) setSupported(false);
    return () => {
      try {
        recogRef.current?.stop();
      } catch {
        /* noop */
      }
    };
  }, []);

  const start = () => {
    const w = window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return setSupported(false);
    const r = new Ctor();
    r.lang = "pt-BR";
    r.continuous = true;
    r.interimResults = true;
    let finalText = transcript;
    r.onresult = (e: any) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript + " ";
        else interimText += e.results[i][0].transcript;
      }
      setTranscript(finalText);
      setInterim(interimText);
    };
    r.onerror = (e: any) => {
      setError(`Microfone: ${e.error}. Tente o Chrome.`);
      stop();
    };
    r.onend = () => {
      if (recogRef.current === r) {
        try {
          r.start();
        } catch {
          /* noop */
        }
      }
    };
    recogRef.current = r;
    r.start();
    setRecording(true);
    setError(null);
    setResponse(null);
  };

  const stop = () => {
    const r = recogRef.current;
    recogRef.current = null;
    try {
      r?.stop();
    } catch {
      /* noop */
    }
    setRecording(false);
    setInterim("");
  };

  const send = async () => {
    const text = transcript.trim();
    if (!text) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    const res = await ask({ data: { text } });
    if (res.ok) setResponse(res.text);
    else setError(res.error);
    setLoading(false);
  };

  const reset = () => {
    setTranscript("");
    setInterim("");
    setResponse(null);
    setError(null);
  };

  const hasText = transcript.trim().length > 0;

  return (
    <>
      <ScreenHeader title="🎙️ Falar minha dúvida" subtitle="Toque no microfone e fale sua pergunta" variant="info" />
      <div className="px-4 -mt-4 pb-6 space-y-3">
        {!supported && (
          <div className="flex items-start gap-2 bg-warning/15 border border-warning/40 rounded-xl px-3 py-2.5 text-[12px] text-[oklch(0.35_0.08_75)]">
            <AlertTriangle className="size-4 shrink-0 mt-0.5" />
            <p>Reconhecimento de voz não suportado. Use Chrome ou Edge — ou digite sua pergunta.</p>
          </div>
        )}

        <div className="flex flex-col items-center pt-4 pb-2">
          <button
            onClick={recording ? stop : start}
            className={`size-20 rounded-full flex items-center justify-center text-white transition-colors shadow-lg ${
              recording ? "bg-destructive animate-pulse" : "bg-info"
            }`}
            aria-label={recording ? "Parar gravação" : "Começar gravação"}
          >
            {recording ? <Square className="size-7 fill-current" /> : <Mic className="size-8" />}
          </button>
          <p className="text-xs text-muted-foreground mt-3">
            {recording ? "Gravando… toque para parar" : hasText ? "Toque para gravar mais" : "Toque para gravar"}
          </p>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5 block px-1">
            O que você disse
          </label>
          <div className="bg-muted border border-border rounded-xl p-3 min-h-20 text-sm leading-relaxed text-foreground/90">
            {transcript || interim ? (
              <>
                {transcript}
                <span className="text-muted-foreground italic">{interim}</span>
              </>
            ) : (
              <span className="text-muted-foreground italic">Toque no microfone para começar…</span>
            )}
          </div>
        </div>

        {hasText && !recording && !loading && !response && (
          <button
            onClick={send}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[image:var(--gradient-info)] text-white active:scale-[0.98] transition-transform shadow-sm"
          >
            <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Send className="size-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-[15px]">Enviar para o mentor IA</div>
              <div className="text-xs opacity-80">Vai analisar sua dúvida</div>
            </div>
          </button>
        )}

        <ResponseBox loading={loading} text={response} error={error} onReset={reset} />
      </div>
    </>
  );
}
