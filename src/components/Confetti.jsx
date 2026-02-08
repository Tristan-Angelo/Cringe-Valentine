import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = ["#FFD84D", "#FFC107", "#FFAB91", "#FFECB3", "#FF8A65", "#FFE082"];
const shapes = ["circle", "square", "heart"];

const generateConfetti = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: Math.random() * 12 + 6,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.5,
  }));
};

const ConfettiPiece = ({ piece }) => {
  const getShape = () => {
    if (piece.shape === "heart") {
      return "💛";
    }
    return null;
  };

  return (
    <motion.div
      className="confetti-piece flex items-center justify-center"
      initial={{
        x: piece.x,
        y: -20,
        rotate: 0,
        opacity: 1,
      }}
      animate={{
        y: window.innerHeight + 100,
        rotate: piece.rotation + 720,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: piece.delay,
        ease: "easeOut",
      }}
      style={{
        width: piece.size,
        height: piece.size,
        backgroundColor: piece.shape !== "heart" ? piece.color : "transparent",
        borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "square" ? "2px" : 0,
        fontSize: piece.shape === "heart" ? piece.size : 0,
      }}
    >
      {getShape()}
    </motion.div>
  );
};

export default function Confetti({ trigger }) {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      setConfettiPieces(generateConfetti(80));
      
      const timeout = setTimeout(() => {
        setConfettiPieces([]);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {confettiPieces.map((piece) => (
        <ConfettiPiece key={piece.id} piece={piece} />
      ))}
    </AnimatePresence>
  );
}
