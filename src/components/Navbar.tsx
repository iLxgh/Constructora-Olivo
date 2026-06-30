"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";

// id = ancla de la sección en la página principal ("" → tope / Home)
const navLinks: { label: string; href: string; id: string }[] = [
  { label: "Home", href: "/", id: "" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Gallery", href: "/#gallery", id: "gallery" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Why Us", href: "/#why-us", id: "why-us" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [activeId, setActiveId] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  // Mostrar/ocultar navbar según dirección de scroll + activar "Home" en el tope
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      if (y < 80) setActiveId("");
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detectar la sección activa según la que cruce el centro de la pantalla
  useEffect(() => {
    const sections = navLinks
      .filter((l) => l.id)
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll suave al hacer click (solo en la home; en otras rutas navega normal)
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    const offset = headerRef.current?.offsetHeight ?? 96;
    if (!id) {
      lenis?.scrollTo(0);
      setActiveId("");
    } else {
      const el = document.getElementById(id);
      if (el) lenis?.scrollTo(el, { offset: -offset });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full bg-background transition-transform duration-600 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex max-w-[1760px] items-center justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
        {/* Izquierda — logo */}
        <div className="flex flex-1 justify-start">
          <Link
            href="/"
            aria-label="OLIVO — Inicio"
            onClick={(e) => handleClick(e, "")}
            className="shrink-0"
          >
            <Image
              src="/assets/logo-horizontal.png"
              alt="OLIVO — Estructuras Asfálticas"
              width={566}
              height={159}
              priority
              draggable={false}
              className="h-9 w-auto select-none md:h-13"
            />
          </Link>
        </div>

        {/* Centro — links */}
        <ul className="hidden items-center gap-7 text-base lg:flex">
          {navLinks.map(({ label, href, id }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={(e) => handleClick(e, id)}
                className={
                  activeId === id
                    ? "text-foreground"
                    : "text-foreground/40 transition-colors hover:text-foreground/70"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Derecha — CTAs */}
        <div className="hidden flex-1 items-center justify-end gap-7 text-base md:flex">
          <Link
            href="/#contact"
            onClick={(e) => handleClick(e, "contact")}
            className="transition-colors hover:text-foreground/60"
          >
            Contact Us
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground/60"
          >
            See All Work <span aria-hidden>↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
