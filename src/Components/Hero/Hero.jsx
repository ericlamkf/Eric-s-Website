import React from 'react'
import './Hero.css'
import bg from '../../assets/galaxy.mp4'
import blackhole from '../../assets/blackhole.mp4'
import eric from '../../assets/eric.png'

const Hero = () => {
    return (
        <div className='hero'>
            <video className='bg' autoPlay loop playsInline muted src={bg}></video>
            <video className='blackhole' autoPlay loop playsInline muted src={blackhole}></video>
            <div className="hero-container">
                <div className="hero-title">
                    <h1>Know Everything</h1>
                    <h3>About Me</h3>
                    <p>Explore the <span>Unknown Realm</span></p>
                </div>
                <div className="hero-content">
                    <div className="img-container">
                        <img src={eric} />
                    </div>
                    <div className="hero-card">
                        <i class="fa-solid fa-address-card"></i>
                        <h3>Hi There 🖖</h3>
                        <h2>I'M ERIC.</h2>
                        <p className="paragraph-title">"Discover the wonders of the universe—step into the infinite. Your adventure begins here."</p>
                        <p>Hi, I'm Eric, a passionate web developer dedicated to crafting exceptional digital experiences. From concept to creation, I bring your ideas to life with precision and creativity.</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Hero
