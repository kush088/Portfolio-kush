import React from "react";

const Footer = () => (
  <footer className="border-t border-wire mt-24">
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-2 text-sm text-mist">
      <span>© {new Date().getFullYear()} Kush Parekh</span>
      <span>Built with the MERN stack</span>
    </div>
  </footer>
);

export default Footer;
