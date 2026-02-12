import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartShowerProps {
  onComplete?: () => void;
}

interface FallingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const HeartShower = ({ onComplete }: HeartShowerProps) => {
  const [hearts, setHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    // Generate 25 hearts with random properties
    const generatedHearts: FallingHeart[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 20 + 20, // Random size between 20-40px
      duration: Math.random() * 2 + 3, // Random duration between 3-5s
      delay: Math.random() * 0.5, // Random delay up to 0.5s
    }));

    setHearts(generatedHearts);

    // Call onComplete after the longest animation finishes
    if (onComplete) {
      const maxDuration = Math.max(...generatedHearts.map(h => h.duration + h.delay));
      const timeout = setTimeout(onComplete, maxDuration * 1000);
      return () => clearTimeout(timeout);
    }
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fall"
          style={{
            left: `${heart.left}%`,
            top: '-50px',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            className="text-red-500 fill-red-500"
            size={heart.size}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default HeartShower;
