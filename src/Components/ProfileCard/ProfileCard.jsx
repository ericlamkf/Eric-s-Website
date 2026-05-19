import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ imageSrc }) => {
  return (
    <div className="profile-container">
      {/* Background Glow */}
      <div className="profile-glow"></div>

      {/* Outer spinning ring with particles */}
      <div className="ring-outer">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
      </div>

      {/* Inner spinning ring with a particle */}
      <div className="ring-inner">
        <div className="particle p3"></div>
      </div>

      {/* Center Image */}
      <div className="profile-avatar">
        <img 
          src={imageSrc} 
          alt="My Portfolio Avatar" 
        />
      </div>
    </div>
  );
};

export default ProfileCard;