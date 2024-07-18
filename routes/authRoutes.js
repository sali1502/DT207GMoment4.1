/* Routes för autentisering och auktorisering */

const express = require("express");
const router = express.Router();

// Registrera ny användare
router.post("/index", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning, skicka användarnamn och lösenord"});
        }

        // Kod för att lagra i databas

        // Korrekt - spara användare
        res.status(201).json({ message: "Användare skapad"});
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

// Logga in
router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning, skicka användarnamn och lösenord"});
        }
        // Kolla inmatningsvärden
        if(username === "Åsa" && password === "password") {
            res.status(200).json({message: "Login lyckades"});
        } else {
            res.status(401).json({ error: "Ogiltigt användarnamn/lösenord"});
        }
        
        // Kod för att lagra i databas

        // Korrekt - spara användare
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

module.exports = router;


