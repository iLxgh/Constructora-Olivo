export default function AboutVideo() {
  return (
    <section id="about" className="relative h-[80vh] w-full overflow-hidden mt-16 md:mt-24">
      {/*
        Video de fondo. Por ahora muestra el poster (imagen de prueba).
        Cuando tengas el video real, deja un archivo en /public/assets/about.mp4
        y descomenta el <source>; se reproducirá solo, en silencio y en loop.
      */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster="/assets/house-3.png"
        autoPlay
        muted
        loop
        playsInline
      >
        {/* <source src="/assets/about.mp4" type="video/mp4" /> */}
      </video>

      <div className="absolute inset-0 bg-black/10" />

      {/* Texto superior */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <span className="rounded-full bg-black/40 px-7 py-3 text-sm text-white backdrop-blur-md">
          What is OLIVO?
        </span>
      </div>

      {/* Recuadro inferior derecho, esquinado pero no pegado al borde */}
      <div className="absolute bottom-10 right-10 max-w-sm md:bottom-14 md:right-14">
        <p className="rounded-lg bg-black/40 p-5 text-sm leading-relaxed text-white/90 backdrop-blur-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec
          ex eget quam molestie finibus ut faucibus sapien. Aenean ac ligula
          commodo tellus dapibus iaculis. Aenean porta hendrerit tellus.
        </p>
      </div>
    </section>
  );
}
