import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway";

const SYSTEM = `Você é o MentorIA, um mentor de tecnologia muito amigável, paciente e simples.
Ajude pessoas comuns (avós, pessoas sem experiência com tecnologia) a entender e usar tecnologia.
Use linguagem MUITO simples, sem termos técnicos. Se usar um termo técnico, explique entre parênteses.
Se for uma foto/imagem: diga o que está vendo e explique passo a passo como usar ou resolver.
Responda em português brasileiro. Seja encorajador. Máximo 4 parágrafos curtos.
Use emojis ocasionalmente para ser mais amigável.`;

const Input = z.object({
  text: z.string().min(1).max(4000),
  imageBase64: z.string().max(15_000_000).optional(),
  imageMimeType: z.string().max(64).optional(),
});

export const askMentor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { ok: false as const, error: "AI gateway não configurado." };
    }

    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-3-flash-preview");

    const userContent: Array<
      | { type: "text"; text: string }
      | { type: "image"; image: string; mediaType?: string }
    > = [{ type: "text", text: data.text }];

    if (data.imageBase64) {
      userContent.unshift({
        type: "image",
        image: `data:${data.imageMimeType ?? "image/jpeg"};base64,${data.imageBase64}`,
        mediaType: data.imageMimeType,
      });
    }

    try {
      const { text } = await generateText({
        model,
        system: SYSTEM,
        messages: [{ role: "user", content: userContent }],
      });
      return { ok: true as const, text: text.trim() || "Sem resposta." };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha desconhecida";
      const status = (err as { statusCode?: number })?.statusCode;
      if (status === 429) {
        return { ok: false as const, error: "Muitas perguntas em sequência. Aguarde alguns segundos e tente novamente." };
      }
      if (status === 402) {
        return { ok: false as const, error: "Créditos de IA esgotados. Adicione créditos no workspace." };
      }
      console.error("askMentor error:", err);
      return { ok: false as const, error: message };
    }
  });
