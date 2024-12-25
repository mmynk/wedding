import React from 'react';

export const TexturePattern: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10 z-[-1]" width="100%" height="100%">
    <filter id='noiseFilter'>
      <feTurbulence
        type='fractalNoise'
        baseFrequency='0.6'
        stitchTiles='stitch'/>
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.09 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
  </svg>
);
