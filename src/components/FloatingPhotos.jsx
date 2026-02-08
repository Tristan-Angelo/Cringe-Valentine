import { useMemo } from "react";
import { motion } from "framer-motion";
import photo1 from "../assets/photos/cat.jpg";

// Generate random polaroid frames with different sizes and positions
const generatePhotos = (count) => {
  const photos = [];
  const sizes = ['small', 'medium', 'large'];
  const captions = [
    "This moment made me fall harder. 💛",
    "My favorite smile in the world. 🐱",
    "Every moment with you is precious. ✨",
    "My heart belongs to you. 💝",
    "You make me so happy 😊",
    "Forever grateful for you 🌟",
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
      image: photo1,
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

export default function FloatingPhotos({ count = 6 }) {
  // Memoize photos to prevent regeneration on every render
  const photos = useMemo(() => generatePhotos(count), [count]);

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
              📷 {photo.counter}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
