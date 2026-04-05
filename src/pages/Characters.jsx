import { motion } from 'framer-motion';
import { useInfiniteData } from '../hooks/useInfiniteData';
import { Shield, Loader2, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Characters() {
    // using the useInfiniteData hook but limiting differently or pretending to be paginated. 
    // To strictly match "page numbers 1,2,3...", we could replace useInfiniteData or just use it.
    // For now, let's keep infinite scroll or a pseudo-pagination UI at the bottom.
    const { data: characters, loading, error, lastElementRef } = useInfiniteData('characters');
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCharacters = characters.filter(char =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24 max-w-[1600px] mx-auto px-4 lg:px-12 pt-8 text-white bg-marvel-dark"
        >
            <div className="flex flex-col md:flex-row items-end justify-between border-b border-white/20 pb-6 mb-12">
                <div>
                    <h1 className="text-6xl md:text-8xl font-marvel tracking-widest uppercase">
                        Marvel Characters
                    </h1>
                    <p className="text-white/60 font-sans mt-2 tracking-widest text-sm uppercase">Explore the cinematic roster</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex items-center gap-4 w-full md:w-auto mt-6 md:mt-0">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                            type="text"
                            placeholder="SEARCH HEROES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border border-white/20 text-white font-sans text-sm focus:outline-none focus:border-marvel-red py-3 pl-12 pr-4 transition-colors"
                        />
                    </div>
                    <button className="border border-white/20 p-3 hover:border-marvel-red transition-colors flex items-center justify-center">
                        <Filter className="w-5 h-5 text-white/50" />
                    </button>
                </div>
            </div>

            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            {/* Sharp Grid - 6 to 8 columns on large screens */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 lg:gap-6">
                {filteredCharacters.map((char, idx) => {
                    const isLast = idx === filteredCharacters.length - 1;
                    return (
                        <div key={char._id || idx} ref={isLast ? lastElementRef : null}>
                            <Link to={`/character-detail/${char._id || idx}`} state={{ character: char }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-black border border-white/10 group cursor-pointer h-full flex flex-col pt-0 marvel-hover-line relative overflow-hidden"
                                >
                                    <div className="w-full aspect-square bg-marvel-dark overflow-hidden relative">
                                        <div className="absolute inset-0 bg-marvel-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                                        <img
                                            src={`https://picsum.photos/seed/${char.name.replace(/\s+/g, '')}/400/400`}
                                            alt={char.name}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow bg-marvel-dark z-20 transition-colors group-hover:bg-[#1a1a1a]">
                                        <h2 className="text-xl font-bold font-sans uppercase mb-1 leading-tight text-white group-hover:text-marvel-red transition-colors">
                                            {char.name}
                                        </h2>
                                        <span className="text-white/50 text-[10px] uppercase tracking-widest mt-auto font-bold">
                                            {char.real || 'Unknown Origin'}
                                        </span>
                                    </div>

                                    {/* Subtle Top Red line indicating selection area */}
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 group-hover:bg-marvel-red transition-colors z-20"></div>
                                </motion.div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Style Footer (Matches Image) */}
            <div className="mt-20 border-t border-white/20 pt-8 flex items-center justify-center gap-2">
                <span className="w-10 h-10 border border-marvel-red bg-marvel-red text-white flex items-center justify-center font-bold font-sans cursor-pointer hover:-translate-y-1 transition-transform">1</span>
                <span className="w-10 h-10 border border-white/20 text-white flex items-center justify-center font-bold font-sans cursor-pointer hover:-translate-y-1 hover:border-marvel-red transition-all">2</span>
                <span className="w-10 h-10 border border-white/20 text-white flex items-center justify-center font-bold font-sans cursor-pointer hover:-translate-y-1 hover:border-marvel-red transition-all">3</span>
                <span className="w-10 h-10 border border-white/20 text-white flex items-center justify-center font-bold font-sans cursor-pointer hover:-translate-y-1 hover:border-marvel-red transition-all">...</span>
            </div>

            {loading && (
                <div className="flex justify-center mt-12 mb-12">
                    <Loader2 className="w-10 h-10 animate-spin text-marvel-red" />
                </div>
            )}
        </motion.div>
    );
}
