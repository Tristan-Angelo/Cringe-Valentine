import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function CursorHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    const throttleMs = 100;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const newHeart = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 10,
      };

      setHearts((prev) => [...prev.slice(-15), newHeart]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="cursor-hearts">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              x: heart.x - heart.size / 2,
              y: heart.y - heart.size / 2,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              y: heart.y - 50,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed"
          >
            <Heart
              size={heart.size}
              color="#FFD84D"
              fill="#FFD84D"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
