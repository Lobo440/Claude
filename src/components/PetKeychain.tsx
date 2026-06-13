/**
 * Stylized low-poly dog head keychain rendered in SVG — used as the
 * hero showpiece and as the live preview in the order form.
 */
export default function PetKeychain({
  name = "LUNA",
  collarHex = "#F472B6",
  className = "",
}: {
  name?: string;
  collarHex?: string;
  className?: string;
}) {
  const tag = name.trim().toUpperCase().slice(0, 10) || "LUNA";

  return (
    <svg
      viewBox="0 -30 200 248"
      className={className}
      role="img"
      aria-label={`Low-poly dog keychain with collar tag reading ${tag}`}
    >
      {/* keyring */}
      <circle cx="100" cy="-14" r="11" fill="none" stroke="#cbd5e1" strokeWidth="5" />
      <rect x="96" y="-4" width="8" height="12" rx="3" fill="#94a3b8" />

      {/* ears */}
      <polygon points="28,12 70,54 46,80" fill="#221c14" />
      <polygon points="38,30 62,54 50,70" fill="#8a4d1f" />
      <polygon points="172,12 130,54 154,80" fill="#2a221a" />
      <polygon points="162,30 138,54 150,70" fill="#7c4419" />

      {/* skull + brow */}
      <polygon points="70,54 130,54 100,90" fill="#3a2f23" />
      <polygon points="46,80 70,54 100,90" fill="#332a1f" />
      <polygon points="154,80 130,54 100,90" fill="#2e2519" />

      {/* cheeks */}
      <polygon points="46,80 100,90 58,134" fill="#c98a3b" />
      <polygon points="154,80 100,90 142,134" fill="#b87a30" />

      {/* jaw + chin */}
      <polygon points="58,134 78,126 100,170" fill="#9c6526" />
      <polygon points="142,134 122,126 100,170" fill="#8a5820" />
      <polygon points="78,126 122,126 100,170" fill="#ad7029" />

      {/* muzzle */}
      <polygon points="100,92 78,126 100,130" fill="#e8b063" />
      <polygon points="100,92 122,126 100,130" fill="#d99c4e" />
      <polygon points="88,128 112,128 100,148" fill="#16120d" />

      {/* eyes */}
      <ellipse cx="78" cy="102" rx="7" ry="9" fill="#16120d" />
      <circle cx="80.5" cy="99" r="2.2" fill="#fbbf24" />
      <ellipse cx="122" cy="102" rx="7" ry="9" fill="#16120d" />
      <circle cx="124.5" cy="99" r="2.2" fill="#fbbf24" />

      {/* collar */}
      <rect x="58" y="166" width="84" height="15" rx="5" fill={collarHex} />
      <rect x="58" y="166" width="84" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />

      {/* name tag */}
      <rect x="72" y="186" width="56" height="20" rx="10" fill={collarHex} stroke="rgba(0,0,0,0.35)" />
      <text
        x="100"
        y="200"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif", letterSpacing: "0.08em" }}
      >
        {tag}
      </text>
    </svg>
  );
}
