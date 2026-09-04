import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';
import { SectionLabel, FadeIn } from '@/components/ui/Primitives';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SpiralShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Header */}
        <div className="absolute top-24 left-0 right-0 px-6 sm:px-12 z-20">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>Spatial Gallery</SectionLabel>
          </div>
        </div>

        {/* Spiral structure */}
        <motion.div
          className="relative w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] preserve-3d"
          style={{ rotate, scale }}
        >
          {/* Central ring */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full"
            style={{
              border: '1px solid rgba(201,169,97,0.1)',
              boxShadow: '0 0 100px rgba(201,169,97,0.04)',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[350px] sm:h-[350px] rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.04)' }}
          />

          {/* Project nodes around the spiral */}
          {PROJECTS.map((project, i) => {
            const angle = (i / PROJECTS.length) * Math.PI * 2;
            const radius = 280;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={project.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  x,
                  y,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2 group">
                  <div
                    className="w-32 h-20 sm:w-40 sm:h-28 rounded-sm overflow-hidden glass-strong relative"
                    style={{
                      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-[10px] uppercase tracking-wide text-smoke-200 font-medium">
                        {project.title}
                      </p>
                      <p className="text-[8px] uppercase tracking-wide text-smoke-500">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  {/* Connecting line */}
                  <div
                    className="absolute top-1/2 left-1/2 w-px h-12 bg-gradient-to-b from-accent-400/30 to-transparent"
                    style={{ transform: `rotate(${angle * (180 / Math.PI) - 90}deg) translateX(-50%) translateY(-100%)` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center text */}
        <div className="absolute text-center z-10">
          <FadeIn>
            <p className="text-xs uppercase tracking-ultra-wide text-smoke-500 mb-4">
              An Immersive Gallery
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-smoke-100">
              Explore the Spiral
            </h3>
          </FadeIn>
        </div>

        {/* CTA */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20">
          <FadeIn delay={0.2}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-medium tracking-wide text-smoke-200 glass rounded-full hover:glass-strong transition-all"
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
