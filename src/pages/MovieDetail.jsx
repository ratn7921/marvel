import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import { Star, Monitor, ChevronRight } from 'lucide-react';

export default function MovieDetail() {
    const location = useLocation();
    const movie = location.state?.movie;

    if (!movie) {
        return <Navigate to="/movies" />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[1600px] mx-auto pb-24 text-white bg-marvel-dark/50"
        >
            <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch min-h-[calc(100vh-6rem)] relative px-4 lg:px-12 pt-8">

                {/* LEFT: MOVIE INFO */}
                <div className="flex-[1.5] space-y-12 pb-32">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="inline-block px-4 py-1 bg-white text-black font-marvel text-2xl font-bold tracking-widest uppercase">
                            {movie.year}
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-marvel tracking-wide uppercase leading-none border-b-4 border-marvel-red pb-6 inline-block">
                            {movie.title}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div className="bg-black/60 p-8 border-l border-white/10 marvel-hover-line relative group">
                            <h3 className="font-marvel text-3xl uppercase tracking-widest text-marvel-red mb-4">Plot Synopsis</h3>
                            <p className="text-xl text-white/80 leading-relaxed font-sans mt-2">
                                {movie.description}
                            </p>
                        </div>

                        <div className="bg-black/60 p-8 border-l border-white/10 marvel-hover-line relative">
                            <h3 className="font-marvel text-3xl uppercase tracking-widest text-marvel-red mb-4">Key Characters</h3>
                            <p className="text-lg text-white/70 leading-relaxed font-sans">
                                The original superhero ensemble gathers in a cinematic event that changed the superhero genre forever. Roles defined by their respective titular arcs converge in explosive team dynamics.
                            </p>
                        </div>

                        <div className="bg-black/60 p-8 border-l border-white/10 marvel-hover-line relative">
                            <h3 className="font-marvel text-3xl uppercase tracking-widest text-marvel-red mb-4">Hidden Secrets & Easter Eggs</h3>
                            <ul className="text-lg text-white/70 font-sans space-y-3 list-disc list-inside">
                                <li>Stan Lee cameo near the climax sequence.</li>
                                <li>Background references to the multiverse and quantum realm.</li>
                                <li>Post-credit scene teasing the next galactic threat.</li>
                            </ul>
                        </div>

                        {/* BOTTOM BAR REPLICATING THE FOOTER */}
                        <div className="pt-12 border-t border-white/20 flex flex-wrap gap-12 items-center w-full">
                            <div className="space-y-2 group">
                                <span className="text-white/40 uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-yellow-500 transition-colors">
                                    <Star className="w-4 h-4" /> IMDb Rating
                                </span>
                                <div className="font-marvel text-6xl text-white group-hover:text-marvel-red transition-colors duration-500 flex items-baseline gap-1">
                                    {movie.rating || 'N/A'} <span className="text-2xl text-white/30 uppercase">/ 10</span>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <span className="text-white/40 uppercase text-xs tracking-widest flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                                    <Monitor className="w-4 h-4" /> Where to Watch
                                </span>
                                <p className="font-bold text-2xl uppercase tracking-wider text-white">Disney+</p>
                            </div>

                            <div className="flex-1 min-w-[250px] border-l border-white/10 pl-8 overflow-hidden h-24 relative hidden lg:block">
                                <span className="text-white/40 uppercase text-xs tracking-widest block mb-2">Fan Reactions</span>
                                <div className="flex flex-col gap-2 overflow-y-auto max-h-full pr-2 text-white/70 text-sm font-sans italic custom-scrollbar">
                                    <p>"Absolutely astonishing cinematic leap for Marvel."</p>
                                    <p>"The visual effects hold up so well!"</p>
                                    <p>"A masterclass in character juggling."</p>
                                </div>
                                <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-marvel-dark to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: STICKY POSTER (MODERN EDITORIAL) */}
                <div className="flex-1 md:block hidden relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="sticky top-24 w-full h-[85vh] p-4 bg-black border border-white/10"
                    >
                        <div className="w-full h-full relative overflow-hidden group">
                            <div className="absolute inset-0 bg-marvel-red/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color z-10"></div>
                            <img
                                src={`https://picsum.photos/seed/${location.state?.movie._id || 1000}/800/1200`}
                                alt={movie.title}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                            />

                            {/* Cinematic Prompt Overlay on Hover */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-marvel-red font-bold uppercase text-xs tracking-widest">Visual Prompt Sync</span>
                                <p className="font-mono text-white/50 text-xs mt-2 leading-relaxed">
                                    {movie.imagePrompt || "Ultra high detail, sharp comic illustration, bold ink lines, high contrast colors, Marvel comic style, clean edges, no blur, print-quality resolution"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
}
