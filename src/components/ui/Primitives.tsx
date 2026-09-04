import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

type CTAButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: 'right' | 'down' | 'none';
  className?: string;
};

export function CTAButton({
  children,
  onClick,
  variant = 'primary',
  icon = 'right',
  className = '',
}: CTAButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`group relative inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide-2 transition-all duration-500 overflow-hidden ${
        isPrimary ? 'text-surface-950' : 'text-ink-90 glass hover:glass-strong'
      } ${className}`}
    >
      {isPrimary && (
        <span className="absolute inset-0 bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 bg-[length:200%_100%] group-hover:bg-[position:100%_0%] transition-all duration-700" />
      )}
      <span className="relative z-10">{children}</span>
      {icon === 'right' && (
        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {icon === 'down' && (
        <ArrowDown className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
      )}
    </motion.button>
  );
}

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs uppercase tracking-ultra text-ink-50 ${className}`}>
      <span className="w-8 h-px bg-ink-40" />
      {children}
    </div>
  );
}

// Text mask reveal — clips text upward from behind a mask
export function MaskReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Blur-to-sharp reveal
export function BlurReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Simple fade-in with slight upward movement
export function FadeIn({
  children,
  className = '',
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for sequential child reveals
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Image curtain reveal — a dark panel slides away
export function CurtainImage({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* The image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.4, delay, ease: EASE }}
      />
      {/* The curtain that slides away */}
      <motion.div
        className="absolute inset-0 bg-surface-850 origin-bottom"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
      {/* Subtle dark gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/50 to-transparent pointer-events-none" />
      <span className="sr-only">{alt}</span>
    </div>
  );
}
