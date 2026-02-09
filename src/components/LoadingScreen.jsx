import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 20 + 15,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 2,
  duration: Math.random() * 3 + 2,
}));

// Generate sparkles positioned around the heart
const generateSparkles = () => {
  return Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45) * (Math.PI / 180); // 45 degrees apart
    const radius = 70; // Distance from heart center
    return {
      id: i,
      angle,
      radius,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: 16 + Math.random() * 8, // 16-24px
      delay: i * 0.2,
      duration: 2 + Math.random() * 1,
    };
  });
};

const sparklePositions = generateSparkles();

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const fullText = "Loading your surprise...";

  useEffect(() => {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setLoadingText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating background hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute opacity-15"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          <Heart size={heart.size} color="#FFD84D" fill="#FFD84D" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div className="flex flex-col items-center gap-8 z-10">
        {/* Pulsing heart with orbiting sparkles */}
        <motion.div className="relative flex items-center justify-center w-[200px] h-[200px]">
          {/* Central pulsing heart */}
          <motion.div
            className="absolute"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <Heart size={100} color="#FFD84D" fill="#FFD84D" />
          </motion.div>

          {/* Orbiting sparkles around the heart */}
          {sparklePositions.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{
                x: sparkle.x - sparkle.size / 2,
                y: sparkle.y - sparkle.size / 2,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: sparkle.x - sparkle.size / 2,
                y: sparkle.y - sparkle.size / 2,
                scale: [0, 1.2, 1, 1.2, 0],
                opacity: [0, 1, 0.8, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
            >
              <Sparkles
                size={sparkle.size}
                color="#FFC107"
                fill="#FFC107"
                style={{
                  filter: "drop-shadow(0 0 4px #FFC107)",
                }}
              />
            </motion.div>
          ))}

          {/* Additional floating sparkles for extra magic */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`extra-${i}`}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos(i * 90 * Math.PI / 180) * 90, 0],
                y: [0, Math.sin(i * 90 * Math.PI / 180) * 90, 0],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5 + 1,
                ease: "easeInOut",
              }}
            >
              <Sparkles
                size={12}
                color="#FFE082"
                fill="#FFE082"
                style={{
                  filter: "drop-shadow(0 0 3px #FFE082)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading text with typewriter effect */}
        <motion.p className="text-xl text-dark text-pacifico min-h-[1.5em]">
          {loadingText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            |
          </motion.span>
        </motion.p>

        {/* Progress bar */}
        <div className="loading-progress-track">
          <motion.div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage */}
        <motion.span className="text-sm text-muted font-semibold">
          {progress}%
        </motion.span>
      </motion.div>

      {/* Decorative corner hearts */}
      <motion.div
        className="absolute top-8 left-8 opacity-20"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Heart size={50} color="#FFAB91" fill="#FFAB91" />
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 opacity-20"
        animate={{ rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
      >
        <Heart size={60} color="#FFD84D" fill="#FFD84D" />
      </motion.div>
    </motion.div>
  );
}