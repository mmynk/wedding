import { useEffect, useState } from 'react';

interface RingShowerProps {
  onComplete?: () => void;
}

interface FallingRing {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const RingShower = ({ onComplete }: RingShowerProps) => {
  const [rings, setRings] = useState<FallingRing[]>([]);

  useEffect(() => {
    // Generate 25 rings with random properties
    const generatedRings: FallingRing[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 20 + 24, // Random size between 24-44px
      duration: Math.random() * 2 + 3, // Random duration between 3-5s
      delay: Math.random() * 0.5, // Random delay up to 0.5s
    }));

    setRings(generatedRings);

    // Call onComplete after the longest animation finishes
    if (onComplete) {
      const maxDuration = Math.max(...generatedRings.map(r => r.duration + r.delay));
      const timeout = setTimeout(onComplete, maxDuration * 1000);
      return () => clearTimeout(timeout);
    }
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {rings.map((ring) => (
        <div
          key={ring.id}
          className="absolute animate-fall-ring"
          style={{
            left: `${ring.left}%`,
            top: '-50px',
            fontSize: `${ring.size}px`,
            animationDuration: `${ring.duration}s`,
            animationDelay: `${ring.delay}s`,
          }}
        >
          💍
        </div>
      ))}
      <style>{`
        @keyframes fall-ring {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall-ring {
          animation-name: fall-ring;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default RingShower;
