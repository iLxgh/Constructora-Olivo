"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { prefix: string; target: number; suffix: string; caption: string };

const stats: Stat[] = [
  { prefix: "+", target: 25, suffix: "",  caption: "Landmark projects completed on time and on budget." },
  { prefix: "",  target: 500, suffix: "+", caption: "Skilled workers and specialists in our trusted network." },
  { prefix: "",  target: 98,  suffix: "%", caption: "Client satisfaction rate across all completed projects." },
  { prefix: "",  target: 15,  suffix: "+", caption: "Public and institutional contracts awarded to date." },
];

// Logos de clientes / colaboradores (placeholder — reemplazar con logos reales)
const logos: { name: string; className: string }[] = [
  { name: "redseed", className: "font-medium tracking-tight" },
  { name: "co//ab.", className: "font-medium italic tracking-tight" },
  { name: "CONNECT", className: "font-semibold tracking-[0.15em]" },
  { name: "Norvik", className: "font-medium tracking-tight" },
  { name: "ATLAS", className: "font-semibold tracking-[0.2em]" },
  { name: "vértice", className: "font-medium italic tracking-tight" },
  { name: "MERIDIAN", className: "font-semibold tracking-[0.15em]" },
  { name: "forma&", className: "font-medium tracking-tight" },
  { name: "Lumen", className: "font-medium italic tracking-tight" },
  { name: "GRUPO·SUR", className: "font-semibold tracking-[0.15em]" },
];

const DURATION = 2400; // ms — todas las animaciones duran lo mismo

// Curva: arranque lento (cubic ease-in hasta t=0.4),
// luego desaceleración quintic muy pronunciada hacia el final.
function ease(t: number): number {
  if (t < 0.4) {
    const n = t / 0.4;
    return 0.3 * n * n * n;
  }
  const n = (t - 0.4) / 0.6;
  return 0.3 + 0.7 * (1 - Math.pow(1 - n, 5));
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / DURATION, 1);
            const e = ease(t);
            setValues(
              stats.map((s) => (t < 1 ? Math.round(s.target * e) : s.target))
            );
            if (t < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              rafRef.current = null;
            }
          };
          rafRef.current = requestAnimationFrame(tick);
        } else {
          if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          setValues(stats.map(() => 0));
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="mx-auto max-w-[1760px] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <h2 className="text-4xl leading-[1.04] tracking-tight md:text-6xl">
              Why Choose Us?
            </h2>
            <p className="mt-5 max-w-md text-base leading-4.5 text-foreground/50">
              A decade of results, not just promises. From private residences
              to public infrastructure — every project we deliver carries the
              same commitment to quality, precision, and accountability.
            </p>
          </div>

          <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee items-center text-2xl text-foreground/25">
              {[...logos, ...logos].map((logo, i) => (
                <span key={i} className={`shrink-0 px-8 ${logo.className}`}>
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          {stats.map((s, i) => (
            <div
              key={`${s.prefix}${s.target}${s.suffix}`}
              className="flex flex-col items-center text-center"
            >
              <span className="text-5xl tracking-tight md:text-6xl">
                {s.prefix}{values[i]}{s.suffix}
              </span>
              <p className="mt-3 max-w-[200px] text-base leading-4.5 text-foreground/50">
                {s.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
