const stats = [
  { value: "+25", caption: "Mauris porttitor vestibulum arcu, sit amet ornare felis." },
  { value: "500+", caption: "Sed tincidunt posuere sem, nec tincidunt massa tincidunt" },
  { value: "98%", caption: "Proin ut efficitur turpis, quis pretium risus." },
  { value: "15+", caption: "Nunc blandit magna vitae tempus mattis. Pellentesque arcu ante" },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="mx-auto max-w-[1760px] px-6 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <h2 className="text-4xl tracking-tight md:text-6xl">
              Why Choose Us?
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/50">
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
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center text-center">
              <span className="text-5xl tracking-tight md:text-6xl">
                {s.value}
              </span>
              <p className="mt-3 max-w-[200px] text-sm leading-relaxed text-foreground/50">
                {s.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
