require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ✅ Removed exposed key

if (!GEMINI_API_KEY) {
    console.error("❌ Missing GEMINI_API_KEY in .env file!");
    process.exit(1);
}

app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: message }] }] }
        );

        const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't understand that.";

        res.json({ reply: botReply });

    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.response?.data || error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
