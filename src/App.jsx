import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ComicTimeline from './pages/ComicTimeline';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-marvel-dark text-white relative">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <h1 className="text-[20vw] font-marvel font-bold text-white/5 tracking-tighter mix-blend-overlay">
          MARVEL
        </h1>
        <div className="absolute inset-0 bg-halftone"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-marvel-red/10 via-transparent to-black/80"></div>
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/comics" element={<ComicTimeline />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character-detail/:id" element={<CharacterDetail />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie-detail/:id" element={<MovieDetail />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
