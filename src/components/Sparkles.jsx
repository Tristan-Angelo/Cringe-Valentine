import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

const generateSparkles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 16 + 8,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));
};

export default function Sparkles({ count = 15 }) {
  const sparkles = generateSparkles(count);

  return (
    <div className="sparkle-container">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
        >
          <Sparkle
            size={sparkle.size}
            color="#FFD84D"
            fill="#FFD84D"
          />
        </motion.div>
      ))}
    </div>
  );
}
