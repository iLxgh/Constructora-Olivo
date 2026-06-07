"use client";

import { useState } from "react";
import Image from "next/image";
import { Chevron } from "./icons";

const services = [
  {
    n: "01",
    title: "Residential Construction",
    image: "/assets/house-1.png",
    description:
      "From single-family homes to multi-unit developments — quality living spaces designed with structural integrity, premium materials, and timeless aesthetics built to last.",
  },
  {
    n: "02",
    title: "Commercial & Industrial",
    image: "/assets/house-3.png",
    description:
      "Offices, warehouses, and retail developments engineered for performance and durability. We deliver commercial projects that meet the highest standards of function and long-term value.",
  },
  {
    n: "03",
    title: "Public Infrastructure",
    image: "/assets/house-5.png",
    description:
      "Schools, highways, and public spaces built to serve communities for generations. Institutional construction is among our most meaningful work — and we treat it that way.",
  },
  {
    n: "04",
    title: "Urban Development",
    image: "/assets/house-7.png",
    description:
      "Streets, drainage systems, and integrated urban projects engineered with precision to improve the quality of life across growing communities throughout Veracruz.",
  },
];

export default function Services() {
  const [active, setActive] = useState(2);

  return (
    <section id="services" className="mx-auto max-w-[1760px] px-6 pt-16 md:px-10 md:pt-24">
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-[1.04] tracking-tight md:text-5xl">
            Discover Our Services
          </h2>
          <p className="mt-4 text-base leading-4.5 text-foreground/50">
            Decade-long expertise across every type of construction.
          </p>
        </div>
        <p className="text-2xl leading-6.5 text-right text-black md:pt-1">
          Whether raising a family home or delivering public infrastructure,
          we bring the same precision and accountability to every project
          we take on.
        </p>
      </div>

    
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        {/* Left: service list */}
        <ul className="flex flex-col gap-3">
          {services.map((svc, i) => (
            <li
              key={svc.n}
              onClick={() => setActive(i)}
              className={`flex cursor-pointer items-center justify-between rounded-md px-6 py-5 transition-colors ${
                i === active
                  ? "bg-[#dcdad3]"
                  : "bg-[#eae8e2] hover:bg-[#e3e1db]"
              }`}
            >
              <span className="flex items-center gap-6">
                <span className="text-sm text-foreground/50">{svc.n}</span>
                <span className="text-base">{svc.title}</span>
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30">
                <Chevron up={i === active} className="h-4 w-4" />
              </span>
            </li>
          ))}
        </ul>

        {/* Right: image + description with cross-fade */}
        <div>
          <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[300px]">
            {services.map((svc, i) => (
              <div
                key={svc.n}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src={svc.image} alt={svc.title} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="relative mt-5 min-h-20">
            {services.map((svc, i) => (
              <p
                key={svc.n}
                className={`absolute inset-x-0 text-base leading-4.5 text-foreground/60 transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                {svc.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
