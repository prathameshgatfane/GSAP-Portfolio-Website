import { useCallback, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LightboxModal } from './components/common/LightboxModal';
import { ProjectDetailsModal } from './components/common/ProjectDetailsModal';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './components/layout/Preloader';
import { CraftSection } from './components/sections/CraftSection';
import { CrossingRibbons } from './components/sections/CrossingRibbons';
import { CredentialsSection } from './components/sections/CredentialsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { HeroSection } from './components/sections/HeroSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { WorksSection } from './components/sections/WorksSection';
import { LenisScrollProvider } from './context/LenisContext';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/useTheme';
import { usePortfolioGsap } from './hooks/usePortfolioGsap';
import type { LightboxState, ProjectItem } from './types/portfolio';
import { sanitizeUrl } from './utils/security';

function PortfolioContent() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    src: '',
    title: '',
  });

  usePortfolioGsap(mainRef);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderVisible(false);
    setIntroReady(true);
  }, []);

  const handleOpenLightbox = useCallback((src: string, title: string) => {
    const safeSrc = sanitizeUrl(src);
    if (safeSrc === '#') return;
    setLightbox({
      isOpen: true,
      src: safeSrc,
      title,
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <>
      <Preloader visible={preloaderVisible} onComplete={handlePreloaderComplete} />

      <div id="main" ref={mainRef}>
        <Navbar ready={introReady} />
        <HeroSection ready={introReady} />
        <CrossingRibbons />
        <CraftSection />
        <WorksSection onSelectProject={setSelectedProject} />
        <ExperienceSection />
        <SkillsSection />
        <CredentialsSection onOpenLightbox={handleOpenLightbox} />
        <Footer />
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLightbox={handleOpenLightbox}
      />

      <LightboxModal lightbox={lightbox} onClose={handleCloseLightbox} />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={theme}
      />
    </>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LenisScrollProvider>
          <PortfolioContent />
        </LenisScrollProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
