import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles as SparklesIcon } from "lucide-react";
import Confetti from "./Confetti";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";

export default function FinalMessage() {
  const [answered, setAnswered] = useState(false);

  return (
    <div id="final" className="section relative overflow-hidden">
      <FloatingPhotos count={5} />
      <Sparkles count={15} />
      <Confetti trigger={answered} />

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
            >
              <Heart size={60} color="#FFD84D" fill="#FFD84D" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              One last question 💛
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-[400px]"
            >
              Will you continue choosing me,<br />
              today and every day after?
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setAnswered(true)}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 50px rgba(255, 216, 77, 0.7)",
              }}
              whileTap={{ scale: 0.9 }}
              className="text-xl py-5 px-12 flex items-center gap-2.5"
            >
              <Heart size={24} fill="#5D4037" color="#5D4037" />
              Yes, Forever 💛
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
            {/* Animated hearts circle */}
            <motion.div className="relative w-[120px] h-[120px]">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
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
                >
                  <Heart size={20} color="#FFD84D" fill="#FFD84D" />
                </motion.div>
              ))}
              
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Heart size={50} color="#FFC107" fill="#FFC107" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl"
            >
              I love you forever 🐱💛
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl"
            >
              Happy Valentine's Day, my love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="mt-5 flex items-center gap-2 py-3 px-6 rounded-[20px] bg-yellow/20"
            >
              <SparklesIcon size={20} color="#FFC107" />
              <span className="text-dark font-semibold">
                Thank you for being mine
              </span>
              <SparklesIcon size={20} color="#FFC107" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decorative hearts - hidden on mobile to prevent text overlap */}
      <motion.div
        className="absolute top-[10%] left-[5%] opacity-100 hidden md:block"
        animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Heart size={80} color="#FFAB91" fill="#FFAB91" />
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] right-[8%] opacity-100 hidden md:block"
        animate={{ y: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <Heart size={100} color="#FFD84D" fill="#FFD84D" />
      </motion.div>
    </div>
  );
}
