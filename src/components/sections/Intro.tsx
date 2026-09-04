import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionLabel, MaskReveal, FadeIn } from '@/components/ui/Primitives';

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="what-we-do"
      className="relative min-h-screen flex items-center justify-center py-32 px-6 bg-surface-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <SectionLabel>What We Do</SectionLabel>
        </motion.div>

        {/* Main statement with mask reveals */}
        <div className="text-center">
          <h2 className="font-sans font-bold leading-[1.1] tracking-tight text-balance">
            <span className="block overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-100">
              <MaskReveal>We design and build</MaskReveal>
            </span>
            <span className="block overflow-hidden mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-100">
              <MaskReveal delay={0.1}>premium websites</MaskReveal>
            </span>
            <span className="block overflow-hidden mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-60">
              <MaskReveal delay={0.2}>and digital products</MaskReveal>
            </span>
            <span className="block overflow-hidden mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent-300">
              <MaskReveal delay={0.3}>worth paying for.</MaskReveal>
            </span>
          </h2>
        </div>

        {/* Three pillars */}
        <motion.div
          style={{ y }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
        >
          <FadeIn className="text-center md:text-left">
            <div className="font-sans text-4xl text-accent-400/70 mb-4 font-semibold">01</div>
            <h3 className="text-sm uppercase tracking-wide-2 text-ink-90 mb-3 font-medium">Design</h3>
            <p className="text-base text-ink-50 leading-relaxed">
              Every visual decision — typography, color, motion, texture — is made with intention. No templates, no shortcuts.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="text-center md:text-left">
            <div className="font-sans text-4xl text-accent-400/70 mb-4 font-semibold">02</div>
            <h3 className="text-sm uppercase tracking-wide-2 text-ink-90 mb-3 font-medium">Build</h3>
            <p className="text-base text-ink-50 leading-relaxed">
              Modern engineering with React, TypeScript, and WebGL. Optimized for speed, accessibility, and scale.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="text-center md:text-left">
            <div className="font-sans text-4xl text-accent-400/70 mb-4 font-semibold">03</div>
            <h3 className="text-sm uppercase tracking-wide-2 text-ink-90 mb-3 font-medium">Deliver</h3>
            <p className="text-base text-ink-50 leading-relaxed">
              We obsess over the details most people won't notice — because that's what makes the difference feel premium.
            </p>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
}
