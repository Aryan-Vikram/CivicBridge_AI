export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="40" height="40" rx="10" fill="#2451FF" />
      <path d="M8 26c2-6 6-10 12-10s10 4 12 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="8" cy="27.5" r="2.4" fill="white" />
      <circle cx="20" cy="15.5" r="2.6" fill="white" />
      <circle cx="32" cy="27.5" r="2.4" fill="white" />
      <path d="M8 27.5L20 15.5L32 27.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}
