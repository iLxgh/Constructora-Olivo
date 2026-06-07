import Link from "next/link";

const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
];

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex max-w-[1760px] items-center justify-between gap-6 px-6 py-6 md:px-10 md:py-8">
        <ul className="hidden items-center gap-7 text-base md:flex">
          {navLinks.map(({ label, href }, i) => (
            <li key={label}>
              <Link
                href={href}
                className={
                  i === 0
                    ? "text-foreground"
                    : "text-foreground/40 transition-colors hover:text-foreground/70"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="text-lg font-medium tracking-[0.25em]">
          OLIVO
        </Link>

        <div className="hidden items-center gap-7 text-base md:flex">
          <Link href="/#contact" className="transition-colors hover:text-foreground/60">
            Contact Us
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground/60"
          >
            See All Work <span aria-hidden>↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
