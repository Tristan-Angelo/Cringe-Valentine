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
import yellowCat from "./assets/photos/cats/yellow-cat.jpg";
import catPhoto from "./assets/photos/cats/cat.jpg";

// Pet configuration - Add your pet images here!
// You can add multiple pets and they will cycle every 10 clicks
const petConfig = [
  {
    image: yellowCat,
    name: "Fluffy",
    sound: '/sounds/meow.mp3'
  },
  {
    image: catPhoto,
    name: "Whiskers",
    sound: '/sounds/meow.mp3'
  },
  // Add more pets here! Example:
  // { 
  //   image: yourDogImage, 
  //   name: "Buddy", 
  //   sound: '/sounds/bark.mp3' 
  // },
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
