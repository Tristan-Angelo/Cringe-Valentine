import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Unlock, X } from "lucide-react";
import errorImage from "../assets/photos/cats/cat-punch.jpg"; // Import your error image here

export default function NameVerification({ onVerified }) {
    const [inputName, setInputName] = useState("");
    const [showError, setShowError] = useState(false);
    const [attempts, setAttempts] = useState(0);

    // The correct name to match (you can change this)
    const correctName = ["Charmaine", "Charmaine Celestre"];; // Change this to the desired name

    const handleSubmit = (e) => {
        e.preventDefault();

        const normalizedInput = inputName.trim().toLowerCase();

        const isCorrect = correctName.some(
            name => name.toLowerCase() === normalizedInput
        );

        if (isCorrect) {
            onVerified();
        } else {
            setShowError(true);
            setAttempts(prev => prev + 1);
        }
    };


    const handleInputChange = (e) => {
        setInputName(e.target.value);
        if (showError) {
            setShowError(false);
        }
    };

    const closeModal = () => {
        setShowError(false);
    };

    return (
        <div className="section relative overflow-hidden min-h-screen flex items-center justify-center">
            {/* Background floating hearts */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        rotate: [-15, 15, -15],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                    }}
                >
                    <Heart size={30 + Math.random() * 20} color="#FFD84D" fill="#FFD84D" />
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full mx-4"
            >
                <div className="bg-cream/60 backdrop-blur-sm rounded-3xl p-8 border border-cream shadow-lg">
                    {/* Lock icon */}
                    <motion.div
                        className="flex justify-center mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <div className="bg-yellow/20 p-4 rounded-full">
                            <Lock size={40} color="#FFC107" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-center text-dark mb-2"
                    >
                        Who's There? {"💛"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-muted mb-6"
                    >
                        This surprise is meant for someone special...
                    </motion.p>

                    {/* Input form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                                Enter your name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={inputName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-cream bg-white/80 text-dark placeholder-muted focus:outline-none focus:ring-2 focus:ring-yellow/50 focus:border-yellow transition-all"
                                placeholder="Type your name here..."
                                required
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-2 bg-yellow text-dark py-3 rounded-xl font-semibold hover:bg-golden transition-colors duration-300"
                        >
                            <Unlock size={20} />
                            Unlock Surprise
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Error Modal */}
            <AnimatePresence>
                {showError && (
                    <motion.div
                        className="letter-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-md"
                            initial={{ scale: 0.85, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 10 }}
                            transition={{ type: "spring", stiffness: 280, damping: 24 }}
                        >
                            <div className="letter-modal relative">
                                <motion.button
                                    className="letter-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={2.5} color="#5D4037" />
                                </motion.button>

                                <img src={errorImage} alt="Error" className="w-full max-w-xs mx-auto mb-4 rounded-2xl shadow-md" />

                                <h3 className="letter-title text-center">
                                    Get the fck outta here!
                                </h3>
                                <p className="letter-text mt-2 mb-6 text-center">
                                    This ain't for you, you dumbass bxtch! {"💔"}
                                </p>

                                <button
                                    onClick={closeModal}
                                    className="w-full bg-yellow text-dark py-2.5 rounded-xl font-semibold hover:bg-golden transition-colors duration-300"
                                >
                                    Okay
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}



