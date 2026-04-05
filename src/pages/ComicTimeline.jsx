import { motion } from 'framer-motion';
import { useInfiniteData } from '../hooks/useInfiniteData';
import { Loader2 } from 'lucide-react';

export default function ComicTimeline() {
    const { data: comics, loading, error, lastElementRef } = useInfiniteData('comics');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[1400px] mx-auto py-12 px-4 lg:px-12 bg-marvel-dark text-white"
        >
            <div className="text-center mb-24 border-b border-white/20 pb-12">
                <h1 className="text-6xl md:text-8xl font-marvel uppercase tracking-[0.05em]">
                    COMIC TIMELINE
                </h1>
                <p className="text-marvel-red font-sans uppercase tracking-[0.3em] text-sm mt-4 font-bold">
                    The Illustrated Archives
                </p>
            </div>

            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            <div className="space-y-32">
                {comics.map((comic, i) => {
                    const isLast = i === comics.length - 1;
                    return (
                        <motion.div
                            key={comic._id || i}
                            ref={isLast ? lastElementRef : null}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center md:items-start group"
                        >
                            {/* Comic Panel (LEFT) */}
                            <div className="flex-1 w-full max-w-sm shrink-0 perspective-1000">
                                <div className="relative transform group-hover:rotate-y-0 transition-transform duration-700">
                                    <div className="absolute top-4 -left-4 w-full h-full bg-marvel-red/20 border-l border-b border-marvel-red z-0 transition-all group-hover:bg-marvel-red/40 group-hover:top-6 group-hover:-left-6"></div>
                                    <div className="w-full aspect-[2/3] bg-black relative z-10 border border-white/10 overflow-hidden shadow-[20px_20px_50px_rgba(0,0,0,0.8)] marvel-hover-line">
                                        <div className="absolute inset-0 bg-marvel-red/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 mix-blend-color"></div>
                                        <img
                                            src={`https://picsum.photos/seed/${comic._id || i}/600/900`}
                                            alt={comic.title}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 right-6 bg-white text-black font-marvel px-6 py-2 text-4xl font-bold z-20 border-b-4 border-marvel-red shadow-xl">
                                        {comic.year}
                                    </div>
                                </div>
                            </div>

                            {/* Comic Details (RIGHT) */}
                            <div className="flex-1 space-y-8 pt-4">
                                <div className="space-y-2 border-b border-white/10 pb-6 relative">
                                    <h2 className="text-5xl md:text-6xl font-marvel uppercase text-white group-hover:text-marvel-red transition-colors duration-300">
                                        {comic.title}
                                    </h2>
                                    <p className="text-white/40 uppercase tracking-widest text-xs font-bold font-sans">Creator: {comic.creator || 'Marvel'}</p>
                                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-marvel-red transition-all duration-700 ease-out"></div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-marvel-red mb-3">The Story</h3>
                                        <p className="text-white/70 leading-relaxed font-sans text-lg lg:text-xl">
                                            {comic.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-marvel-red mb-3">Legacy Impact</h3>
                                        <p className="text-white/70 leading-relaxed font-sans border-l-2 border-white/20 pl-4 py-1 italic">
                                            {comic.importance}
                                        </p>
                                    </div>
                                </div>

                                <button className="marvel-button px-8 py-3 bg-white text-black hover:bg-marvel-red hover:text-white transition-colors duration-300 mt-8 group-hover:shadow-[0_0_20px_rgba(236,29,36,0.5)]">
                                    Read Analysis
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {loading && (
                <div className="flex justify-center mt-20">
                    <Loader2 className="w-12 h-12 animate-spin text-marvel-red" />
                </div>
            )}
        </motion.div>
    );
}
