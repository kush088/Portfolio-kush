import React from "react";

const About = () => (
  <section className="max-w-5xl mx-auto px-6 py-20">
    <h1 className="font-display text-3xl text-paper mb-6">
      About
    </h1>

    <p className="text-mist max-w-prose leading-relaxed">
      I'm Kush Parekh, a Digital Marketing and SEO enthusiast with a
      background in Computer Science. I enjoy researching keywords,
      analyzing competitors, optimizing websites, and creating strategies
      that improve online visibility and reach the right audience.
    </p>

    <div className="grid sm:grid-cols-2 gap-8 mt-12">

      {/* Digital Marketing */}
      <div>
        <h2 className="font-display text-sm text-signal mb-3">
          Digital Marketing
        </h2>

        <ul className="text-mist text-sm space-y-1">
          <li>SEO & Keyword Research</li>
          <li>On-Page & Technical SEO</li>
          <li>Off-Page SEO & Backlinks</li>
          <li>Content Strategy & Google Ads</li>
        </ul>
      </div>

      {/* Technical Skills */}
      <div>
        <h2 className="font-display text-sm text-signal mb-3">
          Technical Skills
        </h2>

        <ul className="text-mist text-sm space-y-1">
          <li>HTML, CSS, JavaScript, React</li>
          <li>Node.js, Express, MongoDB</li>
          <li>WordPress & Website Optimization</li>
          <li>Google Analytics & Search Console</li>
        </ul>
      </div>

      {/* Education */}
      <div>
        <h2 className="font-display text-sm text-signal mb-3">
          Education
        </h2>

        <ul className="text-mist text-sm space-y-1">
          <li>M.Tech in Computer Science - CHARUSAT University</li>
          <li>B.Tech in Computer Science - Bhagwan Mahavir University</li>
        </ul>
      </div>

      {/* Currently */}
      <div>
        <h2 className="font-display text-sm text-signal mb-3">
          Currently
        </h2>

        <ul className="text-mist text-sm space-y-2">
          <li>Building digital marketing case studies</li>
          <li>Learning and practicing SEO</li>

          <li className="inline-flex items-center gap-2 border border-signal px-3 py-2 text-signal text-xs font-medium mt-1">
            <span className="w-2 h-2 rounded-full bg-signal"></span>
            Open to Digital Marketing & SEO opportunities
          </li>
        </ul>
      </div>

    </div>
  </section>
);

export default About;