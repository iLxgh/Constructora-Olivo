"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, PinIcon } from "./icons";
import { getFeaturedProjects } from "@/lib/projects";

const listings = getFeaturedProjects();

const LOOPED = [...listings, ...listings, ...listings];
const N = listings.length;
const GAP = 20; // gap-5 = 20px

export default function PropertyListings() {
  const trackRef = useRef<HTMLDivElement>(null);
  const jumpingRef = useRef(false);
  const animatingRef = useRef(false);
  const animRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [activeIdx, setActiveIdx] = useState(N);

  const metrics = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return null;
    const cardEl = track.children[0] as HTMLElement;
    const step = cardEl.offsetWidth + GAP;
    const centerOffset = (track.clientWidth - cardEl.offsetWidth) / 2;
    return { track, step, centerOffset, oneSetW: step * N };
  }, []);

  const updateActive = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const idx = Math.round((m.track.scrollLeft + m.centerOffset) / m.step);
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  }, [metrics]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[N] as HTMLElement | undefined;
    if (!card) return;
    track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    updateActive();
  }, [updateActive]);

  const doWrap = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const { track, step, centerOffset, oneSetW } = m;

    const jump = (delta: number) => {
      jumpingRef.current = true;
      track.style.scrollSnapType = "none";
      track.scrollLeft += delta;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.scrollSnapType = "";
          jumpingRef.current = false;
          updateActive();
        })
      );
    };

    if (track.scrollLeft < oneSetW - centerOffset - step / 2) {
      jump(oneSetW);
    } else if (track.scrollLeft > 2 * oneSetW - centerOffset - step / 2) {
      jump(-oneSetW);
    }
  }, [metrics, updateActive]);

  const onScroll = useCallback(() => {
    if (jumpingRef.current || animatingRef.current) return;
    updateActive();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(doWrap, 150);
  }, [doWrap, updateActive]);

  // Animación de scroll propia (consistente en Windows y Mac; el snap nativo
  // interrumpe scrollBy({behavior:"smooth"}) en Chrome/Windows).
  const animateTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      if (animRef.current) cancelAnimationFrame(animRef.current);

      const start = track.scrollLeft;
      const dist = target - start;
      if (Math.abs(dist) < 1) return;
      const duration = 500;
      const startT = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

      animatingRef.current = true;
      track.style.scrollSnapType = "none";

      const step = (now: number) => {
        const t = Math.min((now - startT) / duration, 1);
        track.scrollLeft = start + dist * ease(t);
        updateActive();
        if (t < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          animRef.current = null;
          animatingRef.current = false;
          track.style.scrollSnapType = "";
          doWrap();
        }
      };
      animRef.current = requestAnimationFrame(step);
    },
    [doWrap, updateActive]
  );

  // Desplaza a la tarjeta más cercana al centro
  const settleToNearest = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const idx = Math.round((m.track.scrollLeft + m.centerOffset) / m.step);
    animateTo(idx * m.step - m.centerOffset);
  }, [metrics, animateTo]);

  const slide = (dir: 1 | -1) => {
    const m = metrics();
    if (!m) return;
    animateTo(m.track.scrollLeft + m.step * dir);
  };

  // ── Drag con mouse (solo desktop; touch/trackpad usan el scroll nativo) ──
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
      animatingRef.current = false;
    }
    dragRef.current = {
      down: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
    track.style.scrollSnapType = "none";
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.down) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    track.scrollLeft = d.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.down) return;
    d.down = false;
    const track = trackRef.current;
    if (track) track.releasePointerCapture?.(e.pointerId);
    settleToNearest();
  };

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1760px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl leading-[1.04] tracking-tight md:text-5xl">
            Our Featured Projects
          </h2>
          <p className="mt-4 max-w-md text-base leading-4.5 text-foreground/50">
            A selection from our portfolio — each project a benchmark of
            precision, craftsmanship, and lasting design.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm">
            <PinIcon className="h-4 w-4" /> Mexico, Veracruz
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="mt-12 flex cursor-grab gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory select-none active:cursor-grabbing"
      >
        {LOOPED.map((item, i) => {
          const isActive = i === activeIdx;
          return (
            <Link
              key={`${item.slug}-${i}`}
              href={`/work/${item.slug}`}
              draggable={false}
              onClickCapture={(e) => {
                if (dragRef.current.moved) e.preventDefault();
              }}
              className={`group block shrink-0 snap-center basis-[85%] origin-center transition-transform duration-500 ease-in-out sm:basis-[65%] lg:basis-[55%] ${
                isActive ? "scale-100" : "scale-[0.78]"
              }`}
            >
              <div className="relative h-[400px] overflow-hidden rounded-sm md:h-[500px]">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 55vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                    <span className="-rotate-12 text-base tracking-wide text-white">
                      Details
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl leading-6.5">{item.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-base text-foreground/50">
                    <PinIcon className="h-4 w-4" /> {item.location}
                  </p>
                </div>
                <p className="max-w-[200px] text-right text-base leading-4.5 text-foreground/50">
                  {item.shortDescription}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mx-auto mt-8 flex max-w-[1760px] justify-end gap-3 px-6 md:px-10">
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Previous"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-foreground/25 transition-colors hover:bg-foreground hover:text-background"
        >
          <Arrow dir="left" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Next"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-foreground/25 transition-colors hover:bg-foreground hover:text-background"
        >
          <Arrow dir="right" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
