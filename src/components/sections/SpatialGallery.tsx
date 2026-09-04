import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';
import { SectionLabel, FadeIn } from '@/components/ui/Primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SpatialGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Camera moves through the gallery — horizontal + depth
  const cameraX = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);
  const cameraZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, -200, -400]);
  const cameraScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 0.2, 0.2, 0.8]);

  return (
    <section ref={ref} className="relative bg-surface-850" style={{ height: `${PROJECTS.length * 90}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="absolute top-24 left-0 right-0 px-6 sm:px-12 z-30">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>Spatial Gallery</SectionLabel>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-ink-100">
                Walk through the work.
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* 3D Gallery environment */}
        <div className="absolute inset-0 flex items-center perspective-2000 overflow-hidden">
          <motion.div
            className="flex items-center gap-16 sm:gap-24 px-[10vw] preserve-3d will-change-transform"
            style={{
              x: cameraX,
              z: cameraZ,
              scale: cameraScale,
            }}
          >
            {PROJECTS.map((project, i) => (
              <GalleryPanel key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Atmospheric fog edges */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ opacity: fogOpacity }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-850 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-850 to-transparent" />
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-12 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-surface-500 relative">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-400 to-ink-90"
                style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>
            <div className="flex justify-between mt-3 text-[10px] uppercase tracking-ultra text-ink-40">
              <span>Scroll to Walk Through</span>
              <span>{PROJECTS.length} Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryPanel({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  // Each panel has a slightly different depth/rotation for spatial feel
  const rotations = [0, -3, 2, -2];
  const zOffsets = [0, -50, 30, -80];
  const yOffsets = [0, 20, -10, 15];

  return (
    <motion.div
      className="flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[45vw] preserve-3d"
      style={{
        rotateY: rotations[index] || 0,
        z: zOffsets[index] || 0,
        y: yOffsets[index] || 0,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Glass frame */}
      <div className="relative glass-surface rounded-lg p-4 group">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-md">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 to-transparent" />

          {/* Number */}
          <div className="absolute top-4 left-4 font-sans text-5xl font-bold text-ink-100/15">
            {project.num}
          </div>

          {/* Hover reflection */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 50%)',
            }}
          />
        </div>

        {/* Info below image */}
        <div className="pt-5 px-2">
          <span className="text-xs uppercase tracking-ultra text-accent-400">
            {project.category}
          </span>
          <h3 className="mt-2 font-sans text-2xl sm:text-3xl font-bold text-ink-100">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-ink-50 leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wide text-ink-50 glass rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Shadow beneath panel for depth */}
      <div className="mx-auto mt-2 w-3/4 h-8 bg-surface-950/40 blur-xl rounded-full" />
    </motion.div>
  );
}
