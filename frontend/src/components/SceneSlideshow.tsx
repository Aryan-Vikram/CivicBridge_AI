// Auto-cycling cinematic backdrop for the hero section: five hand-crafted
// scenes (space, earth, forest, water, desert) built entirely from CSS
// gradients + inline SVG — no external images, so there's nothing to load,
// nothing to license, and it never breaks offline. Each scene holds for a
// few seconds then cross-fades into the next, looping forever.

const SCENE_COUNT = 5;
const PER_SCENE_SECONDS = 6;
const TOTAL = SCENE_COUNT * PER_SCENE_SECONDS;

function sceneKeyframes(index: number) {
  const start = (index / SCENE_COUNT) * 100;
  const holdEnd = ((index + 0.72) / SCENE_COUNT) * 100;
  const end = ((index + 1) / SCENE_COUNT) * 100;
  const fadeIn = start + 2;
  const fadeOut = holdEnd;
  return `
    @keyframes cb-scene-${index} {
      0%, ${start}% { opacity: 0; }
      ${fadeIn}% { opacity: 1; }
      ${fadeOut}% { opacity: 1; }
      ${end}%, 100% { opacity: 0; }
    }
  `;
}

export function SceneSlideshow() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
    >
      {/* SCENE 1 — Universe */}
      <div className="cb-scene" style={{ animation: `cb-scene-0 ${TOTAL}s ease-in-out infinite` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 20%, #2a2470 0%, #0b0b2e 45%, #030310 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 65%, rgba(139,92,246,0.35), transparent 55%)" }} />
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = (i * 47) % 100;
            const cy = (i * 83) % 100;
            const r = (i % 3) * 0.4 + 0.4;
            return (
              <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r} fill="#fff" className="cb-star" style={{ animationDelay: `${(i % 10) * 0.4}s` }} />
            );
          })}
        </svg>
      </div>

      {/* SCENE 2 — Earth / World */}
      <div className="cb-scene" style={{ animation: `cb-scene-1 ${TOTAL}s ease-in-out infinite` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #1e6fd9 0%, #0b3f85 55%, #052248 100%)" }} />
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          <ellipse cx="30" cy="35" rx="16" ry="10" fill="#1f8a56" opacity="0.75" />
          <ellipse cx="68" cy="55" rx="20" ry="13" fill="#237a4a" opacity="0.7" />
          <ellipse cx="45" cy="75" rx="12" ry="7" fill="#1f8a56" opacity="0.6" />
          <ellipse cx="80" cy="20" rx="10" ry="6" fill="#237a4a" opacity="0.55" />
        </svg>
        <div className="cb-cloud-drift" style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.25), transparent 70%)" }} />
      </div>

      {/* SCENE 3 — Forest / Greenery */}
      <div className="cb-scene" style={{ animation: `cb-scene-2 ${TOTAL}s ease-in-out infinite` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #bfe6c9 0%, #6fb98a 45%, #2f7a4f 100%)" }} />
        <div style={{ position: "absolute", top: "12%", left: "62%", width: 90, height: 90, borderRadius: "9999px", background: "radial-gradient(circle, rgba(255,244,214,0.9), transparent 70%)" }} />
        <svg width="100%" height="45%" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = i * 9 + (i % 2) * 3;
            const h = 18 + (i % 3) * 6;
            return <polygon key={i} points={`${x},40 ${x + 4.5},${40 - h} ${x + 9},40`} fill={i % 2 === 0 ? "#1f5c37" : "#164a2b"} opacity="0.9" />;
          })}
        </svg>
      </div>

      {/* SCENE 4 — Water resource */}
      <div className="cb-scene" style={{ animation: `cb-scene-3 ${TOTAL}s ease-in-out infinite` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #cdeaf5 0%, #4fb3d9 40%, #0e6ea8 100%)" }} />
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          <path d="M0,60 Q 25,50 50,60 T 100,60 V100 H0 Z" fill="#0b5f92" opacity="0.55" className="cb-wave" />
          <path d="M0,72 Q 25,64 50,72 T 100,72 V100 H0 Z" fill="#094e79" opacity="0.7" className="cb-wave" style={{ animationDelay: "1.2s" }} />
          <path d="M0,86 Q 25,80 50,86 T 100,86 V100 H0 Z" fill="#073c5e" opacity="0.85" className="cb-wave" style={{ animationDelay: "2.4s" }} />
        </svg>
      </div>

      {/* SCENE 5 — Desert */}
      <div className="cb-scene" style={{ animation: `cb-scene-4 ${TOTAL}s ease-in-out infinite` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #ffe3b0 0%, #f4b860 45%, #d98a3d 100%)" }} />
        <div style={{ position: "absolute", top: "10%", right: "18%", width: 80, height: 80, borderRadius: "9999px", background: "radial-gradient(circle, rgba(255,250,235,0.95), transparent 70%)" }} />
        <svg width="100%" height="45%" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0 }}>
          <path d="M0,30 Q20,15 40,28 T100,22 V40 H0 Z" fill="#c97a34" opacity="0.85" />
          <path d="M0,36 Q30,24 60,34 T100,30 V40 H0 Z" fill="#a8632a" opacity="0.9" />
        </svg>
      </div>

      {/* readability overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,11,24,0.55) 0%, rgba(6,11,24,0.72) 100%)" }} />

      <style>{`
        .cb-scene { position: absolute; inset: 0; opacity: 0; }
        ${Array.from({ length: SCENE_COUNT }).map((_, i) => sceneKeyframes(i)).join("\n")}

        .cb-star { animation: cb-twinkle 3s ease-in-out infinite; }
        @keyframes cb-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }

        .cb-cloud-drift {
          position: absolute; top: 20%; left: -20%; width: 60%; height: 40%;
          animation: cb-cloud-move 18s ease-in-out infinite;
        }
        @keyframes cb-cloud-move {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(140px); }
        }

        .cb-wave { animation: cb-wave-shift 6s ease-in-out infinite; transform-origin: center; }
        @keyframes cb-wave-shift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-3px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cb-scene { animation: none !important; }
          .cb-scene:first-child { opacity: 1; }
          .cb-star, .cb-cloud-drift, .cb-wave { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
