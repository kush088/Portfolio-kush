import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "");

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => setError("Project not found."));
  }, [id]);

  if (error) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-signal">{error}</p>
        <Link to="/projects" className="text-mist underline">
          Back to projects
        </Link>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-mist">Loading…</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <Link to="/projects" className="text-mist text-sm hover:text-signal">
        ← All projects
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-4 mb-4">
        {project.title}
      </h1>

      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((t) => (
            <span key={t} className="text-xs text-signal border border-wire px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      )}

      {project.images?.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {project.images.map((img) => (
            <img
              key={img}
              src={`${API_ORIGIN}${img}`}
              alt={project.title}
              className="w-full border border-wire object-cover"
            />
          ))}
        </div>
      )}

      <p className="text-mist max-w-prose leading-relaxed whitespace-pre-line">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="bg-signal text-ink px-6 py-3 font-display text-sm hover:bg-paper transition-colors"
          >
            Live demo
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="border border-wire px-6 py-3 font-display text-sm text-paper hover:border-signal transition-colors"
          >
            View source
          </a>
        )}
        {project.downloadFile && (
          <a
            href={`${API_ORIGIN}/api/projects/${project._id}/download`}
            className="border border-wire px-6 py-3 font-display text-sm text-paper hover:border-signal transition-colors"
          >
            Download project
          </a>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
