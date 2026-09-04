import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS, type Project } from '@/lib/constants';
import { SectionLabel, MaskReveal, FadeIn } from '@/components/ui/Primitives';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OurWork() {
  return (
    <section className="relative bg-surface-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <SectionLabel className="mb-8">Our Work</SectionLabel>
          <h2 className="font-sans font-bold leading-[1.1] tracking-tight">
            <span className="block overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-100">
              <MaskReveal>Selected Projects.</MaskReveal>
            </span>
          </h2>
        </div>

        {/* Projects with varied reveals */}
        <div className="space-y-32">
          {PROJECTS.map((project, i) => (
            <ProjectCaseStudy key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <FadeIn>
            <p className="text-xl text-ink-70 mb-8">Want to see more?</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide-2 text-ink-90 glass rounded-full hover:glass-strong transition-all"
            >
              EXPLORE ALL WORK
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const isEven = index % 2 === 0;

  // Parallax for image
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Scale reveal: starts at 1.1, settles to 1
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  // Blur reveal
  const imgBlur = useTransform(scrollYProgress, [0, 0.3], ['blur(8px)', 'blur(0px)']);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Image — alternating sides */}
      <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg group">
          {/* Curtain reveal — dark panel slides away */}
          <motion.div
            className="absolute inset-0 bg-surface-850 z-20 origin-bottom"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {/* Image with scale + parallax + blur reveal */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${project.image})`,
              y: imgY,
              scale: imgScale,
              filter: imgBlur,
            }}
          />
          {/* Dark gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/40 to-transparent pointer-events-none" />
          {/* Hover glass overlay */}
          <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* Project number */}
          <div className="absolute top-6 left-6 font-sans text-6xl sm:text-7xl font-bold text-ink-100/10 z-10">
            {project.num}
          </div>
        </div>
      </div>

      {/* Info — alternating sides */}
      <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
        <FadeIn>
          <span className="text-xs uppercase tracking-ultra text-accent-400">
            {project.category}
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h3 className="mt-4 font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-ink-100 leading-tight">
            {project.title}
          </h3>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-5 text-base text-ink-60 leading-relaxed max-w-md text-pretty">
            {project.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide-2 text-ink-40 mb-3">Services</p>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-xs text-ink-70 glass rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide-2 text-ink-40 mb-3">Tech</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs text-ink-50 glass rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 mt-8 text-sm text-ink-90 hover:text-accent-300 transition-colors"
          >
            <span className="border-b border-surface-500 group-hover:border-accent-400 transition-colors pb-1">
              View Project
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
