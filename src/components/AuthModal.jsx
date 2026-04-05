import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
    // steps: 'promo', 'login', 'signup', 'success'
    const [step, setStep] = useState('promo');
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', birthdate: '', marketingConsent: false
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Reset step when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('promo');
            setErrorMsg('');
            setSuccessMsg('');
        }
    }, [isOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            setSuccessMsg('Welcome back!');
            setTimeout(onClose, 1500);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            setSuccessMsg('Account created successfully!');
            setTimeout(onClose, 1500);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="auth-overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            >
                {/* Background Layer: Comic Collage + Dark Blue Blur Overlay */}
                <div
                    className="absolute inset-0 bg-[#0a1f44]/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <img
                        src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1920&auto=format&fit=crop"
                        alt="Comic Collage"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
                    />
                </div>

                {/* MODAL CONTAINER */}
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full max-w-md w-full"
                >
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 text-white hover:text-marvel-red transition-colors z-50 p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* PROMO STEP */}
                    {step === 'promo' && (
                        <div className="bg-black border-t-4 border-marvel-red p-10 flex flex-col items-center text-center shadow-2xl overflow-hidden relative">
                            {/* Marvel + Unlimited pseudo logos */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                <span className="font-marvel text-9xl">MU</span>
                            </div>

                            <div className="flex gap-4 items-center mb-8">
                                <div className="bg-[#e62429] text-white font-marvel px-4 py-1 text-3xl tracking-widest font-bold">
                                    MARVEL
                                </div>
                                <span className="font-marvel text-white text-3xl font-bold tracking-widest">+</span>
                            </div>

                            <h2 className="text-white font-marvel text-5xl uppercase tracking-widest leading-none mb-6">
                                Enhance Your Marvel Experience
                            </h2>

                            <ul className="text-white/80 font-sans text-left space-y-4 mb-10 w-full pl-4 border-l-2 border-marvel-red/50">
                                <li className="flex items-center gap-3 text-lg">
                                    <span className="w-2 h-2 bg-marvel-red rounded-full flex-shrink-0"></span>
                                    Unlock Digital Comics Access
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <span className="w-2 h-2 bg-marvel-red rounded-full flex-shrink-0"></span>
                                    Exclusive News & Updates
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <span className="w-2 h-2 bg-marvel-red rounded-full flex-shrink-0"></span>
                                    Personalized Hero Tracking
                                </li>
                            </ul>

                            <button
                                onClick={() => setStep('signup')}
                                className="w-full bg-[#e62429] text-white font-sans font-bold py-4 text-center hover:bg-[#c01f22] transition-colors relative overflow-hidden group clip-angled"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 60%, 90% 100%, 0 100%, 0 40%)' }}
                            >
                                <span className="relative z-10 tracking-widest uppercase">Create Account</span>
                            </button>

                            <p className="text-white/60 font-sans mt-6 text-sm">
                                Already have an account?{' '}
                                <button onClick={() => setStep('login')} className="text-white border-b border-transparent hover:border-marvel-red transition-colors ml-1 font-bold font-sans hover:text-[#e62429]">
                                    Log In
                                </button>
                            </p>
                        </div>
                    )}

                    {/* LOGIN STEP - Disney Style White Card */}
                    {step === 'login' && (
                        <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 relative">
                            <div className="flex justify-center mb-8">
                                <div className="bg-[#e62429] text-white font-marvel px-4 py-1 text-4xl font-bold tracking-widest">
                                    MARVEL
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-black font-sans font-bold text-2xl mb-2">Enter your email</h2>
                                <p className="text-gray-500 font-sans text-sm">Log in to your Marvel account to continue.</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleLogin}>
                                {errorMsg && <p className="text-[#e62429] text-sm font-bold text-center bg-[#e62429]/10 py-2">{errorMsg}</p>}
                                {successMsg && <p className="text-green-600 text-sm font-bold text-center bg-green-50 py-2">{successMsg}</p>}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="w-full bg-gray-100 text-black font-sans px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all shadow-inner placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="w-full bg-gray-100 text-black font-sans px-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all shadow-inner placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#e62429] text-white font-sans font-bold py-4 rounded-full hover:bg-[#c01f22] transition-colors tracking-wide text-lg disabled:opacity-50"
                                >
                                    {loading ? 'Authenticating...' : 'Continue'}
                                </button>
                            </form>

                            <div className="mt-8 text-center border-t border-gray-200 pt-6">
                                <p className="text-gray-400 text-xs font-sans leading-relaxed">
                                    Marvel is part of The Walt Disney Family of Companies.
                                    <br /><br />
                                    <button onClick={() => setStep('signup')} className="text-[#0a1f44] font-bold hover:underline">
                                        Need an account? Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* SIGNUP STEP - Disney Style White Card */}
                    {step === 'signup' && (
                        <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 sm:p-12 relative">
                            <div className="flex justify-center mb-8">
                                <div className="bg-[#e62429] text-white font-marvel px-4 py-1 text-4xl font-bold tracking-widest">
                                    MARVEL
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-black font-sans font-bold text-2xl mb-2">Create Account</h2>
                                <p className="text-gray-500 font-sans text-sm">Join the Marvel Universe.</p>
                            </div>

                            <form className="space-y-4" onSubmit={handleRegister}>
                                {errorMsg && <p className="text-[#e62429] text-sm font-bold text-center bg-[#e62429]/10 py-2">{errorMsg}</p>}
                                {successMsg && <p className="text-green-600 text-sm font-bold text-center bg-green-50 py-2">{successMsg}</p>}
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="w-full bg-gray-100 text-black font-sans px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all placeholder-gray-400"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        className="w-full bg-gray-100 text-black font-sans px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full bg-gray-100 text-black font-sans px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all placeholder-gray-400"
                                    required
                                />

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="w-full bg-gray-100 text-black font-sans px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all placeholder-gray-400 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="pt-2">
                                    <p className="text-gray-500 text-xs font-sans mb-1 ml-1">Birthdate</p>
                                    <input
                                        type="date"
                                        name="birthdate"
                                        value={formData.birthdate}
                                        onChange={handleChange}
                                        className="w-full bg-gray-100 text-gray-500 font-sans px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a1f44]/20 transition-all"
                                        required
                                    />
                                </div>

                                <div className="pt-4 space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-start">
                                            <input
                                                type="checkbox"
                                                name="marketingConsent"
                                                checked={formData.marketingConsent}
                                                onChange={handleChange}
                                                className="w-5 h-5 border-2 border-gray-300 rounded text-[#e62429] focus:ring-[#e62429]/50 accent-[#e62429] mt-0.5 cursor-pointer"
                                            />
                                        </div>
                                        <span className="text-xs text-gray-600 font-sans leading-tight">
                                            Yes! I want to receive updates from Marvel and its affiliates.
                                        </span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-start">
                                            <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded text-[#e62429] focus:ring-[#e62429]/50 accent-[#e62429] mt-0.5 cursor-pointer" required />
                                        </div>
                                        <span className="text-xs text-gray-600 font-sans leading-tight">
                                            I agree to the Terms of Service and Privacy Policy.
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#e62429] text-white font-sans font-bold py-4 rounded-full hover:bg-[#c01f22] transition-colors tracking-wide text-lg mt-6 disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Account'}
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-500 text-sm font-sans tracking-tight">
                                    Already have an account?{' '}
                                    <button onClick={() => setStep('login')} className="text-[#0a1f44] font-bold hover:underline">
                                        Log in
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
