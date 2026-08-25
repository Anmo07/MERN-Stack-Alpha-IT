import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy; {currentYear} {personalInfo.name}. Crafted with &hearts;, React & CSS.
      </p>
    </footer>
  );
}
