import { motion } from 'framer-motion';
import { useInfiniteData } from '../hooks/useInfiniteData';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Movies() {
    const { data: movies, loading, error, lastElementRef } = useInfiniteData('movies');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[1600px] mx-auto py-12 px-4 lg:px-12 bg-marvel-dark text-white pb-24"
        >
            <div className="flex flex-col md:flex-row items-end justify-between border-b border-white/20 pb-6 mb-12">
                <div>
                    <h1 className="text-6xl md:text-8xl font-marvel tracking-widest uppercase">
                        CINEMATIC UNIVERSE
                    </h1>
                    <p className="text-marvel-red font-sans mt-2 tracking-widest text-sm uppercase font-bold">Relive the epic saga</p>
                </div>
            </div>

            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            {/* Grid for movies exactly like the screenshot styling */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie, idx) => {
                    const isLast = idx === movies.length - 1;
                    return (
                        <div key={movie._id || idx} ref={isLast ? lastElementRef : null}>
                            <Link to={`/movie-detail/${movie._id || idx}`} state={{ movie }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (idx % 5) * 0.1 }}
                                    className="bg-black border border-white/10 group cursor-pointer flex flex-col h-full marvel-hover-line relative overflow-hidden"
                                >
                                    <div className="w-full aspect-[2/3] bg-marvel-dark overflow-hidden relative border-b border-white/10">
                                        <div className="absolute inset-0 bg-marvel-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                                        <img
                                            src={`https://picsum.photos/seed/${idx + 1000}/600/900`}
                                            alt={movie.title}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-2 left-2 bg-white text-black font-marvel px-3 py-1 text-xl font-bold z-20 opacity-90">
                                            {movie.year}
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow bg-black z-20">
                                        <h2 className="text-2xl font-bold font-marvel uppercase mb-2 leading-tight text-white group-hover:text-marvel-red transition-colors">
                                            {movie.title}
                                        </h2>
                                        <p className="text-white/60 font-sans text-xs line-clamp-3 leading-relaxed">
                                            {movie.description}
                                        </p>
                                    </div>

                                    {/* Subtle Top Red line indicating selection area */}
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 group-hover:bg-marvel-red transition-colors z-20"></div>
                                </motion.div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {loading && (
                <div className="flex justify-center mt-16 mb-12">
                    <Loader2 className="w-12 h-12 animate-spin text-marvel-red" />
                </div>
            )}
        </motion.div>
    );
}
