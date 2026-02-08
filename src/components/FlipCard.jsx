import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Heart } from "lucide-react";

export default function FlipCard({ frontText, backText, index, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);

  const handleClick = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    
    if (newFlipped && !hasBeenFlipped) {
      setHasBeenFlipped(true);
      onFlip?.(true);
    }
  };

  return (
    <motion.div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={isFlipped ? {} : { y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {isFlipped ? (
              <MailOpen size={40} strokeWidth={2} color="#5D4037" />
            ) : (
              <Mail size={40} strokeWidth={2} color="#5D4037" />
            )}
            <span className="text-dark font-semibold">
              {frontText}
            </span>
          </motion.div>

          {/* Shimmer effect */}
          <motion.div
            className="card-shimmer"
            animate={{ x: [-100, 300] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </div>
        <div className="flip-card-back">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFlipped ? 1 : 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <Heart size={26} strokeWidth={2} color="#FFD84D" fill="#FFD84D" />
            <p className="m-0 text-lg">{backText}</p>
          </motion.div>
        </div>
      </div>

      {/* Revealed indicator */}
      {hasBeenFlipped && (
        <motion.div
          className="revealed-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          💛
        </motion.div>
      )}
    </motion.div>
  );
}
