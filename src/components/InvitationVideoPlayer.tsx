import { useState, useRef } from 'react';
// import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './InvitationVideoPlayer.css';

const InvitationVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
    if (isPlaying) {
        videoRef.current.pause();
    } else {
        videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
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

            {/* Video Inside the TV */}
            <div className="video-wrapper" onClick={handleVideoClick}>
                <video
                ref={videoRef}
                className="video"
                poster="./thumbnail.png"
                >
                <source src="./wedding-invite.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
      </div>
    </section>
  );
};

export default InvitationVideoPlayer;
