import React, { useState } from 'react'
import './Projects.css'
import project1 from '../../assets/project1.png'
import project2 from '../../assets/project2.mp4'
import project3 from '../../assets/project3.mp4'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

const Projects = () => {

    const playVideo = (e) => {
        e.target.play()
    }

    const stopVideo = (e) => {
        e.target.pause()
    }

    return (
        <div className='projects'>
            <div className="project-container">
                <div className="project">
                    <motion.img
                        src={project1}
                        alt="MealShare Mobile App"
                        className="image"
                        viewport={{ margin: "-200px" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
                    />
                    <div className="project-description">
                        <h1>MealShare <span className='rgbText'>Mobile App</span></h1>
                        <p>MealShare is a mobile application developed to tackle food waste while improving food accessibility within communities. The platform enables users to donate excess food, browse available food listings, and connect with nearby donors and recipients. Built with a focus on sustainability and social impact, MealShare leverages technology to make food sharing convenient, efficient, and meaningful.</p>
                        <a href="https://github.com/ericlamkf/MealShare-Android-App" target='_blank' rel="noopener noreferrer">
                            <button ><FaGithub />Visit Github Repo</button>
                        </a>
                    </div>
                </div>
                <div className="project">
                    <motion.video viewport={{ margin: "-200px" }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 800, duration: 0.6 }} onMouseEnter={playVideo} onMouseLeave={stopVideo} src={project2} loop playsInline autoPlay className='video'></motion.video>
                    <div className="project-description">
                        <h1>Responsive <span className='rgbText'>Portfolio Website</span></h1>
                        <p>Showcase your creativity and professionalism with the Responsive Portfolio Website—a digital space crafted to leave a lasting impression. Designed to adapt seamlessly to any device, this portfolio ensures that your work shines whether viewed on desktop, tablet, or mobile.</p>
                        <a href="https://github.com/ericlamkf/Eric-s-Website" target='_blank' rel="noopener noreferrer">
                            <button><FaGithub />Visit Github Repo</button>
                        </a>
                    </div>
                </div>
                <div className="project">
                    <motion.video exit={{ opacity: 0 }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ margin: "-200px" }} transition={{ type: "spring", stiffness: 800, duration: 0.6 }} onMouseEnter={playVideo} onMouseLeave={stopVideo} src={project3} loop playsInline autoPlay className='video'></motion.video>
                    <div className="project-description">
                        <h1>Top G Type Fast 🚀 <span className='rgbText'>Typing Speed Game</span></h1>
                        <p>Top G Type Fast is an interactive typing speed game designed to challenge your accuracy and reaction time. Players race against the clock to type motivational and famous quotes as quickly and accurately as possible.</p>
                        <div className='button-group'>
                            <a href="https://github.com/ericlamkf/Top-G-Type-Fast-" target='_blank' rel="noopener noreferrer">
                                <button ><FaGithub />Visit Github Repo</button>
                            </a>
                            <a href="https://ericlamkf.github.io/Top-G-Type-Fast-/" target='_blank' rel='noopener noreferrer'>
                                <button ><FiExternalLink />Try It out!</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
