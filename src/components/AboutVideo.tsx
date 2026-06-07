"use client";

import { useRef, useState } from "react";

export default function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <section
      id="about"
      className="group relative mt-16 h-[80vh] w-full overflow-hidden md:mt-24"
    >
      {/*
        VIDEO PLACEHOLDER — reemplazar el src con el video real del cliente.
        Colocar el archivo en /public/assets/about.mp4 y cambiar el src a "/assets/about.mp4".
        El video actual es un clip CC0 de prueba.
      */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/assets/house-3.png"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        src="https://media.w3.org/2010/05/sintel/trailer.mp4"
      />

      {/* Overlay oscuro — más claro cuando el video está en reproducción */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          playing ? "bg-black/20" : "bg-black/40"
        }`}
      />

      {/* Pill superior */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <span className="rounded-full bg-black/40 px-7 py-3 text-base text-white backdrop-blur-md">
          What is OLIVO?
        </span>
      </div>

      {/* Botón play / pause centrado */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md transition-all duration-400 hover:bg-white/25 ${
          playing
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-100"
        }`}
      >
        {playing ? (
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="5" y="3" width="4" height="18" rx="1.5" />
            <rect x="15" y="3" width="4" height="18" rx="1.5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="h-7 w-7 translate-x-0.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 4.75a1 1 0 0 1 1.514-.857l13 7.25a1 1 0 0 1 0 1.714l-13 7.25A1 1 0 0 1 6 19.25V4.75Z" />
          </svg>
        )}
      </button>

      {/* Texto inferior derecho */}
      <div className="absolute bottom-10 right-10 max-w-sm md:bottom-14 md:right-14">
        <p className="rounded-lg bg-black/40 p-5 text-base leading-4.5 text-white/90 backdrop-blur-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec
          ex eget quam molestie finibus ut faucibus sapien. Aenean ac ligula
          commodo tellus dapibus iaculis. Aenean porta hendrerit tellus.
        </p>
      </div>
    </section>
  );
}
