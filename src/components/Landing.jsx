import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";
import { Heart, ChevronDown } from "lucide-react";

export default function Landing() {
  const [showSubtext, setShowSubtext] = useState(false);

  const scrollToNext = () => {
    const container = document.querySelector('.sections-container');
    if (container) {
      container.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div id="landing" className="section relative overflow-hidden">
      <FloatingPhotos count={8} />
      <Sparkles count={20} />
      
      {/* Floating hearts decoration */}
      <motion.div
        className="absolute top-[15%] left-[10%] opacity-100"
        style={{ zIndex: 1 }}
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Heart size={60} color="#FFD84D" fill="#FFD84D" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-[20%] right-[8%] opacity-100"
        style={{ zIndex: 1 }}
        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
      >
        <Heart size={80} color="#FFC107" fill="#FFC107" />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[15%] opacity-100"
        style={{ zIndex: 1 }}
        animate={{ y: [-15, 15, -15] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
      >
        <Heart size={40} color="#FFAB91" fill="#FFAB91" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="mb-5 relative"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart size={80} color="#FFD84D" fill="#FFD84D" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-2 relative"
        style={{ zIndex: 10 }}
      >
        <Typewriter
          text="Hi love 💛"
          delay={120}
          onComplete={() => setShowSubtext(true)}
        />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showSubtext ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg mb-8 text-dark font-medium opacity-100 relative"
        style={{ opacity: showSubtext ? 1 : 0, zIndex: 10 }}
      >
        I made something special just for you...
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showSubtext ? 1 : 0, y: showSubtext ? 0 : 20 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={scrollToNext}
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 216, 77, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 text-lg py-4 px-8"
      >
        <Heart size={20} fill="#5D4037" color="#5D4037" />
        Begin our story
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center opacity-60"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
      >
        <ChevronDown size={30} color="#8D6E63" />
      </motion.div>
    </div>
  );
}
