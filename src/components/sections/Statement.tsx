import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionLabel, MaskReveal } from '@/components/ui/Primitives';

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center py-32 px-6 bg-surface-900 overflow-hidden"
    >
      {/* Subtle background glow */}
      <motion.div
        style={{ scale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,97,0.04) 0%, transparent 60%)' }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-10">
          <SectionLabel>What Sets Us Apart</SectionLabel>
        </div>

        <h2 className="font-sans font-bold leading-[1.1] tracking-tight">
          <span className="block overflow-hidden text-3xl sm:text-5xl md:text-6xl text-ink-100">
            <MaskReveal>We don't just build websites.</MaskReveal>
          </span>
          <span className="block overflow-hidden mt-4 text-3xl sm:text-5xl md:text-6xl text-accent-300">
            <MaskReveal delay={0.15}>We build experiences.</MaskReveal>
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl mx-auto text-base sm:text-lg text-ink-60 leading-relaxed text-pretty"
        >
          Digital experiences designed to make your business impossible to ignore.
        </motion.p>
      </motion.div>
    </section>
  );
}
