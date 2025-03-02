require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message required" });

        const response = await axios.post("https://api.example.com/chat", 
            { message }, 
            { headers: { Authorization: `Bearer ${process.env.API_KEY}` } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "API request failed", details: error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
