import React from 'react';
import { useContent } from '../context/ContentContext';

const Footer: React.FC = () => {
  const { content } = useContent();
  const { hero } = content;

  return (
    <footer className="bg-bg py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-textDim text-sm">
          &copy; {new Date().getFullYear()} <span className="text-white font-medium">{hero.name}</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
