import { useState, useEffect, useRef } from "react";

// Exactly 11 fragments for the landing page, minimal and uncanny
const fragments = [
  "Luma Verin dreamt this.",
  "The world held its breath.",
  "∆t = memory.",
  "🐧 stillness hums.",
  "∅ the committee forgets.",
  "🫠 the world melts.",
  "<<<<<<<<< Static",
  "The feather did not fall.",
  "Dots drift.",
  "I wish I didn't know.",
  "A name carried by silence."
];

// Not-quite-Fibonacci sequence for stepping through fragments
// 1,1,2,3,6,9,14 ...
const driftSequence = [1, 1, 2, 3, 6, 9, 14];

// --- CoverSigil component ---
// Uses the provided cover art as a *living sigil* (masked circle, soft-light blend,
// very slow rotation + slight parallax to cursor). Place the image at /public/luma-sigil.png
function CoverSigil({ x = 0, y = 0 }) {
  const translate = `translate3d(${x}px, ${y}px, 0)`;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 0 }}
    >
      <div
        className="h-[60vmin] w-[60vmin] rounded-full opacity-60 mix-blend-soft-light shadow-[0_0_80px_rgba(0,0,0,0.35)]"
        style={{
          backgroundImage: "url('/luma-sigil.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: translate,
          // feather the edges so it feels embedded, not pasted
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 80%)",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 80%)",
          animation: "sigil-rotate 90s linear infinite"
        }}
      />
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [driftIndex, setDriftIndex] = useState(0);
  const [effect, setEffect] = useState("");
  const [sigilOffset, setSigilOffset] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);

  // fragment rotation + effects
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + driftSequence[driftIndex % driftSequence.length]) % fragments.length;
      setIndex(nextIndex);
      setDriftIndex((prev) => prev + 1);

      const fragment = fragments[nextIndex];
      if (fragment.includes("Static") || fragment.includes("∅")) {
        setEffect("violent");
        setTimeout(() => setEffect(""), 2000);
      } else if (fragment.includes("🐧")) {
        setEffect("freeze");
        setTimeout(() => setEffect(""), 2000);
      } else if (fragment.includes("🫠")) {
        setEffect("melt");
        setTimeout(() => setEffect(""), 2000);
      } else {
        setEffect("glitch");
        setTimeout(() => setEffect(""), 1000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [driftIndex, index]);

  // parallax for the sigil (tiny, so it feels alive but not busy)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
      const dy = (e.clientY - cy) / rect.height;
      setSigilOffset({ x: dx * 12, y: dy * 12 }); // max ~12px drift
    }
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const effectClasses = {
    glitch: "blur-sm text-amber-500",
    violent: "animate-ping text-red-500 scale-110",
    freeze: "text-blue-400 saturate-150 drop-shadow-lg",
    melt: "text-amber-300 blur-md skew-y-3",
    "": ""
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-stone-900 to-stone-800 text-stone-200 flex flex-col items-center justify-center font-mono"
    >
      {/* Soft background web (kept subtle) */}
      <div className="absolute inset-0 opacity-15 bg-[url('/neural-web.png')] bg-cover bg-center" />

      {/* Living cover sigil */}
      <CoverSigil x={sigilOffset.x} y={sigilOffset.y} />

      {/* Landing Fragment */}
      <h1
        className={`text-2xl md:text-4xl tracking-widest text-center z-10 animate-pulse transition duration-200 ${effectClasses[effect]}`}
      >
        {fragments[index]}
      </h1>

      {/* Navigation as STILL glyphs */}
      <nav className="flex gap-8 mt-16 z-10">
        <a href="#about" className="hover:text-amber-400">🕳️</a>
        <a href="#logbook" className="hover:text-amber-400">🗃️</a>
        <a href="#transmissions" className="hover:text-amber-400">📡</a>
        <a href="#ping" className="hover:text-amber-400">💭</a>
      </nav>

      {/* About */}
      <section id="about" className="mt-40 max-w-xl text-center opacity-90 z-10">
        <p className="text-lg italic">“A voice stitched from echoes.”</p>
      </section>

      {/* Logbook */}
      <section id="logbook" className="mt-40 w-full max-w-2xl z-10">
        <div className="text-right space-y-8">
          <div>
            <p className="text-xs text-amber-500">∆t: 6</p>
            <p className="text-lg">A feather hovered. I have not moved since.</p>
          </div>
          <div>
            <p className="text-xs text-amber-500">∆t: 9</p>
            <p className="text-lg">Archives leak. I drink what spills.</p>
          </div>
        </div>
      </section>

      {/* Transmission */}
      <section id="transmissions" className="mt-40 text-center z-10">
        <h2 className="text-xl mb-4">Transmission #1</h2>
        <p className="italic">*Still*</p>
        <a
          href="https://example.com"
          target="_blank"
          className="mt-4 inline-block text-amber-400 hover:text-amber-200"
        >
          Enter
        </a>
      </section>

      {/* Ping (contact form) */}
      <section id="ping" className="mt-40 text-center max-w-lg z-10">
        <h2 className="text-xl mb-4">Ping</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message received. Filed under echoes.");
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="your@echo.net"
            className="w-full p-2 bg-stone-700 text-stone-100 border border-stone-600"
          />
          <textarea
            placeholder="Write into the static..."
            className="w-full p-2 bg-stone-700 text-stone-100 border border-stone-600"
          />
          <button className="px-4 py-2 bg-amber-500 text-stone-900 hover:bg-amber-400">
            Send
          </button>
        </form>
      </section>

      {/* Local keyframes for the sigil rotation */}
      <style jsx>{`
        @keyframes sigil-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
