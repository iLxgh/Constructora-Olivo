import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkGallery from "@/components/work/WorkGallery";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  title: "All Work — OLIVO Residence",
  description: "Selected projects by OLIVO Residence.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-[1760px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:py-14">
          <h1 className="text-4xl tracking-tight md:text-6xl">
            All Work ({works.length})
          </h1>
          <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
            <p className="text-xs uppercase tracking-wider text-foreground/70">
              ©2026 Olivo Residence&nbsp;&nbsp;All Right Reserved
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              nec ex eget quam molestie finibus ut faucibus sapien.
            </p>
          </div>
        </div>

        <div className="pb-16 md:pb-24">
          <WorkGallery works={works} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
