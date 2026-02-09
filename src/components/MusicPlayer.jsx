import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2 } from "lucide-react";

const MusicPlayer = forwardRef(({ autoPlay = false }, ref) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Set volume to 30% when component mounts
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }
    }, []);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch(console.log);
            }
        },
        pause: () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        },
        toggle: () => {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play().then(() => setIsPlaying(true)).catch(console.log);
            }
            setHasInteracted(true);
        }
    }));

    useEffect(() => {
        if (!hasInteracted) {
            const timer = setTimeout(() => setShowTooltip(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [hasInteracted]);

    useEffect(() => {
        if (autoPlay && audioRef.current && !hasInteracted) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch(() => {
                    setShowTooltip(true);
                });
            }
        }
    }, [autoPlay, hasInteracted]);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.log);
        }
        setIsPlaying(!isPlaying);
        setShowTooltip(false);
        setHasInteracted(true);
    };

    return (
        <>
            <audio ref={audioRef} loop preload="auto">
                <source src="/music/Still-With-You.mp3" type="audio/mpeg" />
            </audio>

            <motion.div
                className="music-player-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <AnimatePresence>
                    {showTooltip && !hasInteracted && (
                        <motion.div
                            className="music-tooltip"
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        >
                            🎵 Tap to play our song
                            <div className="music-tooltip-arrow" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    className={`music-toggle ${isPlaying ? "playing" : ""}`}
                    onClick={toggleMusic}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={isPlaying ? { rotate: [0, 5, -5, 5, 0] } : {}}
                    transition={isPlaying ? { repeat: Infinity, duration: 1 } : {}}
                >
                    {isPlaying ? (
                        <Volume2 size={32} strokeWidth={2.5} color="#5D4037" />
                    ) : (
                        <Music size={32} strokeWidth={2.5} color="#5D4037" />
                    )}
                </motion.button>

                {/* Now playing indicator */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            className="now-playing"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                        >
                            <div className="equalizer">
                                {[1, 2, 3, 4].map((bar) => (
                                    <motion.div
                                        key={bar}
                                        className="eq-bar"
                                        animate={{ height: ["40%", "100%", "60%", "100%", "40%"] }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            delay: bar * 0.1,
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="now-playing-text">Our Song</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Sound wave animation when playing */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -inset-2 rounded-full border-2 border-yellow/50 pointer-events-none"
                        >
                            <motion.div
                                className="absolute -inset-2 rounded-full border-2 border-yellow/30"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                            <motion.div
                                className="absolute -inset-4 rounded-full border-2 border-yellow/20"
                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
