// Data extracted from the official unit schedule and interior design set.
// "type": residence | duplex | retail

const IMG = (name) => `/images/${name}.jpg`

// --- Residences -------------------------------------------------------------
// Unit mix, areas and sales status follow the sales price list (Nov 2026).
// area = total (sales) area; net = measured net internal area from the
// architect's plans E.05–E.07 (14.10.2026). Prices stay off the site.
// status: 'available' | 'reserved' | 'sold'
const SOLD = 'sold'
const AVAILABLE = 'available'
const RESERVED = 'reserved'

// Floors 1-3 share an identical typical layout (five residences each);
// x05 is a studio (living room with a sleeping alcove).
const typicalFloor = (floor, [s1, s2, s3, s4, s5]) => [
  { code: `${floor}01`, floor, type: 'residence', bed: 2, bath: 1, net: 48.83, area: 53.713, status: s1 },
  { code: `${floor}02`, floor, type: 'residence', bed: 2, bath: 1.5, net: 62.84, area: 69.124, status: s2 },
  { code: `${floor}03`, floor, type: 'residence', bed: 1, bath: 1.5, net: 49.67, area: 54.637, status: s3 },
  { code: `${floor}04`, floor, type: 'residence', bed: 1, bath: 1, net: 51.79, area: 56.969, status: s4 },
  { code: `${floor}05`, floor, type: 'residence', bed: 0, bath: 1, net: 38.56, area: 42.416, status: s5 },
]

export const units = [
  // Ground floor
  { code: 'SH-01', floor: 'G', type: 'retail', bed: 0, bath: 0, area: 89.95, name: 'Shophouse 01', status: RESERVED },
  { code: 'SH-02', floor: 'G', type: 'retail', bed: 0, bath: 0, area: 57.03, name: 'Shophouse 02', status: RESERVED },
  { code: 'G04', floor: 'G', type: 'residence', bed: 1, bath: 1, net: 51.79, area: 56.969, status: SOLD },
  // G05's total area is written exactly as on the price list ("45/53")
  { code: 'G05', floor: 'G', type: 'residence', bed: 1, bath: 1, area: '45/53', status: SOLD },
  // Levels 1-3 (typical)
  ...typicalFloor(1, [SOLD, SOLD, AVAILABLE, AVAILABLE, SOLD]),
  ...typicalFloor(2, [SOLD, SOLD, AVAILABLE, AVAILABLE, SOLD]),
  ...typicalFloor(3, [SOLD, SOLD, AVAILABLE, AVAILABLE, SOLD]),
  // Level 4 — duplex penthouses (402 and 403 have a balcony)
  { code: '401', floor: 4, type: 'duplex', bed: 3, bath: 2, net: 102.96, area: 113.256, status: AVAILABLE },
  { code: '402', floor: 4, type: 'duplex', bed: 3, bath: 3, net: 76.8, area: 84.48, status: AVAILABLE },
  { code: '403', floor: 4, type: 'duplex', bed: 2, bath: 1.5, net: 88, area: 96.8, status: AVAILABLE },
  { code: '404', floor: 4, type: 'duplex', bed: 2, bath: 1.5, net: 78.9, area: 86.79, status: AVAILABLE },
  { code: '405', floor: 4, type: 'duplex', bed: 3, bath: 2.5, net: 76.7, area: 84.37, status: AVAILABLE },
]

// Layout label helper: e.g. "2 Bed · 1.5 Bath", "Studio · 1 Bath"
export const layoutLabel = (u, bedWord, bathWord, retailWord) => {
  if (u.type === 'retail') return retailWord
  const b = Number.isInteger(u.bath) ? u.bath : u.bath.toFixed(1)
  if (u.bed === 0) return `Studio · ${b} ${bathWord}`
  return `${u.bed} ${bedWord} · ${b} ${bathWord}`
}

// --- Floor plans ------------------------------------------------------------
export const plans = [
  { key: 'typical', img: './plans/floor-typical.png' },
  // the duplex card opens one PDF holding both levels (lower + upper)
  { key: 'duplex', img: './plans/floor-duplex.png', pdf: './plans/floor-duplex.pdf' },
]

// --- Gallery ----------------------------------------------------------------
// cat: living | dining | bedroom | bath | common ; palette badge for context
export const gallery = [
  { src: '/images/common-1.png', cat: 'common', palette: 'Signature' },
  { src: '/images/common-2.png', cat: 'common', palette: 'Signature' },
  { src: '/images/common-3.png', cat: 'common', palette: 'Signature' },
  { src: IMG('a-living-2'), cat: 'living', palette: 'Signature' },
  { src: IMG('a-living-3'), cat: 'living', palette: 'Signature' },
  { src: IMG('a-living'), cat: 'living', palette: 'Signature' },
  { src: IMG('b-04'), cat: 'living', palette: 'Classic' },
  { src: IMG('b-05'), cat: 'living', palette: 'Classic' },
  { src: IMG('c-01'), cat: 'living', palette: 'Luminous' },
  { src: IMG('c-18'), cat: 'living', palette: 'Luminous' },
  { src: IMG('c-19'), cat: 'living', palette: 'Luminous' },
  { src: IMG('a-dining'), cat: 'dining', palette: 'Signature' },
  { src: IMG('a-kitchen'), cat: 'dining', palette: 'Signature' },
  { src: IMG('b-01'), cat: 'dining', palette: 'Classic' },
  { src: IMG('b-02'), cat: 'dining', palette: 'Classic' },
  { src: IMG('b-03'), cat: 'dining', palette: 'Classic' },
  { src: IMG('b-18'), cat: 'dining', palette: 'Classic' },
  { src: IMG('b-19'), cat: 'dining', palette: 'Classic' },
  { src: IMG('c-02'), cat: 'dining', palette: 'Luminous' },
  { src: IMG('c-03'), cat: 'dining', palette: 'Luminous' },
  { src: IMG('c-04'), cat: 'dining', palette: 'Luminous' },
  { src: IMG('c-05'), cat: 'dining', palette: 'Luminous' },
  { src: IMG('a-bedroom'), cat: 'bedroom', palette: 'Signature' },
  { src: IMG('a-bedroom2-1'), cat: 'bedroom', palette: 'Signature' },
  { src: IMG('a-bedroom2-2'), cat: 'bedroom', palette: 'Signature' },
  { src: IMG('a-bedroom2'), cat: 'bedroom', palette: 'Signature' },
  { src: IMG('a-bedroom3-2'), cat: 'bedroom', palette: 'Signature' },
  { src: IMG('a-bedroom3'), cat: 'bedroom', palette: 'Signature' },
  { src: IMG('b-08'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('b-09'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('b-13'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('b-14'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('b-15'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('b-16'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('b-17'), cat: 'bedroom', palette: 'Classic' },
  { src: IMG('c-08'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-09'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-12'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-13'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-14'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-15'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-16'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('c-17'), cat: 'bedroom', palette: 'Luminous' },
  { src: IMG('a-bath'), cat: 'bath', palette: 'Signature' },
  { src: IMG('a-bath-2'), cat: 'bath', palette: 'Signature' },
  { src: IMG('a-bath-3'), cat: 'bath', palette: 'Signature' },
  { src: IMG('a-bath-1'), cat: 'bath', palette: 'Signature' },
  { src: IMG('b-11'), cat: 'bath', palette: 'Classic' },
  { src: IMG('b-06'), cat: 'bath', palette: 'Classic' },  
  { src: IMG('b-12'), cat: 'bath', palette: 'Classic' },
  { src: IMG('c-10'), cat: 'bath', palette: 'Luminous' },
  { src: IMG('c-11'), cat: 'bath', palette: 'Luminous' },






]
