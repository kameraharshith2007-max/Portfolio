import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { STUDIO } from '@/lib/constants';
import { useContact } from '@/context/ContactContext';
import { MaskReveal } from '@/components/ui/Primitives';

export default function Footer() {
  const { openContact } = useContact();

  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden bg-surface-950">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Big statement */}
        <div className="text-center mb-24">
          <h2 className="font-sans font-bold leading-[1.1] tracking-tight">
            <span className="block overflow-hidden text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-ink-100">
              <MaskReveal>Let's build something great.</MaskReveal>
            </span>
          </h2>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-surface-600">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-sans text-lg tracking-wide-2 text-ink-100 font-semibold mb-4">
              {STUDIO.name}
            </h3>
            <p className="text-base text-ink-50 leading-relaxed max-w-sm">
              A digital experiences studio building premium websites and digital
              products for ambitious businesses and brands.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra text-ink-40 mb-4">Navigate</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/work" className="text-sm text-ink-70 hover:text-accent-300 transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/#build-product" className="text-sm text-ink-70 hover:text-accent-300 transition-colors">
                  Build Product
                </Link>
              </li>
              <li>
                <button onClick={openContact} className="text-sm text-ink-70 hover:text-accent-300 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-ultra text-ink-40 mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${STUDIO.email}`} className="text-sm text-ink-70 hover:text-accent-300 transition-colors">
                  {STUDIO.email}
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a href={STUDIO.socials.instagram} className="text-ink-50 hover:text-accent-300 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={STUDIO.socials.linkedin} className="text-ink-50 hover:text-accent-300 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={STUDIO.socials.x} className="text-ink-50 hover:text-accent-300 transition-colors" aria-label="X">
                  <Twitter className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-40">
            © {new Date().getFullYear()} {STUDIO.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-40 uppercase tracking-wide">
            Designed & Built with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
