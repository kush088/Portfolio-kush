import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import ProjectCard from "../components/ProjectCard.jsx";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Could not load projects right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-paper mb-2">Projects</h1>
      <p className="text-mist mb-12">Things I've designed, built and shipped.</p>

      {loading && <p className="text-mist">Loading projects…</p>}
      {error && <p className="text-signal">{error}</p>}
      {!loading && !error && projects.length === 0 && (
        <p className="text-mist">No projects yet — check back soon.</p>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
