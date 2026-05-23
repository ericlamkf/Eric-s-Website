import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './MyJourney.css';
import journeyImage from '../../assets/myjourney-pic.png';
import notificationSound from '../../assets/notification_sound.mp3';
import NotificationCard from '../NotificationCard/NotificationCard';

const MyJourney = () => {
  const [showNotification, setShowNotification] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleDownloadCV = () => {
    // Trigger the download
    const link = document.createElement('a');
    link.href = '/eric-resume.pdf';
    link.download = 'eric-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Play notification sound
    const audio = new Audio(notificationSound);
    audio.volume = 0.6;
    audio.play().catch(() => {
      // Browser may block autoplay — fail silently
    });

    // Show notification card
    setShowNotification(true);
  };

  const handleDismiss = useCallback(() => {
    setShowNotification(false);
  }, []);

  return (
    <>
      <motion.div
        className="my-journey"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Side - Image */}
        <motion.div className="journey-image-container" variants={itemVariants}>
          <img src={journeyImage} alt="My Journey" className="journey-image" />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div className="journey-content" variants={itemVariants}>
          <motion.h2 className="journey-title" variants={itemVariants}>
            Building software systems, backend infrastructure, AI-driven solutions, and digital experiences is my primary focus.
          </motion.h2>

          <motion.p className="journey-paragraph" variants={itemVariants}>
            I'm a Computer Science student who loves creating clean, useful, and modern technology. Whether it's full-stack web apps, AI-powered systems, or creative side projects, I focus on building things that are both practical and impactful.
          </motion.p>

          <motion.button
            className="cv-button"
            onClick={handleDownloadCV}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            DOWNLOAD RESUME
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Notification Card — rendered outside the section so it's truly fixed */}
      <NotificationCard
        visible={showNotification}
        title="Resume Downloaded! 🥳"
        message="Thanks for checking out my work! Feel free to reach out, I'd love to connect."
        icon="📄"
        duration={5000}
        onDismiss={handleDismiss}
      />
    </>
  );
};

export default MyJourney;
