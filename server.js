require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;  // Set this in your `.env` file

app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
           `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro-vision-latest:generateContent?key=${GEMINI_API_KEY}`,  // Replace with correct API URL
            {
                model: "models/gemini-1.0-pro-vision-latest",
                messages: [{ role: "user", content: message }],
            },
            { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ reply: "Error communicating with AI model." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
