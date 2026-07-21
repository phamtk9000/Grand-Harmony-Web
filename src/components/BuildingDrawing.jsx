// Signature line drawing of the Grand Harmony facade, drawn in the same
// stroke language as BridgeDivider — thin gold lines, no fill, symmetrical.
export default function BuildingDrawing({ tone = 'gold' }) {
  const stroke = tone === 'ink' ? '#8a6f3d' : '#AD9160'

  // window at (x,y) with size w,h and a mullion; arched=true gives round head
  const Window = ({ x, y, w, h, arched = false }) => (
    <g stroke={stroke} fill="none" strokeWidth="0.9">
      {arched ? (
        <path d={`M${x} ${y + h} L${x} ${y + w / 2} A ${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} L${x + w} ${y + h}`} />
      ) : (
        <rect x={x} y={y} width={w} height={h} />
      )}
      <line x1={x + w / 2} y1={arched ? y + 2 : y} x2={x + w / 2} y2={y + h} strokeWidth="0.5" opacity="0.7" />
      {!arched && <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} strokeWidth="0.5" opacity="0.5" />}
    </g>
  )

  // a horizontal row of `n` windows evenly spread between x0..x1
  const Row = ({ x0, x1, y, w, h, n, arched }) => {
    const gap = (x1 - x0 - n * w) / (n - 1)
    return (
      <g>
        {Array.from({ length: n }).map((_, i) => (
          <Window key={i} x={x0 + i * (w + gap)} y={y} w={w} h={h} arched={arched} />
        ))}
      </g>
    )
  }

  const L = 40, R = 300, top = 26

  return (
    <svg
      className="building-drawing"
      viewBox="0 0 340 360"
      preserveAspectRatio="xMidYMax meet"
      role="presentation"
      aria-hidden="true"
    >
      {/* outer wall */}
      <rect x={L} y={top} width={R - L} height={310} stroke={stroke} strokeWidth="1.3" fill="none" />

      {/* roof cornice + parapet */}
      <line x1={L - 6} y1={top} x2={R + 6} y2={top} stroke={stroke} strokeWidth="1.3" />
      <line x1={L - 6} y1={top - 6} x2={R + 6} y2={top - 6} stroke={stroke} strokeWidth="0.7" opacity="0.7" />
      <line x1={L} y1={top + 8} x2={R} y2={top + 8} stroke={stroke} strokeWidth="0.5" opacity="0.5" />

      {/* attic / mansard windows (small, 5) */}
      <Row x0={70} x1={270} y={top + 16} w={20} h={16} n={5} />

      {/* floor string-courses */}
      {[70, 132, 194, 256].map((y) => (
        <line key={y} x1={L} y1={y} x2={R} y2={y} stroke={stroke} strokeWidth="0.6" opacity="0.55" />
      ))}

      {/* upper floors — 6 windows each, taller */}
      <Row x0={58} x1={282} y={82} w={26} h={40} n={6} />
      <Row x0={58} x1={282} y={144} w={26} h={40} n={6} />
      <Row x0={58} x1={282} y={206} w={26} h={40} n={6} />

      {/* piano-nobile balconies on middle floor */}
      {[58, 58 + (282 - 58 - 26) / 5 * 2.5].map((x, i) => (
        <line key={i} x1={x - 3} y1={184} x2={x + 29} y2={184} stroke={stroke} strokeWidth="1.1" opacity="0.85" />
      ))}

      {/* ground floor — arched openings (entrance + shopfronts) */}
      <line x1={L} y1={268} x2={R} y2={268} stroke={stroke} strokeWidth="0.8" opacity="0.7" />
      <Row x0={58} x1={282} y={286} w={30} h={50} n={5} arched />

      {/* central entrance — taller arch */}
      <g stroke={stroke} fill="none" strokeWidth="1.1">
        <path d={`M155 336 L155 300 A 15 15 0 0 1 185 300 L185 336`} />
        <line x1={170} y1={286} x2={170} y2={336} strokeWidth="0.5" opacity="0.6" />
      </g>

      {/* base line / pavement */}
      <line x1={L - 10} y1={336} x2={R + 10} y2={336} stroke={stroke} strokeWidth="1.3" />
      <line x1={L - 10} y1={340} x2={R + 10} y2={340} stroke={stroke} strokeWidth="0.5" opacity="0.4" />

      {/* subtle vertical pilasters at the ends */}
      <line x1={L + 10} y1={top + 8} x2={L + 10} y2={268} stroke={stroke} strokeWidth="0.4" opacity="0.35" />
      <line x1={R - 10} y1={top + 8} x2={R - 10} y2={268} stroke={stroke} strokeWidth="0.4" opacity="0.35" />
    </svg>
  )
}
