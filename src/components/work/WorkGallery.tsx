import type { Work } from "@/lib/works";
import WorkCard from "./WorkCard";

/** Repeating row layout: 2 items, then 3, then 1 large — then it loops. */
const PATTERN: (1 | 2 | 3)[] = [2, 3, 1];

function gridClass(cols: 1 | 2 | 3) {
  if (cols === 1) return "grid grid-cols-1";
  if (cols === 3)
    return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6";
  return "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6";
}

export default function WorkGallery({ works }: { works: Work[] }) {
  const rows: { cols: 1 | 2 | 3; items: Work[] }[] = [];
  let index = 0;
  let step = 0;

  while (index < works.length) {
    const cols = PATTERN[step % PATTERN.length];
    rows.push({ cols, items: works.slice(index, index + cols) });
    index += cols;
    step += 1;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {rows.map((row, i) => (
        <div key={i} className={gridClass(row.cols)}>
          {row.items.map((work) => (
            <WorkCard key={work.slug} work={work} cols={row.cols} />
          ))}
        </div>
      ))}
    </div>
  );
}
