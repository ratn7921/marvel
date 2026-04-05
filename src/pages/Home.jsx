import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronRight, Clapperboard, BookOpen, Loader2 } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import { fetchMarvelNews } from '../services/newsService';
import VideoSection from '../components/VideoSection';
import { fetchMarvelComics, fetchMarvelCharacters } from '../services/marvelService';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] } },
    exit: { opacity: 0 }
};

export default function Home() {
    const [character, setCharacter] = useState(null);
    const [news, setNews] = useState([]);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                // Load core feature character
                const chars = await fetchMarvelCharacters(5, 0);
                if (isMounted && chars.length > 0) {
                    setCharacter(chars[Math.floor(Math.random() * chars.length)]);
                }

                // Load APIs parallel
                const [newsData, comicsData] = await Promise.all([
                    fetchMarvelNews(),
                    fetchMarvelComics(6, 0)
                ]);

                if (isMounted) {
                    setNews(newsData);
                    setComics(comicsData);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Home Page Data Load Error', err);
                if (isMounted) setLoading(false);
            }
        }

        loadData();
        return () => { isMounted = false; };
    }, []);

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen relative overflow-x-hidden bg-black text-white"
        >
            {/* Background Collage */}
            <div className="absolute inset-x-0 top-0 h-[100vh] z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black z-10 backdrop-blur-sm"></div>
                <img
                    src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1920&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-30 grayscale"
                    alt="Comic Background"
                />
            </div>

            {/* Global Header */}
            <div className="relative z-10 text-center pt-24 pb-12">
                <h1 className="text-7xl md:text-9xl font-marvel tracking-[0.1em] text-white select-none" style={{ textShadow: '4px 4px 0 #EC1D24' }}>
                    MARVEL UNIVERSE
                </h1>
                <p className="text-white/60 font-sans tracking-[0.3em] uppercase text-sm mt-4 select-none">
                    The Cinematic Documentary Experience
                </p>
                <div className="w-24 h-1 bg-marvel-red mx-auto mt-8"></div>
            </div>

            {/* HERO SECTION GRID (Original 3 Section Layout) */}
            <div className="relative z-20 flex flex-col lg:flex-row items-stretch justify-between gap-2 max-w-[1600px] mx-auto px-4 lg:px-12 pb-24 h-auto lg:h-[70vh]">
                <Link to="/movies" className="flex-1 min-h-[300px] bg-marvel-dark/80 border border-white/10 relative group overflow-hidden marvel-hover-line flex flex-col justify-end p-8">
                    <div className="absolute inset-0 bg-marvel-red/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop" alt="Movies" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 z-0" />
                    <div className="relative z-20">
                        <Clapperboard className="w-8 h-8 text-white mb-4 opacity-70 group-hover:text-marvel-red transition-colors" />
                        <h2 className="text-5xl font-marvel tracking-wider uppercase">Cinematic</h2>
                        <p className="text-white/70 font-sans text-sm mt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Explore the movie timeline & secrets.</p>
                    </div>
                </Link>

                <div className="flex-[1.8] min-h-[500px] bg-black border border-white/20 relative group overflow-hidden flex flex-col justify-end p-10 marvel-hover-line">
                    <div className="absolute top-0 right-0 p-4 z-20 text-marvel-red font-marvel text-2xl tracking-widest border-b border-marvel-red/30">SPOTLIGHT</div>
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"><Loader2 className="w-12 h-12 animate-spin text-marvel-red" /></div>
                    ) : character ? (
                        <>
                            <Hero3D color="#EC1D24" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>
                            <img src={character.image} alt={character.name} className="absolute inset-0 w-full h-full object-cover object-top opacity-50 mix-blend-screen grayscale transition-all duration-1000 pointer-events-none" />
                            <div className="relative z-30 w-full flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none">
                                <div>
                                    <h1 className="text-7xl lg:text-9xl font-marvel font-bold text-white uppercase leading-none">{character.name}</h1>
                                    <div className="w-16 h-2 bg-marvel-red mt-2 mb-4"></div>
                                    <p className="text-white/80 font-sans max-w-sm text-sm hidden md:block">{character.description?.substring(0, 100)}...</p>
                                </div>
                            </div>
                            <Link to={`/character-detail/${character.id || character._id}`} state={{ character }} className="absolute inset-0 z-40 border-2 border-transparent group-hover:border-marvel-red/30 transition-colors">
                                <div className="absolute bottom-10 right-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 bg-white text-black font-bold uppercase tracking-wider px-8 py-3 hover:bg-marvel-red hover:text-white">
                                    Analyze <ChevronRight className="w-5 h-5" />
                                </div>
                            </Link>
                        </>
                    ) : null}
                </div>

                <Link to="/comics" className="flex-1 min-h-[300px] bg-marvel-dark/80 border border-white/10 relative group overflow-hidden marvel-hover-line flex flex-col justify-end p-8">
                    <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000&auto=format&fit=crop" alt="Comics" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 z-0" />
                    <div className="relative z-20 text-right w-full flex flex-col justify-end items-end">
                        <BookOpen className="w-8 h-8 text-white mb-4 opacity-70 group-hover:text-marvel-red transition-colors" />
                        <h2 className="text-5xl font-marvel tracking-wider uppercase">Archives</h2>
                        <p className="text-white/70 font-sans text-sm mt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">Journey through the illustrated timeline.</p>
                    </div>
                </Link>
            </div>

            {/* LATEST NEWS & FEATURED VIDEO INTEGRATION */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-4 lg:px-12 py-24 border-t border-white/10 flex flex-col lg:flex-row gap-16">

                {/* LATEST NEWS */}
                <div className="flex-1">
                    <h2 className="text-5xl font-marvel uppercase tracking-widest text-[#e62429] mb-8">Latest Marvel News</h2>
                    <div className="space-y-6">
                        {loading && <Loader2 className="w-8 h-8 animate-spin text-marvel-red" />}
                        {!loading && news.map((item, idx) => (
                            <a key={item.id || idx} href="#" className="flex gap-6 group items-center border-b border-white/10 pb-6 marvel-hover-line">
                                <div className="w-32 h-24 flex-shrink-0 bg-gray-900 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-marvel-red opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-sans group-hover:text-marvel-red transition-colors line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 font-mono uppercase">{new Date(item.publishedAt).toLocaleDateString()}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* FEATURED VIDEO */}
                <div className="flex-1">
                    <h2 className="text-5xl font-marvel uppercase tracking-widest text-white mb-8">Featured Trailer</h2>
                    {loading && <div className="h-64 flex items-center justify-center bg-[#111]"><Loader2 className="w-8 h-8 animate-spin text-marvel-red" /></div>}
                    {!loading && featuredVideo && (
                        <div className="w-full bg-[#111] p-6 border border-white/10 group cursor-pointer marvel-hover-line">
                            <div className="relative w-full aspect-video bg-black overflow-hidden mb-6">
                                <img src={featuredVideo.image} alt={featuredVideo.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500 scale-100 group-hover:scale-105" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform group-hover:text-marvel-red" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-marvel uppercase tracking-wide text-white group-hover:text-marvel-red transition-colors">{featuredVideo.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm line-clamp-2">{featuredVideo.description}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* COMICS SLIDER FALLBACK */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-4 lg:px-12 py-24 border-t border-white/10">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-6xl font-marvel uppercase tracking-widest text-white">Classic Archives</h2>
                    <Link to="/comics" className="text-marvel-red font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">View Timeline</Link>
                </div>
                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-8">
                    {loading && <Loader2 className="w-8 h-8 animate-spin text-marvel-red" />}
                    {!loading && comics.map((comic, idx) => (
                        <Link key={comic.id || idx} to="/comics" className="min-w-[280px] aspect-[2/3] bg-[#111] relative overflow-hidden group cursor-pointer border border-white/5 flex-shrink-0">
                            <img src={comic.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" alt="Comic cover" />
                            <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform">
                                <p className="text-marvel-red font-bold text-xs uppercase tracking-widest mb-1">Issue {comic.timelineIndex}</p>
                                <p className="text-white font-marvel tracking-wider text-2xl uppercase leading-none">{comic.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}
