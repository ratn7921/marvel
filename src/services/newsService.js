import { fallbackData } from '../data/fallback';

export const fetchMarvelNews = async () => {
    try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        if (!apiKey || apiKey === 'your_news_api_key_here') throw new Error('No valid News API key');

        // NewsAPI requires queries
        const query = 'Marvel Cinematic Universe OR Marvel Comics';
        const res = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=4&apiKey=${apiKey}`);
        if (!res.ok) throw new Error('News API request failed');

        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
            return data.articles.map((article, idx) => ({
                id: `news_${idx}`,
                title: article.title,
                description: article.description,
                image: article.urlToImage || 'https://picsum.photos/seed/marvelnews/1200/600',
                publishedAt: article.publishedAt
            }));
        }

        throw new Error('No news articles found');
    } catch (error) {
        console.warn('newsService failed, using fallback data:', error.message);
        return fallbackData.news;
    }
};
