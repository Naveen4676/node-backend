require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5001; // Use dynamic port to avoid conflicts

app.use(express.json());
app.use(cors());
app.use(compression());

// Quick response middleware
app.use((req, res, next) => {
    res.setHeader('X-Response-Time', `${Date.now()}ms`);
    next();
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await axios.post('https://api.example.com/chat', { message }, {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: '❌ API request failed!', details: error.response?.data || error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));