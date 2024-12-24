import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import './InvitationVideoPlayer.css';

const InvitationVideoPlayer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handlePlayClick = () => {
    setIsModalOpen(true);
    // Small delay to ensure modal is rendered before playing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    // Close only if clicking the backdrop
    if (e.target === modalRef.current) {
      setIsModalOpen(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <section id="invitation" className="relative py-20">
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl mb-12 text-gray-800">
          Our Invitation
        </h2>

        <p className="mt-8 text-gray-600 text-lg italic">
          Join us in celebrating our special day...
        </p>

        <div className="tv-container">
          {/* TV Set Image */}
          <img
            src="./vintage-tv.png"
            alt="Elegant TV Frame"
            className="tv-frame"
          />

          {/* Video Thumbnail with Play Button */}
          <div className="video-wrapper" onClick={handlePlayClick}>
            {/* Fancy Play Button */}
            <div className="play-button-wrapper">
              <div className="play-button">
                <svg viewBox="0 0 24 24" fill="none" className="play-icon">
                  <path
                    d="M8 5.14v14.72a1 1 0 001.5.87l11-7.36a1 1 0 000-1.74l-11-7.36a1 1 0 00-1.5.87z"
                    fill="currentColor"
                  />
                </svg>
                <div className="ripple"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Video Player */}
        {isModalOpen && (
          <div
            ref={modalRef}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={handleCloseModal}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsModalOpen(false)}  // Direct handler instead of relying on class detection
              aria-label="Close video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-6xl mx-4" onClick={e => e.stopPropagation()}>
              <div className="relative pt-[56.25%]">
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full"
                  controls
                >
                  <source src="./wedding-invite.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InvitationVideoPlayer;
