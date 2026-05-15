import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Mic, PenLine, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MentorIA — Mentor de tecnologia em linguagem simples" },
      { name: "description", content: "Tire foto, fale ou escreva sua dúvida. O MentorIA explica em linguagem simples." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { n: "247", l: "Ajudados" },
  { n: "4", l: "Mentores" },
  { n: "4.9", l: "Avaliação" },
];

const actions = [
  { to: "/foto", icon: Camera, title: "Enviar uma foto", desc: "Foto da tela ou do aparelho", grad: "from-primary-deep to-primary" },
  { to: "/voz", icon: Mic, title: "Falar minha dúvida", desc: "Diga em voz alta", grad: "from-[oklch(0.4_0.1_220)] to-info" },
  { to: "/texto", icon: PenLine, title: "Digitar a pergunta", desc: "Escreva sua dúvida", grad: "from-[oklch(0.4_0.13_160)] to-success" },
] as const;

const onlineMentors = [
  { initials: "RO", name: "Ramon Oliveira Amaral", expertise: "Líder · Gestão e Coordenação", badge: "👑 Líder", color: "bg-[#7C3AED]" },
  { initials: "GV", name: "Gustavo Vaz Gasparoto", expertise: "UI/UX · Figma · Frontend", badge: "🎨 Interface", color: "bg-[#0891B2]" },
  { initials: "WS", name: "Wallacy Souza", expertise: "Desenvolvedor · App Mobile", badge: "📱 App", color: "bg-[#059669]" },
  { initials: "PM", name: "Pedro Miguel Bezerra", expertise: "PostgreSQL · MER/DER · SQL", badge: "🗄️ Banco de Dados", color: "bg-[#D97706]" },
];

function HomePage() {
  return (
    <>
      <div className="bg-[image:var(--gradient-primary)] text-primary-foreground px-5 pt-5 pb-10 rounded-b-[2rem]">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-white/15 rounded-full px-2.5 py-1 mb-3">
          <Sparkles className="size-3" /> Mentor de tecnologia com IA
        </div>
        <h1 className="text-2xl font-bold leading-tight">Olá! Posso ajudar? 👋</h1>
        <p className="text-sm opacity-85 mt-1">Envie uma foto ou diga sua dúvida de tecnologia</p>
      </div>

      <div className="px-4 -mt-5 pb-6 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.l} className="bg-card rounded-2xl border border-border py-3 px-2 text-center shadow-sm">
              <div className="text-2xl font-bold text-primary leading-none">{s.n}</div>
              <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wide font-medium">{s.l}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-1">
            Como quer pedir ajuda?
          </h2>
          <div className="space-y-2">
            {actions.map(({ to, icon: Icon, title, desc, grad }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 p-3.5 rounded-2xl text-primary-foreground bg-gradient-to-br ${grad} active:scale-[0.98] transition-transform shadow-sm`}
              >
                <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[15px] leading-tight">{title}</div>
                  <div className="text-xs opacity-80 mt-0.5">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
              Mentores disponíveis agora
            </h2>
            <Link to="/mentores" className="text-[11px] font-semibold text-primary flex items-center gap-1">
              Ver todos <Users className="size-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {onlineMentors.map((m) => (
              <Link
                key={m.initials}
                to="/mentores"
                className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3 hover:border-primary transition-colors"
              >
                <div className={`size-11 rounded-full ${m.color} text-white font-bold flex items-center justify-center text-sm`}>
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.expertise}</p>
                  <span className="inline-block text-[10px] font-medium text-primary bg-primary-soft rounded-full px-2 py-0.5 mt-1">
                    {m.badge}
                  </span>
                </div>
                <div className="size-2 rounded-full bg-success shadow-[0_0_0_3px_color-mix(in_oklab,var(--success)_25%,transparent)]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
