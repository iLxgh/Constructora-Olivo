import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1760px] px-6 md:px-10">
      <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:py-14">
        <div className="flex flex-col gap-8">
          <h1 className="max-w-2xl text-4xl leading-[1.04] tracking-tight md:text-7xl">
            Over a decade of building what endures.
          </h1>

          <p className="max-w-xl text-base leading-4.5 text-foreground/60">
            Constructora OLIVO was founded on a simple conviction: that the
            spaces people live, work, and gather in deserve to be built with
            uncompromising care. For more than ten years, we&apos;ve delivered
            across the full breadth of construction — private residences,
            commercial developments, schools, highways, and the public
            infrastructure our communities depend on. 
          </p>
        </div>

        <div className="flex flex-col items-start gap-16 md:items-end md:text-right">
          <p className="text-2xl uppercase text-black leading-6.5">
            ©2026 Olivo Residence&nbsp;&nbsp; <br/> All Right Reserved
          </p>
          <p className="max-w-sm text-base leading-4.5 text-foreground/50">
            Constructora OLIVO delivers residential, commercial, and
            public infrastructure projects across Veracruz — over a decade of
            precision, accountability, and craft.
          </p>
        </div>
      </div>

      <div className="relative h-[55vh] w-full overflow-hidden rounded-sm md:h-[78vh]">
        <Image
          src="/assets/house-2.png"
          alt="OLIVO residence"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
