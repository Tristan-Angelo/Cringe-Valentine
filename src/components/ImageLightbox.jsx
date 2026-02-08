import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageLightbox({ isOpen, onClose, image, caption, onPrev, onNext, hasMultiple }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button - positioned relative to overlay */}
          <motion.button
            className="lightbox-close"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={32} strokeWidth={2.5} color="#5D4037" />
          </motion.button>

          {/* Navigation - positioned relative to overlay */}
          {hasMultiple && (
            <>
              <motion.button
                className="lightbox-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={36} strokeWidth={2.5} color="#5D4037" />
              </motion.button>
              <motion.button
                className="lightbox-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={36} strokeWidth={2.5} color="#5D4037" />
              </motion.button>
            </>
          )}

          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <motion.img
              src={image}
              alt="Memory"
              className="lightbox-image"
              layoutId="gallery-image"
            />

            {/* Caption */}
            {caption && (
              <motion.div
                className="lightbox-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span>{caption}</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
