// ─────────────────────────────────────────────────────────────────────────────
// projects.ts — fuente única de verdad de todos los proyectos de OLIVO.
//
// Para agregar o editar un proyecto basta con modificar el array `projects`.
// Los tipos garantizan que no falta ningún campo obligatorio.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectSpec = {
  label: string;
  value: string;
};

export type Project = {
  // ── Identificación ──────────────────────────────────────────────────────────
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Multi-residential";
  year: string;
  location: string; // ciudad, país
  status: "Complete" | "In Progress" | "Planning";

  // ── Visibilidad ──────────────────────────────────────────────────────────────
  /** true → aparece en el carrusel de la landing */
  featured: boolean;

  // ── Textos ───────────────────────────────────────────────────────────────────
  /** Texto corto para la card del carrusel (1-2 líneas) */
  shortDescription: string;
  /** Texto para la página de detalle — sección "Project Details" */
  description: string;
  /** Texto para la página de detalle — sección "About the Project" */
  about: string;
  /** Cita destacada en la página de detalle (opcional) */
  quote?: string;

  // ── Media ────────────────────────────────────────────────────────────────────
  /** Imagen principal: hero, carrusel y thumbnail de galería */
  heroImage: string;
  /**
   * Imágenes adicionales para la página de detalle.
   * [0] → cuadrada (izquierda)   [1] → 16/10 (derecha)   [2] → cierre ancho
   */
  galleryImages: [string, string, string];
  /** Póster del video (se muestra mientras el video carga, opcional) */
  posterImage?: string;
  /** Ruta al archivo de video, p. ej. "/assets/projects/slug/hero.mp4" (opcional) */
  video?: string;

  // ── Ficha técnica ────────────────────────────────────────────────────────────
  specs: ProjectSpec[];
};

// ─── Datos ───────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── FEATURED (aparecen en carrusel) ─────────────────────────────────────────
  {
    slug: "griya-asri-residence",
    title: "Griya Asri Residence",
    category: "Residential",
    year: "2025",
    location: "Veracruz, MX",
    status: "Complete",
    featured: true,
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue eros rutrum vel erat.",
    description:
      "Diseño residencial de alto impacto integrado al paisaje natural de la zona costera.",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue eros, rutrum vel erat sed, interdum accumsan sapien. Sed at malesuada lacus. Donec a purus suscipit, pretium sem eu, imperdiet felis. In hac habitasse platea dictumst. Nunc blandit magna vitae tempus mattis.",
    quote: "Ensuring the original design was improved upon.",
    heroImage: "/assets/house-3.png",
    galleryImages: ["/assets/house-1.png", "/assets/house-6.png", "/assets/house-2.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Estudio Arcadia (Architecture)" },
      { label: "Residences", value: "8" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
  },
  {
    slug: "caufield-north",
    title: "Caufield North",
    category: "Multi-residential",
    year: "2025",
    location: "Veracruz, MX",
    status: "Complete",
    featured: true,
    shortDescription:
      "Sed at malesuada lacus. Donec a purus suscipit pretium sem eu imperdiet felis.",
    description:
      "Complejo multifamiliar pensado para comunidad, con áreas comunes de alto diseño.",
    about:
      "Donec a purus suscipit, pretium sem eu, imperdiet felis. In hac habitasse platea dictumst. Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante, laoreet at ultrices id, porttitor vel velit. Aenean ac ligula commodo tellus dapibus iaculis.",
    quote: "Community living redefined through thoughtful spatial design.",
    heroImage: "/assets/house-5.png",
    galleryImages: ["/assets/house-2.png", "/assets/house-4.png", "/assets/house-7.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Colectivo Sur (Landscape)" },
      { label: "Units", value: "24" },
      { label: "Discipline", value: "Multi-residential Development" },
    ],
  },
  {
    slug: "penthouse-vivace",
    title: "Penthouse Vivace",
    category: "Residential",
    year: "2024",
    location: "Veracruz, MX",
    status: "Complete",
    featured: true,
    shortDescription:
      "Praesent nec ex eget quam molestie finibus ut faucibus sapien aenean ligula.",
    description:
      "Penthouse de lujo en planta alta con vistas panorámicas y materiales premium.",
    about:
      "Praesent nec ex eget quam molestie finibus ut faucibus sapien. Aenean ac ligula commodo tellus dapibus iaculis. Aenean porta hendrerit tellus, ut dapibus augue viverra et. Mauris porttitor vestibulum arcu, sit amet ornare felis.",
    quote: "Luxury at every angle — a home that commands the skyline.",
    heroImage: "/assets/house-1.png",
    galleryImages: ["/assets/house-3.png", "/assets/house-7.png", "/assets/house-5.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Studio Nórdico (Interiors)" },
      { label: "Area", value: "380 m²" },
      { label: "Discipline", value: "Interior Design & Delivery" },
    ],
  },
  {
    slug: "north-bay-house",
    title: "North Bay House",
    category: "Residential",
    year: "2025",
    location: "Veracruz, MX",
    status: "Complete",
    featured: true,
    shortDescription:
      "Aenean ac ligula commodo tellus dapibus iaculis. Aenean porta hendrerit tellus.",
    description:
      "Casa unifamiliar frente al mar con diseño abierto y materialidad natural.",
    about:
      "Aenean ac ligula commodo tellus dapibus iaculis. Aenean porta hendrerit tellus, ut dapibus augue viverra et. Nam augue eros, rutrum vel erat sed, interdum accumsan sapien. Sed at malesuada lacus. Donec a purus suscipit, pretium sem eu, imperdiet felis.",
    quote: "Where the horizon becomes part of the living room.",
    heroImage: "/assets/house-4.png",
    galleryImages: ["/assets/house-2.png", "/assets/house-5.png", "/assets/house-1.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Taller Bravo (Structural)" },
      { label: "Area", value: "520 m²" },
      { label: "Discipline", value: "Architecture & Construction" },
    ],
  },
  {
    slug: "partington",
    title: "Partington",
    category: "Residential",
    year: "2024",
    location: "Veracruz, MX",
    status: "Complete",
    featured: true,
    shortDescription:
      "Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante laoreet at.",
    description:
      "Residencia de estilo contemporáneo con jardín privado y piscina desbordante.",
    about:
      "Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante, laoreet at ultrices id, porttitor vel velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue eros, rutrum vel erat sed, interdum accumsan sapien.",
    quote: "A private retreat that breathes with the surrounding landscape.",
    heroImage: "/assets/house-6.png",
    galleryImages: ["/assets/house-3.png", "/assets/house-7.png", "/assets/house-4.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Forma & Fondo (Landscape)" },
      { label: "Area", value: "290 m²" },
      { label: "Discipline", value: "Architecture & Landscape" },
    ],
  },

  // ── GALERÍA (solo aparecen en /work) ────────────────────────────────────────
  {
    slug: "riverside-estate",
    title: "Riverside Estate",
    category: "Residential",
    year: "2024",
    location: "Veracruz, MX",
    status: "Complete",
    featured: false,
    shortDescription:
      "Residencia a orillas del río con terrazas escalonadas e integración paisajística.",
    description:
      "Proyecto residencial que dialoga con el ecosistema fluvial mediante materiales locales.",
    about:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris aliquam, augue vitae imperdiet ultrices, quam nulla pretium ipsum, in molestie felis eros vitae leo.",
    quote: "Architecture in conversation with the river it calls home.",
    heroImage: "/assets/house-2.png",
    galleryImages: ["/assets/house-1.png", "/assets/house-4.png", "/assets/house-6.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Río Estudio (Architecture)" },
      { label: "Area", value: "445 m²" },
      { label: "Discipline", value: "Architecture & Interior Design" },
    ],
  },
  {
    slug: "the-grove",
    title: "The Grove",
    category: "Commercial",
    year: "2023",
    location: "Veracruz, MX",
    status: "Complete",
    featured: false,
    shortDescription:
      "Conjunto comercial de uso mixto rodeado de vegetación y espacios abiertos.",
    description:
      "Desarrollo comercial que prioriza la experiencia del usuario mediante diseño biofílico.",
    about:
      "Donec a purus suscipit, pretium sem eu, imperdiet felis. In hac habitasse platea dictumst. Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante, laoreet at ultrices id, porttitor vel velit.",
    quote: "Commerce reimagined within a canopy of green.",
    heroImage: "/assets/house-7.png",
    galleryImages: ["/assets/house-3.png", "/assets/house-5.png", "/assets/house-2.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Verde Urbano (Landscape)" },
      { label: "Area", value: "1,200 m²" },
      { label: "Discipline", value: "Commercial Design & Build" },
    ],
  },
  {
    slug: "stonewood-villa",
    title: "Stonewood Villa",
    category: "Residential",
    year: "2025",
    location: "Veracruz, MX",
    status: "Complete",
    featured: false,
    shortDescription:
      "Villa de piedra y madera con interiores de paleta terrosa y luz cenital.",
    description:
      "Diseño residencial en ladera con uso intensivo de materiales naturales y luz natural.",
    about:
      "Sed at malesuada lacus. Donec a purus suscipit, pretium sem eu, imperdiet felis. Praesent nec ex eget quam molestie finibus ut faucibus sapien. Aenean ac ligula commodo tellus dapibus iaculis.",
    quote: "Stone and timber — materials that tell the story of the land.",
    heroImage: "/assets/house-1.png",
    galleryImages: ["/assets/house-6.png", "/assets/house-2.png", "/assets/house-3.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Materia Prima (Interiors)" },
      { label: "Area", value: "310 m²" },
      { label: "Discipline", value: "Architecture & Interiors" },
    ],
  },
  {
    slug: "lakeview-pavilion",
    title: "Lakeview Pavilion",
    category: "Multi-residential",
    year: "2024",
    location: "Veracruz, MX",
    status: "Complete",
    featured: false,
    shortDescription:
      "Pabellón lacustre con unidades independientes conectadas por pasarelas elevadas.",
    description:
      "Complejo multifamiliar sobre el lago con circulaciones aéreas y vistas a 360°.",
    about:
      "Aenean porta hendrerit tellus, ut dapibus augue viverra et. Mauris porttitor vestibulum arcu, sit amet ornare felis. Nulla hendrerit maximus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    quote: "Living above the water — a new definition of lakeside community.",
    heroImage: "/assets/house-4.png",
    galleryImages: ["/assets/house-7.png", "/assets/house-3.png", "/assets/house-5.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Aqua Taller (Structural)" },
      { label: "Units", value: "18" },
      { label: "Discipline", value: "Multi-residential Development" },
    ],
  },
  {
    slug: "cedar-court",
    title: "Cedar Court",
    category: "Residential",
    year: "2023",
    location: "Veracruz, MX",
    status: "Complete",
    featured: false,
    shortDescription:
      "Patio central de cedro que organiza los espacios de la vivienda hacia el interior.",
    description:
      "Residencia introvertida centrada en un patio arbolado que regula el clima y la privacidad.",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue eros, rutrum vel erat sed, interdum accumsan sapien. Sed at malesuada lacus. Donec a purus suscipit, pretium sem eu, imperdiet felis.",
    quote: "The courtyard as the heart of every room.",
    heroImage: "/assets/house-5.png",
    galleryImages: ["/assets/house-1.png", "/assets/house-6.png", "/assets/house-7.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Patio Estudio (Architecture)" },
      { label: "Area", value: "260 m²" },
      { label: "Discipline", value: "Architecture & Construction" },
    ],
  },
  {
    slug: "harbour-lofts",
    title: "Harbour Lofts",
    category: "Commercial",
    year: "2025",
    location: "Veracruz, MX",
    status: "Complete",
    featured: false,
    shortDescription:
      "Lofts industriales reconvertidos en el puerto con acabados contemporáneos.",
    description:
      "Rehabilitación de bodega portuaria en lofts de trabajo y vivienda de doble altura.",
    about:
      "Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante, laoreet at ultrices id, porttitor vel velit. Praesent nec ex eget quam molestie finibus ut faucibus sapien. Aenean porta hendrerit tellus.",
    quote: "Industrial bones, contemporary soul — a port reborn.",
    heroImage: "/assets/house-3.png",
    galleryImages: ["/assets/house-2.png", "/assets/house-7.png", "/assets/house-4.png"],
    specs: [
      { label: "Location", value: "Veracruz, México" },
      { label: "Collaboration", value: "Puerto Forma (Heritage)" },
      { label: "Units", value: "14" },
      { label: "Discipline", value: "Commercial & Adaptive Reuse" },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

// ─── Tipos / helpers derivados para WorkCard y WorkGallery ───────────────────
// (mantienen la interfaz existente sin cambiar esos componentes)

export type Work = {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
};

export const works: Work[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  year: p.year,
  image: p.heroImage,
}));

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
