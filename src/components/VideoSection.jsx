import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { getMarvelVideos } from '../services/youtubeService';

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMarvelVideos();
        if (!mounted) return;
        setVideos(data);
      } catch (err) {
        console.error('VideoSection error', err);
        if (mounted) setError('Unable to load Marvel videos.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6 bg-black text-white">Loading Marvel videos...</div>;
  if (error) return <div className="p-6 bg-black text-white">{error}</div>;

  return (
    <div className="bg-black text-white">
      <h2 className="text-5xl font-marvel uppercase tracking-widest text-white mb-8">Marvel Trailers & Clips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {videos.map(v => (
          <div key={v.id} className="relative group cursor-pointer overflow-hidden rounded-lg bg-[#0b0b0b]" onClick={() => setOpenId(v.id)}>
            <img src={v.thumbnail} alt={v.title} className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/40 w-full h-full opacity-0 group-hover:opacity-60 transition-opacity"></div>
              <Play className="w-14 h-14 text-white z-10 opacity-90 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold line-clamp-2">{v.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{v.channel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal player */}
      {openId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80" onClick={() => setOpenId(null)} />
          <div className="relative z-60 w-full max-w-4xl bg-transparent">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${openId}?autoplay=1&rel=0`}
                title="Marvel video player"
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button onClick={() => setOpenId(null)} className="mt-4 px-4 py-2 bg-white text-black font-bold rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
