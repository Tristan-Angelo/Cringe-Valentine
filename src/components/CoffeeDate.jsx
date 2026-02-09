import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Heart, Shuffle, CupSoda } from "lucide-react";
import Confetti from "./Confetti";
import FloatingPhotos from "./FloatingPhotos";

// Helper to clamp values
const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b]
    .map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;

const mixColor = (a, b, t) => {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  return rgbToHex({
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  });
};

const buildCupStyle = (strength, sweet, milk) => {
  const strengthRatio = strength / 100;
  const sweetRatio = sweet / 100;
  const milkRatio = milk / 100;

  // Volume leans on milk/sweetness, strength has lighter influence.
  const liquidHeight = clamp(
    44 + (strength * 0.25 + sweet * 0.2 + milk * 0.55) * 0.9,
    40,
    124
  );

  // Color blend: espresso -> caramel -> milk.
  const espresso = "#3B2314";
  const caramel = "#8B5E3C";
  const milkColor = "#EED9C4";

  const strongBlend = mixColor(caramel, espresso, strengthRatio);
  const milkyBlend = mixColor(strongBlend, milkColor, milkRatio * 0.85);
  const sweetBlend = mixColor(milkyBlend, "#B46A2B", sweetRatio * 0.25);

  const topColor = mixColor(sweetBlend, "#F6E7D6", milkRatio * 0.3);
  const midColor = mixColor(sweetBlend, "#5B3A24", strengthRatio * 0.35);
  const bottomColor = mixColor(midColor, "#2E1B12", strengthRatio * 0.4);

  const foamHeight = clamp(6 + milk * 0.18, 6, 26);
  const foamBottom = clamp(liquidHeight - foamHeight * 0.65, 8, 120);

  return {
    liquidHeight,
    foamHeight,
    foamBottom,
    gradient: `linear-gradient(180deg, ${topColor} 0%, ${midColor} 55%, ${bottomColor} 100%)`,
    filter: `saturate(${0.9 + sweetRatio * 0.5}) brightness(${0.85 + milkRatio * 0.35})`,
  };
};

const fortunes = [
  "Today's brew: Patience and joy. Sip slowly.",
  "Your smile pairs best with a caramel latte.",
  "A surprise is percolating… trust the aroma.",
  "Add a spoon of courage, and call me soon.",
  "You + me + coffee = perfect morning.",
  "Your heart is my favorite blend.",
  "Destiny tastes like mocha today.",
];

export default function CoffeeDate() {
  const [strength, setStrength] = useState(0); // espresso strength
  const [sweet, setSweet] = useState(0); // sugar/syrup
  const [milk, setMilk] = useState(0); // milk/foam
  const [fortune, setFortune] = useState(fortunes[0]);
  const [brewCount, setBrewCount] = useState(0);
  const [showCheers, setShowCheers] = useState(false);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewedCups, setBrewedCups] = useState([]);

  const steamField = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        left: 10 + Math.random() * 80,
        bottom: 10 + Math.random() * 20,
        size: 18 + Math.floor(Math.random() * 12),
        drift: (Math.random() - 0.5) * 60,
        rise: 30 + Math.random() * 100,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 3,
      })),
    []
  );

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

    // Ideal "us" blend target (tune these as you like)
    const target = { s: 65, w: 45, m: 55 };
    const distance =
      Math.abs(strength - target.s) +
      Math.abs(sweet - target.w) +
      Math.abs(milk - target.m);

    const score = clamp(100 - distance, 0, 100);

    const message =
      score > 90
        ? "Perfect couple's cup! This is totally us."
        : score > 75
          ? "Almost there—cozy, sweet, and meant to be."
          : score > 55
            ? "Cute blend! I'd sip this with you."
            : "Experimental vibes—fun, but let's tweak together.";

    return { notes, score, message };
  }, [strength, sweet, milk]);

  const cupStyle = useMemo(
    () => buildCupStyle(strength, sweet, milk),
    [strength, sweet, milk]
  );

  const lastBrewed = brewedCups[0];
  const brewedStyle = useMemo(
    () =>
      lastBrewed
        ? buildCupStyle(lastBrewed.strength, lastBrewed.sweet, lastBrewed.milk)
        : null,
    [lastBrewed]
  );

  const onBrew = () => {
    if (isBrewing) {
      return;
    }

    setIsBrewing(true);
    setBrewCount((c) => c + 1);
    setBrewedCups((cups) => [
      {
        id: Date.now(),
        strength,
        sweet,
        milk,
        score: Math.round(profile.score),
        notes: profile.notes.join(" · "),
      },
      ...cups,
    ]);
    if (profile.score > 90) {
      setShowCheers(true);
      setTimeout(() => setShowCheers(false), 3000);
    }
    setTimeout(() => setIsBrewing(false), 900);
  };

  const shuffleFortune = () => {
    const next = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(next);
  };

  return (
    <section id="coffee" className="section section-gradient relative overflow-hidden">
      <FloatingPhotos count={8} />
      {/* Steam hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden>
        {steamField.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, y: 40, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-30, -30 - heart.rise, -120 - heart.rise],
              x: [0, heart.drift],
              scale: [0.6, 1, 0.8],
            }}
            transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay }}
            style={{ left: `${heart.left}%`, bottom: `${heart.bottom}%` }}
          >
            <Heart size={heart.size} color="#FFAB91" fill="#FFAB91" />
          </motion.div>
        ))}
      </div>

      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        Coffee with you ☕
      </motion.h2>
      <p className="max-w-[700px]">
        Let's brew our perfect cup. Slide the dials, watch the mug change, and see our tasting notes.
      </p>

      <div className="flex flex-wrap items-start justify-center gap-8 mt-6 w-full max-w-[1000px]">
        <div className="flex flex-col items-center gap-6 w-[320px] max-w-[92vw] order-1 md:order-1">
          {/* Left mug visual - Your cup */}
          <motion.div
            className="relative bg-white opacity-100 rounded-3xl shadow-card p-6 flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: isBrewing ? [0, -4, 0] : 0,
              scale: isBrewing ? [1, 1.03, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
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
                  background: cupStyle.gradient,
                  height: `${cupStyle.liquidHeight}px`,
                  filter: cupStyle.filter,
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
                    className="absolute left-2 right-2 overflow-visible"
                    style={{
                      height: `${cupStyle.foamHeight}px`,
                      bottom: `${cupStyle.foamBottom}px`,
                    }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,247,230,0.9) 100%)",
                        borderRadius: "999px",
                        boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                      }}
                    />
                    <div className="absolute -top-4 left-1 right-1 flex items-end justify-between">
                      {[
                        { w: 18, h: 18 },
                        { w: 26, h: 26 },
                        { w: 16, h: 16 },
                        { w: 24, h: 24 },
                        { w: 14, h: 14 },
                        { w: 20, h: 20 },
                      ].map((bubble, index) => {
                        const scale = 0.8 + milk / 220;
                        return (
                          <div
                            key={index}
                            style={{
                              width: `${bubble.w * scale}px`,
                              height: `${bubble.h * scale}px`,
                              background:
                                "radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FFF7E6 60%, rgba(255,235,210,0.8) 100%)",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                              borderRadius: "999px",
                              transform: `translateY(${index % 2 === 0 ? 4 : 1}px)`,
                              opacity: 0.95,
                            }}
                          />
                        );
                      })}
                    </div>
                    <div
                      className="absolute left-1 right-1"
                      style={{
                        height: `${Math.max(6, cupStyle.foamHeight * 0.35)}px`,
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,247,230,0.8) 100%)",
                        borderRadius: "999px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                        bottom: 0,
                      }}
                    />
                    <div
                      className="absolute left-0 right-0 top-0"
                      style={{
                        height: `${Math.max(6, cupStyle.foamHeight * 0.4)}px`,
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rising steam hearts from mug */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [
                      -10,
                      -40 - Math.min(milk, 50) - (isBrewing ? 20 : 0),
                      -80 - Math.min(milk, 60) - (isBrewing ? 30 : 0),
                    ],
                  }}
                  transition={{ duration: isBrewing ? 2.4 : 3, repeat: Infinity, delay: 0 }}
                  className="absolute left-0"
                >
                  <Heart size={16} color="#FFAB91" fill="#FFAB91" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [
                      -5,
                      -30 - Math.min(milk, 50) - (isBrewing ? 18 : 0),
                      -70 - Math.min(milk, 60) - (isBrewing ? 26 : 0),
                    ],
                  }}
                  transition={{ duration: isBrewing ? 2.8 : 3.5, repeat: Infinity, delay: 0.8 }}
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
              animate={{ boxShadow: isBrewing ? "0 0 0 8px rgba(255,171,145,0.25)" : "0 0 0 0 rgba(0,0,0,0)" }}
              title="Brew this cup"
              disabled={isBrewing}
            >
              <Coffee size={18} /> {isBrewing ? "Brewing.." : "Brew this cup"}
            </motion.button>

            <div className="mt-3 text-sm text-muted">Brewed: {brewCount}x</div>
          </motion.div>

          {/* Last brewed cup */}
          <motion.div
            className="relative bg-white opacity-100 rounded-3xl shadow-card p-6 flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm text-muted mb-3">Last brewed cup</div>
            {lastBrewed && brewedStyle ? (
              <>
                <div
                  className="relative w-[150px] h-[120px] rounded-b-2xl overflow-hidden"
                  style={{
                    background: "#FFF8F0",
                    border: "3px solid #E0CDAA",
                    borderTop: "10px solid #E0CDAA",
                    borderRadius: "16px 16px 22px 22px",
                    boxShadow: "inset 0 6px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="absolute left-0 right-0 bottom-0"
                    style={{
                      background: brewedStyle.gradient,
                      height: `${brewedStyle.liquidHeight * 0.85}px`,
                      filter: brewedStyle.filter,
                    }}
                  />
                  {lastBrewed.milk > 20 && (
                    <div
                      className="absolute left-2 right-2 rounded-full"
                      style={{
                        background: "linear-gradient(180deg, #FFF 0%, #FFF7E6 100%)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                        height: `${brewedStyle.foamHeight * 0.85}px`,
                        bottom: `${brewedStyle.foamBottom * 0.85}px`,
                      }}
                    />
                  )}
                </div>
                <div className="mt-3 text-sm text-muted">
                  Score: <span className="text-dark font-semibold">{lastBrewed.score}%</span>
                </div>
                <div className="text-xs text-muted mt-1 capitalize">{lastBrewed.notes}</div>
              </>
            ) : (
              <div className="text-sm text-muted">Brew a cup to save your blend.</div>
            )}
          </motion.div>
        </div>

        {/* Controls + notes */}
        <motion.div
          className="bg-white opacity-100 rounded-3xl shadow-card p-6 w-[360px] max-w-[92vw] text-left order-2 md:order-2"
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
          <div className="mt-6">
            <motion.button
              className="action-btn secondary flex items-center justify-center gap-2 w-full mb-4"
              whileTap={{ scale: 0.95 }}
              onClick={shuffleFortune}
              title="Shuffle coffee fortune"
            >
              <Shuffle size={16} /> Coffee fortune
            </motion.button>

            <div className="bg-cream/40 rounded-xl p-5 border border-cream">
              <div className="text-base leading-relaxed text-dark font-medium text-center">
                "{fortune}"
              </div>
            </div>
          </div>

          {brewedCups.length > 0 && (
            <div className="mt-5">
              <div className="text-sm text-muted mb-2">Brewed history</div>
              <div className="space-y-2">
                {brewedCups.slice(0, 3).map((cup) => (
                  <div
                    key={cup.id}
                    className="flex items-center justify-between text-sm bg-cream/60 rounded-xl px-3 py-2"
                  >
                    <span className="font-semibold text-dark">{cup.score}%</span>
                    <span className="text-muted">
                      S {cup.strength} · W {cup.sweet} · M {cup.milk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Celebration confetti when perfect match */}
      <Confetti trigger={showCheers} />
    </section>
  );
}
