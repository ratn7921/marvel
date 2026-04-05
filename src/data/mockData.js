import { charactersData } from './characters';
import { comicsData as rawComics } from './comics';
import { moviesData } from './movies';

// Flatten comicsData if it's categorized by decade in the UI, else just provide the flat list
const flatComics = [];
Object.keys(rawComics).forEach(decade => {
    flatComics.push(...rawComics[decade]);
});

export const mockCharacters = charactersData;
export const mockComics = flatComics;
export const mockMovies = moviesData;
