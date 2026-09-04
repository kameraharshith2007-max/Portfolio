import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionLabel, RevealText } from '@/components/ui/Primitives';

export default function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      {/* Background atmospheric glow */}
      <motion.div
        style={{
          scale,
          background: 'radial-gradient(circle, rgba(201,169,97,0.05) 0%, transparent 60%)',
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
      />

      <motion.div
        style={{ y, opacity }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <div className="flex justify-center mb-12">
          <SectionLabel>Our Intention</SectionLabel>
        </div>

        <h2 className="font-display font-bold leading-[1.05] tracking-tight">
          <span className="block overflow-hidden">
            <RevealText className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-smoke-100">
              Your website is not
            </RevealText>
          </span>
          <span className="block overflow-hidden mt-2">
            <RevealText delay={0.1} className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-smoke-400">
              just a website.
            </RevealText>
          </span>
          <span className="block overflow-hidden mt-6">
            <RevealText delay={0.25} className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-smoke-100">
              It is the first
            </RevealText>
          </span>
          <span className="block overflow-hidden mt-2">
            <RevealText delay={0.35} className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-smoke-100">
              impression your
            </RevealText>
          </span>
          <span className="block overflow-hidden mt-2">
            <RevealText delay={0.45} className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl bg-gradient-to-r from-accent-300 to-accent-400 bg-clip-text text-transparent">
              business makes online.
            </RevealText>
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 max-w-2xl mx-auto text-base sm:text-lg text-smoke-400 leading-relaxed text-pretty"
        >
          We build digital experiences designed to make that first impression
          impossible to ignore.
        </motion.p>
      </motion.div>
    </section>
  );
}
