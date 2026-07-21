import Header from './components/Header.jsx'
import ChapterRail from './components/ChapterRail.jsx'
import Hero from './components/Hero.jsx'
import Manifesto from './components/Manifesto.jsx'
import Overview from './components/Overview.jsx'
import Highlights from './components/Highlights.jsx'
import Palettes from './components/Palettes.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import Residences from './components/Residences.jsx'
import FloorPlans from './components/FloorPlans.jsx'
import ProgressTimeline from './components/ProgressTimeline.jsx'
import Contact from './components/Contact.jsx'
import Thanks from './components/Thanks.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <ChapterRail />
      <main>
        <Hero />
        <Manifesto />
        <Overview />
        <Highlights />
        <Palettes />
        <Services />
        <Gallery />
        <Residences />
        <FloorPlans />
        <ProgressTimeline />
        <Contact />
        <Thanks />
      </main>
      <Footer />
    </>
  )
}
