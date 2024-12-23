import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const InvitationVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="invitation" className="relative py-20">
      {/* Background with texture */}
      <div className="absolute inset-0 bg-[#faf7f2]">
        <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.6' stitchTiles='stitch'/>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.09 0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl mb-12 text-gray-800">
          Our Invitation
        </h2>

        {/* TV/Frame Container */}
        <div className="relative mx-auto max-w-3xl">
          {/* Decorative TV/Frame Border */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl shadow-lg">
            {/* Vintage TV details */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-300 rounded-t-lg"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="./thumbnail.png"
            >
              <source src="./wedding-invite.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="p-2 text-white hover:text-gray-200 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 text-white hover:text-gray-200 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Optional caption or description */}
        <p className="mt-8 text-gray-600 text-lg italic">
          Join us in celebrating our special day
        </p>
      </div>
    </section>
  );
};

export default InvitationVideoPlayer;
