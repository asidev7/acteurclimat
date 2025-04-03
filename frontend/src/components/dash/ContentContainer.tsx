// components/ContentContainer.tsx
import React, { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  title?: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, title }) => {
  return (
    <div className="flex-1 overflow-auto pt-20 pb-24"> {/* Espace pour l'en-tête fixe et la barre de navigation inférieure */}
      <div className="p-6">
        {title && <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;