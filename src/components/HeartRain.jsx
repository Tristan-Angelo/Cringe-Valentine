import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const colors = ["#FFD84D", "#FFC107", "#FFECB3", "#FFAB91"];

export default function HeartRain({ count = 25 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      swayAmount: Math.random() * 30 + 10,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: -100,
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, heart.swayAmount, -heart.swayAmount, heart.swayAmount, 0],
            opacity: [0, 0.4, 0.4, 0.4, 0],
            rotate: [0, heart.rotation],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
            x: {
              duration: heart.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className="absolute -top-[50px]"
          style={{ left: `${heart.left}%` }}
        >
          <Heart size={heart.size} color={heart.color} fill={heart.color} />
        </motion.div>
      ))}
    </div>
  );
}
