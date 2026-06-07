import Image from "next/image";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="grid w-full grid-cols-1 lg:min-h-screen lg:grid-cols-2"
    >
      <div className="relative h-64 lg:h-auto">
        <Image
          src="/assets/house-6.png"
          alt="OLIVO residence garden"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center bg-[#1e1e1b] p-8 text-background md:p-16">
        <h2 className="text-3xl leading-tight tracking-tight md:text-5xl">
          Still haven&apos;t found what you&apos;re looking for?
        </h2>

        <form className="mt-10 flex max-w-xl flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="First Name" placeholder="First Name" />
            <Field label="Last Name" placeholder="Last Name" />
          </div>
          <Field label="I Want To" placeholder="Build a Home" />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-background/70">Notes</label>
            <textarea
              rows={4}
              className="resize-none rounded-sm bg-[#2c2c28] px-4 py-3 text-sm text-background placeholder:text-background/30 focus:outline-none focus:ring-1 focus:ring-background/30"
            />
          </div>

          <button
            type="button"
            className="mt-2 w-fit rounded-full bg-background px-8 py-3 text-sm text-foreground transition-opacity hover:opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-background/70">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-sm bg-[#2c2c28] px-4 py-3 text-sm text-background placeholder:text-background/30 focus:outline-none focus:ring-1 focus:ring-background/30"
      />
    </div>
  );
}
