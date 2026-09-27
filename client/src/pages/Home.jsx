import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <section className="max-w-5xl mx-auto px-6 pt-20 pb-32">

    {/* Hero */}
    <div className="max-w-3xl">

      <p className="font-display text-signal text-xs sm:text-sm tracking-wide mb-5">
        DIGITAL MARKETING & SEO
      </p>

      <h1 className="font-body font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-paper">
        I turn search data into
        <br />
        <span className="text-signal">
          digital growth strategies.
        </span>
      </h1>

      <p className="font-body text-mist max-w-2xl mt-7 text-base sm:text-lg leading-relaxed">
        I'm Kush Parekh, a Digital Marketing and SEO enthusiast focused on
        keyword research, technical SEO, content strategy, and performance
        analysis. I combine marketing research with technical knowledge to
        understand, optimize, and improve digital experiences.
      </p>

      {/* CTA */}
      <div className="flex flex-wrap gap-4 mt-9">

        <Link
          to="/projects"
          className="bg-signal text-ink px-6 py-3 font-body font-medium text-sm hover:bg-paper transition-colors"
        >
          Explore case study →
        </Link>

        <Link
          to="/contact"
          className="border border-wire px-6 py-3 font-body font-medium text-sm text-paper hover:border-signal transition-colors"
        >
          Get in touch
        </Link>

      </div>

    </div>


    {/* Areas of Expertise */}
    <div className="mt-16">

      <p className="font-display text-signal text-xs mb-4">
        AREAS I WORK WITH
      </p>

      <div className="flex flex-wrap gap-2">

        <span className="border border-wire px-3 py-2 text-xs text-mist hover:border-signal hover:text-paper transition-colors">
          SEO
        </span>

        <span className="border border-wire px-3 py-2 text-xs text-mist hover:border-signal hover:text-paper transition-colors">
          Keyword Research
        </span>

        <span className="border border-wire px-3 py-2 text-xs text-mist hover:border-signal hover:text-paper transition-colors">
          Technical SEO
        </span>

        <span className="border border-wire px-3 py-2 text-xs text-mist hover:border-signal hover:text-paper transition-colors">
          Content Strategy
        </span>

        <span className="border border-wire px-3 py-2 text-xs text-mist hover:border-signal hover:text-paper transition-colors">
          Google Ads
        </span>

        <span className="border border-wire px-3 py-2 text-xs text-mist hover:border-signal hover:text-paper transition-colors">
          Analytics
        </span>

      </div>

    </div>


    {/* Featured Case Study */}
    <div className="mt-20 border border-wire p-6 sm:p-8 lg:p-10 hover:border-signal transition-colors">

      <div className="flex items-center justify-between gap-4 mb-6">

        <p className="font-display text-signal text-xs">
          FEATURED CASE STUDY
        </p>

        <span className="text-mist text-xs">
          01
        </span>

      </div>

      <h2 className="font-body font-semibold text-2xl sm:text-3xl text-paper tracking-tight">
        From search problem
        <span className="text-signal"> → </span>
        marketing strategy
      </h2>

      <p className="font-body text-mist max-w-2xl mt-5 leading-relaxed">
        A practical digital marketing case study exploring how market
        research, competitor analysis, keyword research, SEO optimization,
        content strategy, and performance measurement can work together.
      </p>

      {/* Case Study Tags */}
      <div className="flex flex-wrap gap-2 mt-6">

        <span className="border border-wire px-3 py-1.5 text-xs text-mist">
          SEO
        </span>

        <span className="border border-wire px-3 py-1.5 text-xs text-mist">
          Keywords
        </span>

        <span className="border border-wire px-3 py-1.5 text-xs text-mist">
          Content
        </span>

        <span className="border border-wire px-3 py-1.5 text-xs text-mist">
          Analytics
        </span>

      </div>

      <Link
        to="/projects"
        className="inline-block mt-8 font-body font-medium text-sm text-signal hover:text-paper transition-colors"
      >
        Read the full case study →
      </Link>

    </div>


    {/* Process */}
    <div className="mt-20">

      <p className="font-display text-signal text-xs mb-8">
        MY APPROACH
      </p>

      <div className="grid sm:grid-cols-3 gap-10">

        {/* Research */}
        <div>

          <p className="font-display text-signal text-xs mb-3">
            01 / RESEARCH
          </p>

          <h3 className="font-body font-semibold text-paper text-lg">
            Understand
          </h3>

          <p className="font-body text-mist text-sm leading-relaxed mt-3">
            Research the audience, market, competitors, keywords, and search
            intent to identify meaningful opportunities.
          </p>

        </div>


        {/* Strategy */}
        <div>

          <p className="font-display text-signal text-xs mb-3">
            02 / OPTIMIZE
          </p>

          <h3 className="font-body font-semibold text-paper text-lg">
            Build the strategy
          </h3>

          <p className="font-body text-mist text-sm leading-relaxed mt-3">
            Turn research into practical SEO, content, keyword, and digital
            marketing strategies.
          </p>

        </div>


        {/* Measure */}
        <div>

          <p className="font-display text-signal text-xs mb-3">
            03 / MEASURE
          </p>

          <h3 className="font-body font-semibold text-paper text-lg">
            Learn from data
          </h3>

          <p className="font-body text-mist text-sm leading-relaxed mt-3">
            Track performance, analyze results, and identify areas where the
            strategy can be improved.
          </p>

        </div>

      </div>

    </div>


    {/* Bottom CTA */}
    <div className="mt-20 pt-10 border-t border-wire flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

      <div>
        <p className="font-body font-semibold text-paper text-lg">
          Want to see how I approach a real problem?
        </p>

        <p className="font-body text-mist text-sm mt-2">
          Explore the complete digital marketing case study.
        </p>
      </div>

      <Link
        to="/projects"
        className="font-body font-medium text-sm text-signal hover:text-paper transition-colors whitespace-nowrap"
      >
        View case study →
      </Link>

    </div>

  </section>
);

export default Home;