import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TexturePattern } from './TexturePattern';

interface WardrobeCarouselProps {
  images?: string[];
}

const WardrobeCarousel: React.FC<WardrobeCarouselProps> = ({
  images = [
    '/wardrobe-guide1.webp',
    '/wardrobe-guide2.webp',
    '/wardrobe-guide3.webp',
    '/wardrobe-guide4.webp'
  ]
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="wardrobe" className="relative py-20">
      {/* Background with same texture as Details section */}
      <div className="absolute inset-0 bg-[#faf7f2]">
        <TexturePattern />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl mb-12 text-gray-800">
          Wardrobe Guide
        </h2>

        {/* <div className="relative bg-white/70 backdrop-blur-sm rounded-lg shadow-lg p-8"> */}
        <div className="relative bg-transparent backdrop-blur-sm rounded-lg shadow-lg p-8">
          {/* Decorative corners (matching Details section) */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gray-400/30 rounded-tl-lg"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-gray-400/30 rounded-tr-lg"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-gray-400/30 rounded-bl-lg"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gray-400/30 rounded-br-lg"></div>

          {/* Carousel container */}
          <div className="relative aspect-[3/4] w-full max-w-2xl mx-auto">
            {/* Image */}
            <img
              src={images[currentIndex]}
              alt={`Wardrobe guide page ${currentIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 text-gray-600 hover:text-gray-900"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 text-gray-600 hover:text-gray-900"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Page indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-gray-800 w-4'
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WardrobeCarousel;
