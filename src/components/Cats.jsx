import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import defaultCat from "../assets/yellow-cat.jpg";
import { Heart, Sparkles as SparklesIcon, Award, Star } from "lucide-react";
import Sparkles from "./Sparkles";
import FloatingPhotos from "./FloatingPhotos";

// Meow sound for cat petting
const meowSound = new Audio('/sounds/meow.mp3');
meowSound.volume = 0.5;

const meowResponses = [
  "Meow~ 💛 (He says hi!)",
  "Purrrr~ 🐱 (He loves you too!)",
  "Mrrp! 💛 (He approves of us!)",
  "Meow meow! 🐱 (He wants treats... and love!)",
  "Nyaa~ 💛 (He's happy we're together!)",
  "Prrrrt! 🐱 (That's a happy cat sound!)",
  "Mrow~ 💛 (He's feeling loved!)",
  "Chirp chirp! 🐱 (He sees a bird... but loves you more!)",
];

const milestones = [
  { count: 5, message: "Kitty is warming up to you! 🐱", emoji: "😺" },
  { count: 10, message: "Kitty loves the pets! 💛", emoji: "😻" },
  { count: 20, message: "You're a certified cat whisperer! 🏆", emoji: "🎉" },
  { count: 50, message: "Kitty's favorite human! 👑", emoji: "💝" },
];

export default function Cats({ 
  pets = [{ image: defaultCat, name: "Your Cat", sound: '/sounds/meow.mp3' }],
  title = "Your Cat Says Hi 🐱",
  subtitle = "Pet the kitty! See how much love you can give! 💛"
}) {
  const [meowIndex, setMeowIndex] = useState(-1);
  const [hearts, setHearts] = useState([]);
  const [petCount, setPetCount] = useState(0);
  const [milestone, setMilestone] = useState(null);
  const [isWiggling, setIsWiggling] = useState(false);
  const [showLoveBar, setShowLoveBar] = useState(false);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  useEffect(() => {
    const reached = milestones.find((m) => m.count === petCount);
    if (reached) {
      setMilestone(reached);
      setTimeout(() => setMilestone(null), 3000);
    }
  }, [petCount]);

  const handleClick = (e) => {
    setPetCount((prev) => prev + 1);
    setMeowIndex((prev) => (prev + 1) % meowResponses.length);
    
    // Cycle through pets every 10 clicks
    if ((petCount + 1) % 10 === 0 && pets.length > 1) {
      setCurrentPetIndex((prev) => (prev + 1) % pets.length);
    }
    
    // Play meow sound with slight pitch variation
    const currentSound = new Audio(pets[currentPetIndex].sound || '/sounds/meow.mp3');
    currentSound.volume = 0.5;
    currentSound.currentTime = 0;
    currentSound.playbackRate = 0.9 + Math.random() * 0.3;
    currentSound.play().catch(() => {});
    
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    
    setShowLoveBar(true);
    setTimeout(() => setShowLoveBar(false), 2000);

    const rect = e.currentTarget.getBoundingClientRect();
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      angle: (i * 45) * (Math.PI / 180),
    }));
    
    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 1000);
  };

  const getLoveLevel = () => {
    if (petCount >= 50) return { level: "Obsessed!", color: "#FF6B6B", width: 100 };
    if (petCount >= 20) return { level: "In Love!", color: "#FFD84D", width: 80 };
    if (petCount >= 10) return { level: "Best Friends", color: "#FFC107", width: 60 };
    if (petCount >= 5) return { level: "Friends", color: "#FFAB91", width: 40 };
    return { level: "Getting to know...", color: "#FFECB3", width: 20 };
  };

  const loveLevel = getLoveLevel();
  const currentPet = pets[currentPetIndex];

  return (
    <div id="cats" className="section section-gradient relative">
      <FloatingPhotos count={4} />
      <Sparkles count={8} />
      
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-2.5"
      >
        {subtitle}
      </motion.p>

      {/* Pet name indicator */}
      {pets.length > 1 && (
        <motion.div
          className="text-sm text-muted mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentPetIndex}
        >
          Now petting: {currentPet.name} 💛
        </motion.div>
      )}

      {/* Pet counter */}
      <motion.div
        className="pet-counter"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <motion.span
          key={petCount}
          initial={{ scale: 1.5, color: "#FFD84D" }}
          animate={{ scale: 1, color: "#5D4037" }}
          transition={{ duration: 0.3 }}
        >
          {petCount}
        </motion.span>
        <span> pets given</span>
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          🐾
        </motion.span>
      </motion.div>

      {/* Love level bar */}
      <AnimatePresence>
        {showLoveBar && (
          <motion.div
            className="love-level-bar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="love-bar-track">
              <motion.div
                className="love-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${loveLevel.width}%` }}
                style={{ background: loveLevel.color }}
              />
            </div>
            <span className="love-label">{loveLevel.level}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone notification */}
      <AnimatePresence>
        {milestone && (
          <motion.div
            className="milestone-badge"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Award size={24} color="#FFD84D" />
            <span>{milestone.message}</span>
            <span className="milestone-emoji">{milestone.emoji}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        onClick={handleClick}
      >
        <motion.div
          animate={isWiggling ? {
            rotate: [0, -5, 5, -5, 5, 0],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            key={currentPetIndex}
            src={currentPet.image}
            alt={currentPet.name || "Your adorable pet"}
            className="w-[280px] h-[280px] object-cover rounded-3xl border-[6px] border-white"
            style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 50px rgba(255, 216, 77, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>

        {/* Sparkle effects on hover */}
        <motion.div
          className="cat-sparkle -top-2.5 -left-2.5"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Star size={20} fill="#FFD84D" color="#FFD84D" />
        </motion.div>
        <motion.div
          className="cat-sparkle -top-1 -right-4"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        >
          <SparklesIcon size={22} color="#FFC107" />
        </motion.div>

        {/* Paw indicator */}
        <motion.div
          className="absolute -bottom-4 -right-4 w-[55px] h-[55px] rounded-full flex items-center justify-center text-[26px] border-[3px] border-white gradient-yellow"
          style={{ boxShadow: "0 6px 20px rgba(255, 216, 77, 0.5)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          whileHover={{ rotate: 15 }}
        >
          🐾
        </motion.div>

        {/* Love indicator (shows after many pets) */}
        {petCount >= 10 && (
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💛
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Heart burst animation */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              position: "fixed",
              x: heart.x,
              y: heart.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: heart.x + Math.cos(heart.angle) * 120,
              y: heart.y + Math.sin(heart.angle) * 120,
              scale: 1.2,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none z-[100]"
          >
            <Heart size={24} color="#FFD84D" fill="#FFD84D" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Meow response */}
      <AnimatePresence mode="wait">
        {meowIndex >= 0 && (
          <motion.div
            key={meowIndex}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="meow-bubble"
          >
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              🐱
            </motion.span>
            {meowResponses[meowIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats display */}
      {petCount >= 5 && (
        <motion.div
          className="cat-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="stat-item">
            <Heart size={16} fill="#FFD84D" color="#FFD84D" />
            <span>Love Level: {loveLevel.level}</span>
          </div>
          <div className="stat-item">
            <Star size={16} fill="#FFC107" color="#FFC107" />
            <span>Happiness: {Math.min(petCount * 2, 100)}%</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
