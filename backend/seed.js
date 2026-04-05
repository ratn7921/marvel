import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Comic, Character, Movie } from './models.js';

dotenv.config();

const baseComics = [
    { "year": 1939, "title": "Marvel Comics #1", "creator": "Timely Comics", "importance": "First Marvel publication" },
    { "year": 1940, "title": "Human Torch #1", "importance": "Golden Age hero" },
    { "year": 1941, "title": "Captain America Comics #1", "importance": "Captain America debut" },
    { "year": 1943, "title": "All Winners Comics #1", "importance": "First Marvel team-up" },
    { "year": 1961, "title": "Fantastic Four #1", "importance": "Start of Marvel Age" },
    { "year": 1962, "title": "Amazing Fantasy #15", "importance": "Spider-Man debut" },
    { "year": 1962, "title": "Journey Into Mystery #83", "importance": "Thor debut" },
    { "year": 1962, "title": "Hulk #1", "importance": "Hulk debut" },
    { "year": 1963, "title": "X-Men #1", "importance": "Mutants introduced" },
    { "year": 1963, "title": "Avengers #1", "importance": "Avengers formed" },
    { "year": 1963, "title": "Tales of Suspense #39", "importance": "Iron Man debut" },
    { "year": 1964, "title": "Daredevil #1", "importance": "Daredevil debut" },
    { "year": 1966, "title": "Black Panther #1", "importance": "First Black superhero" },
    { "year": 1972, "title": "Hero for Hire #1", "importance": "Luke Cage debut" },
    { "year": 1973, "title": "Ghost Rider #1", "importance": "Supernatural hero" },
    { "year": 1974, "title": "Iron Fist #1", "importance": "Martial arts hero" },
    { "year": 1975, "title": "Giant-Size X-Men #1", "importance": "New X-Men" },
    { "year": 1977, "title": "Ms. Marvel #1", "importance": "Carol Danvers rise" },
    { "year": 1982, "title": "Wolverine #1", "importance": "Wolverine solo" },
    { "year": 1984, "title": "Secret Wars #1", "importance": "First mega crossover" },
    { "year": 1986, "title": "Daredevil: Born Again", "importance": "Dark storytelling" },
    { "year": 1988, "title": "Venom debut", "importance": "Anti-hero rise" },
    { "year": 1991, "title": "Infinity Gauntlet", "importance": "Thanos storyline" },
    { "year": 1992, "title": "X-Men #1 (Jim Lee)", "importance": "Best-selling comic" },
    { "year": 1999, "title": "Marvel Knights", "importance": "Modern tone shift" },
    { "year": 2001, "title": "Ultimate Spider-Man #1", "importance": "Modern reboot" },
    { "year": 2006, "title": "Civil War", "importance": "Hero conflict" },
    { "year": 2008, "title": "Secret Invasion", "importance": "Skrull invasion" },
    { "year": 2012, "title": "Avengers vs X-Men", "importance": "Major clash" },
    { "year": 2015, "title": "Secret Wars (2015)", "importance": "Multiverse reset" },
    { "year": 2018, "title": "Infinity Wars", "importance": "Infinity saga expansion" },
    { "year": 2021, "title": "King in Black", "importance": "Symbiote war" },
    { "year": 2023, "title": "Ultimate Invasion", "importance": "Universe reboot" },
    { "year": 2025, "title": "Avengers Reassembled", "importance": "Future arc" }
];

const baseCharacters = [
    { "name": "Iron Man", "real": "Tony Stark", "movies": 10, "power": "Armor Tech" },
    { "name": "Captain America", "real": "Steve Rogers", "movies": 9, "power": "Super Soldier Serum" },
    { "name": "Thor", "real": "Thor Odinson", "movies": 8, "power": "God of Thunder" },
    { "name": "Hulk", "real": "Bruce Banner", "movies": 7, "power": "Gamma Radiation" },
    { "name": "Spider-Man", "real": "Peter Parker", "movies": 10, "power": "Spider Abilities" },
    { "name": "Black Widow", "movies": 8, "power": "Master Assassin" },
    { "name": "Hawkeye", "movies": 6, "power": "Master Marksman" },
    { "name": "Doctor Strange", "movies": 5, "power": "Mystic Arts" },
    { "name": "Scarlet Witch", "movies": 6, "power": "Chaos Magic" },
    { "name": "Vision", "movies": 4, "power": "Synthetic Android" },
    { "name": "Black Panther", "movies": 5, "power": "Vibranium Suit" },
    { "name": "Shuri", "movies": 3, "power": "Genius Intellect" },
    { "name": "Okoye", "movies": 3, "power": "Dora Milaje Combat" },
    { "name": "Ant-Man", "movies": 4, "power": "Size Alteration" },
    { "name": "Wasp", "movies": 3, "power": "Bio-Electric Blasts" },
    { "name": "Captain Marvel", "movies": 3, "power": "Cosmic Energy" },
    { "name": "Ms Marvel", "movies": 1, "power": "Hard Light Constructs" },
    { "name": "Falcon", "movies": 5, "power": "EXO-7 Suit" },
    { "name": "Winter Soldier", "movies": 5, "power": "Cybernetic Arm" },
    { "name": "Loki", "movies": 6, "power": "Illusion Magic" },
    { "name": "Thanos", "movies": 4, "power": "Titan Strength" },
    { "name": "Ultron", "movies": 1, "power": "Artificial Intelligence" },
    { "name": "Kang", "movies": 2, "power": "Time Travel Tech" },
    { "name": "Wolverine", "movies": 9, "power": "Healing Factor" },
    { "name": "Deadpool", "movies": 3, "power": "Regeneration" },
    { "name": "Professor X", "movies": 7, "power": "Telepathy" },
    { "name": "Magneto", "movies": 7, "power": "Magnetokinesis" },
    { "name": "Cyclops", "movies": 5, "power": "Optic Blasts" },
    { "name": "Storm", "movies": 5, "power": "Weather Control" },
    { "name": "Daredevil", "movies": 2, "power": "Radar Sense" },
    { "name": "Punisher", "movies": 2, "power": "Tactical Mastery" },
    { "name": "Blade", "movies": 3, "power": "Vampire Hunter" },
    { "name": "Moon Knight", "movies": 1, "power": "Lunar Strength" }
];

const baseMovies = [
    { "title": "Iron Man", "year": 2008, "rating": 7.9 },
    { "title": "Incredible Hulk", "year": 2008, "rating": 6.6 },
    { "title": "Iron Man 2", "year": 2010, "rating": 6.9 },
    { "title": "Thor", "year": 2011, "rating": 7.0 },
    { "title": "Captain America First Avenger", "year": 2011, "rating": 6.9 },
    { "title": "Avengers", "year": 2012, "rating": 8.0 },
    { "title": "Iron Man 3", "year": 2013, "rating": 7.1 },
    { "title": "Thor Dark World", "year": 2013, "rating": 6.8 },
    { "title": "Winter Soldier", "year": 2014, "rating": 7.8 },
    { "title": "Guardians of Galaxy", "year": 2014, "rating": 8.0 },
    { "title": "Age of Ultron", "year": 2015, "rating": 7.3 },
    { "title": "Ant-Man", "year": 2015, "rating": 7.3 },
    { "title": "Civil War", "year": 2016, "rating": 7.8 },
    { "title": "Doctor Strange", "year": 2016, "rating": 7.5 },
    { "title": "Spider-Man Homecoming", "year": 2017, "rating": 7.4 },
    { "title": "Thor Ragnarok", "year": 2017, "rating": 7.9 },
    { "title": "Black Panther", "year": 2018, "rating": 7.3 },
    { "title": "Infinity War", "year": 2018, "rating": 8.4 },
    { "title": "Captain Marvel", "year": 2019, "rating": 6.8 },
    { "title": "Endgame", "year": 2019, "rating": 8.4 },
    { "title": "Far From Home", "year": 2019, "rating": 7.4 },
    { "title": "Black Widow", "year": 2021, "rating": 6.7 },
    { "title": "Shang-Chi", "year": 2021, "rating": 7.4 },
    { "title": "Eternals", "year": 2021, "rating": 6.3 },
    { "title": "No Way Home", "year": 2021, "rating": 8.2 },
    { "title": "Doctor Strange 2", "year": 2022, "rating": 6.9 },
    { "title": "Thor Love Thunder", "year": 2022, "rating": 6.2 },
    { "title": "Black Panther 2", "year": 2022, "rating": 6.7 },
    { "title": "Quantumania", "year": 2023, "rating": 6.1 },
    { "title": "Guardians Vol 3", "year": 2023, "rating": 7.9 },
    { "title": "The Marvels", "year": 2023, "rating": 5.7 },
    { "title": "Deadpool Wolverine", "year": 2024, "rating": 8.0 },
    { "title": "Captain America Brave New World", "year": 2025, "rating": null },
    { "title": "Fantastic Four", "year": 2025, "rating": null },
    { "title": "Avengers Secret Wars", "year": 2026, "rating": null }
];

// Utility to generate expanded items
const expandDataset = (base, count, type) => {
    const expanded = [...base];
    let i = 0;
    while (expanded.length < count) {
        const item = { ...base[i % base.length] };
        if (type === 'comic') {
            item.title = `${item.title} Variant #${Math.floor(Math.random() * 100)}`;
            item.year = item.year + Math.floor(Math.random() * 5);
            item.importance = `${item.importance} (Variant Edition)`;
        } else if (type === 'character') {
            item.name = `${item.name} of Earth-${Math.floor(Math.random() * 1000)}`;
        } else if (type === 'movie') {
            item.title = `${item.title}: Director's Cut ${Math.floor(Math.random() * 10)}`;
        }

        // Add required new fields
        item.description = `Detailed description and extensive lore about ${item.title || item.name}, fully fleshed out for the cinematic database.`;
        item.imagePrompt = `Cinematic 8k resolution render of ${item.title || item.name}, highly detailed, dramatic lighting --ar 16:9 --v 6.0`;
        item.category = type;
        item.timelineIndex = expanded.length + 1;

        expanded.push(item);
        i++;
    }

    // Also add fields to base items correctly
    return expanded.map((item, index) => ({
        ...item,
        description: item.description || `Detailed description and extensive lore about ${item.title || item.name}, fully fleshed out for the cinematic database.`,
        imagePrompt: item.imagePrompt || `Cinematic 8k resolution render of ${item.title || item.name}, highly detailed, dramatic lighting --ar 16:9 --v 6.0`,
        category: type,
        timelineIndex: index + 1
    }));
};

const seedDatabase = async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marvel';
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB, clearing old data...');

        await Comic.deleteMany({});
        await Character.deleteMany({});
        await Movie.deleteMany({});

        console.log('🌱 Seeding database...');

        const comics = expandDataset(baseComics, 200, 'comic');
        const characters = expandDataset(baseCharacters, 100, 'character');
        const movies = expandDataset(baseMovies, 80, 'movie');

        await Comic.insertMany(comics);
        await Character.insertMany(characters);
        await Movie.insertMany(movies);

        console.log(`✅ Seeded ${comics.length} comics, ${characters.length} characters, ${movies.length} movies.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
