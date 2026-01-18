# 🏗️ Arquitetura do Projeto LUMA

## Visão Geral

```
LUMA/
├── .agent/              # 📚 Documentação para IA
├── public/              # 📁 Assets estáticos
├── src/
│   ├── app/             # 🚀 Rotas Next.js
│   ├── components/      # 🧩 Componentes React
│   ├── config/          # ⚙️ Configurações
│   ├── contexts/        # 🔄 Estado global
│   ├── lib/             # 🛠️ Utilitários
│   ├── services/        # 🔌 Serviços
│   ├── types/           # 📝 Tipos TS
│   └── __tests__/       # 🧪 Testes
└── package.json
```

---

## 📁 Detalhamento de Pastas

### `/src/app/` - Rotas (App Router)

| Rota | Descrição |
|------|-----------|
| `/` | Landing page principal |
| `/login` | Página de login |
| `/dashboard` | Painel admin (layout próprio) |
| `/dashboard/guests` | Gerenciar convidados |
| `/dashboard/financial` | Gerenciar presentes/PIX |
| `/dashboard/settings` | Configurações do site |
| `/termos-de-uso` | Página legal |
| `/politica-de-privacidade` | Página legal |
| `/politica-de-cookies` | Página legal |

### `/src/components/` - Componentes

```
components/
├── landing/         # Seções da landing (HeroSection, FAQSection, etc)
│   └── index.ts     # Exports centralizados
├── briefing/        # Wizard de briefing (BriefingWizard, Steps)
│   └── index.ts
├── dashboard/       # Sidebar, cards do dashboard
│   └── index.ts
└── ui/              # Componentes base reutilizáveis
    └── index.ts     # Button, Input, Card, Toast, etc
```

### `/src/config/` - Configurações

| Arquivo | Propósito |
|---------|-----------|
| `site.config.ts` | URLs, textos, navegação |
| `theme.config.ts` | Cores, fontes, estilos |
| `index.ts` | Exports centralizados |

### `/src/contexts/` - Estado Global

| Context | Propósito |
|---------|-----------|
| `PlanContext` | Plano do usuário (free/premium) |
| `CartContext` | Carrinho de presentes |

### `/src/lib/` - Utilitários

| Arquivo | Propósito |
|---------|-----------|
| `utils.ts` | Funções utilitárias gerais |
| `briefingSchema.ts` | Validação Zod do briefing |
| `generateBriefingJson.ts` | Gerar JSON do briefing |

### `/src/services/` - Serviços

| Arquivo | Propósito |
|---------|-----------|
| `mockStorage.ts` | Simula backend com localStorage |
| `logger.ts` | Sistema de logs |

### `/src/types/` - Tipos TypeScript

| Arquivo | Tipos |
|---------|-------|
| `index.ts` | SitePlan, GiftItem, RSVPGuest, GiftTransaction |

---

## 🔄 Fluxo de Dados

```
Usuario → Componente → Context/Service → localStorage (mock)
                           ↓
                    mockStorage.ts
```

**Nota:** Atualmente usa localStorage como mock. Futuramente será substituído por Firebase/API real.

---

## 📦 Padrão de Imports

```typescript
// ✅ Correto - usar alias @/
import { Button } from '@/components/ui';
import { siteConfig } from '@/config';
import { RSVPGuest } from '@/types';

// ❌ Evitar - paths relativos longos
import { Button } from '../../../components/ui/button';
```
