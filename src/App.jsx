import Contact from "./Components/Contact/Contact"
import Footer from "./Components/Footer/Footer"
import Hero from "./Components/Hero/Hero"
import Navbar from "./Components/Navbar/Navbar"
import Projects from "./Components/Projects/Projects"
import Skills from "./Components/Skills/Skills"
import MyJourney from "./Components/MyJourney/MyJourney"
import Title from "./Components/Title/Title"
import Music from "./Components/Music/Music"
import ChatWidget from "./Components/ChatWidget/ChatWidget"
import { useScroll, useTransform } from "motion/react"
import { motion } from "framer-motion"


function App() {
  const { scrollY } = useScroll();

  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 1]);
  const journeyOverlayOpacity = useTransform(scrollY, [1000, 1500], [0, 1]);

  return (
    <>
      <Navbar />

      <section className="hero-section-wrapper">
        <Hero />

        {/* The darkening Overlay */}
        <motion.div
          className="hero-dark-overlay"
          style={{ opacity: overlayOpacity }}
        />
      </section>

      <div className="journey-wrapper">
        <motion.div
          className="journey-dark-overlay"
          style={{ opacity: journeyOverlayOpacity }}
        />

        <Title subtitle={"Everything about"} title={"My Journey"} />
        <MyJourney />
      </div>
      <div className="container">
        <Title subtitle={"Previous"} title={"Projects"} />
        <Projects />
        <Title subtitle={"Recent"} title={"Skills"} />
        <Skills />
        <Title subtitle={"Let's Talk !"} title={"Connect With Me"} />
        <Contact />
        <Footer />
      </div>

      <ChatWidget />
    </>
  )
}

export default App
