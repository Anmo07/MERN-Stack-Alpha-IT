import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { navItems, personalInfo } from '../data/portfolioData';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, width: 0, transform: 'translateX(0px)' });
  
  const navContainerRef = useRef(null);
  const itemRefs = useRef({});

  // Detect scroll for navbar background blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update hover pill position to the active item
  const updatePillToItem = (id, transition = true) => {
    const el = itemRefs.current[id];
    if (el && navContainerRef.current) {
      setHoverStyle({
        opacity: 1,
        width: `${el.offsetWidth}px`,
        transform: `translateX(${el.offsetLeft}px)`,
        transition: transition ? 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
      });
    }
  };

  // Keep pill positioned over active section on mount / changes
  useEffect(() => {
    updatePillToItem(activeSection, true);
  }, [activeSection]);

  const handleMouseEnter = (id) => {
    updatePillToItem(id, true);
  };

  const handleMouseLeave = () => {
    updatePillToItem(activeSection, true);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
        Portfolio<span>.</span>
      </a>

      {/* Desktop Navigation with Animated Sliding Tab Indicator */}
      <div 
        className="nav-links-container"
        ref={navContainerRef}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="nav-hover-bg" 
          style={hoverStyle}
        />
        {navItems.map((item) => (
          <button
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Social Shortcuts */}
      <div className="navbar-spacer">
        <a 
          href={personalInfo.socials.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon-btn"
          aria-label="GitHub Profile"
        >
          <Github size={18} />
        </a>
        <a 
          href={personalInfo.socials.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="icon-btn"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} />
        </a>
      </div>

      {/* Mobile Menu Hamburger */}
      <button 
        className="mobile-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
