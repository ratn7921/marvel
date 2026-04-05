const BASE = 'https://www.googleapis.com/youtube/v3/search';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getMarvelVideos({ q = 'Marvel trailer OR Avengers OR MCU', maxResults = 8 } = {}) {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!key) {
    console.warn('VITE_YOUTUBE_API_KEY not set — returning fallback videos');
    return fallbackVideos();
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q,
    type: 'video',
    maxResults: String(maxResults),
    key
  });

  try {
    const data = await fetchJson(`${BASE}?${params.toString()}`);
    if (!data.items) return fallbackVideos();

    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
      channel: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description
    }));
  } catch (err) {
    console.error('getMarvelVideos error', err);
    return fallbackVideos();
  }
}

// Backwards-compatible helper used by older code (featured single video)
export async function fetchYoutubeFeatured() {
  const videos = await getMarvelVideos({ maxResults: 1 });
  return videos && videos.length ? videos[0] : null;
}

function fallbackVideos() {
  return [
    { id: 'TcMBFSGVi1c', title: 'Avengers: Endgame — Trailer', thumbnail: 'https://i.ytimg.com/vi/TcMBFSGVi1c/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2019-03-14T00:00:00Z', description: 'Theatrical trailer for Avengers: Endgame' },
    { id: 'ie3KXcGvJ2s', title: 'Spider-Man: No Way Home — Trailer', thumbnail: 'https://i.ytimg.com/vi/ie3KXcGvJ2s/hqdefault.jpg', channel: 'Sony Pictures', publishedAt: '2021-08-23T00:00:00Z', description: '' },
    { id: 'TkV7Gg8U3ek', title: 'Doctor Strange Multiverse of Madness — Trailer', thumbnail: 'https://i.ytimg.com/vi/TkV7Gg8U3ek/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2022-01-24T00:00:00Z', description: '' },
    { id: 'sX2K6gG6wFU', title: 'Guardians of the Galaxy Vol. 3 — Trailer', thumbnail: 'https://i.ytimg.com/vi/sX2K6gG6wFU/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2023-03-22T00:00:00Z', description: '' },
    { id: 'E2m3cMGY3Wk', title: 'Black Panther: Wakanda Forever — Trailer', thumbnail: 'https://i.ytimg.com/vi/E2m3cMGY3Wk/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2022-07-21T00:00:00Z', description: '' },
    { id: 'q2H7uEJ8vTg', title: 'Shang-Chi — Trailer', thumbnail: 'https://i.ytimg.com/vi/q2H7uEJ8vTg/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2021-05-24T00:00:00Z', description: '' },
    { id: 'X2m-1f2-4kQ', title: 'Ant-Man and the Wasp — Trailer', thumbnail: 'https://i.ytimg.com/vi/X2m-1f2-4kQ/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2018-06-25T00:00:00Z', description: '' },
    { id: 'k8V4JQ4lKzs', title: 'Thor Ragnarok — Trailer', thumbnail: 'https://i.ytimg.com/vi/k8V4JQ4lKzs/hqdefault.jpg', channel: 'Marvel Entertainment', publishedAt: '2017-06-14T00:00:00Z', description: '' }
  ];
}

export default { getMarvelVideos, fetchYoutubeFeatured };
