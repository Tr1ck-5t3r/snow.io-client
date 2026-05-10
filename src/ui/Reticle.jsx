// src/ui/Reticle.jsx
export default function Reticle() {
  return (
    <svg
      className="reticle"
      viewBox="0 0 100 100"
      width="30"
      height="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal line */}
      <line x1="30" y1="50" x2="70" y2="50" stroke="black" strokeWidth="2" />
      {/* Vertical line */}
      <line x1="50" y1="30" x2="50" y2="70" stroke="black" strokeWidth="2" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill="black" />
    </svg>
  );
}
