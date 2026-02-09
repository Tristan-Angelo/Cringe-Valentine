import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ZoomIn, Camera } from "lucide-react";
import photo1 from "../assets/photos/gallery/Gallery-1.jpg";
import photo2 from "../assets/photos/gallery/Gallery-2.jpg";
import photo3 from "../assets/photos/gallery/Gallery-3.jpg";
import photo4 from "../assets/photos/gallery/Gallery-4.jpg";
import photo5 from "../assets/photos/gallery/Gallery-5.jpg";
import photo6 from "../assets/photos/gallery/Gallery-6.jpg";
import photo7 from "../assets/photos/gallery/Gallery-7.jpg";
import photo8 from "../assets/photos/gallery/Gallery-8.jpg";
import photo9 from "../assets/photos/gallery/Gallery-9.jpg";
import photo10 from "../assets/photos/gallery/Gallery-10.jpg";
import photo11 from "../assets/photos/gallery/Gallery-11.jpg";
import photo12 from "../assets/photos/gallery/Gallery-12.jpg";
import photo13 from "../assets/photos/gallery/Gallery-13.jpg";
import photo14 from "../assets/photos/gallery/Gallery-14.jpg";
import photo15 from "../assets/photos/gallery/Gallery-15.jpg";
import photo16 from "../assets/photos/gallery/Gallery-16.jpg";
import photo17 from "../assets/photos/gallery/Gallery-17.jpg";
import photo18 from "../assets/photos/gallery/Gallery-18.jpg";
import photo19 from "../assets/photos/gallery/Gallery-19.jpg";
import photo20 from "../assets/photos/gallery/Gallery-20.jpg";
import photo21 from "../assets/photos/gallery/Gallery-21.jpg";
import photo22 from "../assets/photos/gallery/Gallery-22.jpg";
import photo23 from "../assets/photos/gallery/Gallery-23.jpg";
import photo24 from "../assets/photos/gallery/Gallery-24.jpg";
import photo25 from "../assets/photos/gallery/Gallery-25.jpg";
import photo26 from "../assets/photos/gallery/Gallery-26.jpg";
import photo27 from "../assets/photos/gallery/Gallery-27.jpg";
import photo28 from "../assets/photos/gallery/Gallery-28.jpg";
import photo29 from "../assets/photos/gallery/Gallery-29.jpg";
import photo30 from "../assets/photos/gallery/Gallery-30.jpg";
import photo31 from "../assets/photos/gallery/Gallery-31.jpg";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";
import ImageLightbox from "./ImageLightbox";

const photos = [
    { img: photo1, text: "5 years of choosing each other, every single day. 💛" },
    { img: photo2, text: "4 years of distance only proved how strong our love is. ✨" },
    { img: photo3, text: "Finally under the same roof. Every day with you is a gift. 🏠" },
    { img: photo4, text: "No more screen time, just you right here beside me. ❤️" },
    { img: photo5, text: "Your smile is my favorite view in the whole world. 🌟" },
    { img: photo6, text: "Thank you for being my constant through everything. ⚓" },
    { img: photo7, text: "I love the way you look at me when you're happy. 😊" },
    { img: photo8, text: "5 years down, a lifetime to go. ♾️" },
    { img: photo9, text: "From long distance to sharing every single morning. ☕" },
    { img: photo10, text: "You make every ordinary moment feel so magical. 🪄" },
    { img: photo11, text: "My heart beats for you, and only you. 💓" },
    { img: photo12, text: "4 years of 'I miss you' finally turned into 'I'm home.' 🏡" },
    { img: photo13, text: "Being with you is exactly where I want to be. 📍" },
    { img: photo14, text: "You are the best thing that ever happened to me. ✨" },
    { img: photo15, text: "This first year of living together has been a dream. ☁️" },
    { img: photo16, text: "The wait was long, but having you here is everything. 💍" },
    { img: photo17, text: "I fall in love with you more and more every day. 💞" },
    { img: photo18, text: "Thank you for 5 years of beautiful memories. 📖" },
    { img: photo19, text: "Your love is the only sunshine I'll ever need. ☀️" },
    { img: photo20, text: "I'm so grateful for every second I spend with you. ⏳" },
    { img: photo21, text: "5 years of us, and I'd still choose you every time. 💍" },
    { img: photo22, text: "Cozy nights with you are my favorite kind of nights. 🌙" },
    { img: photo23, text: "You are my person, my best friend, and my home. 💏" },
    { img: photo24, text: "I love our little life together under one roof. 🏠✨" },
    { img: photo25, text: "4 years of waiting just made this moment sweeter. 🍬" },
    { img: photo26, text: "You are my forever and always. 🔒" },
    { img: photo27, text: "Everything is better when I'm holding your hand. 🤝" },
    { img: photo28, text: "5 years of beautiful history, and so much more to come. 🌱" },
    { img: photo29, text: "You make my world a much brighter place. 🌎" },
    { img: photo30, text: "One year under the same roof, and a lifetime of love ahead. 💞" },
    { img: photo31, text: "You are my home, today and for all my tomorrows. 🏡💍" },
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
            <FloatingPhotos count={7} />
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

            {/* Dots indicator - Limited to 4 dots */}
            <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-full px-4">
                {[0, 1, 2, 3].map((dotIndex) => {
                    const photosPerDot = Math.ceil(photos.length / 4);
                    const startIndex = dotIndex * photosPerDot;
                    const endIndex = Math.min((dotIndex + 1) * photosPerDot, photos.length);
                    const isActive = currentIndex >= startIndex && currentIndex < endIndex;

                    return (
                        <motion.button
                            key={dotIndex}
                            onClick={() => {
                                setDirection(startIndex > currentIndex ? 1 : -1);
                                setCurrentIndex(startIndex);
                            }}
                            className="h-3 rounded-[10px] p-0 border-none"
                            style={{
                                width: isActive ? 30 : 12,
                                background: isActive ? "#FFD84D" : "#FFECB3",
                                boxShadow: isActive ? "0 0 15px rgba(255, 216, 77, 0.5)" : "none",
                            }}
                            whileHover={{ scale: 1.2 }}
                            animate={{ width: isActive ? 30 : 12 }}
                            transition={{ duration: 0.3 }}
                            title={`Photos ${startIndex + 1}-${endIndex}`}
                        />
                    );
                })}
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
