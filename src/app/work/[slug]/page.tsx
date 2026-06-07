import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWork, works } from "@/lib/works";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  return {
    title: work ? `${work.title} — OLIVO Residence` : "OLIVO Residence",
  };
}

const specs = [
  { label: "Country", value: "Worcester, Manufacturing" },
  { label: "Collaboration", value: "Refshcusman (Architecture)" },
  { label: "Residences", value: "22" },
  { label: "Discipline", value: "Interior Design & Delivery" },
];

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="mx-auto max-w-[1760px] px-6 md:px-10">
        {/* Heading */}
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:py-14">
          <div>
            <Link
              href="/work"
              className="text-sm text-foreground/50 transition-colors hover:text-foreground"
            >
              ← All Work
            </Link>
            <h1 className="mt-4 text-4xl tracking-tight md:text-6xl">
              {work.title}
            </h1>
          </div>
          <p className="text-xs uppercase tracking-wider text-foreground/70 md:text-right">
            ©2026 Olivo Residence&nbsp;&nbsp;All Right Reserved
          </p>
        </div>

        {/* Meta bar */}
        <div className="grid grid-cols-2 gap-6 border-y border-foreground/15 py-6 text-sm md:grid-cols-4">
          <Meta label="Discipline" value={work.category} />
          <Meta label="Year" value={work.year} />
          <Meta label="Status" value="Complete" />
          <Meta label="Location" value="Veracruz, MX" />
        </div>

        {/* Hero image */}
        <div className="relative mt-8 aspect-[16/8] w-full overflow-hidden rounded-sm">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project details */}
        <div className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[1fr_1.5fr] md:gap-16 md:py-24">
          <Eyebrow>Project Details</Eyebrow>
          <div>
            <p className="text-lg leading-relaxed text-foreground/70 md:text-xl">
              Class aptent taciti sociosqu ad litora torquent per conubia nostra,
              per inceptos himenaeos. Mauris aliquam, augue vitae imperdiet
              ultrices, quam nulla pretium ipsum.
            </p>

            <dl className="mt-10 flex flex-col">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between border-t border-foreground/15 py-4 text-sm"
                >
                  <dt className="text-foreground/50">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Two images */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.6fr] md:gap-6">
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src="/assets/house-1.png"
              alt={`${work.title} detail`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
            <Image
              src="/assets/house-6.png"
              alt={`${work.title} detail`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Pull quote */}
        <blockquote className="py-16 md:py-28">
          <p className="max-w-4xl text-3xl leading-tight tracking-tight md:text-5xl">
            &ldquo;Ensuring the original design was improved upon.&rdquo;
          </p>
        </blockquote>

        {/* About the project */}
        <div className="grid grid-cols-1 gap-8 pb-16 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <Eyebrow>About the Project</Eyebrow>
          <p className="text-base leading-relaxed text-foreground/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam augue
            eros, rutrum vel erat sed, interdum accumsan sapien. Sed at malesuada
            lacus. Donec a purus suscipit, pretium sem eu, imperdiet felis. In
            hac habitasse platea dictumst. Nunc blandit magna vitae tempus
            mattis.
          </p>
        </div>

        {/* Wide closing image */}
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-sm">
          <Image
            src="/assets/house-2.png"
            alt={`${work.title} exterior`}
            fill
            className="object-cover"
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-foreground/50">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-wider text-foreground/50">
      {children}
    </p>
  );
}
