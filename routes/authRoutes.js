/* Routes för autentisering och auktorisering */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.error("Ett fel uppstod vid anslutning till databas");
});

// Modell för användare
const user = require("../models/user");

// Registrera ny användare
router.post("/index", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning, skicka användarnamn och lösenord" });
        }

        // Korrekt - spara användare
        const User = new user({ username, password });
        await User.save();

        res.status(201).json({ message: "Användare skapad" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning, skicka användarnamn och lösenord" });
        }

        // Kolla "credentials"
     
        // Finns användaren?
        const User = await user.findOne({ username });
        if (!User) {
            return res.status(401).json({ error: "Ogiltigt användarnamn/lösenord" });
        }

        // Kolla lösenord
        const isPasswordMatch = await User.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Ogiltigt användarnamn/lösenord" });
        } else {
            res.status(200).json({ message: "Användare inloggad!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;



