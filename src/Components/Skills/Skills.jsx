import React from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import './Skills.css'
import brain from '../../assets/digital brain.png'

const Skills = () => {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0,0.8], [0.5,1]);

    return (
        <div className='skills'>
            <div className="designer">
                <h1 className='rgbText'>Designer <i class="fa-solid fa-pen-ruler"></i></h1>
                <p>As a designer, I bring a blend of creativity, precision, and innovation to every project. My approach is rooted in crafting visually stunning and user-centered designs that balance functionality with aesthetics.</p>
            </div>
            <motion.img ref={targetRef} style={{ scale }} src={brain} />
            <div className="coder">
                <h1 className="rgbText">Coder <i class="fa-solid fa-keyboard"></i></h1>
                <p>As a coder, I thrive on transforming complex problems into elegant, efficient solutions. Combining logical precision with innovative thinking, I craft clean and scalable code that drives functionality and performance.</p>
            </div>
        </div>
    )
}

export default Skills
