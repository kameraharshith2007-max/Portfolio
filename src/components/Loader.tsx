import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onComplete: () => void;
  reducedMotion: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Loader({ onComplete, reducedMotion }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 300);
      }, 200);
      return () => clearTimeout(t);
    }

    let current = 0;
    const interval = setInterval(() => {
      // Faster loading — target ~1.8s
      current += Math.random() * 5 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 500);
        }, 300);
        return;
      }
      setProgress(current);
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete, reducedMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-surface-900 flex items-center justify-center noise-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Ambient glow — dark grey, not black */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,97,0.05) 0%, transparent 60%)',
            }}
            animate={reducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col items-center gap-10 px-8">
            {/* Brand name with blur-to-sharp reveal */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center"
            >
              <h1 className="font-sans text-2xl sm:text-3xl tracking-ultra text-ink-100 font-semibold">
                Reachlynk
              </h1>
              <p className="mt-3 text-[10px] uppercase tracking-ultra text-ink-40">
                Digital Experiences Studio
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 flex flex-col gap-2">
              <div className="h-px bg-surface-500 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-400 to-ink-90"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-ultra text-ink-40">
                <span>Loading</span>
                <span>{Math.round(progress).toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
