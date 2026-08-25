import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-box">
        <h2>Let's work together!</h2>
        <p>I'm currently available for freelance work and open to new opportunities.</p>

        <div className="contact-actions">
          <div className="email-actions">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="btn primary-btn pulse"
            >
              <Mail size={18} />
              <span>Email Me</span>
            </a>

            <button 
              onClick={handleCopyEmail} 
              className="btn secondary-btn"
              title="Copy email address to clipboard"
            >
              {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          {copied && (
            <span className="copied-toast">Email copied to clipboard ({personalInfo.email})</span>
          )}

          <div className="social-links">
            <a 
              href={personalInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn secondary-btn"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href={personalInfo.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn secondary-btn"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
