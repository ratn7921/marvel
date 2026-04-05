import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CharacterDetail() {
    const location = useLocation();
    const character = location.state?.character;
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [scrollY, setScrollY] = useState(0);

    // Track scroll for parallax and zoom
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!character) {
        return <Navigate to="/characters" />;
    }

    // Parallax logic manually calculated for smooth inline style
    const bgScale = 1.05 + (scrollY * 0.0005);
    const bgY = scrollY * 0.4;

    return (
        <div className="bg-[#000] text-white min-h-screen font-sans overflow-x-hidden pt-16">

            {/* HERO SECTION - FULL SCREEN */}
            <div className="relative w-full h-[85vh] lg:h-[90vh] overflow-hidden">
                {/* Background Artwork */}
                <motion.div
                    className="absolute inset-0 w-full h-full transform origin-center"
                    style={{
                        y: bgY,
                        scale: Math.min(bgScale, 1.2), // cap scaling
                    }}
                >
                    <img
                        src={`https://picsum.photos/seed/${character.name.replace(/\s+/g, '')}-hero/1920/1080`}
                        alt={character.name}
                        className="w-full h-full object-cover object-top grayscale-[0.2]"
                    />
                </motion.div>

                {/* Dark gradient overlay (left -> right fade) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                {/* Bottom fade into black for smooth transition to content */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>

                {/* Cosmic Particles Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                ></div>

                {/* Left Side Content */}
                <div className="relative h-full max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        {/* Small Label */}
                        <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white uppercase tracking-[0.3em] text-xs font-bold mb-6">
                            {character.category || "MUTANT CLASSIFIED"}
                        </div>

                        {/* Large Heading */}
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-marvel uppercase tracking-wider leading-[0.85] text-white drop-shadow-2xl select-none relative group">
                            {/* Subtle glowing text shadow layer behind */}
                            <span className="absolute inset-0 text-marvel-red blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
                                {character.name}
                            </span>
                            <span className="relative z-10">{character.name}</span>
                        </h1>

                        {/* Short Description */}
                        <p className="mt-8 text-xl text-gray-300 font-sans leading-relaxed border-l-4 border-marvel-red pl-6 py-2 max-w-xl">
                            {character.description || `A legendary figure emerging from the cinematic universe, bearing untold powers. ${character.name} stands as a testament to the ongoing saga.`}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* NAVIGATION TABS */}
            <div className="w-full bg-black border-b border-white/10 sticky top-[64px] z-40 shadow-2xl shadow-black">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
                    <div className="flex gap-12 sm:gap-16 items-center overflow-x-auto custom-scrollbar">
                        {['OVERVIEW', 'IN COMICS PROFILE', 'FULL REPORT'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-6 relative text-sm sm:text-base tracking-[0.2em] font-bold uppercase transition-colors whitespace-nowrap group ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                {tab}
                                {/* Red Underline Animation & Subtle Glow */}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-marvel-red shadow-[0_0_15px_#e62429]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-20 pb-32">
                <AnimatePresence mode="wait">
                    {activeTab === 'OVERVIEW' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col lg:flex-row gap-16 lg:gap-24"
                        >
                            {/* Left Column: Origin Story */}
                            <div className="flex-[2]">
                                <h2 className="font-marvel text-4xl uppercase tracking-widest text-[#e62429] mb-8 flex items-center gap-4">
                                    Marvel Cinematic Universe
                                    <span className="h-[1px] flex-1 bg-white/10"></span>
                                </h2>

                                <div className="space-y-6 text-gray-300 font-sans text-lg leading-relaxed">
                                    <p>
                                        Tracing the origins from the initial pages to the grand cinematic adaptations, {character.name} has evolved past traditional comic bounds. Armed with immense capabilities and a complex morality code.
                                    </p>
                                    <p>
                                        It is documented in the archive that their primary ability, <strong className="text-white">"{character.power || 'Unknown'}"</strong>, plays a crucial role in shaping the planetary conflicts across the galaxy.
                                    </p>
                                    <p>
                                        {character.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Stats Grid */}
                            <div className="flex-1">
                                <div className="bg-[#111] p-8 hover:bg-[#151515] transition-colors border border-white/5 relative overflow-hidden group">
                                    {/* Accent corner */}
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-marvel-red opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                    <h3 className="font-marvel text-2xl uppercase tracking-widest text-white mb-8">Character Intel</h3>

                                    <div className="space-y-6">
                                        <div className="border-b border-white/10 pb-4">
                                            <span className="text-gray-500 uppercase text-xs tracking-widest block mb-1">Real Name</span>
                                            <span className="text-white font-bold tracking-wide uppercase">{character.real || 'CLASSIFIED'}</span>
                                        </div>
                                        <div className="border-b border-white/10 pb-4">
                                            <span className="text-gray-500 uppercase text-xs tracking-widest block mb-1">Primary Power</span>
                                            <span className="text-[#e62429] font-bold tracking-wide uppercase">{character.power || 'UNKNOWN'}</span>
                                        </div>
                                        <div className="border-b border-white/10 pb-4">
                                            <span className="text-gray-500 uppercase text-xs tracking-widest block mb-1">First Cinematic Appearance</span>
                                            <span className="text-white font-bold tracking-wide uppercase">Phase Timeline Index: #{character.timelineIndex || 1}</span>
                                        </div>
                                        <div className="">
                                            <span className="text-gray-500 uppercase text-xs tracking-widest block mb-1">Affiliations</span>
                                            <span className="text-white font-bold tracking-wide uppercase">Avengers / Unknown</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* MOVIE GRID PREVIEW */}
                    {activeTab === 'OVERVIEW' && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-32"
                        >
                            <h2 className="font-marvel text-4xl uppercase tracking-widest text-white mb-10 flex items-center gap-4">
                                Cinematic Appearances
                                <span className="h-[1px] flex-1 bg-white/10"></span>
                            </h2>

                            <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar">
                                {[1, 2, 3, 4, 5].map((idx) => (
                                    <div key={idx} className="min-w-[250px] aspect-[2/3] bg-[#111] relative overflow-hidden group cursor-pointer border border-white/5 flex-shrink-0">
                                        <img
                                            src={`https://picsum.photos/seed/${character.name}${idx}/400/600`}
                                            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                            alt="Movie cover"
                                        />
                                        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="text-white font-marvel tracking-wider text-xl uppercase">Saga Film 0{idx}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== 'OVERVIEW' && (
                        <motion.div
                            key="other"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-64 flex items-center justify-center text-gray-500 font-sans tracking-widest uppercase border border-dashed border-white/10 bg-[#111]"
                        >
                            RESTRICTED CLEARANCE LEVEL REQUIRED
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
