import Contact from "./Components/Contact/Contact"
import Footer from "./Components/Footer/Footer"
import Hero from "./Components/Hero/Hero"
import Navbar from "./Components/Navbar/Navbar"
import Projects from "./Components/Projects/Projects"
import Skills from "./Components/Skills/Skills"
import SocialMedia from "./Components/SocialMedia/SocialMedia"
import Title from "./Components/Title/Title"


function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <div className="container">
        <Title subtitle={"Everything about"} title={"Social Media"} />
        <SocialMedia />
        <Title subtitle={"Previous"} title={"Projects"} />
        <Projects />
        <Title subtitle={"Recent"} title={"Skills"} />
        <Skills />
        <Title subtitle={"Let's Talk !"} title={"Join Us"} />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
