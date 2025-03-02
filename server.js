require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());
app.use(compression());

// Quick response middleware
app.use((req, res, next) => {
    res.setHeader('X-Response-Time', `${Date.now()}ms`);
    next();
});

// Simple test route
app.get('/', (req, res) => {
    res.send('🚀 AI Chatbot Backend is Running!');
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Fake AI Response (Replace with real API call if needed)
        res.json({ reply: `🤖 AI: You said - "${message}"` });

    } catch (error) {
        res.status(500).json({ error: '❌ API request failed!', details: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
