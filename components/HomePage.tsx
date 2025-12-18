import React, { Suspense, lazy } from 'react';
import Hero from './Hero';
import About from './About';

// OPTIMIZATION 3: Lazy Load below-the-fold content
const Experience = lazy(() => import('./Experience'));
const Projects = lazy(() => import('./Projects'));
const Skills = lazy(() => import('./Skills'));
const Contact = lazy(() => import('./Contact'));

// Fallback loader
const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center bg-[#0b1121]">
    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <>
      {/* Critical Rendering (No Suspense) */}
      <Hero />
      <About />
      
      {/* Deferred Rendering */}
      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;