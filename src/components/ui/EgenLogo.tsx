import React from 'react';

interface EgenLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'horizontal' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const EgenLogo: React.FC<EgenLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Size metrics for the image logo container
  const sizeMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  const currentHeight = sizeMap[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Uploaded EGEN Logo Image */}
      <div className={`relative flex items-center shrink-0 ${currentHeight} overflow-hidden rounded-md bg-white p-0.5 shadow-xs transition-transform hover:scale-[1.01]`}>
        <img
          src="/assets/egen_logo_official.png"
          alt="EGEN — Écosystème Gouvernemental de l’Économie Numérique"
          className="h-full w-auto object-contain mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

export default EgenLogo;
