import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { STUDIO } from '@/lib/constants';
import { useContact } from '@/context/ContactContext';

const NAV_ITEMS = [
  { label: 'Our Work', to: '/work' },
  { label: 'Build Product', to: '/#build-product' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openContact } = useContact();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      let lastY = (window as unknown as { __lastY?: number }).__lastY ?? 0;
      if (y > 200 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      (window as unknown as { __lastY?: number }).__lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6"
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div
          className={`mt-4 flex items-center justify-between w-full max-w-6xl px-6 py-5 rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass-surface shadow-lg shadow-surface-950/30' : 'glass'
          }`}
        >
          {/* Brand */}
          <Link
            to="/"
            className="font-sans text-base tracking-wide-2 text-ink-100 font-semibold hover:text-white transition-colors"
          >
            {STUDIO.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm text-ink-70 hover:text-ink-100 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={openContact}
              className="text-sm text-ink-70 hover:text-ink-100 transition-colors duration-300"
            >
              Contact
            </button>
            <button
              onClick={openContact}
              className="px-5 py-2.5 text-sm font-medium text-surface-950 bg-ink-100 rounded-full hover:bg-white transition-colors duration-300"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-ink-90"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-surface-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                <Link
                  to={item.to}
                  className="font-sans text-2xl text-ink-100 tracking-wide"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                setMenuOpen(false);
                openContact();
              }}
              className="font-sans text-2xl text-accent-300 tracking-wide"
            >
              Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
