import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Comic, Character, Movie, User } from './models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marvel';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Generic paginated response handler
const getPaginatedData = async (Model, req, res, sortField = 'timelineIndex') => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const items = await Model.find()
            .sort({ [sortField]: 1 })
            .skip(skip)
            .limit(limit);

        const total = await Model.countDocuments();
        const hasMore = skip + items.length < total;

        res.json({
            data: items,
            pagination: {
                total,
                page,
                limit,
                hasMore
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching data' });
    }
};

app.get('/api/comics', (req, res) => getPaginatedData(Comic, req, res, 'year'));
app.get('/api/characters', (req, res) => getPaginatedData(Character, req, res, 'name'));
app.get('/api/movies', (req, res) => getPaginatedData(Movie, req, res, 'year'));

// AUTH ROUTES
app.post('/api/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthdate, marketingConsent } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthdate,
            marketingConsent
        });

        await newUser.save();

        // Return success (excluding password)
        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, email: newUser.email, firstName: newUser.firstName } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Return user data
        res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email, firstName: user.firstName } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
