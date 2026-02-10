import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight, Mail, Sparkles } from "lucide-react";

const loveLetters = [
  {
    title: "5 Years of Us 💛",
    content: `Can you believe it's been 5 years already? Looking back, those 4 years of LDR were some of the toughest challenges we ever faced. But they only proved one thing: that our love is stronger than any distance.

Every bus ride, every countdown, and every 'I miss you' over the screen led us here. I'm so incredibly proud of us for making it through those years and never giving up on each other.

Thank you for being my constant, even when you were miles away.

Forever yours,
Your Love 💛`,
  },
  {
    title: "Home is You 🏠",
    content: `Being under the same roof for this past year has been the greatest gift I could ever ask for. I'm so happy that I no longer have to wait for a video call just to see your face or count down the days until our next moment together.

I love the simple things now—sharing our morning coffee, deciding what to have for dinner, and just knowing you're in the next room. You've turned our space into a true home, and I've never been happier.

One year down, a lifetime to go in our happy place.

Yours always 💛`,
  },
  {
    title: "Our Sweet Moments ✨",
    content: `I cherish all the little things that make us 'us.' From our quiet mornings to our late-night talks, every second spent with you is a second well spent. You've shown me what it means to be truly loved and understood without even saying a word.

It's not just about the big milestones, but the way you make every ordinary day feel like a beautiful celebration. I wouldn't want to share this life with anyone else.

Here's to a million more sweet memories together.

With all my heart,
Yours forever 💛`,
  },
  {
    title: "A Promise 💝",
    content: `After 5 beautiful years, my promise to you remains the same, but even stronger now. I promise to keep choosing you every single day, just like I did when we were miles apart.

I promise to be your home, your best friend, and your biggest supporter. No matter what life throws our way, as long as I'm with you, I have everything I need.

Thank you for 5 amazing years. I love you more than words can ever express.

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
