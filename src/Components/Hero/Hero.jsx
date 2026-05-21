import React from 'react'
import {motion} from 'framer-motion'
import './Hero.css'
import bg from '../../assets/galaxy.mp4'
import blackhole from '../../assets/blackhole.mp4'
import eric from '../../assets/eric.png'
import { useMotionValue, useSpring } from 'framer-motion';
import ProfileCard from '../ProfileCard/ProfileCard'
import { useState, useEffect } from 'react';

const Hero = () => {
    // Cursor Text State for Hover Effect on Title
    const [cursorText, setCursorText] = useState("");

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const cursorSpringConfig = { damping: 25, stiffness: 400, mass: 0.5 }; 
    const cursorXSpring = useSpring(cursorX, cursorSpringConfig);
    const cursorYSpring = useSpring(cursorY, cursorSpringConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // Parallax Effect for Profile Card
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const parallaxSpringConfig = { damping: 25, stiffness: 150, mass: 0.5 }; // Renamed
    const springX = useSpring(x, parallaxSpringConfig);
    const springY = useSpring(y, parallaxSpringConfig);

    const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const xOffset = (mouseX / windowWidth - 0.5) * 2;
        const yOffset = (mouseY / windowHeight - 0.5) * 2;

        x.set(xOffset * -30); 
        y.set(yOffset * -30); 
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className='hero' 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
            {/* --- THE CUSTOM CURSOR --- */}
            <motion.div 
                className="hover-cursor"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: cursorText ? 1 : 0,
                    opacity: cursorText ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
            >
                {cursorText}
            </motion.div>
            {/* ------------------------- */}

            <video className='bg' autoPlay loop playsInline muted src={bg}></video>
            <video className='blackhole' autoPlay loop playsInline muted src={blackhole}></video>
            <div className="hero-container">
                <div className="hero-title">
                    <h1>
                        <span
                            className='hover-trigger-text'
                            onMouseEnter={() => setCursorText("More towards Java Backend Development✨")}
                            onMouseLeave={() => setCursorText("")}
                        >
                            Full-Stack
                        </span>
                    </h1>
                    <h3>Software Engineer</h3>
                    <p>Based in <span>Petaling Jaya, Selangor 📌</span></p>
                </div>
                <div className="hero-content">
                    <motion.div 
                        onMouseEnter={() => setCursorText("It's me 👨‍💻")} onMouseLeave={() => setCursorText("")}
                        initial={{opacity:0, x:-300}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:0.7, stiffness:600, type:'spring'}}
                        style={{ x: springX, y: springY }}
                    className="img-container">
                        <ProfileCard imageSrc={eric}></ProfileCard>
                    </motion.div>
                    <div className="hero-card"
                    onMouseEnter={() => setCursorText("☝️Learn more about me")}
                    onMouseLeave={() => setCursorText("")}>
                        <i class="fa-solid fa-address-card"></i>
                        <h3>Hi There 🖖</h3>
                        <h2>I'M ERIC.</h2>
                        <p className="paragraph-title" id='title'>Java Backend Developer | React Frontend Developer | Tailwind CSS | Building Clean & Scalable Interfaces</p>
                        <p>Hi, I'm Eric, I am a web developer focused on engineering high-performance. From designing robust architectures to crafting dynamic user interfaces, I write clean, maintainable code that drives engagement and solves real-world business problems.</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Hero
