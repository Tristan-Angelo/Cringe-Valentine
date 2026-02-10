import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NameVerification from "./components/NameVerification";
import LoadingScreen from "./components/LoadingScreen";
import IntroScreen from "./components/IntroScreen";
import FloatingDecor from "./components/FloatingDecor";
import SectionNav from "./components/SectionNav";
import HeartRain from "./components/HeartRain";
import CursorHearts from "./components/CursorHearts";
import MusicPlayer from "./components/MusicPlayer";
import Landing from "./components/Landing";
import Gallery from "./components/Gallery";
import LoveNotes from "./components/LoveNotes";
import LoveLetterSection from "./components/LoveLetterSection";
import Cats from "./components/Cats";
import CoffeeDate from "./components/CoffeeDate";
import FinalMessage from "./components/FinalMessage";

// Import pet images
import stormy from "./assets/photos/cats/Stormy.jpg";
import pepper from "./assets/photos/cats/Pepper.jpg";
import snowy from "./assets/photos/cats/Snowy.jpg";
import ginger from "./assets/photos/cats/Ginger.jpg";
import toton from "./assets/photos/cats/Toton.jpg";
import awok from "./assets/photos/cats/Awok.jpg";
import sylvester from "./assets/photos/cats/Sylvester.jpg";

// Pet configuration - Add your pet images here!
// You can add multiple pets and they will cycle every 3 clicks
const petConfig = [
  { image: stormy, name: "Stormy", sound: "/sounds/meow.mp3" },
  { image: pepper, name: "Pepper", sound: "/sounds/meow.mp3" },
  { image: snowy, name: "Snowy", sound: "/sounds/meow.mp3" },
  { image: ginger, name: "Ginger", sound: "/sounds/meow.mp3" },
  { image: toton, name: "Toton", sound: "/sounds/meow.mp3" },
  { image: awok, name: "Awok", sound: "/sounds/meow.mp3" },
  { image: sylvester, name: "Sylvester", sound: "/sounds/meow.mp3" },
];

function App() {
  const [currentStep, setCurrentStep] = useState("verification"); // Start with verification
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);
  const musicRef = useRef(null);

  const handleNameVerified = () => {
    setCurrentStep("loading");
  };

  const handleLoadingComplete = () => {
    setCurrentStep("flipCards");
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowMain(true);
    setAutoPlayMusic(true);
    setCurrentStep("main");
    setTimeout(() => {
      musicRef.current?.play();
    }, 500);
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentStep === "verification" && (
          <NameVerification
            key="verification"
            onVerified={handleNameVerified}
          />
        )}

        {currentStep === "loading" && (
          <LoadingScreen
            key="loading"
            onComplete={handleLoadingComplete}
          />
        )}

        {currentStep === "flipCards" && (
          <IntroScreen key="intro" onOpen={handleIntroComplete} />
        )}

        {currentStep === "main" && showMain && (
          <motion.div
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background effects */}
            <HeartRain count={25} />
            <CursorHearts />
            <FloatingDecor count={35} />

            {/* Navigation dots */}
            <SectionNav />

            {/* Floating music player */}
            <MusicPlayer ref={musicRef} autoPlay={autoPlayMusic} />

            {/* Main sections with scroll snap */}
            <div className="sections-container">
              <Landing />
              <Gallery />
              <LoveNotes />
              <LoveLetterSection />
              <Cats
                pets={petConfig}
                title="Your Pets Say Hi 🐱"
                subtitle="Pet them! See how much love you can give! 💛"
              />
              <CoffeeDate />
              <FinalMessage />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
