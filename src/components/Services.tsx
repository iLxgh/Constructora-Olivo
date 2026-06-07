"use client";

import { useState } from "react";
import Image from "next/image";
import { Chevron } from "./icons";

const services = [
  {
    n: "01",
    title: "Maecenas at ex risus",
    image: "/assets/house-1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue eros, rutrum vel erat sed, interdum accumsan sapien. Sed at malesuada lacus. Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante.",
  },
  {
    n: "02",
    title: "Quisque et mauris",
    image: "/assets/house-3.png",
    description:
      "Donec a purus suscipit, pretium sem eu, imperdiet felis. In hac habitasse platea dictumst. Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante laoreet at ultrices id porttitor.",
  },
  {
    n: "03",
    title: "Sed tincidunt posuere sem",
    image: "/assets/house-5.png",
    description:
      "Praesent nec ex eget quam molestie finibus ut faucibus sapien. Aenean ac ligula commodo tellus dapibus iaculis. Aenean porta hendrerit tellus ut dapibus augue viverra et.",
  },
  {
    n: "04",
    title: "Pellentesque arcu ante",
    image: "/assets/house-7.png",
    description:
      "Sed at malesuada lacus. Donec a purus suscipit, pretium sem eu, imperdiet felis. Praesent nec ex eget quam molestie finibus ut faucibus sapien aenean ligula commodo.",
  },
];

export default function Services() {
  const [active, setActive] = useState(2);

  return (
    <section id="services" className="mx-auto max-w-[1760px] px-6 pt-16 md:px-10 md:pt-24">
      {/* Header */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-[1.04] tracking-tight md:text-5xl">
            Discover Our Services
          </h2>
          <p className="mt-4 text-base leading-4.5 text-foreground/50">
            Mauris porttitor vestibulum arcu, sit amet ornare felis.
          </p>
        </div>
        <p className="text-2xl leading-6.5 text-right text-black md:pt-1">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Aliquam, augue vitae imperdiet ultricies, quam
          nulla pretium ipsum.
        </p>
      </div>

      {/* Content */}
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
