import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-24">
      <h1 className="font-display text-2xl text-paper mb-8">Admin login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-mist mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper focus:border-signal outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-mist mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-wire px-4 py-3 text-paper focus:border-signal outline-none"
          />
        </div>
        {error && <p className="text-signal text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-signal text-ink px-6 py-3 font-display text-sm hover:bg-paper transition-colors w-full"
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
