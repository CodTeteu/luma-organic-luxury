# 🎯 LUMA - Contexto do Projeto

> **Use este arquivo para entender rapidamente o projeto LUMA.**

## O que é LUMA?

LUMA é uma **plataforma SaaS para criação de sites de casamento**. O produto oferece:

1. **Landing Page** - Página de marketing para captar clientes
2. **Sistema de Briefing** - Wizard para coletar informações do casal
3. **Dashboard Admin** - Painel para gerenciar convidados e presentes
4. **Sites de Casamento** - Templates personalizados (a ser implementado)

---

## 🎯 Público-Alvo

- Casais brasileiros classe B/C
- Foco em simplicidade e elegância
- Estética premium mas acessível

---

## 🛠️ Tech Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.x | Framework React (App Router) |
| TypeScript | 5.x | Tipagem |
| Tailwind CSS | 4.x | Estilização |
| Framer Motion | 12.x | Animações |
| Lucide React | - | Ícones |

---

## 📁 Estrutura Principal

```
src/
├── app/                 # Rotas Next.js (App Router)
│   ├── page.tsx         # Landing page principal
│   ├── dashboard/       # Painel admin (protegido)
│   └── login/           # Autenticação
├── components/
│   ├── landing/         # Seções da landing page
│   ├── briefing/        # Wizard de coleta de dados
│   ├── dashboard/       # Componentes do painel
│   └── ui/              # Componentes base (botões, inputs, etc)
├── config/              # Configurações centralizadas
├── contexts/            # React Contexts (estado global)
├── lib/                 # Utilitários, schemas, funções puras
├── services/            # Serviços e integrações
└── types/               # Tipos TypeScript
```

---

## 🎨 Design System

### Paleta de Cores
- **Primary:** Verde oliva (#2A3B2E) - Elegância natural
- **Accent:** Dourado (#C19B58) - Premium, luxo
- **Background:** Creme (#F7F5F0) - Suave, clean
- **Text:** Verde escuro (#2A3B2E)

### Fontes
- **Heading:** Font personalizada (--font-heading)
- **Body:** System fonts

---

## 🚦 Status Atual

### ✅ Implementado
- Landing page completa com 8 seções
- Sistema de briefing (4 etapas)
- Dashboard admin básico (convidados, financeiro, configurações)
- Sistema de tipos TypeScript

### 🚧 Em Desenvolvimento
- Página de templates/galeria
- Integração com Firebase/Backend
- Sistema de pagamentos

### ❌ Pendente
- Templates de sites de casamento
- Sistema de autenticação real
- Integração com Mercado Pago

---

## 📝 Convenções Importantes

1. **Componentes** em PascalCase: `HeroSection.tsx`
2. **Funções/variáveis** em camelCase: `handleSubmit`
3. **Arquivos de config** em kebab-case: `site.config.ts`
4. **Cada pasta de componentes** deve ter `index.ts` para exports centralizados
5. **Tipos** ficam em `src/types/`

---

## 🔗 Links Úteis

- Rodar local: `npm run dev` (porta 3001)
- Build: `npm run build`
- Lint: `npm run lint`
