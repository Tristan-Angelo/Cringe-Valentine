import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function IntroScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setShowHint(false);

    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <Sparkles size={12 + Math.random() * 10} color="#FFD84D" />
        </motion.div>
      ))}

      {/* Main envelope container */}
      <motion.div className="flex flex-col items-center gap-8 z-10">
        {/* Intro text */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-pacifico text-dark text-center"
          style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
        >
          A Special Message 💛
        </motion.h1>

        {/* Envelope */}
        <motion.div
          className="envelope-container"
          onClick={handleClick}
          initial={{ scale: 0, rotate: -10 }}
          animate={{
            scale: isOpening ? [1, 1.1, 0] : 1,
            rotate: isOpening ? [0, 5, -5, 0] : 0,
            y: isOpening ? -100 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            delay: 0.5,
            duration: isOpening ? 1.2 : 0.6,
          }}
          whileHover={!isOpening ? {
            scale: 1.05,
            rotate: [0, -3, 3, 0],
            transition: { rotate: { repeat: Infinity, duration: 0.5 } }
          } : {}}
          whileTap={!isOpening ? { scale: 0.95 } : {}}
          style={{ cursor: isOpening ? "default" : "pointer" }}
        >
          {/* Envelope body */}
          <div className="envelope">
            {/* Envelope flap (top triangle) */}
            <motion.div
              className="envelope-flap"
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Heart seal */}
            <motion.div
              className="envelope-seal"
              animate={isOpening ? { scale: 0, opacity: 0 } : { scale: [1, 1.1, 1] }}
              transition={isOpening ? { duration: 0.3 } : { repeat: Infinity, duration: 2 }}
            >
              <Heart size={40} color="#fff" fill="#FF6B6B" />
            </motion.div>

            {/* For you label */}
            <motion.div
              className="envelope-label"
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            >
              For Charmaine Celestre 💛
            </motion.div>

            {/* Letter coming out */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  className="letter"
                  initial={{ y: 0 }}
                  animate={{ y: -80 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Heart size={30} color="#FFD84D" fill="#FFD84D" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Glow effect */}
          <motion.div
            className="envelope-glow"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        {/* Hint text */}
        <AnimatePresence>
          {showHint && !isOpening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 5, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { delay: 1 },
                y: { repeat: Infinity, duration: 1.5 }
              }}
              className="text-muted text-lg mt-2.5"
            >
              Tap the envelope to open ✨
            </motion.p>
          )}
        </AnimatePresence>

        {/* Opening message */}
        <AnimatePresence>
          {isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2.5 text-dark text-xl text-pacifico"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
              </motion.span>
              Opening with love...
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-5 right-5"
        animate={{ rotate: [0, 10, -10, 0], y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <span className="text-[40px] opacity-60">🦋</span>
      </motion.div>
      <motion.div
        className="absolute bottom-5 left-5"
        animate={{ rotate: [0, -10, 10, 0], y: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 5, delay: 1 }}
      >
        <span className="text-[35px] opacity-60">🌸</span>
      </motion.div>
      <motion.div
        className="absolute top-5 left-5"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <span className="text-[30px]">✨</span>
      </motion.div>
      <motion.div
        className="absolute bottom-5 right-5"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        <span className="text-[35px] opacity-50">🌼</span>
      </motion.div>
    </motion.div>
  );
}
