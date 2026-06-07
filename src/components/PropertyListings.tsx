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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIdx, setActiveIdx] = useState(N);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const cardEl = track.children[0] as HTMLElement;
    const step = cardEl.offsetWidth + GAP;
    const centerOffset = (track.clientWidth - cardEl.offsetWidth) / 2;
    const idx = Math.round((track.scrollLeft + centerOffset) / step);
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[N] as HTMLElement | undefined;
    if (!card) return;
    track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    updateActive();
  }, [updateActive]);

  const doWrap = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const cardEl = track.children[0] as HTMLElement;
    const step = cardEl.offsetWidth + GAP;
    const centerOffset = (track.clientWidth - cardEl.offsetWidth) / 2;
    const oneSetW = step * N;

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
  }, [updateActive]);

  const onScroll = useCallback(() => {
    if (jumpingRef.current) return;
    updateActive();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(doWrap, 150);
  }, [doWrap, updateActive]);

  const slide = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const step = (track.children[0] as HTMLElement).offsetWidth + GAP;
    track.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1760px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl leading-[1.04] tracking-tight md:text-5xl">
            Explore Our Property Listings
          </h2>
          <p className="mt-4 max-w-md text-base leading-4.5 text-foreground/50">
            Mauris porttitor vestibulum arcu, sit amet ornare felis. Nulla
            hendrerit maximus risus.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm">
            <PinIcon className="h-4 w-4" /> Mexico, Veracruz
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-12 flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory"
      >
        {LOOPED.map((item, i) => {
          const isActive = i === activeIdx;
          return (
            <Link
              key={`${item.slug}-${i}`}
              href={`/work/${item.slug}`}
              className={`group block shrink-0 snap-center basis-[85%] origin-center transition-transform duration-500 ease-in-out sm:basis-[65%] lg:basis-[55%] ${
                isActive ? "scale-100" : "scale-[0.88]"
              }`}
            >
              <div className="relative h-[400px] overflow-hidden rounded-sm md:h-[500px]">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
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
