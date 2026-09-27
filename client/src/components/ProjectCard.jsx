import React from "react";
import { Link } from "react-router-dom";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

const ProjectCard = ({ project }) => {
  const cover = project.images?.[0];

  return (
    <Link
      to={`/projects/${project._id}`}
      className="group block border border-wire hover:border-signal transition-colors"
    >
      <div className="aspect-[16/10] bg-wire overflow-hidden">
        {cover ? (
          <img
            src={`${API_ORIGIN}${cover}`}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-mist font-display text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-base text-paper mb-2">{project.title}</h3>
        <p className="text-sm text-mist line-clamp-2">{project.description}</p>
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.slice(0, 4).map((t) => (
              <span key={t} className="text-xs text-signal border border-wire px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProjectCard;
