import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/ScreenHeader";

export const Route = createFileRoute("/mentores")({
  head: () => ({
    meta: [
      { title: "Equipe MentorIA — Integrantes do projeto" },
      { name: "description", content: "Conheça o time por trás do MentorIA — projeto acadêmico 2026." },
    ],
  }),
  component: MentoresPage,
});

type Member = {
  initials: string;
  name: string;
  role: string;
  description: string;
  rating: string;
  sessions: string;
  tags: string[];
  color: string;
  tagBg: string;
  tagText: string;
  roleBg: string;
  roleText: string;
  buttonGrad: string;
};

const members: Member[] = [
  {
    initials: "RO",
    name: "Ramon Oliveira Amaral",
    role: "👑 Líder do Projeto",
    description: "Gestão de Projetos · Coordenação · Metodologia Ágil · Scrum",
    rating: "5.0",
    sessions: "47 sessões",
    tags: ["Scrum Master", "Gestão Ágil", "Coordenação", "Liderança"],
    color: "bg-[#7C3AED]",
    tagBg: "bg-[#EDE9FE]",
    tagText: "text-[#5B21B6]",
    roleBg: "bg-[#EDE9FE]",
    roleText: "text-[#5B21B6]",
    buttonGrad: "from-[#5B21B6] to-[#7C3AED]",
  },
  {
    initials: "GV",
    name: "Gustavo Vaz Gasparoto",
    role: "🎨 Interface do Site",
    description: "UI/UX Design · Figma · Prototipação · Frontend · Lovable",
    rating: "4.9",
    sessions: "38 sessões",
    tags: ["Figma", "UI/UX", "Lovable", "Prototipação"],
    color: "bg-[#0891B2]",
    tagBg: "bg-[#E0F2FE]",
    tagText: "text-[#0E7490]",
    roleBg: "bg-[#E0F2FE]",
    roleText: "text-[#0E7490]",
    buttonGrad: "from-[#0E7490] to-[#0EA5E9]",
  },
  {
    initials: "WS",
    name: "Wallacy Souza",
    role: "📱 Desenvolvedor do App",
    description: "React Native · App Mobile · Integração com IA · JavaScript",
    rating: "4.9",
    sessions: "52 sessões",
    tags: ["React Native", "IA", "Mobile", "JavaScript"],
    color: "bg-[#059669]",
    tagBg: "bg-[#D1FAE5]",
    tagText: "text-[#065F46]",
    roleBg: "bg-[#D1FAE5]",
    roleText: "text-[#065F46]",
    buttonGrad: "from-[#065F46] to-[#059669]",
  },
  {
    initials: "PM",
    name: "Pedro Miguel Bezerra",
    role: "🗄️ Banco de Dados",
    description: "PostgreSQL · MER · DER · Dicionário de Dados · SQL",
    rating: "4.8",
    sessions: "29 sessões",
    tags: ["PostgreSQL", "MER/DER", "SQL", "DBA"],
    color: "bg-[#D97706]",
    tagBg: "bg-[#FEF3C7]",
    tagText: "text-[#92400E]",
    roleBg: "bg-[#FEF3C7]",
    roleText: "text-[#92400E]",
    buttonGrad: "from-[#92400E] to-[#D97706]",
  },
];

function MentoresPage() {
  return (
    <>
      <ScreenHeader title="👥 Equipe MentorIA" subtitle="Conheça o time por trás do projeto acadêmico" />
      <div className="px-4 -mt-4 pb-6 space-y-3">
        <h2 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground px-1">
          Integrantes do grupo · 2026
        </h2>

        {members.map((m) => (
          <div key={m.initials} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className={`relative size-14 rounded-full ${m.color} text-white font-bold flex items-center justify-center text-base shrink-0`}>
                {m.initials}
                <span className="absolute bottom-0.5 right-0.5 size-3 rounded-full bg-success ring-2 ring-card" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[15px] leading-tight text-foreground">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{m.description}</p>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wide ${m.roleBg} ${m.roleText} rounded-full px-2.5 py-1 mt-2`}>
                  {m.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 px-3 py-2.5 bg-muted/40 rounded-xl">
              <span className="text-[#F59E0B] text-sm">★★★★★</span>
              <span className="text-[13px] font-bold text-foreground">{m.rating}</span>
              <span className="text-[11px] text-muted-foreground">· {m.sessions}</span>
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-success">
                <span className="size-1.5 rounded-full bg-success" />
                Online agora
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {m.tags.map((t) => (
                <span key={t} className={`text-[11px] font-semibold ${m.tagBg} ${m.tagText} rounded-full px-3 py-1`}>
                  {t}
                </span>
              ))}
            </div>

            <button className={`w-full py-3 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${m.buttonGrad} active:opacity-90 transition-opacity`}>
              Solicitar mentoria
            </button>
          </div>
        ))}

        <div className="text-center pt-4 pb-2 text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-primary text-[12px]">MentorIA</strong>
          <br />
          Aplicativo de Mentoria e Alfabetização Tecnológica
          <br />
          para Escolas Públicas · Projeto Acadêmico 2026
        </div>
      </div>
    </>
  );
}
