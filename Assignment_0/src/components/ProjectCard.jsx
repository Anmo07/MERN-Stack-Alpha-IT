import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="card-inner">
        <div className="card-header">
          <h3>{project.title}</h3>
          {project.subtitle && <span className="card-subtitle">{project.subtitle}</span>}
        </div>

        <p>{project.description}</p>

        {project.features && project.features.length > 0 && (
          <ul className="project-features">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        )}

        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>

        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link"
        >
          <span>View GitHub Repo</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
