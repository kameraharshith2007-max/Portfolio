import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import SelectedWork from '@/components/sections/SelectedWork';
import SpiralShowcase from '@/components/sections/SpiralShowcase';
import Approach from '@/components/sections/Approach';
import Testimonials from '@/components/sections/Testimonials';
import Mission from '@/components/sections/Mission';
import BuildProduct from '@/components/sections/BuildProduct';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import { useReducedMotion } from '@/lib/hooks';

export default function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <main>
      <Hero reducedMotion={reducedMotion} />
      <Intro />
      <SelectedWork />
      <SpiralShowcase />
      <Approach />
      <Testimonials />
      <Mission />
      <BuildProduct />
      <ContactSection />
      <Footer />
    </main>
  );
}
