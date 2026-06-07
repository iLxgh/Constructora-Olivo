"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { prefix: string; target: number; suffix: string; caption: string };

const stats: Stat[] = [
  { prefix: "+", target: 25, suffix: "",  caption: "Mauris porttitor vestibulum arcu, sit amet ornare felis." },
  { prefix: "",  target: 500, suffix: "+", caption: "Sed tincidunt posuere sem, nec tincidunt massa tincidunt" },
  { prefix: "",  target: 98,  suffix: "%", caption: "Proin ut efficitur turpis, quis pretium risus." },
  { prefix: "",  target: 15,  suffix: "+", caption: "Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante" },
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
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Mauris aliquam, augue vitae
              imperdiet ultrices, quam nulla pretium ipsum.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-2xl text-foreground/25">
            <span className="font-medium tracking-tight">redseed</span>
            <span className="font-medium italic tracking-tight">co//ab.</span>
            <span className="font-semibold tracking-[0.15em]">CONNECT</span>
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
