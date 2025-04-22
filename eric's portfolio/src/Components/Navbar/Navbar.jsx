import React, { useState } from 'react'
import { Link } from 'react-scroll'
import './Navbar.css'

const Navbar = () => {
    const [show, setShow] = useState(false)

    const showNav = () => {
        show ? setShow(false) : setShow(true)
    }

    return (
        <nav>
            <h1 className='logo'>ERIC <span>.</span></h1>
            <ul className={`${show ? 'show' : ''}`}>
                <li><Link to="hero" smooth={true} offset={0} duration={500}>Home</Link></li>
                <li><Link to="social-media" smooth={true} offset={-300} duration={500}>Social Media</Link></li>
                <li><Link to="projects" smooth={true} offset={-300} duration={500}>Projects</Link></li>
                <li><Link to="skills" smooth={true} offset={-300} duration={500}>Skills</Link></li>
                <Link to='contact' smooth={true} offset={-300} duration={500}><button>Join Us</button></Link>
            </ul>
            <i onClick={showNav} id='hamburger' class="fa-solid fa-burger"></i>
        </nav>
    )
}

export default Navbar
