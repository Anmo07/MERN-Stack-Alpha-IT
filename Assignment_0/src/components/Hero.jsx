import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  const scrollTo = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header id="home" className="hero">
      <div className="hero-content">
        <div className="hero-badge animate-up delay-1">
          <span className="hero-badge-dot" />
          <span>Available for opportunities</span>
        </div>

        <h1 className="animate-up delay-1">
          Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        <p className="role animate-up delay-2">{personalInfo.role}</p>

        <p className="description animate-up delay-3">{personalInfo.tagline}</p>

        <div className="cta-buttons animate-up delay-4">
          <button 
            onClick={() => scrollTo('projects')} 
            className="btn primary-btn"
          >
            View My Work <ArrowRight size={16} />
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="btn secondary-btn"
          >
            Contact Me <Mail size={16} />
          </button>
        </div>
      </div>

      <div className="hero-image-wrapper animate-float">
        <div className="profile-img-container">
          <img 
            src={profileImg} 
            alt={personalInfo.name} 
            className="profile-img"
          />
        </div>
      </div>
    </header>
  );
}
