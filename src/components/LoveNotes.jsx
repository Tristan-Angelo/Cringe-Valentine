import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlipCard from "./FlipCard";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";
import { Heart, Shuffle, RefreshCw } from "lucide-react";

const notes = [
  {
    front: "Tap to read 💌",
    back: "I love you more every single day.",
  },
  {
    front: "Open me 💛",
    back: "You are my favorite person in this world.",
  },
  {
    front: "A secret for you 🤫",
    back: "I choose you. Always and forever.",
  },
  {
    front: "Guess what? 🌟",
    back: "You make my heart skip a beat every time I see you.",
  },
  {
    front: "Did you know? 💝",
    back: "You make even the ordinary days better.",
  },
  {
    front: "Hey you! 😊",
    back: "Life feels lighter with you around.",
  },
];

export default function LoveNotes() {
  const [shuffledNotes, setShuffledNotes] = useState(notes);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const handleCardFlip = (isFlipped) => {
    if (isFlipped) {
      const newCount = revealedCount + 1;
      setRevealedCount(newCount);
      if (newCount === shuffledNotes.length) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const shuffleCards = () => {
    setIsShuffling(true);
    setRevealedCount(0);

    setTimeout(() => {
      const shuffled = [...notes].sort(() => Math.random() - 0.5);
      setShuffledNotes(shuffled);
      setShuffleKey(prev => prev + 1); // Force remount of cards
      setIsShuffling(false);
    }, 600);
  };

  const resetCards = () => {
    setRevealedCount(0);
    setShuffledNotes([...notes]);
    setShuffleKey(prev => prev + 1); // Force remount of cards
  };

  return (
    <div id="love-notes" className="section relative">
      <FloatingPhotos count={8} />
      <Sparkles count={10} />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Love Notes 💌
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-2.5"
      >
        Tap each card to reveal a message...
      </motion.p>

      {/* Progress indicator */}
      <motion.div
        className="reveal-progress"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            animate={{ width: `${(revealedCount / shuffledNotes.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>
        <span className="progress-text">
          {revealedCount} / {shuffledNotes.length} revealed 💛
        </span>
      </motion.div>

      {/* Celebration message */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="celebration-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart size={20} fill="#FFD84D" color="#FFD84D" />
            <span>You found all my love notes!</span>
            <Heart size={20} fill="#FFD84D" color="#FFD84D" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards grid */}
      <motion.div
        className="notes-grid"
        animate={isShuffling ? {
          opacity: 0,
          scale: 0.9,
          rotateY: 10
        } : {
          opacity: 1,
          scale: 1,
          rotateY: 0
        }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {shuffledNotes.map((note, index) => (
            <motion.div
              key={`${note.front}-${shuffleKey}-${index}`}
              layout
              initial={{
                opacity: 0,
                scale: 0.5,
                y: -50,
                rotateY: 180
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateY: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                y: 50,
                rotateY: -180
              }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
            >
              <FlipCard
                frontText={note.front}
                backText={note.back}
                index={index}
                onFlip={handleCardFlip}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        className="notes-actions"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={shuffleCards}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isShuffling}
          className="action-btn"
        >
          <Shuffle size={18} />
          Shuffle
        </motion.button>
        <motion.button
          onClick={resetCards}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="action-btn secondary"
        >
          <RefreshCw size={18} />
          Reset
        </motion.button>
      </motion.div>

      {/* Decorative hearts */}
      <motion.div
        className="absolute top-[15%] right-[8%] opacity-100"
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Heart size={70} color="#FFAB91" fill="#FFAB91" />
      </motion.div>

      <motion.div
        className="absolute bottom-[12%] left-[6%] opacity-100"
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Heart size={45} color="#FFD84D" fill="#FFD84D" />
      </motion.div>
    </div>
  );
}
