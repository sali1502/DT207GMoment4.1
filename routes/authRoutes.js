/* Routes för autentisering och auktorisering */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
            return res.status(400).json({ error: "Ange användarnamn och lösenord" });
        }

        // Korrekt - spara användare
        const User = new user({ username, password });
        await User.save();

        res.status(201).json({ message: "Användare skapad" });
    } catch (error) {
        res.status(500).json({ error: "Användarnamnet är upptaget, försök igen!" });
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Ange användarnamn och lösenord" });
        }

        // Finns användaren?
        const User = await user.findOne({ username });
        if (!User) {
            return res.status(401).json({ error: "Felaktigt användarnamn och/eller lösenord" });
        }

        // Kolla lösenord
        const isPasswordMatch = await User.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn och/eller lösenord" });
        } else {

            // Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '8h' });
            const response = {
                message: "Användare inloggad",
                token: token
            }
            res.status(500).json({ response });
        }

    } catch (error) {
        res.status(500).json({ error: "Ett serverfel uppstod, försök igen!" });
    }
});

// Hämta alla användare
router.get("/users", async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Server error" + error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router; 



