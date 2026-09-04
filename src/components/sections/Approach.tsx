import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { APPROACH_STEPS } from '@/lib/constants';
import { SectionLabel, MaskReveal } from '@/components/ui/Primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const activeStep = useTransform(scrollYProgress, [0, 1], [0, APPROACH_STEPS.length - 1]);

  return (
    <section ref={ref} className="relative bg-surface-950" style={{ height: `${APPROACH_STEPS.length * 60}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 sm:px-12">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="mb-16">
            <SectionLabel className="mb-8">Our Approach</SectionLabel>
            <h2 className="font-sans font-bold leading-[1.1] tracking-tight">
              <span className="block overflow-hidden text-3xl sm:text-4xl md:text-5xl text-ink-100">
                <MaskReveal>How we work.</MaskReveal>
              </span>
            </h2>
          </div>

          {/* Steps — sequential reveal */}
          <div className="space-y-8">
            {APPROACH_STEPS.map((step, i) => (
              <StepRow
                key={step.num}
                step={step}
                index={i}
                activeStep={activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  activeStep,
}: {
  step: (typeof APPROACH_STEPS)[number];
  index: number;
  activeStep: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(activeStep, [index - 1.5, index, index + 1.5], [0.25, 1, 0.25]);
  const x = useTransform(activeStep, [index - 1.5, index, index + 1.5], [-20, 0, 20]);
  const scale = useTransform(activeStep, [index - 1.5, index, index + 1.5], [0.98, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="flex items-start gap-6 sm:gap-10 border-b border-surface-700 pb-8"
    >
      <span className="font-sans text-2xl sm:text-3xl text-accent-400/50 font-semibold flex-shrink-0">
        {step.num}
      </span>
      <div>
        <h3 className="font-sans text-xl sm:text-2xl md:text-3xl text-ink-100 font-semibold">
          {step.title}
        </h3>
        <p className="mt-2 text-base text-ink-50 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
