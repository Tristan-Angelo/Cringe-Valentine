import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight, Mail, Sparkles } from "lucide-react";

const loveLetters = [
  {
    title: "My Dearest Love 💛",
    content: `Every morning when I wake up, you're my first thought. Every night before I sleep, you're my last. You've become the rhythm of my heart, the smile on my face, and the warmth in my soul.

I never knew love could feel this way until I met you. You've shown me what it means to be truly cherished, to be understood without words, and to be loved unconditionally.

Thank you for choosing me. Thank you for loving me. Thank you for being you.

Forever yours,
Your Love 💛`,
  },
  {
    title: "Why I Love You 🐱",
    content: `Let me count the ways...

I love the way your eyes light up when you laugh.
I love how you make even ordinary moments feel magical.
I love your kindness, your patience, your beautiful heart.
I love how you always know how to make me smile.
I love the little things you do that you think I don't notice.
I love falling asleep knowing you're mine.
I love waking up knowing I get to love you again.

But most of all, I love you. Simply, completely, endlessly.

Yours always 💛`,
  },
  {
    title: "Our Story ✨",
    content: `From the moment our paths crossed, I knew my life would never be the same. You walked into my world like sunshine breaking through clouds, and suddenly everything made sense.

We've built something beautiful together. Every laugh, every tear, every adventure - they're all chapters in our story. And I can't wait to write a million more with you.

You're not just my love, you're my best friend, my partner in crime, my home.

Here's to us, to our past, our present, and our beautiful future together.

With all my heart,
Yours forever 💛`,
  },
  {
    title: "A Promise 💝",
    content: `I promise to love you on your best days and your worst.
I promise to make you laugh when you want to cry.
I promise to hold your hand through every storm.
I promise to celebrate every victory, no matter how small.
I promise to always be your biggest cheerleader.
I promise to grow old with you and still look at you the same way.
I promise to choose you, every single day.

These aren't just words - they're my heart's commitment to you.

I love you more than words could ever say.

Forever and always,
Your one and only 💛`,
  },
];

export default function LoveLetterModal({ isOpen, onClose }) {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextLetter = () => {
    setDirection(1);
    setCurrentLetter((prev) => (prev + 1) % loveLetters.length);
  };

  const prevLetter = () => {
    setDirection(-1);
    setCurrentLetter((prev) => (prev - 1 + loveLetters.length) % loveLetters.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="letter-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="letter-modal"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative corner hearts - reduced on mobile */}
            <motion.div
              className="letter-decor top-left hidden sm:block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Heart size={24} fill="#FFD84D" color="#FFD84D" />
            </motion.div>
            <motion.div
              className="letter-decor top-right hidden sm:block"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
            >
              <Heart size={24} fill="#FFD84D" color="#FFD84D" />
            </motion.div>

            {/* Close button */}
            <motion.button
              className="letter-close"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" strokeWidth={2.5} color="#5D4037" />
            </motion.button>

            {/* Letter header */}
            <div className="letter-header">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" color="#5D4037" />
              </motion.div>
              <span className="letter-count">
                Letter {currentLetter + 1} of {loveLetters.length}
              </span>
            </div>

            {/* Letter content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentLetter}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="letter-content"
              >
                <h3 className="letter-title">{loveLetters[currentLetter].title}</h3>
                <p className="letter-text">{loveLetters[currentLetter].content}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="letter-nav">
              <motion.button
                className="letter-nav-btn"
                onClick={prevLetter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" strokeWidth={2.5} color="#5D4037" />
              </motion.button>

              <div className="letter-dots">
                {loveLetters.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`letter-dot ${currentLetter === index ? "active" : ""}`}
                    onClick={() => {
                      setDirection(index > currentLetter ? 1 : -1);
                      setCurrentLetter(index);
                    }}
                    whileHover={{ scale: 1.3 }}
                    animate={{
                      scale: currentLetter === index ? 1.2 : 1,
                      backgroundColor: currentLetter === index ? "#FFD84D" : "#FFECB3",
                    }}
                  />
                ))}
              </div>

              <motion.button
                className="letter-nav-btn"
                onClick={nextLetter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" strokeWidth={2.5} color="#5D4037" />
              </motion.button>
            </div>

            {/* Bottom decoration */}
            <motion.div
              className="letter-sparkle"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span>Made this just for you</span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6" color="#FFC107" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
