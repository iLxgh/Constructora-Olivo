import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/works";

type WorkCardProps = {
  work: Work;
  /** Number of columns in the row this card belongs to. Drives the aspect ratio. */
  cols: 1 | 2 | 3;
};

function aspectClass(cols: 1 | 2 | 3) {
  if (cols === 1) return "aspect-[16/7]";
  if (cols === 3) return "aspect-[4/3]";
  return "aspect-[3/2]";
}

export default function WorkCard({ work, cols }: WorkCardProps) {
  return (
    <Link href={`/work/${work.slug}`} className="group block">
      <div
        className={`relative overflow-hidden rounded-sm ${aspectClass(cols)}`}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <h3 className="text-base">{work.title}</h3>
        <div className="flex items-center gap-6 text-sm text-foreground/50">
          <span>{work.category}</span>
          <span>{work.year}</span>
        </div>
      </div>
    </Link>
  );
}
