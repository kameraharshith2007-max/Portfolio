import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import OurWork from '@/components/sections/OurWork';
import SpatialGallery from '@/components/sections/SpatialGallery';
import Statement from '@/components/sections/Statement';
import Approach from '@/components/sections/Approach';
import Testimonials from '@/components/sections/Testimonials';
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
      <OurWork />
      <SpatialGallery />
      <Statement />
      <Approach />
      <Testimonials />
      <BuildProduct />
      <ContactSection />
      <Footer />
    </main>
  );
}
