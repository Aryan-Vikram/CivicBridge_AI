// Subtle animated backdrop used behind every page — slow-drifting gradient
// blobs plus a faint connected-node network (echoing the bridge/network
// brand mark). Pure CSS animation, no extra dependencies. Sits fixed behind
// all content with pointer-events disabled so it never blocks interaction.

const NODES = [
  { x: 8, y: 18, delay: 0 },
  { x: 22, y: 62, delay: 1.2 },
  { x: 38, y: 12, delay: 2.4 },
  { x: 52, y: 48, delay: 0.8 },
  { x: 68, y: 24, delay: 1.8 },
  { x: 80, y: 70, delay: 0.4 },
  { x: 90, y: 38, delay: 2.1 },
  { x: 14, y: 85, delay: 1.5 },
  { x: 60, y: 88, delay: 0.6 },
];

const LINES: [number, number][] = [
  [0, 1], [1, 3], [3, 4], [4, 6], [3, 5], [1, 7], [4, 2], [5, 8], [0, 2],
];

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* drifting gradient blobs */}
      <div className="cb-blob cb-blob-1" />
      <div className="cb-blob cb-blob-2" />
      <div className="cb-blob cb-blob-3" />

      {/* connected node network */}
      <svg
        className="cb-node-layer"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            className="cb-node-line"
            style={{ animationDelay: `${(i % 5) * 0.6}s` }}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="0.6"
            className="cb-node-dot"
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </svg>

      <style>{`
        .cb-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.16;
          will-change: transform;
        }
        html.dark .cb-blob { opacity: 0.14; }

        .cb-blob-1 {
          width: 420px; height: 420px;
          background: #2451FF;
          top: -80px; left: -60px;
          animation: cb-drift-1 26s ease-in-out infinite;
        }
        .cb-blob-2 {
          width: 380px; height: 380px;
          background: #4F46E5;
          bottom: -100px; right: -60px;
          animation: cb-drift-2 32s ease-in-out infinite;
        }
        .cb-blob-3 {
          width: 300px; height: 300px;
          background: #10B981;
          top: 40%; left: 60%;
          animation: cb-drift-3 22s ease-in-out infinite;
        }

        @keyframes cb-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(60px, 40px) scale(1.1); }
          66%      { transform: translate(-20px, 80px) scale(0.95); }
        }
        @keyframes cb-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%      { transform: translate(-70px, -30px) scale(1.08); }
          70%      { transform: translate(30px, -70px) scale(0.92); }
        }
        @keyframes cb-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, 50px) scale(1.15); }
        }

        .cb-node-layer { opacity: 0.55; }
        html.dark .cb-node-layer { opacity: 0.4; }

        .cb-node-line {
          stroke: #2451FF;
          stroke-width: 0.08;
          opacity: 0.25;
          stroke-dasharray: 2 2;
          animation: cb-line-pulse 4s ease-in-out infinite;
        }
        .cb-node-dot {
          fill: #2451FF;
          animation: cb-node-pulse 3.5s ease-in-out infinite;
        }

        @keyframes cb-line-pulse {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.35; }
        }
        @keyframes cb-node-pulse {
          0%, 100% { opacity: 0.35; r: 0.5; }
          50%      { opacity: 0.9; r: 0.9; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cb-blob, .cb-node-line, .cb-node-dot { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
