import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { WORK_PAGE_PROJECTS, WORK_CATEGORIES, filterProjects, type Project } from '@/lib/constants';
import { SectionLabel, FadeIn, MaskReveal } from '@/components/ui/Primitives';
import { useContact } from '@/context/ContactContext';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { openContact } = useContact();

  const filtered = filterProjects(activeCategory, WORK_PAGE_PROJECTS);

  return (
    <div className="relative pt-32 pb-32 px-6 min-h-screen bg-surface-950">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <FadeIn>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-ink-50 hover:text-ink-100 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </FadeIn>

        {/* Header */}
        <div className="mb-16">
          <SectionLabel className="mb-8">All Work</SectionLabel>
          <h1 className="font-sans font-bold tracking-tight leading-[1.1]">
            <span className="block overflow-hidden text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-100">
              <MaskReveal>Selected</MaskReveal>
            </span>
            <span className="block overflow-hidden mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-accent-300">
              <MaskReveal delay={0.1}>Projects.</MaskReveal>
            </span>
          </h1>
        </div>

        {/* Category filter */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-16">
            {WORK_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wide rounded-full transition-all ${
                  activeCategory === cat
                    ? 'glass-accent text-accent-300'
                    : 'glass text-ink-50 hover:text-ink-90'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <FadeIn>
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-ink-100 mb-8">
              Have a project in mind?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button
              onClick={openContact}
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide-2 text-surface-950 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 bg-[length:200%_100%] group-hover:bg-[position:100%_0%] transition-all duration-700" />
              <span className="relative z-10">START A PROJECT</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const isLarge = index % 3 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className={`group relative overflow-hidden rounded-lg glass-surface ${isLarge ? 'md:col-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/70 via-surface-950/20 to-transparent" />

        {/* Hover glass overlay */}
        <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Number */}
        <div className="absolute top-6 left-6 font-sans text-5xl font-bold text-ink-100/10">
          {project.num}
        </div>

        {/* Year */}
        <div className="absolute top-6 right-6">
          <span className="text-xs uppercase tracking-wide text-ink-60 glass px-3 py-1.5 rounded-full">
            {project.year}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs uppercase tracking-ultra text-accent-400">
            {project.category}
          </span>
        </div>
        <h3 className="font-sans text-2xl sm:text-3xl font-bold text-ink-100 mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-ink-50 leading-relaxed max-w-md text-pretty mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wide text-ink-50 glass rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
