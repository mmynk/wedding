import React from 'react';
import { TexturePattern } from './TexturePattern';

interface CardProps {
  title: string;
  emoji: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ title, emoji, href }) => (
  <a
    href={href}
    className="group relative bg-gradient-to-br from-[#faf8f5] to-[#f0ebe3] backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
  >
    {/* Decorative corners */}
    <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gray-400/30 rounded-tl-lg group-hover:border-gray-400/50 transition-colors"></div>
    <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-gray-400/30 rounded-tr-lg group-hover:border-gray-400/50 transition-colors"></div>
    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-gray-400/30 rounded-bl-lg group-hover:border-gray-400/50 transition-colors"></div>
    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gray-400/30 rounded-br-lg group-hover:border-gray-400/50 transition-colors"></div>

    <div className="px-12 py-16 text-center">
      <div className="text-5xl mb-6">{emoji}</div>
      <h2 className="font-playfair text-3xl md:text-4xl text-gray-800">
        {title}
      </h2>
    </div>
  </a>
);

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-[#faf7f2]">
      <TexturePattern />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl text-gray-800 mb-4">
            Welcome
          </h1>
          <p className="font-cormorant text-xl text-gray-600">
            Choose your destination
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <Card
            title="Wedding"
            emoji="💍"
            href="./wedding.html"
          />
          <Card
            title="Valentine"
            emoji="💕"
            href="./valentine.html"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
