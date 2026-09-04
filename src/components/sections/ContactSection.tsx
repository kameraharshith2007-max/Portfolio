import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContact } from '@/context/ContactContext';
import { SectionLabel, MaskReveal, FadeIn } from '@/components/ui/Primitives';

export default function ContactSection() {
  const { openContact } = useContact();

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 bg-surface-900 overflow-hidden">
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(42,42,47,0.4) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-10">
          <SectionLabel>Start a Conversation</SectionLabel>
        </div>

        <h2 className="font-sans font-bold leading-[1.1] tracking-tight">
          <span className="block overflow-hidden text-3xl sm:text-5xl md:text-6xl text-ink-100">
            <MaskReveal>Let's build something</MaskReveal>
          </span>
          <span className="block overflow-hidden mt-4 text-3xl sm:text-5xl md:text-6xl text-accent-300">
            <MaskReveal delay={0.15}>worth remembering.</MaskReveal>
          </span>
        </h2>

        <FadeIn delay={0.3}>
          <p className="mt-10 max-w-xl mx-auto text-base sm:text-lg text-ink-60 leading-relaxed text-pretty">
            Tell us what you're building. We'll figure out the rest.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <motion.button
            onClick={openContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 mt-12 text-sm font-medium tracking-wide-2 text-surface-950 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 bg-[length:200%_100%] group-hover:bg-[position:100%_0%] transition-all duration-700" />
            <span className="relative z-10">START A CONVERSATION</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}
