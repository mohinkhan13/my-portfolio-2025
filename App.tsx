import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Navigate import kiya
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminDashboard from './components/AdminDashboard'; // Import Admin
import { ContentProvider } from './context/ContentContext';

// Note: Settings icon aur button hata diya hai

const PortfolioContent: React.FC = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-300 font-sans selection:bg-accent/30 selection:text-accent">
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          
          {/* Secret Admin Route */}
          {/* Jab tum browser me 'yourwebsite.com/admin' likhoge tab ye khulega */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      
      {/* Yahan se wo Settings Button Code Delete kar diya hai */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <PortfolioContent />
    </ContentProvider>
  );
};

export default App;