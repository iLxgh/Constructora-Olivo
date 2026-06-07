export default function Footer() {
  return (
    <footer className="overflow-hidden pt-10 pb-12">
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="px-6 text-[14vw] font-medium leading-none tracking-tight md:text-[10vw]"
            >
              START A PROJECT&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="px-6 text-[14vw] font-medium leading-none tracking-tight md:text-[10vw]"
            >
              START A PROJECT&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1760px] px-6 md:px-10">
        <div className="mt-16 grid grid-cols-1 gap-12 pb-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl leading-6.5 text-foreground/60">Building Veracruz</h3>
            <p className="mt-6 max-w-sm text-base leading-4.5 text-foreground/50">
              For over a decade, OLIVO has shaped the built environment across
              Mexico — homes, schools, roads, and commercial spaces. Every
              structure we raise reflects our craft.
            </p>
          </div>
          <div>
            <h3 className="text-2xl leading-6.5 text-foreground/60">Get in Touch</h3>
            <p className="mt-6 max-w-sm text-base leading-4.5 text-foreground/50">
              Veracruz, México<br />
              hola@constructoraolivo.com<br />
              +52 (229) 000 0000
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-foreground/15 pt-6 text-sm text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 OLIVO Constructora</span>
          <span>Veracruz, México</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
