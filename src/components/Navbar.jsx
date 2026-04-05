import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-40 bg-marvel-dark/95 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-[1600px] mx-auto px-4 lg:px-12 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-[#e62429] text-white font-marvel px-4 py-1 text-2xl font-bold tracking-wider transform transition-transform">
                                MARVEL
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-6 font-marvel text-lg tracking-wide border-l border-white/10 pl-8">
                            <Link to="/comics" className="hover:text-marvel-red transition-colors uppercase">Comics</Link>
                            <Link to="/characters" className="hover:text-marvel-red transition-colors uppercase">Characters</Link>
                            <Link to="/movies" className="hover:text-marvel-red transition-colors uppercase">Movies</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 font-sans text-xs uppercase tracking-widest font-bold">
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                Log In
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                Join
                            </button>
                        </div>

                        <button className="md:hidden text-white">
                            <Shield className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
