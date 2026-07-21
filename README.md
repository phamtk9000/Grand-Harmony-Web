# The Grand Harmony · Budapest

A bilingual (Vietnamese / English) single-page showcase for **The Grand Harmony**,
a residential development at Berzenczey utca 9, District IX (Ferencváros), Budapest.

Built with **React 19 + Vite**. One scrolling page: Hero → Overview → Highlights →
Residences → Gallery → Floor Plans → Location → Enquire → Footer.

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requires Node.js 18+.

## Language

The site defaults to Vietnamese. Use the **VI / EN** toggle in the header to switch;
the choice is remembered in the browser. All copy lives in `src/i18n.jsx`.

## Editable placeholders

A few values are intended to be replaced with your final details:

| What | Where |
| --- | --- |
| Sales email (`sales@trueestate.com.vn`) | `src/i18n.jsx` → `contact.salesEmail`, and `src/components/Contact.jsx` → `SALES_EMAIL` |
| Phone number (`+84 (0) 000 000 000`) | `src/i18n.jsx` → `contact.phoneValue` |
| QR code target | regenerate `public/brand/qr.png` (currently points to trueestate.com.vn) |
| Prices | intentionally not shown — the site uses "Prices on request" / "Giá theo yêu cầu" |

## Structure

```
public/
  brand/       logo (gold + ivory), qr code
  images/      optimised interior renders + hero
  plans/       typical-floor & duplex-floor plans
src/
  i18n.jsx     language context + all VI/EN copy
  data.js      unit schedule + gallery + plans data
  styles.css   full design system
  components/  Header, Hero, Overview, Highlights, Residences,
               Gallery, FloorPlans, Location, Contact, Footer,
               Reveal, BridgeDivider
```

## Notes

- Unit data is taken from the official schedule: 22 residences (incl. 5 duplex
  penthouses on Level 4) and 2 ground-floor retail units.
- Renders and floor plans are computer-generated and indicative.
- The contact form has no backend; on submit it opens the visitor's mail client
  addressed to the sales email and shows an on-screen confirmation. Wire it to your
  own endpoint in `src/components/Contact.jsx` when ready.
