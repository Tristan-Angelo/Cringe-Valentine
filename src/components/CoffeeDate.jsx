import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Heart, Shuffle, CupSoda } from "lucide-react";
import Confetti from "./Confetti";

// Helper to clamp values
const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const fortunes = [
  "Today’s brew: Patience and joy. Sip slowly.",
  "Your smile pairs best with a caramel latte.",
  "A surprise is percolating… trust the aroma.",
  "Add a spoon of courage, and call me soon.",
  "You + me + coffee = perfect morning.",
  "Your heart is my favorite blend.",
  "Destiny tastes like mocha today.",
];

export default function CoffeeDate() {
  const [strength, setStrength] = useState(60); // espresso strength
  const [sweet, setSweet] = useState(40); // sugar/syrup
  const [milk, setMilk] = useState(50); // milk/foam
  const [fortune, setFortune] = useState(fortunes[0]);
  const [brewCount, setBrewCount] = useState(0);
  const [showCheers, setShowCheers] = useState(false);

  const profile = useMemo(() => {
    // Compute a playful tasting note
    const bold = strength > 65;
    const silky = milk > 60;
    const dessert = sweet > 60;

    const notes = [
      bold ? "bold" : "gentle",
      silky ? "silky" : "bright",
      dessert ? "sweet" : "balanced",
    ];

    // Ideal “us” blend target (tune these as you like)
    const target = { s: 65, w: 45, m: 55 };
    const distance =
      Math.abs(strength - target.s) +
      Math.abs(sweet - target.w) +
      Math.abs(milk - target.m);

    const score = clamp(100 - distance, 0, 100);

    const message =
      score > 90
        ? "Perfect couple’s cup! This is totally us."
        : score > 75
        ? "Almost there—cozy, sweet, and meant to be."
        : score > 55
        ? "Cute blend! I’d sip this with you."
        : "Experimental vibes—fun, but let’s tweak together.";

    return { notes, score, message };
  }, [strength, sweet, milk]);

  const onBrew = () => {
    setBrewCount((c) => c + 1);
    if (profile.score > 90) {
      setShowCheers(true);
      setTimeout(() => setShowCheers(false), 3000);
    }
  };

  const shuffleFortune = () => {
    const next = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(next);
  };

  return (
    <section id="coffee" className="section section-gradient relative overflow-hidden">
      {/* Steam hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, y: 40, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-30 - Math.random() * 80, -120 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 60],
              scale: [0.6, 1, 0.8],
            }}
            transition={{ duration: 6 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            style={{ left: `${10 + Math.random() * 80}%`, bottom: `${10 + Math.random() * 20}%` }}
          >
            <Heart size={18 + Math.floor(Math.random() * 12)} color="#FFAB91" fill="#FFAB91" />
          </motion.div>
        ))}
      </div>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        Coffee with you ☕
      </motion.h2>
      <p className="max-w-[700px]">
        Let’s brew our perfect cup. Slide the dials, watch the mug change, and see our tasting notes.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-6 w-full max-w-[1000px]">
        {/* Left mug visual - Your cup */}
        <motion.div
          className="relative bg-white rounded-3xl shadow-card p-6 flex flex-col items-center w-[320px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="relative w-[180px] h-[140px] rounded-b-2xl overflow-hidden"
            style={{
              background: "#FFF8F0",
              border: "3px solid #E0CDAA",
              borderTop: "12px solid #E0CDAA",
              borderRadius: "18px 18px 28px 28px",
              boxShadow: "inset 0 6px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Liquid */}
            <motion.div
              className="absolute left-0 right-0 bottom-0"
              style={{
                background:
                  "linear-gradient(180deg, #8B6F47 0%, #6F4E37 50%, #4A3C28 100%)",
                height: `${40 + strength * 0.6}px`,
                filter: `saturate(${0.8 + sweet / 250}) brightness(${0.85 + milk / 350})`,
              }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Foam */}
            <AnimatePresence>
              {milk > 20 && (
                <motion.div
                  key="foam"
                  className="absolute left-2 right-2 top-2 h-6 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, #FFF 0%, #FFF7E6 100%)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                />
              )}
            </AnimatePresence>

            {/* Rising steam hearts from mug */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [-10, -40 - Math.min(milk, 50), -80 - Math.min(milk, 60)] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute left-0"
              >
                <Heart size={16} color="#FFAB91" fill="#FFAB91" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0], y: [-5, -30 - Math.min(milk, 50), -70 - Math.min(milk, 60)] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
                className="absolute left-4"
              >
                <Heart size={12} color="#FFC107" fill="#FFC107" />
              </motion.div>
            </div>
          </motion.div>

          {/* Handle */}
          <div
            className="absolute"
            style={{
              right: 18,
              top: 46,
              width: 56,
              height: 70,
              border: "8px solid #E0CDAA",
              borderLeft: "none",
              borderRadius: "0 34px 34px 0",
            }}
          />

          <motion.button
            onClick={onBrew}
            className="mt-5 flex items-center gap-2"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            title="Brew this cup"
          >
            <Coffee size={18} /> Brew this cup
          </motion.button>

          <div className="mt-3 text-sm text-muted">Brewed: {brewCount}x</div>
        </motion.div>

        {/* Controls + notes */}
        <motion.div
          className="bg-white rounded-3xl shadow-card p-6 w-[360px] max-w-[92vw] text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <CupSoda size={18} />
            <strong>Our Blend Controls</strong>
          </div>

          <div className="space-y-4">
            <label className="block">
              <div className="flex justify-between text-sm mb-1"><span>Strength</span><span>{strength}</span></div>
              <input
                type="range"
                min="0"
                max="100"
                value={strength}
                onChange={(e) => setStrength(parseInt(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="block">
              <div className="flex justify-between text-sm mb-1"><span>Sweetness</span><span>{sweet}</span></div>
              <input
                type="range"
                min="0"
                max="100"
                value={sweet}
                onChange={(e) => setSweet(parseInt(e.target.value))}
                className="w-full"
              />
            </label>
            <label className="block">
              <div className="flex justify-between text-sm mb-1"><span>Milk & Foam</span><span>{milk}</span></div>
              <input
                type="range"
                min="0"
                max="100"
                value={milk}
                onChange={(e) => setMilk(parseInt(e.target.value))}
                className="w-full"
              />
            </label>
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-soft-yellow/60">
            <div className="text-sm text-muted">Tasting notes</div>
            <div className="text-dark font-semibold mt-1 capitalize">
              {profile.notes.join(" · ")}
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 h-2 rounded-full bg-cream overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${profile.score}%`,
                    background: "linear-gradient(90deg, var(--color-yellow), var(--color-golden))",
                  }}
                />
              </div>
              <div className="text-sm font-bold text-dark min-w-[48px] text-right">{Math.round(profile.score)}%</div>
            </div>
            <div className="mt-2 text-sm">{profile.message}</div>
          </div>

          {/* Coffee fortune */}
          <div className="mt-5 flex items-center gap-3">
            <motion.button
              className="action-btn secondary flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
              onClick={shuffleFortune}
              title="Shuffle coffee fortune"
            >
              <Shuffle size={16} /> Coffee fortune
            </motion.button>
            <span className="text-sm text-muted">{fortune}</span>
          </div>
        </motion.div>
      </div>

      {/* Celebration confetti when perfect match */}
      <Confetti trigger={showCheers} />
    </section>
  );
}