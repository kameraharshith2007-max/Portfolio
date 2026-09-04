import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useContact } from '@/context/ContactContext';

type Props = {
  reducedMotion: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ reducedMotion }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContact } = useContact();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.85]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden"
    >
      {/* Background image with Ken Burns + parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, y: bgY }}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center ${reducedMotion ? '' : 'animate-ken-burns-slow'}`}
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280)',
          }}
        />
      </motion.div>

      {/* Dark gradient overlay — keeps text readable but image visible */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950/70 via-surface-950/50 to-surface-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950/60 via-transparent to-surface-950/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px bg-accent-400" />
          <span className="text-xs uppercase tracking-ultra text-ink-70">
            Digital Experiences / Web / Product
          </span>
          <span className="w-6 h-px bg-accent-400" />
        </motion.div>

        {/* Main heading */}
        <h1 className="font-sans font-bold leading-[1.05] tracking-tight text-balance max-w-4xl">
          <motion.span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-100 overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          >
            WE BUILD DIGITAL
          </motion.span>
          <motion.span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-100 overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          >
            EXPERIENCES THAT MATTER.
          </motion.span>
        </h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="mt-8 max-w-xl text-base sm:text-lg text-ink-70 leading-relaxed text-pretty"
        >
          Reachlynk designs and builds premium websites and digital products
          for ambitious businesses and brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={openContact}
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide-2 text-surface-950 overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 bg-[length:200%_100%] group-hover:bg-[position:100%_0%] transition-all duration-700" />
            <span className="relative z-10">START A PROJECT</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#what-we-do"
            className="group inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide-2 text-ink-90 glass rounded-full hover:glass-strong transition-all"
          >
            EXPLORE OUR WORK
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        style={{ opacity: textOpacity }}
      >
        <span className="text-[10px] uppercase tracking-ultra text-ink-50">Scroll to Explore</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-ink-40 to-transparent"
          animate={reducedMotion ? {} : { scaleY: [0.3, 1, 0.3], transformOrigin: 'top' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
