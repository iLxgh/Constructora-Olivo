import Image from "next/image";
import { Chevron } from "./icons";

const items = [
  { n: "01", t: "Maecenas at ex risus", active: false },
  { n: "02", t: "Quisque et mauris", active: false },
  { n: "03", t: "Sed tincidunt posuere sem", active: true },
  { n: "04", t: "Pellentesque arcu ante", active: false },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1760px] px-6 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-[1.04] tracking-tight md:text-5xl">
            Discover Our Services
          </h2>
          <p className="mt-4 text-base leading-4.5 text-foreground/50">
            Mauris porttitor vestibulum arcu, sit amet ornare felis.
          </p>
        </div>
        <p className="text-base leading-4.5 text-foreground/60 md:pt-1">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Aliquam, augue vitae imperdiet ultricies, quam
          nulla pretium ipsum.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <li
              key={it.n}
              className={`flex items-center justify-between rounded-md px-6 py-5 transition-colors ${
                it.active ? "bg-[#dcdad3]" : "bg-[#eae8e2]"
              }`}
            >
              <span className="flex items-center gap-6">
                <span className="text-sm text-foreground/50">{it.n}</span>
                <span className="text-base">{it.t}</span>
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30">
                <Chevron up={it.active} className="h-4 w-4" />
              </span>
            </li>
          ))}
        </ul>

        <div>
          <div className="relative h-[260px] overflow-hidden rounded-sm md:h-[300px]">
            <Image
              src="/assets/house-5.png"
              alt="Service preview"
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-5 text-base leading-4.5 text-foreground/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue
            eros, rutrum vel erat sed, interdum accumsan sapien. Sed at malesuada
            lacus.
          </p>
          <p className="mt-4 text-base leading-4.5 text-foreground/60">
            Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante.
          </p>
        </div>
      </div>
    </section>
  );
}
