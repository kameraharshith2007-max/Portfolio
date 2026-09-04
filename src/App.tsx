import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ContactProvider } from '@/context/ContactContext';
import { useSmoothScroll, useReducedMotion } from '@/lib/hooks';
import AtmosphericBackground from '@/components/AtmosphericBackground';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import HomePage from '@/pages/HomePage';
import WorkPage from '@/pages/WorkPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useSmoothScroll(!loading && !reducedMotion);

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <>
      <AtmosphericBackground reducedMotion={reducedMotion} />
      <Loader onComplete={() => setLoading(false)} reducedMotion={reducedMotion} />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
      <ContactModal />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ContactProvider>
        <AppContent />
      </ContactProvider>
    </BrowserRouter>
  );
}
