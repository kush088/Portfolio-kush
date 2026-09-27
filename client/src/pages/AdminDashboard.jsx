import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const emptyForm = {
  title: "",
  description: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
  featured: false,
};

const API_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace("/api", "");

const AdminDashboard = () => {
  const { logout } = useAuth();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [downloadFile, setDownloadFile] = useState(null);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load case studies
  const loadProjects = async () => {
    try {
      setLoading(true);

      const res = await api.get("/projects");

      setProjects(res.data);
    } catch (error) {
      console.error("Failed to load case studies:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to load case studies."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Reset form
  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImageFiles([]);
    setDownloadFile(null);
    setMessage("");

    // Clear file inputs
    const imageInput = document.getElementById("case-study-images");
    const downloadInput = document.getElementById(
      "case-study-download"
    );

    if (imageInput) imageInput.value = "";
    if (downloadInput) downloadInput.value = "";
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Edit case study
  const handleEdit = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : project.techStack || "",
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
      featured: project.featured || false,
    });

    setImageFiles([]);
    setDownloadFile(null);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete case study
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this case study? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await api.delete(`/projects/${id}`);

      setMessage("Case study deleted successfully.");

      await loadProjects();
    } catch (error) {
      console.error("Delete error:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to delete the case study."
      );
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Images
    imageFiles.forEach((file) => {
      data.append("images", file);
    });

    // Downloadable report
    if (downloadFile) {
      data.append("downloadFile", downloadFile);
    }

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, data);

        setMessage("Case study updated successfully.");
      } else {
        await api.post("/projects", data);

        setMessage("Case study created successfully.");
      }

      resetForm();

      await loadProjects();
    } catch (error) {
      console.error("Save error:", error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong while saving."
      );
    } finally {
      setSaving(false);
    }
  };

  // Count featured case studies
  const featuredCount = projects.filter(
    (project) => project.featured
  ).length;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

        <div>
          <p className="font-display text-xs text-signal mb-2">
            CONTENT MANAGEMENT
          </p>

          <h1 className="font-body font-semibold text-3xl text-paper">
            Case Study Dashboard
          </h1>

          <p className="text-mist text-sm mt-2">
            Create and manage your digital marketing case studies.
          </p>
        </div>

        <button
          onClick={logout}
          className="border border-wire px-5 py-2.5 text-sm text-mist hover:text-signal hover:border-signal transition-colors"
        >
          Log out
        </button>

      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">

        <div className="border border-wire p-5">
          <p className="text-mist text-xs">
            TOTAL CASE STUDIES
          </p>

          <p className="font-body font-semibold text-2xl text-paper mt-2">
            {projects.length}
          </p>
        </div>

        <div className="border border-wire p-5">
          <p className="text-mist text-xs">
            FEATURED
          </p>

          <p className="font-body font-semibold text-2xl text-signal mt-2">
            {featuredCount}
          </p>
        </div>

        <div className="border border-wire p-5 col-span-2 sm:col-span-1">
          <p className="text-mist text-xs">
            STATUS
          </p>

          <p className="font-body font-semibold text-sm text-paper mt-3">
            Portfolio active
          </p>
        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-wire p-6 sm:p-8 space-y-7 mb-16"
      >

        {/* Form Header */}
        <div className="border-b border-wire pb-5">
          <p className="font-display text-xs text-signal mb-2">
            {editingId ? "EDIT CASE STUDY" : "NEW CASE STUDY"}
          </p>

          <h2 className="font-body font-semibold text-xl text-paper">
            {editingId
              ? "Update your case study"
              : "Create a digital marketing case study"}
          </h2>

          <p className="text-mist text-sm mt-2">
            Add the core information that will appear on your portfolio.
          </p>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm text-paper mb-2"
          >
            Case Study Title
          </label>

          <input
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="SEO Growth Strategy for an E-commerce Brand"
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper placeholder:text-mist/50 focus:border-signal outline-none transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm text-paper mb-2"
          >
            Case Study Overview
          </label>

          <textarea
            id="description"
            name="description"
            required
            rows={6}
            value={form.description}
            onChange={handleChange}
            placeholder="Explain the business problem, objective, strategy, and what this case study demonstrates..."
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper placeholder:text-mist/50 focus:border-signal outline-none transition-colors resize-y"
          />

          <p className="text-mist text-xs mt-2">
            Keep this concise. You can use the detailed case study page for
            the complete research and analysis.
          </p>
        </div>

        {/* Skills / Areas */}
        <div>
          <label
            htmlFor="techStack"
            className="block text-sm text-paper mb-2"
          >
            Skills / Areas
          </label>

          <input
            id="techStack"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            placeholder="SEO, Keyword Research, Technical SEO, Content Strategy"
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper placeholder:text-mist/50 focus:border-signal outline-none transition-colors"
          />

          <p className="text-mist text-xs mt-2">
            Separate each skill with a comma.
          </p>
        </div>

        {/* Links */}
        <div className="grid sm:grid-cols-2 gap-5">

          <div>
            <label
              htmlFor="githubLink"
              className="block text-sm text-paper mb-2"
            >
              Research / GitHub Link
            </label>

            <input
              id="githubLink"
              name="githubLink"
              type="url"
              value={form.githubLink}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full bg-transparent border border-wire px-4 py-3 text-paper placeholder:text-mist/50 focus:border-signal outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="liveLink"
              className="block text-sm text-paper mb-2"
            >
              Live Case Study Link
            </label>

            <input
              id="liveLink"
              name="liveLink"
              type="url"
              value={form.liveLink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-transparent border border-wire px-4 py-3 text-paper placeholder:text-mist/50 focus:border-signal outline-none transition-colors"
            />
          </div>

        </div>

        {/* Images */}
        <div>
          <label
            htmlFor="case-study-images"
            className="block text-sm text-paper mb-2"
          >
            Case Study Images
          </label>

          <input
            id="case-study-images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setImageFiles(Array.from(e.target.files || []))
            }
            className="block w-full text-sm text-mist"
          />

          <p className="text-mist text-xs mt-2">
            Upload screenshots, keyword research, analytics, SEO audits,
            charts, or other case-study visuals.
          </p>

          {imageFiles.length > 0 && (
            <p className="text-signal text-xs mt-2">
              {imageFiles.length} image
              {imageFiles.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Downloadable Report */}
        <div>
          <label
            htmlFor="case-study-download"
            className="block text-sm text-paper mb-2"
          >
            Case Study Report
          </label>

          <input
            id="case-study-download"
            type="file"
            accept=".zip,.rar,.7z,.pdf"
            onChange={(e) =>
              setDownloadFile(e.target.files?.[0] || null)
            }
            className="block w-full text-sm text-mist"
          />

          <p className="text-mist text-xs mt-2">
            Optional PDF or project file for visitors to download.
          </p>
        </div>

        {/* Featured */}
        <div className="border border-wire p-4 flex items-start gap-3">

          <input
            id="featured"
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="mt-1 accent-[#F2B807]"
          />

          <div>
            <label
              htmlFor="featured"
              className="text-sm text-paper cursor-pointer"
            >
              Feature this case study
            </label>

            <p className="text-mist text-xs mt-1">
              Featured case studies can be highlighted on your homepage.
            </p>
          </div>

        </div>

        {/* Message */}
        {message && (
          <div className="border border-signal/40 px-4 py-3">
            <p className="text-signal text-sm">
              {message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">

          <button
            type="submit"
            disabled={saving}
            className="bg-signal text-ink px-6 py-3 font-body font-medium text-sm hover:bg-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update case study"
              : "Create case study"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-wire px-6 py-3 font-body font-medium text-sm text-paper hover:border-signal transition-colors"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

      {/* Existing Case Studies */}
      <div>

        <div className="flex items-end justify-between mb-5">

          <div>
            <p className="font-display text-xs text-signal mb-2">
              YOUR WORK
            </p>

            <h2 className="font-body font-semibold text-xl text-paper">
              Existing Case Studies
            </h2>
          </div>

          <span className="text-mist text-sm">
            {projects.length}
          </span>

        </div>

        {loading ? (
          <div className="border border-wire p-6">
            <p className="text-mist text-sm">
              Loading case studies...
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {projects.map((project) => (
              <div
                key={project._id}
                className="border border-wire p-4 sm:p-5 hover:border-signal transition-colors"
              >

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                  {/* Project information */}
                  <div className="flex items-center gap-4 min-w-0">

                    {project.images?.[0] ? (
                      <img
                        src={`${API_ORIGIN}${project.images[0]}`}
                        alt={project.title}
                        className="w-16 h-16 object-cover border border-wire shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 border border-wire flex items-center justify-center shrink-0">
                        <span className="text-signal text-xs">
                          SEO
                        </span>
                      </div>
                    )}

                    <div className="min-w-0">

                      <div className="flex items-center gap-2 flex-wrap">

                        <p className="font-body font-medium text-paper truncate">
                          {project.title}
                        </p>

                        {project.featured && (
                          <span className="border border-signal px-2 py-0.5 text-[10px] text-signal">
                            FEATURED
                          </span>
                        )}

                      </div>

                      <p className="text-mist text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>

                      {project.techStack?.length > 0 && (
                        <p className="text-mist text-xs mt-2 truncate">
                          {Array.isArray(project.techStack)
                            ? project.techStack.join(" · ")
                            : project.techStack}
                        </p>
                      )}

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 shrink-0">

                    <button
                      onClick={() => handleEdit(project)}
                      className="text-sm text-mist hover:text-signal transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-sm text-mist hover:text-signal transition-colors"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

            {projects.length === 0 && (
              <div className="border border-wire p-8 text-center">

                <p className="font-body text-paper">
                  No case studies yet.
                </p>

                <p className="text-mist text-sm mt-2">
                  Create your first digital marketing case study above.
                </p>

              </div>
            )}

          </div>
        )}

      </div>

    </section>
  );
};

export default AdminDashboard;