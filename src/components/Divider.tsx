import React, { useEffect, useState } from 'react';

// Array of magical messages
const MAGIC_MESSAGES = [
  "💍 Fun fact: We got engaged during the 2024 total solar eclipse - the next one won't be visible in the US for more than 20 years! 🌘",
  "📍 40.43236740148445, -86.89762903530251 - Where it all began!",
  "🎂 Did you know? We are getting married on the same day as the groom's parents as well as the same day as his mom's birthday!",
  ""
];

interface SectionDividerProps {
  index: number;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ index }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-03-09T07:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown(`⏱️ ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
      } else {
        setCountdown("🎉 It's time!");
      }
    };

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const message =
    index % MAGIC_MESSAGES.length === MAGIC_MESSAGES.length - 1 ? countdown : MAGIC_MESSAGES[index % MAGIC_MESSAGES.length];

  return (
    <div className="relative py-8 group">
      <div className="flex items-center justify-center">
        <div className="h-px w-16 bg-gray-300/50"></div>
        <div className="mx-4">
          <svg
            className="w-8 h-8 text-gray-400/50 transform group-hover:rotate-180 transition-transform duration-700 ease-in-out"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3L14.5 8.5L20 9.3L16 13.4L17 19L12 16.3L7 19L8 13.4L4 9.3L9.5 8.5L12 3Z" />
          </svg>
        </div>
        <div className="h-px w-16 bg-gray-300/50"></div>
      </div>

      <div className="absolute w-full left-0 top-full mt-2 flex justify-center">
        <div
          className="
            text-transparent group-hover:text-gray-500
            opacity-0 group-hover:opacity-100
            transform
            group-hover:-translate-y-1
            blur-sm group-hover:blur-none
            scale-95 group-hover:scale-100
            transition-all duration-700 ease-out
            text-center text-sm font-light tracking-wide
          "
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
