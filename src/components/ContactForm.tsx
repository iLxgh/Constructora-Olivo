"use client";

import { useState } from "react";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      projectType: data.get("projectType"),
      message: data.get("message"),
    };

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
       <div className="mx-auto w-full max-w-xl">
        <h2 className="text-4xl leading-[1.04] tracking-tight md:text-5xl">
          Have a project in mind?
        </h2>

        {status === "success" ? (
          <div className="mt-10 rounded-sm bg-[#2c2c28] p-8">
            <p className="text-2xl leading-6.5">Message sent ✓</p>
            <p className="mt-3 text-base leading-4.5 text-background/60">
              Thank you for reaching out. Our team will get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 w-fit rounded-full bg-background px-8 py-3 text-sm text-foreground transition-opacity hover:opacity-90"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Full Name"
                name="name"
                placeholder="John Doe"
                autoComplete="name"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Phone"
                name="phone"
                type="tel"
                placeholder="+52 (229) 000 0000"
                autoComplete="tel"
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="projectType" className="text-sm text-background/70">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue=""
                  required
                  className="rounded-sm bg-[#2c2c28] px-4 py-3 text-sm text-background focus:outline-none focus:ring-1 focus:ring-background/30"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial / Industrial">
                    Commercial / Industrial
                  </option>
                  <option value="Public Works">Public Works</option>
                  <option value="Infrastructure / Roads">
                    Infrastructure / Roads
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-background/70">
                Tell Us About Your Project
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Location, scope, timeline, and any details you'd like us to know."
                className="resize-none rounded-sm bg-[#2c2c28] px-4 py-3 text-sm text-background placeholder:text-background/30 focus:outline-none focus:ring-1 focus:ring-background/30"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-fit rounded-full bg-background px-8 py-3 text-sm text-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
       </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-background/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="rounded-sm bg-[#2c2c28] px-4 py-3 text-sm text-background placeholder:text-background/30 focus:outline-none focus:ring-1 focus:ring-background/30"
      />
    </div>
  );
}
