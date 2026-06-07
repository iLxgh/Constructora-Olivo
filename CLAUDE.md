# CLAUDE.md

Landing page para una constructora.

## Stack
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- ESLint con `eslint-config-next`

## Comandos
- `npm run dev` — servidor de desarrollo (http://localhost:3000)
- `npm run build` — build de producción
- `npm run start` — sirve el build de producción
- `npm run lint` — ejecuta ESLint

## Estructura
- `src/app/` — rutas y layouts (App Router)
  - `layout.tsx` — layout raíz
  - `page.tsx` — página principal (la landing)
  - `globals.css` — estilos globales + Tailwind
- `public/` — assets estáticos (imágenes, logos)
- `@/*` — alias de import que apunta a `src/*`

## Notas
- Proyecto recién inicializado: la landing todavía usa la plantilla por defecto de Next.js.
- Objetivo: construir la landing page de la constructora.
