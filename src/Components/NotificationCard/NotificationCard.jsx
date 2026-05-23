import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NotificationCard.css';

/**
 * NotificationCard
 *
 * Props:
 *   visible   {boolean}  - Whether the card is shown
 *   title     {string}   - Bold heading text
 *   message   {string}   - Body message
 *   icon      {string}   - Emoji / icon displayed on the left (optional)
 *   duration  {number}   - Auto-dismiss duration in ms (default: 5000)
 *   onDismiss {function} - Called when card is dismissed (auto or click)
 */
const NotificationCard = ({
  visible,
  title = 'Success!',
  message = '',
  icon = '✅',
  duration = 5000,
  onDismiss,
}) => {
  // Auto-dismiss timer
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onDismiss?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="notification-card"
          role="alert"
          aria-live="polite"
          onClick={onDismiss}
          initial={{ opacity: 0, x: 120, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        >
          {/* Progress bar showing remaining time */}
          <motion.div
            className="notification-progress"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
          />

          <div className="notification-inner">
            {icon && <span className="notification-icon">{icon}</span>}
            <div className="notification-body">
              <p className="notification-title">{title}</p>
              <p className="notification-message">{message}</p>
            </div>
            <button
              className="notification-close"
              onClick={onDismiss}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationCard;
