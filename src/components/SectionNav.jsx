import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const sections = [
  { id: "landing", label: "Welcome" },
  { id: "gallery", label: "Memories" },
  { id: "love-notes", label: "Love Notes" },
  { id: "love-letter", label: "My Letter" },
  { id: "cats", label: "Cats" },
  { id: "final", label: "Forever" },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 1000);
    const container = document.querySelector('.sections-container');

    const handleScroll = () => {
      if (!container) return;
      const scrollPosition = container.scrollTop + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    container?.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(showTimer);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const container = document.querySelector('.sections-container');
    if (element && container) {
      container.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      className="section-nav"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          className={`nav-dot ${activeSection === index ? "active" : ""}`}
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          title={section.label}
        >
          {activeSection === index ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <Heart size={8} fill="#FFD84D" color="#FFD84D" />
            </motion.div>
          ) : (
            <div className="dot-inner" />
          )}
          
          {/* Tooltip */}
          <motion.span
            className="nav-tooltip"
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            {section.label}
          </motion.span>
        </motion.button>
      ))}
    </motion.nav>
  );
}
