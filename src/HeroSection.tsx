import React from "react";
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-container">
      <div className="hero-overlay"></div>
      <div className="hero-text-wrapper">
        <h1 className="hero-text">You're Invited to Our Wedding!</h1>
      </div>
    </section>
  );
};

export default HeroSection;
