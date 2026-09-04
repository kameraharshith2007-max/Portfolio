import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';
import { SectionLabel, FadeIn, MaskReveal } from '@/components/ui/Primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-32 px-6 bg-surface-900">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <SectionLabel>User Experience</SectionLabel>
          </div>
          <h2 className="font-sans font-bold leading-[1.1] tracking-tight">
            <span className="block overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-100">
              <MaskReveal>Built for people.</MaskReveal>
            </span>
          </h2>
        </div>

        {/* Testimonial cards with horizontal drift */}
        <motion.div style={{ x }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-surface rounded-lg p-8 relative group"
            >
              {/* Quote mark */}
              <div className="font-sans text-5xl text-accent-400/20 leading-none mb-4">
                &ldquo;
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-ink-80 leading-relaxed mb-8 text-pretty">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-surface-600">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                  <span className="font-sans text-sm text-accent-300 font-semibold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-ink-100 font-medium">{t.name}</p>
                  <p className="text-xs text-ink-50">{t.company}</p>
                </div>
              </div>

              {/* Project type badge */}
              <div className="absolute top-6 right-6">
                <span className="text-[10px] uppercase tracking-wide text-ink-50 glass px-3 py-1.5 rounded-full">
                  {t.projectType}
                </span>
              </div>

              {/* Hover reflection */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent 50%)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
