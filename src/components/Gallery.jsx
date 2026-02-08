import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ZoomIn, Camera } from "lucide-react";
import photo1 from "../assets/photos/cat.jpg";
import photo2 from "../assets/photos/cat.jpg";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";
import ImageLightbox from "./ImageLightbox";

const photos = [
    { img: photo1, text: "This moment made me fall harder. 💛" },
    { img: photo2, text: "My favorite smile in the world. 🐱" },
    { img: photo1, text: "Every moment with you is precious. ✨" },
    { img: photo2, text: "My heart belongs to you. 💝" },
];

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const dragX = useMotionValue(0);
    const dragRotate = useTransform(dragX, [-200, 0, 200], [-15, 0, 15]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            rotateY: direction > 0 ? 15 : -15,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            rotateY: direction < 0 ? 15 : -15,
            scale: 0.9,
        }),
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = photos.length - 1;
            if (next >= photos.length) next = 0;
            return next;
        });
    };

    const handleDragEnd = (_, info) => {
        setIsDragging(false);
        const threshold = 50;
        if (info.offset.x > threshold) {
            paginate(-1);
        } else if (info.offset.x < -threshold) {
            paginate(1);
        }
    };

    const openLightbox = () => {
        if (!isDragging) {
            setLightboxOpen(true);
        }
    };

    return (
        <div id="gallery" className="section section-gradient relative">
            <FloatingPhotos count={4} />
            <Sparkles count={12} />

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Our Memories 📸
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2.5"
            >
                Swipe or drag to explore our moments 💛
            </motion.p>

            <div className="gallery-container">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                            rotateY: { duration: 0.4 },
                        }}
                        className="polaroid absolute w-full cursor-grab"
                        style={{
                            transformStyle: "preserve-3d",
                            rotate: dragRotate,
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        whileHover={{
                            rotate: Math.random() > 0.5 ? 2 : -2,
                            scale: 1.02,
                        }}
                    >
                        <motion.div
                            className="relative"
                            onClick={openLightbox}
                        >
                            <motion.img
                                src={photos[currentIndex].img}
                                alt="Memory"
                                className="w-full h-[300px] object-cover rounded-lg"
                            />

                            {/* Zoom hint overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center flex-col gap-2"
                            >
                                <ZoomIn size={36} strokeWidth={2.5} color="white" />
                                <span className="text-white font-semibold">Click to view</span>
                            </motion.div>
                        </motion.div>

                        <motion.p
                            className="mt-5 text-pacifico text-lg text-dark"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {photos[currentIndex].text}
                        </motion.p>

                        {/* Photo counter */}
                        <div className="w-full flex justify-center photo-counter">
                            <Camera size={16} strokeWidth={2} />
                            <span>{currentIndex + 1} / {photos.length}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <motion.button
                    onClick={() => paginate(-1)}
                    className="gallery-nav-btn gallery-nav-prev"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft size={32} strokeWidth={2.5} color="#5D4037" />
                </motion.button>

                <motion.button
                    onClick={() => paginate(1)}
                    className="gallery-nav-btn gallery-nav-next"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight size={32} strokeWidth={2.5} color="#5D4037" />
                </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-3 mt-5">
                {photos.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className="h-3 rounded-[10px] p-0 border-none"
                        style={{
                            width: index === currentIndex ? 30 : 12,
                            background: index === currentIndex ? "#FFD84D" : "#FFECB3",
                            boxShadow: index === currentIndex ? "0 0 15px rgba(255, 216, 77, 0.5)" : "none",
                        }}
                        whileHover={{ scale: 1.2 }}
                        animate={{ width: index === currentIndex ? 30 : 12 }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>

            {/* Swipe hint */}
            <motion.div
                className="swipe-hint"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                animate={{ x: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronLeft size={18} strokeWidth={2.5} />
                <span>Swipe</span>
                <ChevronRight size={18} strokeWidth={2.5} />
            </motion.div>

            {/* Floating heart decoration */}
            <motion.div
                className="absolute bottom-[10%] left-[5%] opacity-100"
                animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5 }}
            >
                <Heart size={50} color="#FFC107" fill="#FFC107" />
            </motion.div>

            {/* Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                image={photos[currentIndex].img}
                caption={photos[currentIndex].text}
                onPrev={() => paginate(-1)}
                onNext={() => paginate(1)}
                hasMultiple={photos.length > 1}
            />
        </div>
    );
}
