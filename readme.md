# MentorIA — Aplicativo de Mentoria e Alfabetização Tecnológica

> Aplicativo que conecta estudantes de escolas públicas a mentores e inteligência artificial para apoio no uso de tecnologia, via **foto**, **áudio** ou **texto**.

---

## Sobre o projeto

O **MentorIA** é uma solução desenvolvida para reduzir o analfabetismo digital entre estudantes de escolas públicas. O usuário pode enviar uma **foto de qualquer tela ou aparelho**, **gravar um áudio com sua dúvida** ou **digitar uma pergunta**, e recebe uma resposta imediata em linguagem simples, gerada por inteligência artificial.

Além disso, o app conecta alunos a **mentores voluntários** e oferece **trilhas de aprendizado gamificadas** com sistema de XP e ranking semanal.

### Problema que resolve

> Muitos alunos da rede pública não têm contato básico com recursos digitais. Um exemplo real: durante a pandemia, um aluno não sabia o que era uma conta Google para acessar atividades online.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 📷 Enviar foto | Tira foto de qualquer tela ou aparelho e a IA explica |
| 🎙️ Gravar áudio | Fala a dúvida em voz alta e recebe resposta |
| ✍️ Digitar pergunta | Escreve qualquer dúvida de tecnologia |
| 🤝 Mentoria | Conecta aluno com mentor voluntário por área de interesse |
| 📚 Trilhas de aprendizado | Conteúdo gamificado com XP e níveis |
| 💬 Fórum de dúvidas | Perguntas públicas respondidas por mentores ou IA |
| 🏆 Ranking semanal | Top alunos por XP da semana |

---

## Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | React Native (via Lovable.dev) |
| IA | Google Gemini API / Claude (Anthropic) |
| Banco de dados | PostgreSQL 15 |
| Autenticação | JWT (JSON Web Token) |
| Reconhecimento de voz | Web Speech API |
| Hospedagem | Lovable.dev (protótipo) |

---

## Demonstração ao vivo

🔗 **App publicado:** [[mentoria-tech-demo.lovable.app](https://mentoriaunicid.lovable.app)

🎨 **Protótipo Figma:** [Ver no Figma](https://www.figma.com/make/Vh6FEdnoIXsyHj3614c2xm/Criar-um-template?p=f)

https://github.com/wallacyti/MentorIA

---

## Estrutura do repositório

```
📁 raiz/
├── 📄 README.md                    ← você está aqui
├── 📄 .gitignore
│
├── 📁 app/                         ← código do aplicativo
│   ├── 📄 package.json
│   ├── 📄 index.html
│   └── 📁 src/
│       ├── 📄 App.tsx
│       ├── 📁 pages/               ← Home, Foto, Voz, Mentores...
│       ├── 📁 components/          ← componentes reutilizáveis
│       └── 📁 services/            ← integração com IA
│
├── 📁 database/                    ← banco de dados
│   ├── 📄 banco_v2_completo.sql    ← DDL completo (13 tabelas)
│   ├── 📄 views.sql                ← views: ranking, dashboard, uso IA
│   └── 📄 seed.sql                 ← dados iniciais
│
├── 📁 docs/                        ← documentação técnica
│   ├── 📄 Documentacao_Tecnica.docx
│   ├── 📄 dicionario_de_dados.md
│   └── 📄 checklist_entrega.md
│
├── 📁 diagramas/                   ← diagramas do projeto
│   ├── 🖼️ casos_de_uso.png
│   ├── 🖼️ DER_banco.png
│   └── 🖼️ MER_conceitual.png
│
└── 📁 prototipo/                   ← prints e links do protótipo
    ├── 📄 links.md
    └── 🖼️ telas_app.png
```

---

## Banco de dados

O banco possui **13 tabelas** em PostgreSQL 15, em 3FN:

```
usuario          → alunos, mentores e administradores
trilha           → trilhas de aprendizado
modulo           → módulos dentro de cada trilha
conteudo         → vídeos, textos, quizzes
progresso        → conclusão de módulos (XP)
mentoria         → vínculo aluno ↔ mentor
area_interesse   → áreas para match de mentoria
usuario_area     → N:N usuário ↔ área
arquivo_midia    → fotos e áudios enviados à IA ★
ia_interacao     → log de respostas da IA ★
forum_post       → perguntas públicas no fórum
forum_resposta   → respostas (humanas ou IA)
notificacao      → alertas in-app
```

> As tabelas marcadas com ★ são específicas para o recurso de foto e áudio.

Para criar o banco localmente:
```bash
psql -U postgres -c "CREATE DATABASE mentoria_db;"
psql -U postgres -d mentoria_db -f database/banco_v2_completo.sql
```

---

## Como rodar o app localmente

```bash
# 1. Clone o repositório
git clone https://github.com/Muriloss21/Aplicativo-de-mentoria-e-Alfabetizacao-Tecnologica-para-Escolas-Publicas.git

# 2. Entre na pasta do app
cd app

# 3. Instale as dependências
npm install

# 4. Rode o projeto
npm run dev

# 5. Acesse no navegador
# http://localhost:5173
```

---

## Casos de uso (atores do sistema)

| Ator | Casos de uso |
|---|---|
| **Aluno** | Cadastro, Login, Editar perfil, Trilhas, Atividades, Mentoria, Fórum, Perguntas para IA (foto/áudio/texto) |
| **Mentor** | Login, Aceitar/rejeitar mentoria, Responder fórum, Acompanhar alunos |
| **Administrador** | Gerenciar usuários, Gerenciar trilhas, Moderar fórum, Visualizar relatórios |
| **IA (sistema externo)** | Responder dúvidas automaticamente via foto, áudio ou texto |

---

## Conformidade LGPD

Por atender menores de idade, o sistema implementa:

- Campo `consentimento_resp` obrigatório para menores de 18 anos (Art. 14)
- Senhas hasheadas com bcrypt — nunca armazenadas em texto puro
- Log de interações com IA auditável (`ia_interacao`)
- Direito ao esquecimento via campo `ativo = FALSE`

---

## Equipe

| Nome | Função |
|---|---|
| Murilo Santos | Desenvolvimento & GitHub |
| Alexandre | [função] |
| [demais membros] | [funções] |

---

## Informações acadêmicas

| Campo | Valor |
|---|---|
| Projeto nº | 01/2026 |
| Data de início | 17/03/2026 |
| Tipo | Acadêmico / Extensão Tecnológica |
| Versão | 2.0 |

---

## Licença

Este projeto é desenvolvido para fins acadêmicos.
