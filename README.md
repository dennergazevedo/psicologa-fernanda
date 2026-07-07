# Fernanda Pires — Psicóloga & Neuropsicóloga

Site institucional (landing page) para a psicóloga clínica e neuropsicóloga Fernanda Pires (CRP 04/63320), com atendimento presencial em João Monlevade/MG e online para todo o Brasil.

O site apresenta as áreas de atuação, explica o processo de avaliação neuropsicológica, conta a trajetória profissional e direciona o visitante para agendamento via WhatsApp através de um formulário de contato.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [ESLint](https://eslint.org/) (`eslint-config-next`)

> ⚠️ Este projeto usa o Next.js 16, que traz mudanças significativas em relação a versões anteriores. Antes de alterar convenções de arquivos, roteamento ou configuração, consulte a documentação em `node_modules/next/dist/docs/`.

## Pré-requisitos

- Node.js 20 ou superior
- npm (ou outro gerenciador de pacotes de sua preferência)

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando         | Descrição                            |
| --------------- | ------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento  |
| `npm run build` | Gera o build de produção              |
| `npm run start` | Sobe o build de produção localmente   |
| `npm run lint`  | Executa o ESLint sobre o projeto      |

## Estrutura do projeto

```
app/
├── layout.tsx      # Layout raiz: fontes, metadata de SEO, dados estruturados (JSON-LD)
├── page.tsx        # Página única com todas as seções do site (hero, serviços, avaliação, sobre, contato)
├── globals.css      # Estilos globais e tokens de tema do Tailwind
├── robots.ts        # Geração de robots.txt
├── sitemap.ts        # Geração de sitemap.xml
└── favicon.ico

public/
├── perfil.webp       # Foto de perfil (hero)
├── perfil2.webp      # Foto de apoio (seção de contato)
└── escritorio.webp   # Foto do consultório (seção "sobre mim")
```

A página é composta pelas seguintes seções, todas em um único arquivo `app/page.tsx`:

1. **Header/Navbar** — navegação fixa com menu responsivo (mobile drawer)
2. **Hero** (`#inicio`) — chamada principal e CTA de agendamento
3. **Atuação/Serviços** (`#servicos`) — cards de Avaliação Neuropsicológica, TCC/Terapia do Esquema e TDAH/TEA
4. **Avaliação Neuropsicológica** (`#avaliacao`) — explicação com abas interativas das funções cognitivas avaliadas
5. **Sobre Mim** (`#sobre`) — apresentação pessoal e curiosidades
6. **Modalidades de Atendimento** — presencial vs. online
7. **Contato** (`#contato`) — dados de contato e formulário que gera uma mensagem pronta para o WhatsApp
8. **Footer** — informações institucionais e ética/segurança

## Contato e agendamento

O formulário de contato não envia dados para um backend: ele monta uma mensagem a partir dos campos preenchidos e redireciona o usuário para o WhatsApp (`wa.me`) com a mensagem pré-preenchida, iniciando a conversa diretamente com a profissional.

## SEO

O projeto já inclui:

- Metadata completa (title, description, keywords, Open Graph, Twitter Card) em `app/layout.tsx`
- Dados estruturados (`schema.org/Psychologist`) via JSON-LD
- Geração dinâmica de `robots.txt` (`app/robots.ts`) e `sitemap.xml` (`app/sitemap.ts`)

Ao alterar domínio, telefone, e-mail ou redes sociais, atualize as constantes `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION` e o objeto `jsonLd` em `app/layout.tsx`.

## Deploy

O deploy recomendado é via [Vercel](https://vercel.com/), plataforma dos criadores do Next.js. Basta conectar o repositório e o build (`npm run build`) é detectado automaticamente.

Consulte a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para outras opções de hospedagem.
