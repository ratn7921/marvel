import mongoose from 'mongoose';

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    importance: { type: String },
    creator: { type: String },
    description: { type: String },
    imagePrompt: { type: String },
    category: { type: String },
    timelineIndex: { type: Number }
});

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    real: { type: String },
    movies: { type: Number },
    power: { type: String },
    description: { type: String },
    imagePrompt: { type: String },
    category: { type: String },
    timelineIndex: { type: Number }
});

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number },
    description: { type: String },
    imagePrompt: { type: String },
    category: { type: String },
    timelineIndex: { type: Number }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    marketingConsent: { type: Boolean, default: false }
}, { timestamps: true });

export const Comic = mongoose.model('Comic', comicSchema);
export const Character = mongoose.model('Character', characterSchema);
export const Movie = mongoose.model('Movie', movieSchema);
export const User = mongoose.model('User', userSchema);
