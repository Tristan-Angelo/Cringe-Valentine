import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles as SparklesIcon, RotateCcw, Share2 } from "lucide-react";
import Confetti from "./Confetti";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";

export default function FinalMessage() {
  const [answered, setAnswered] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [showExtraConfetti, setShowExtraConfetti] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);

  const handleYesClick = useCallback(() => {
    setAnswered(true);
    // Trigger celebration phases
    setTimeout(() => setCelebrationPhase(1), 500);
    setTimeout(() => setCelebrationPhase(2), 1500);
  }, []);

  const handleHeartClick = useCallback(() => {
    setHeartClicks(prev => prev + 1);
    if (heartClicks > 0 && heartClicks % 3 === 0) {
      setShowExtraConfetti(true);
      setTimeout(() => setShowExtraConfetti(false), 100);
    }
  }, [heartClicks]);

  const resetExperience = useCallback(() => {
    setAnswered(false);
    setHeartClicks(0);
    setCelebrationPhase(0);
    setShowExtraConfetti(false);
  }, []);

  return (
    <div id="final" className="section relative overflow-hidden">
      <FloatingPhotos count={8} />
      <Sparkles count={15} />

      <Confetti trigger={answered} />
      <Confetti trigger={showExtraConfetti} />

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHeartClick}
              className="cursor-pointer"
            >
              <Heart size={60} color="#FFD84D" fill="#FFD84D" />
            </motion.div>

            {heartClicks > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted"
              >
                💛 {heartClicks} heart{heartClicks !== 1 ? 's' : ''} clicked!
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              One last question 💛
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-[400px]"
              whileHover={{ scale: 1.02 }}
            >
              Will you continue choosing me,<br />
              today and every day after?
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleYesClick}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 50px rgba(255, 216, 77, 0.7)",
              }}
              whileTap={{ scale: 0.9 }}
              className="text-xl py-5 px-12 flex items-center gap-2.5 relative overflow-hidden"
            >
              Yes, Forever 💛

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="flex flex-col items-center gap-5"
          >
            {/* Interactive hearts circle */}
            <motion.div className="relative w-[120px] h-[120px]">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  initial={{ x: "-50%", y: "-50%", scale: 0 }}
                  animate={{
                    x: `calc(-50% + ${Math.cos((i * 45 * Math.PI) / 180) * 50}px)`,
                    y: `calc(-50% + ${Math.sin((i * 45 * Math.PI) / 180) * 50}px)`,
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                  }}
                  whileHover={{ scale: 1.5, rotate: 0 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleHeartClick}
                >
                  <Heart size={20} color="#FFD84D" fill="#FFD84D" />
                </motion.div>
              ))}

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleHeartClick}
              >
                <Heart size={50} color="#FFC107" fill="#FFC107" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl"
              whileHover={{ scale: 1.05 }}
            >
              I love you forever 🐱💛
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl"
              whileHover={{ scale: 1.02 }}
            >
              Happy Valentine's Day, my love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="mt-5 flex items-center gap-2 py-3 px-6 rounded-[20px] bg-yellow/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 193, 7, 0.3)" }}
            >
              <span className="text-dark font-semibold">
                Thank you for being mine
              </span>
              <SparklesIcon size={20} color="#FFC107" />
            </motion.div>

            {/* Interactive action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6"
            >
              <motion.button
                onClick={resetExperience}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 bg-cream/60 rounded-xl text-dark font-medium"
              >
                <RotateCcw size={16} />
                Experience Again
              </motion.button>
            </motion.div>

            {heartClicks > 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-center"
              >
                <div className="text-sm text-muted">
                  You've clicked {heartClicks} hearts! You're so sweet! 💛
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive background decorative hearts */}
      <motion.div
        className="absolute top-[10%] left-[5%] opacity-100 hidden md:block cursor-pointer"
        animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6 }}
        whileHover={{ scale: 1.2, rotate: 0 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleHeartClick}
      >
        <Heart size={80} color="#FFAB91" fill="#FFAB91" />
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] right-[8%] opacity-100 hidden md:block cursor-pointer"
        animate={{ y: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 5 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleHeartClick}
      >
        <Heart size={100} color="#FFD84D" fill="#FFD84D" />
      </motion.div>
    </div>
  );
}
