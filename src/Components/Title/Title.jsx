import React from 'react'
import './Title.css'
import { motion } from "motion/react"

const Title = ({ subtitle, title }) => {
    return (
        <div className='title'>
            <p>{subtitle}</p>
            <motion.h2
                whileHover={{ rotate: 10, scale: 1.2 }}
                whileTap={{ rotate: -10, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
                {title}
            </motion.h2>
        </div>
    )
}

export default Title
