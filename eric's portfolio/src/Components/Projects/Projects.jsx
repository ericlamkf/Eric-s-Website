import React, { useState } from 'react'
import './Projects.css'
import project1 from '../../assets/project1.mp4'
import project2 from '../../assets/project2.mp4'
import project3 from '../../assets/project3.mp4'

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
                    <video onMouseEnter={playVideo} onMouseLeave={stopVideo} src={project1} loop playsInline autoPlay className='video'></video>
                    <div className="project-description">
                        <h1>The Next Level <span className='rgbText'>Gaming Website</span></h1>
                        <p>Take your gaming experience to unparalleled heights with The Next Level Gaming Website—a platform designed for true enthusiasts. Packed with cutting-edge features, immersive visuals, and user-friendly navigation, this project is more than just a website—it's a gateway to the future of gaming.</p>
                        <button>Website</button>
                    </div>
                </div>
                <div className="project">
                    <video onMouseEnter={playVideo} onMouseLeave={stopVideo} src={project2} loop playsInline autoPlay className='video'></video>
                    <div className="project-description">
                        <h1>Responsive <span className='rgbText'>Portfolio Website</span></h1>
                        <p>Showcase your creativity and professionalism with the Responsive Portfolio Website—a digital space crafted to leave a lasting impression. Designed to adapt seamlessly to any device, this portfolio ensures that your work shines whether viewed on desktop, tablet, or mobile.</p>
                        <button>Website</button>
                    </div>
                </div>
                <div className="project">
                    <video onMouseEnter={playVideo} onMouseLeave={stopVideo} src={project3} loop playsInline autoPlay className='video'></video>
                    <div className="project-description">
                        <h1>Watch Movie with <span className='rgbText'>Aesthetic Design</span></h1>
                        <p>Experience the joy of cinema like never before with Watch Movie with Aesthetic Design—a platform tailored for movie lovers who value both entertainment and visual elegance. Combining seamless functionality with captivating design, this project transforms browsing and watching movies into an artistic experience.</p>
                        <button>Website</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
