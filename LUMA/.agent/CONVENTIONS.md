# 📐 Convenções de Código - LUMA

## Nomenclatura

### Arquivos
| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes React | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase com "use" | `useAuth.ts` |
| Utilitários | camelCase | `utils.ts` |
| Configurações | kebab-case | `site.config.ts` |
| Tipos | camelCase | `index.ts` em `/types` |

### Código
| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | PascalCase | `function HeroSection()` |
| Funções | camelCase | `handleSubmit()` |
| Variáveis | camelCase | `const userData` |
| Constantes | UPPER_SNAKE | `const API_URL` |
| Interfaces/Types | PascalCase | `interface UserData` |

---

## Estrutura de Componentes

```tsx
// 1. Imports
"use client"; // Se necessário

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

// 2. Types/Interfaces locais
interface ComponentProps {
    title: string;
    onAction?: () => void;
}

// 3. Componente
export default function ComponentName({ title, onAction }: ComponentProps) {
    // 3.1 Hooks
    const [state, setState] = useState(false);

    // 3.2 Handlers
    const handleClick = () => {
        // ...
    };

    // 3.3 Render
    return (
        <div>
            {/* JSX */}
        </div>
    );
}
```

---

## CSS/Tailwind

### Ordem de Classes
1. Layout (flex, grid, position)
2. Sizing (w-, h-, p-, m-)
3. Typography (text-, font-)
4. Colors (bg-, text-, border-)
5. Effects (shadow-, opacity-)
6. Transitions (transition-, animate-)

```tsx
// ✅ Correto
<div className="flex items-center gap-4 px-6 py-4 text-sm font-medium text-white bg-[#2A3B2E] rounded-lg shadow-lg transition-colors">

// ❌ Evitar - ordem aleatória
<div className="bg-[#2A3B2E] flex text-white px-6 shadow-lg items-center">
```

### Cores Customizadas
Usar valores hex entre colchetes para cores do design system:
```tsx
bg-[#2A3B2E]  // Verde principal
bg-[#C19B58]  // Dourado accent
bg-[#F7F5F0]  // Creme background
text-[#6B7A6C] // Texto muted
border-[#DCD3C5] // Bordas suaves
```

---

## Exports

### Toda pasta deve ter index.ts
```typescript
// components/ui/index.ts
export { default as Button } from './button';
export { default as Input } from './input';
export { default as Card } from './card';
```

### Uso
```typescript
// ✅ Import limpo
import { Button, Input, Card } from '@/components/ui';

// ❌ Imports múltiplos
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
```

---

## Tipos

### Localização
- Tipos **globais/reutilizáveis** → `src/types/index.ts`
- Tipos **locais** (usados só em um componente) → no próprio arquivo

### Padrão de Interface vs Type
```typescript
// Interface para objetos/entidades
interface User {
    id: string;
    name: string;
}

// Type para unions/intersections
type Status = 'pending' | 'completed' | 'failed';
type UserWithStatus = User & { status: Status };
```

---

## Boas Práticas

### ✅ Fazer
- Usar `"use client"` apenas quando necessário (hooks, eventos)
- Manter componentes pequenos (<150 linhas)
- Usar early returns para legibilidade
- Tipar tudo (evitar `any`)

### ❌ Evitar
- `console.log` em produção (use `logger` se necessário)
- Estilos inline (usar Tailwind)
- Props drilling excessivo (use Context)
- Comentários óbvios
