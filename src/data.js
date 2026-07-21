// Data extracted from the official unit schedule and interior design set.
// "type": residence | duplex | retail

const IMG = (name) => `/images/${name}.jpg`

// --- Residences -------------------------------------------------------------
// Floors 1-3 share an identical typical layout (five residences each).
const typicalFloor = (floor) => [
  { code: `${floor}01`, floor, type: 'residence', bed: 1, bath: 1, area: 60.7 },
  { code: `${floor}02`, floor, type: 'residence', bed: 2, bath: 1.5, area: 76.2 },
  { code: `${floor}03`, floor, type: 'residence', bed: 1, bath: 1.5, area: 64.52 },
  { code: `${floor}04`, floor, type: 'residence', bed: 1, bath: 1, area: 62.75 },
  { code: `${floor}05`, floor, type: 'residence', bed: 1, bath: 1, area: 53.97 },
]

export const units = [
  // Ground floor
  { code: 'SH-01', floor: 'G', type: 'retail', bed: 0, bath: 0, area: 89.95, name: 'Shophouse 01' },
  { code: 'SH-02', floor: 'G', type: 'retail', bed: 0, bath: 0, area: 57.03, name: 'Shophouse 02' },
  { code: 'G01', floor: 'G', type: 'residence', bed: 1, bath: 1, area: 62.75 },
  { code: 'G02', floor: 'G', type: 'residence', bed: 1, bath: 1, area: 53.97 },
  // Levels 1-3 (typical)
  ...typicalFloor(1),
  ...typicalFloor(2),
  ...typicalFloor(3),
  // Level 4 — duplex penthouses
  { code: '401', floor: 4, type: 'duplex', bed: 3, bath: 2, area: 104.57 },
  { code: '402', floor: 4, type: 'duplex', bed: 3, bath: 3, area: 89.725 },
  { code: '403', floor: 4, type: 'duplex', bed: 2, bath: 1.5, area: 95.795 },
  { code: '404', floor: 4, type: 'duplex', bed: 2, bath: 1.5, area: 79.45 },
  { code: '405', floor: 4, type: 'duplex', bed: 3, bath: 2.5, area: 79.12 },
]

// Layout label helper: e.g. "2 Bed · 1.5 Bath"
export const layoutLabel = (u, bedWord, bathWord, retailWord) => {
  if (u.type === 'retail') return retailWord
  const b = Number.isInteger(u.bath) ? u.bath : u.bath.toFixed(1)
  return `${u.bed} ${bedWord} · ${b} ${bathWord}`
}

// --- Floor plans ------------------------------------------------------------
export const plans = [
  { key: 'typical', img: './plans/floor-typical.png' },
  { key: 'duplex', img: './plans/floor-duplex.png' },
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
