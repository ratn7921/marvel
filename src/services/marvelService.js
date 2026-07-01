import { fallbackData } from '../data/fallback';

// Normalize Marvel API response to our unified structure
const normalizeMarvelData = (data, type) => {
    return data.map(item => ({
        id: item.id.toString(),
        name: type === 'character' ? item.name : undefined,
        title: type === 'comic' ? item.title : undefined,
        description: item.description || `No standard description found in archived records for this ${type}.`,
        image: item.thumbnail ? `${item.thumbnail.path}.${item.thumbnail.extension}` : `https://picsum.photos/seed/${item.id}/800/1200`,
        timelineIndex: item.id,
        category: type === 'character' ? 'API CHARACTER' : 'API COMIC'
    }));
};

export const fetchMarvelCharacters = async (limit = 20, offset = 0) => {
    try {
        const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
        if (!apiKey || apiKey === 'your_marvel_api_key_here') throw new Error('No valid API key');

        // Note: Real Marvel API requires md5 hash of ts+privKey+pubKey. For this mock architecture without private key exposure, we fall back if it fails.
        const res = await fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&limit=${limit}&offset=${offset}`);
        if (!res.ok) throw new Error('API format failure or Auth reject');

        const data = await res.json();
        return normalizeMarvelData(data.data.results, 'character');
    } catch (error) {
        console.warn('marvelService fetchMarvelCharacters failed, using fallback database:', error.message);
        // Fallback to local API (MongoDB) or static fallback JSON
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
            const fallbackRes = await fetch(`${API_BASE_URL}/api/characters?page=${Math.floor(offset / limit) + 1}&limit=${limit}`);
            if (fallbackRes.ok) {
                const md = await fallbackRes.json();
                return md.data.map(m => ({ ...m, id: m._id }));
            }
        } catch (e) {
            return fallbackData.characters;
        }
        return fallbackData.characters;
    }
};

export const fetchMarvelComics = async (limit = 20, offset = 0) => {
    try {
        const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
        if (!apiKey || apiKey === 'your_marvel_api_key_here') throw new Error('No valid API key');

        const res = await fetch(`https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&limit=${limit}&offset=${offset}`);
        if (!res.ok) throw new Error('API format failure or Auth reject');

        const data = await res.json();
        return normalizeMarvelData(data.data.results, 'comic');
    } catch (error) {
        console.warn('marvelService fetchMarvelComics failed, using fallback database:', error.message);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
            const fallbackRes = await fetch(`${API_BASE_URL}/api/comics?page=${Math.floor(offset / limit) + 1}&limit=${limit}`);
            if (fallbackRes.ok) {
                const md = await fallbackRes.json();
                return md.data.map(m => ({ ...m, id: m._id }));
            }
        } catch (e) {
            return fallbackData.comics;
        }
        return fallbackData.comics;
    }
};
