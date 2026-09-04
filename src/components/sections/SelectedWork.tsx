import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';
import { SectionLabel, FadeIn } from '@/components/ui/Primitives';

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal scroll: translate the track based on vertical scroll
  const trackWidth = `-${(PROJECTS.length - 1) * 100}%`;
  const x = useTransform(scrollYProgress, [0, 1], ['0%', trackWidth]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${PROJECTS.length * 100}vh` }}>
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-24 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <SectionLabel>Selected Work</SectionLabel>
            <span className="text-xs uppercase tracking-wide text-smoke-500">
              {PROJECTS.length} Projects
            </span>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          className="flex h-full will-change-transform"
          style={{ x }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectSlide key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-12 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-ink-600 relative">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-400 to-smoke-200"
                style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>
            <div className="flex justify-between mt-3 text-[10px] uppercase tracking-ultra-wide text-smoke-500">
              <span>Scroll to Explore</span>
              <span>
                {String(1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSlide({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-12 relative">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-sm group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-20% 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
          <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Project number */}
          <div className="absolute top-6 left-6 font-display text-6xl sm:text-7xl font-bold text-smoke-100/10">
            {String(index + 1).padStart(2, '0')}
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <FadeIn>
            <span className="text-xs uppercase tracking-ultra-wide text-accent-400">
              {project.category}
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-smoke-50 leading-none">
              {project.title}
            </h3>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-sm sm:text-base text-smoke-400 leading-relaxed max-w-md text-pretty">
              {project.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-wide text-smoke-400 glass rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 text-sm text-smoke-200 hover:text-accent-300 transition-colors mt-2"
            >
              <span className="border-b border-smoke-600 group-hover:border-accent-400 transition-colors pb-1">
                View Project
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
