// Signature motif — the Széchenyi Chain Bridge, drawn properly:
// twin stone towers with arched portals, double catenary chains passing
// over the tower tops, hangers down to the deck, and anchor sweeps.
export default function BridgeDivider({ tone = 'gold' }) {
  const stroke = tone === 'ink' ? '#8a6f3d' : '#AD9160'

  // catenary chain path (upper + lower chain, offset)
  const chain = (dy) =>
    `M0 ${64 + dy}
     C 140 ${64 + dy}, 300 ${58 + dy}, 392 ${26 + dy}
     M 428 ${26 + dy}
     C 520 ${52 + dy}, 560 ${66 + dy}, 610 ${66 + dy}
     C 660 ${66 + dy}, 700 ${52 + dy}, 792 ${26 + dy}
     M 828 ${26 + dy}
     C 920 ${58 + dy}, 1080 ${64 + dy}, 1220 ${64 + dy}`

  // stone tower with arched portal, centred on x
  const Tower = ({ x }) => (
    <g stroke={stroke} fill="none">
      {/* tower body */}
      <path
        d={`M${x - 22} 92 L${x - 22} 30 L${x - 16} 30 L${x - 16} 22 L${x + 16} 22 L${x + 16} 30 L${x + 22} 30 L${x + 22} 92`}
        strokeWidth="1.3"
      />
      {/* cornice */}
      <line x1={x - 22} y1="34" x2={x + 22} y2="34" strokeWidth="0.8" opacity="0.8" />
      {/* arched portal */}
      <path
        d={`M${x - 9} 92 L${x - 9} 56 A 9 11 0 0 1 ${x + 9} 56 L${x + 9} 92`}
        strokeWidth="1"
      />
    </g>
  )

  return (
    <svg
      className="bridge"
      viewBox="0 0 1220 100"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      aria-hidden="true"
    >
      {/* deck */}
      <line x1="0" y1="92" x2="1220" y2="92" stroke={stroke} strokeWidth="1.4" />
      <line x1="0" y1="87" x2="1220" y2="87" stroke={stroke} strokeWidth="0.6" opacity="0.55" />

      {/* double chains */}
      <path d={chain(0)} fill="none" stroke={stroke} strokeWidth="1.1" />
      <path d={chain(4)} fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.6" />

      {/* hangers — centre span */}
      {[470, 505, 540, 575, 610, 645, 680, 715, 750].map((x) => {
        // approximate chain height across centre sag
        const t = Math.min(1, Math.abs(x - 610) / 182)
        const y = 66 - 40 * Math.pow(t, 1.7)
        return <line key={x} x1={x} y1={y} x2={x} y2="87" stroke={stroke} strokeWidth="0.55" opacity="0.6" />
      })}
      {/* hangers — side spans */}
      {[120, 200, 280, 940, 1020, 1100].map((x) => {
        const d = x < 610 ? (392 - x) / 392 : (x - 828) / 392
        const y = 26 + (64 - 26) * (1 - Math.max(0, 1 - d) ** 1.6)
        return <line key={x} x1={x} y1={y} x2={x} y2="87" stroke={stroke} strokeWidth="0.55" opacity="0.45" />
      })}

      <Tower x={410} />
      <Tower x={810} />

      {/* anchor blocks */}
      <path d="M0 92 L0 70 L14 70 L14 92" fill="none" stroke={stroke} strokeWidth="1" opacity="0.8" />
      <path d="M1220 92 L1220 70 L1206 70 L1206 92" fill="none" stroke={stroke} strokeWidth="1" opacity="0.8" />
    </svg>
  )
}
