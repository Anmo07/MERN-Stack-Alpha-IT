import React from 'react';
import { Terminal } from 'lucide-react';
import { personalInfo, skills } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-title">
        <h2>About Me</h2>
        <div className="underline"></div>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>{personalInfo.about}</p>

          <div className="skills-wrapper">
            <div className="skills-header">
              <Terminal size={18} />
              <span>Core Technologies & Focus Areas</span>
            </div>
            <div className="skills">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-tag" title={skill.category}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
