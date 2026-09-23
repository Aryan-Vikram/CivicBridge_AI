export function Logo({ size = 30 }: { size?: number }) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="cb-logo-pulse"
      >
        <rect width="40" height="40" rx="10" fill="#2451FF" />
        <path d="M8 26c2-6 6-10 12-10s10 4 12 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="8" cy="27.5" r="2.4" fill="white" className="cb-logo-dot" style={{ animationDelay: "0s" }} />
        <circle cx="20" cy="15.5" r="2.6" fill="white" className="cb-logo-dot" style={{ animationDelay: "0.4s" }} />
        <circle cx="32" cy="27.5" r="2.4" fill="white" className="cb-logo-dot" style={{ animationDelay: "0.8s" }} />
        <path d="M8 27.5L20 15.5L32 27.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>
      <style>{`
        .cb-logo-pulse { filter: drop-shadow(0 0 0 rgba(36,81,255,0)); animation: cb-logo-glow 3s ease-in-out infinite; }
        @keyframes cb-logo-glow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(36,81,255,0.5)); }
          50% { filter: drop-shadow(0 0 6px rgba(36,81,255,0.65)); }
        }
        .cb-logo-dot { animation: cb-logo-dot-pulse 2.4s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes cb-logo-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cb-logo-pulse, .cb-logo-dot { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
