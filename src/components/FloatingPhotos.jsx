import { useMemo } from "react";
import { motion } from "framer-motion";
import f1 from "../assets/photos/floating-images/Floating-Image-1.jpg";
import f2 from "../assets/photos/floating-images/Floating-Image-2.jpg";
import f3 from "../assets/photos/floating-images/Floating-Image-3.jpg";
import f4 from "../assets/photos/floating-images/Floating-Image-4.jpg";
import f5 from "../assets/photos/floating-images/Floating-Image-5.jpg";
import f6 from "../assets/photos/floating-images/Floating-Image-6.jpg";
import f7 from "../assets/photos/floating-images/Floating-Image-7.jpg";
import f8 from "../assets/photos/floating-images/Floating-Image-8.jpg";
import f9 from "../assets/photos/floating-images/Floating-Image-9.jpg";
import f10 from "../assets/photos/floating-images/Floating-Image-10.jpg";
import f11 from "../assets/photos/floating-images/Floating-Image-11.jpg";
import f12 from "../assets/photos/floating-images/Floating-Image-12.jpg";
import f13 from "../assets/photos/floating-images/Floating-Image-13.jpg";
import f14 from "../assets/photos/floating-images/Floating-Image-14.jpg";
import f15 from "../assets/photos/floating-images/Floating-Image-15.jpg";
import f16 from "../assets/photos/floating-images/Floating-Image-16.jpg";
import f17 from "../assets/photos/floating-images/Floating-Image-17.jpg";
import f18 from "../assets/photos/floating-images/Floating-Image-18.jpg";
import f19 from "../assets/photos/floating-images/Floating-Image-19.jpg";
import f20 from "../assets/photos/floating-images/Floating-Image-20.jpg";
import f21 from "../assets/photos/floating-images/Floating-Image-21.jpg";
import f22 from "../assets/photos/floating-images/Floating-Image-22.jpg";
import f23 from "../assets/photos/floating-images/Floating-Image-23.jpg";
import f24 from "../assets/photos/floating-images/Floating-Image-24.jpg";
import f25 from "../assets/photos/floating-images/Floating-Image-25.jpg";
import f26 from "../assets/photos/floating-images/Floating-Image-26.jpg";
import f27 from "../assets/photos/floating-images/Floating-Image-27.jpg";
import f28 from "../assets/photos/floating-images/Floating-Image-28.jpg";
import f29 from "../assets/photos/floating-images/Floating-Image-29.jpg";
import f30 from "../assets/photos/floating-images/Floating-Image-30.jpg";
import f31 from "../assets/photos/floating-images/Floating-Image-31.jpg";
import f32 from "../assets/photos/floating-images/Floating-Image-32.jpg";
import f33 from "../assets/photos/floating-images/Floating-Image-33.jpg";
import f34 from "../assets/photos/floating-images/Floating-Image-34.jpg";
import f35 from "../assets/photos/floating-images/Floating-Image-35.jpg";
import f36 from "../assets/photos/floating-images/Floating-Image-36.jpg";
import f37 from "../assets/photos/floating-images/Floating-Image-37.jpg";
import f38 from "../assets/photos/floating-images/Floating-Image-38.jpg";

// Define default images array outside component to prevent recreation on every render
const DEFAULT_IMAGES = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, f21, f22, f23, f24, f25, f26, f27, f28, f29, f30, f31, f32, f33, f34, f35, f36, f37, f38];

// Generate random polaroid frames with different sizes and positions
const generatePhotos = (count, images) => {
  const photos = [];
  const sizes = ['small', 'medium', 'large'];
  const captions = [
    "This moment made me fall harder. 💛",
    "My favorite smile in the world. 🐱",
    "Every moment with you is precious. ✨",
    "My heart belongs to you. 💝",
    "You make me so happy 😊",
    "Forever grateful for you 🌟",
    "You're my favorite distraction. ❤️",
    "Life is beautiful with you. 🌸",
    "Every moment with you is a gift. ✨",
    "To the moon and back. 🌙",
    "My happy place. 🏡",
    "Just you and me. 👩‍❤️‍👨",
    "Finally under the same roof. 🏠",
    "You are my sunshine. ☀️",
    "Everything is better with you. ✨",
    "You make every moment magical. 🪄",
    "Our love story is my favorite. 📖",
    "You're my dream come true. 💭",
    "Forever isn't long enough. ♾️",
    "You had me at hello. 👋💖",
    "The best part of my day. 🌅",
    "Soulmates forever. 🔐",
    "Love you more than words can say. 🗣️❤️",
    "You make my heart skip a beat. 💓",
    "I'm so lucky to have you. 🍀",
    "Worth every long bus ride. 🚌",
    "5 years and counting. 💍",
  ];

  for (let i = 0; i < count; i++) {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const sizeMap = {
      small: { width: 120, height: 140, fontSize: '0.65rem' },
      medium: { width: 150, height: 180, fontSize: '0.75rem' },
      large: { width: 180, height: 220, fontSize: '0.85rem' }
    };

    photos.push({
      id: i,
      image: images[Math.floor(Math.random() * images.length)],
      caption: captions[Math.floor(Math.random() * captions.length)],
      counter: `${Math.floor(Math.random() * 4) + 1}/4`,
      size: size,
      dimensions: sizeMap[size],
      left: Math.random() * 85, // Keep within viewport
      top: Math.random() * 85,
      rotation: (Math.random() - 0.5) * 30, // -15 to 15 degrees
      zIndex: Math.floor(Math.random() * 5),
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 6,
    });
  }

  return photos;
};

export default function FloatingPhotos({ count = 6, images = DEFAULT_IMAGES }) {
  // Memoize photos to prevent regeneration on every render
  // Note: count dependency is sufficient since DEFAULT_IMAGES is constant
  const photos = useMemo(() => generatePhotos(count, images), [count, images]);

  return (
    <div className="floating-photos-container">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          className="floating-polaroid"
          style={{
            left: `${photo.left}%`,
            top: `${photo.top}%`,
            zIndex: photo.zIndex,
            width: photo.dimensions.width,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: photo.rotation
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            y: [-15, 15, -15],
            rotate: [photo.rotation - 5, photo.rotation + 5, photo.rotation - 5],
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            opacity: {
              duration: photo.duration,
              repeat: Infinity,
              delay: photo.delay,
              ease: "easeInOut",
            },
            y: {
              duration: photo.duration,
              repeat: Infinity,
              delay: photo.delay,
              ease: "easeInOut",
            },
            rotate: {
              duration: photo.duration * 0.8,
              repeat: Infinity,
              delay: photo.delay,
              ease: "easeInOut",
            },
            scale: {
              duration: photo.duration * 0.6,
              repeat: Infinity,
              delay: photo.delay,
              ease: "easeInOut",
            },
          }}
        >
          {/* Polaroid frame */}
          <div className="polaroid-frame">
            {/* Image */}
            <div
              className="polaroid-image"
              style={{
                height: photo.dimensions.height - 60, // Leave space for caption
              }}
            >
              <img
                src={photo.image}
                alt="Memory"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Caption */}
            <p
              className="polaroid-caption"
              style={{
                fontSize: photo.dimensions.fontSize,
              }}
            >
              {photo.caption}
            </p>

            {/* Photo counter */}
            <div
              className="polaroid-counter"
              style={{
                fontSize: photo.dimensions.fontSize,
              }}
            >
              📸 {photo.counter}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}