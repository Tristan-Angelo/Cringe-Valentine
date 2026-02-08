import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = ["#FFD84D", "#FFC107", "#FFAB91", "#FFE082", "#FFCC02"];

function generateConfetti(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 12 + 6,
    delay: Math.random() * 1,
    duration: Math.random() * 2 + 3,
  }));
}

function ConfettiPiece({ piece }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[9999]"
      initial={{
        x: `${piece.x}vw`,
        y: `${piece.y}vh`,
        rotate: piece.rotation,
        scale: 0,
        opacity: 1,
      }}
      animate={{
        y: "120vh",
        rotate: piece.rotation + 1080,
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: { duration: 0.5 }
      }}
      transition={{
        duration: piece.duration,
        delay: piece.delay,
        ease: "easeOut",
      }}
      style={{
        width: piece.size,
        height: piece.size,
        backgroundColor: piece.color,
        borderRadius: "3px",
        boxShadow: `0 0 6px ${piece.color}`,
      }}
    />
  );
}

export default function Confetti({ trigger }) {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      console.log("🎉 Confetti triggered!");
      const newPieces = generateConfetti(100);
      setConfettiPieces(newPieces);

      const timeout = setTimeout(() => {
        setConfettiPieces([]);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  useEffect(() => {
    console.log("Confetti pieces count:", confettiPieces.length);
  }, [confettiPieces]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {confettiPieces.map((piece) => (
          <ConfettiPiece key={piece.id} piece={piece} />
        ))}
      </AnimatePresence>
    </div>
  );
}
