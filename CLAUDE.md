# CLAUDE.md

Landing page para Constructora OLIVO — estética minimalista/luxury.

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

## Estructura de archivos
```
src/
  app/
    layout.tsx          — layout raíz (carga fuente Neue Montreal)
    page.tsx            — landing principal (ensambla todas las secciones)
    globals.css         — estilos globales + Tailwind + keyframe marquee
    work/
      page.tsx          — galería de todos los proyectos (/work)
      [slug]/page.tsx   — detalle de proyecto (/work/[slug])
  components/
    Navbar.tsx          — logo "OLIVO" centrado, links izq, CTA der
    Hero.tsx            — headline grande + imagen hero full-width
    AboutVideo.tsx      — sección pantalla completa con video/poster de fondo
    PropertyListings.tsx— carrusel horizontal con flechas (client component)
    Services.tsx        — accordion visual estático + imagen lateral
    WhyChooseUs.tsx     — 4 estadísticas en grid 2×2
    ContactForm.tsx     — mitad imagen / mitad formulario oscuro (#1e1e1b)
    Footer.tsx          — marquee "START A PROJECT •" + columnas info
    SmoothScroll.tsx    — wrapper de scroll suave
    icons.tsx           — SVG components (Arrow, PinIcon, Chevron)
    work/
      WorkCard.tsx      — tarjeta individual de proyecto
      WorkGallery.tsx   — grid de proyectos para /work
  lib/
    works.ts            — array de 11 proyectos (slug, title, category, year, image)
  fonts/
    NeueMontreal-Medium.otf
public/
  assets/
    house-1.png … house-7.png   — imágenes de propiedades
```

## Diseño / identidad visual
- **Paleta**: fondo crema `#f3f1ec`, texto casi negro `#1b1b17`, formulario oscuro `#1e1e1b` / `#2c2c28`
- **Tipografía**: Neue Montreal Medium (local), `tracking-tight` en headings
- **Max-width contenedores**: `max-w-[1760px]` con `px-6 md:px-10`
- **Estilo**: minimalista, luxury — sin bordes fuertes, `rounded-sm`, opacidades con `/50` `/40`

## Secciones de la landing (orden)
1. **Navbar** — logo centrado, nav izquierda, CTA derecha
2. **Hero** — headline + `house-2.png` a full-width (`78vh`)
3. **AboutVideo** — `h-[80vh]` con video de fondo (fuente real pendiente, poster `house-3.png`)
4. **PropertyListings** — carrusel snap-x, 5 items, flechas prev/next, hover "Details" blur circle
5. **Services** — lista de 4 items con chevron (estático) + imagen + texto derecho
6. **WhyChooseUs** — headline + párrafo + 4 stats grandes (+25, 500+, 98%, 15+) + logos decorativos
7. **ContactForm** — split 50/50: imagen izq + formulario oscuro der (First/Last Name, I Want To, Notes)
8. **Footer** — marquee animado + 2 columnas + barra de copyright

## Datos / contenido
- Proyectos definidos en `src/lib/works.ts` (11 en total, categorías: Residential, Multi-residential, Commercial)
- Las páginas `/work/[slug]` comparten el mismo layout genérico (specs hardcodeados, copy Lorem Ipsum)

## Pendiente / TODO
- **Copy**: todo el texto secundario es Lorem Ipsum — necesita contenido real
- **Video**: `AboutVideo` tiene el `<source>` comentado, espera `/public/assets/about.mp4`
- **Formulario**: `ContactForm` no tiene action/submit real (solo `type="button"`)
- **Services**: accordion completamente estático, sin toggle funcional
- **Footer**: columnas con Lorem Ipsum y links sin destino real
- **SEO**: metadata básica solo en `/work`; falta en la landing principal
