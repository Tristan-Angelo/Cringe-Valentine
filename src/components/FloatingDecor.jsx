import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Flower2 } from "lucide-react";

const decorTypes = [
  { type: "heart", colors: ["#FFD84D", "#FFC107", "#FFAB91"] },
  { type: "star", colors: ["#FFD84D", "#FFC107"] },
  { type: "sparkle", colors: ["#FFD84D", "#FFECB3"] },
  { type: "flower", colors: ["#FFAB91", "#FFD84D", "#FFC107"] },
  { type: "butterfly", emoji: "🦋" },
  { type: "blossom", emoji: "🌸" },
  { type: "sunflower", emoji: "🌻" },
  { type: "ribbon", emoji: "🎀" },
  { type: "sparkle_emoji", emoji: "✨" },
  { type: "love_letter", emoji: "💌" },
  { type: "bow", emoji: "🎗️" },
  { type: "paw", emoji: "🐾" },
];

const DecorItem = ({ item }) => {
  const getDecorElement = () => {
    switch (item.decorType.type) {
      case "heart":
        return <Heart size={item.size} color={item.color} fill={item.color} />;
      case "star":
        return <Star size={item.size} color={item.color} fill={item.color} />;
      case "sparkle":
        return <Sparkles size={item.size} color={item.color} />;
      case "flower":
        return <Flower2 size={item.size} color={item.color} />;
      case "butterfly":
      case "blossom":
      case "sunflower":
      case "ribbon":
      case "sparkle_emoji":
      case "love_letter":
      case "bow":
      case "paw":
        return <span style={{ fontSize: item.size }}>{item.decorType.emoji}</span>;
      default:
        return <Heart size={item.size} color={item.color} fill={item.color} />;
    }
  };

  return (
    <motion.div
      className="fixed z-0 pointer-events-none"
      style={{
        [item.side]: item.offset,
        top: `${item.top}%`,
        opacity: item.opacity,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: item.opacity,
        scale: 1,
        y: [0, item.floatAmount, 0],
        x: [0, item.swayAmount, 0],
        rotate: item.rotate ? [0, item.rotateAmount, 0] : 0,
      }}
      transition={{
        opacity: { duration: 1, delay: item.delay },
        scale: { duration: 0.5, delay: item.delay },
        y: {
          duration: item.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        },
        x: {
          duration: item.floatDuration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        },
        rotate: {
          duration: item.floatDuration * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.3,
        opacity: 1,
      }}
    >
      {getDecorElement()}
    </motion.div>
  );
};

export default function FloatingDecor({ count = 16 }) {
  const decorItems = useMemo(() => {
    const items = [];
    
    // Create varied sizes: small, medium, large
    const sizes = [
      { min: 12, max: 18 },  // small
      { min: 20, max: 30 },  // medium
      { min: 35, max: 55 },  // large
    ];
    
    for (let i = 0; i < count; i++) {
      const decorType = decorTypes[Math.floor(Math.random() * decorTypes.length)];
      const color = decorType.colors 
        ? decorType.colors[Math.floor(Math.random() * decorType.colors.length)]
        : "#FFD84D";
      
      // Randomly pick a size category with weighted distribution
      const sizeCategory = sizes[Math.floor(Math.random() * 3)];
      const size = Math.random() * (sizeCategory.max - sizeCategory.min) + sizeCategory.min;
      
      // Larger items are more transparent
      const baseOpacity = size > 35 ? 0.08 : size > 20 ? 0.15 : 0.25;
      
      items.push({
        id: i,
        decorType,
        color,
        size,
        side: i % 2 === 0 ? "left" : "right",
        offset: Math.random() * 60 + 5,
        top: (i / count) * 100 + Math.random() * 15 - 7.5,
        opacity: baseOpacity + Math.random() * 0.1,
        floatAmount: Math.random() * 40 + 20,
        swayAmount: Math.random() * 20 + 8,
        floatDuration: Math.random() * 5 + 4,
        delay: Math.random() * 3,
        rotate: Math.random() > 0.3,
        rotateAmount: Math.random() * 25 - 12.5,
      });
    }
    
    return items;
  }, [count]);

  return (
    <div className="floating-decor-container">
      {decorItems.map((item) => (
        <DecorItem key={item.id} item={item} />
      ))}
    </div>
  );
}
