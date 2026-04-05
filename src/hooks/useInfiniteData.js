import { useState, useEffect, useCallback, useRef } from 'react';

export function useInfiniteData(endpoint) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const observer = useRef();

    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        const offset = (page - 1) * 10;

        let fetchPromise;
        if (endpoint === 'characters') {
            import('../services/marvelService').then(({ fetchMarvelCharacters }) => {
                fetchPromise = fetchMarvelCharacters(10, offset);
                executeFetch(fetchPromise);
            });
        } else if (endpoint === 'comics') {
            import('../services/marvelService').then(({ fetchMarvelComics }) => {
                fetchPromise = fetchMarvelComics(10, offset);
                executeFetch(fetchPromise);
            });
        } else {
            // standard fallback for things that only exist in local DB (movies)
            fetchPromise = fetch(`http://localhost:5000/api/${endpoint}?page=${page}&limit=10`)
                .then(res => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                }).then(res => res.data); // mock mapping to generic array
            executeFetch(fetchPromise);
        }

        function executeFetch(promise) {
            promise.then(resData => {
                if (!isMounted) return;
                // resData is usually an array from our services. If it's pure data:
                const items = Array.isArray(resData) ? resData : [];
                setData(prev => {
                    // avoid duplicates by checking ID
                    const existingIds = new Set(prev.map(p => p.id || p._id));
                    const newItems = items.filter(item => !existingIds.has(item.id || item._id));
                    return [...prev, ...newItems];
                });

                // If it returns less than what we asked for, it's done. 
                // We ask for 10. If it returns < 10, no more.
                setHasMore(items.length === 10);
                setLoading(false);
            }).catch(err => {
                if (!isMounted) return;
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
        }

        return () => { isMounted = false; };
    }, [page, endpoint]);

    return { data, loading, hasMore, lastElementRef, error };
}
