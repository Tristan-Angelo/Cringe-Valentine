import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, BookOpen, Sparkles } from "lucide-react";
import LoveLetterModal from "./LoveLetterModal";
import SparklesEffect from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";

export default function LoveLetterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id="love-letter" className="section section-gradient relative">
      <FloatingPhotos count={4} />
      <SparklesEffect count={15} />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        My Love Letter to You 💌
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-5 max-w-[400px]"
      >
        I wrote these words from the depths of my heart...
      </motion.p>

      {/* Animated envelope */}
      <motion.div
        className="love-letter-envelope"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <motion.div
          className="envelope-body"
          animate={isHovered ? { y: -5 } : { y: 0 }}
        >
          <div className="envelope-top" />
          <motion.div
            className="envelope-letter-peek"
            animate={isHovered ? { y: -30, opacity: 1 } : { y: 0, opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpen size={30} color="#5D4037" />
            <span>Read my letters...</span>
          </motion.div>
        </motion.div>

        {/* Floating hearts around envelope */}
        <motion.div
          className="envelope-heart -top-5 -right-5"
          animate={{ 
            y: [-5, 5, -5],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Heart size={28} fill="#FFD84D" color="#FFD84D" />
        </motion.div>
        <motion.div
          className="envelope-heart -bottom-4 -left-4"
          animate={{ 
            y: [5, -5, 5],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
        >
          <Heart size={22} fill="#FFC107" color="#FFC107" />
        </motion.div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 0 40px rgba(255, 216, 77, 0.6)" 
        }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 mt-5"
      >
        <Mail size={20} />
        Open My Letters
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💛
        </motion.span>
      </motion.button>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-[12%] left-[8%] opacity-100 -z-10"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <Heart size={70} fill="#FFAB91" color="#FFAB91" />
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] right-[6%] opacity-100"
        animate={{ y: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Sparkles size={50} color="#FFD84D" />
      </motion.div>

      {/* Modal */}
      <LoveLetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
