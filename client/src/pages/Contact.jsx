import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "./Contact.css";

const initialForm = { name: "", email: "", budget: "", message: "" };

export default function Contact() {
  const { apiBase } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${apiBase}/contact`, form);
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container contact-grid">
      <div className="contact-intro">
        <p className="eyebrow">Contact</p>
        <h1 className="contact-headline">
          Let’s Talk About Your Marketing Goals
        </h1>
        <p>
         Have a project, business idea, or digital marketing challenge? Tell me what you’re working on, and let’s explore how I can help.
        </p>
        <div className="contact-details">
          <p>kushparekh01@gmail.com</p>
          <p>+91 9016480817</p>
          <p>Surat , Gujarat , India</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="field-group">
          <label htmlFor="name" className="field-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="field"
            placeholder="Your name"
          />
        </div>

        <div className="field-group">
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="field"
            placeholder="Enter your E-mail"
          />
        </div>

        <div className="field-group">
          <label htmlFor="budget" className="field-label">
            Monthly budget (optional)
          </label>
          <input
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="field"
            placeholder="Rs:"
          />
        </div>

        <div className="field-group">
          <label htmlFor="message" className="field-label">
            What are you trying to move?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="field"
            placeholder="Traffic, conversion rate, retention…"
          />
        </div>

        <button type="submit" disabled={status === "sending"} className="btn btn-primary">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "sent" && (
          <p className="contact-form-message text-success">
            Sent — I'll get back to you within two business days.
          </p>
        )}
        {status === "error" && (
          <p className="contact-form-message text-error">
            That didn't go through. Try again, or email hello@kushparekh.com directly.
          </p>
        )}
      </form>
    </div>
  );
}
