import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to a backend route or an email service (e.g. Nodemailer, Resend) when ready.
    console.log("Contact form submitted:", form);
    setSent(true);
  };

  if (sent) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="font-display text-3xl text-paper mb-4">Thanks!</h1>
        <p className="text-mist">Your message was captured. I'll get back to you soon.</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-paper mb-2">Contact</h1>
      <p className="text-mist mb-10">Have a project in mind? Send a message.</p>

      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <div>
          <label className="block text-sm text-mist mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-mist mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-mist mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper focus:border-signal outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-signal text-ink px-6 py-3 font-display text-sm hover:bg-paper transition-colors"
        >
          Send message
        </button>
      </form>
    </section>
  );
};

export default Contact;
