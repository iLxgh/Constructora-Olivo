"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, PinIcon } from "./icons";

const listings = [
  { slug: "armadale-office", title: "Griya Asri Residence", location: "Mexico, Veracruz", image: "/assets/house-3.png" },
  { slug: "caufield-north", title: "Caufield North", location: "Mexico, Veracruz", image: "/assets/house-5.png" },
  { slug: "penthouse-vivace", title: "Penthouse Vivace", location: "Mexico, Veracruz", image: "/assets/house-1.png" },
  { slug: "north-bay-house", title: "North Bay House", location: "Mexico, Veracruz", image: "/assets/house-4.png" },
  { slug: "partington", title: "Partington", location: "Mexico, Veracruz", image: "/assets/house-6.png" },
];

export default function PropertyListings() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.7;
    track.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="mx-auto max-w-[1760px] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl tracking-tight md:text-5xl">
          Explore Our Property Listings
        </h2>
        <p className="mt-4 max-w-md text-sm text-foreground/50">
          Mauris porttitor vestibulum arcu, sit amet ornare felis. Nulla
          hendrerit maximus risus.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm">
          <PinIcon className="h-4 w-4" /> Mexico, Veracruz
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {listings.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group block shrink-0 basis-[88%] snap-start sm:basis-[60%] lg:basis-[46%]"
          >
            <div className="relative h-[420px] overflow-hidden rounded-sm md:h-[520px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 88vw, 46vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Overlay con circulo difuminado en hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                  <span className="-rotate-12 text-base tracking-wide text-white">
                    Details
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <h3 className="text-xl">{item.title}</h3>
              <p className="inline-flex items-center gap-1 text-sm text-foreground/50">
                <PinIcon className="h-4 w-4" /> {item.location}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 transition-colors hover:bg-foreground hover:text-background"
        >
          <Arrow dir="left" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 transition-colors hover:bg-foreground hover:text-background"
        >
          <Arrow dir="right" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
