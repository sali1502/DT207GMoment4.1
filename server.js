/* Moment 4, DT207G Backend-baserad webbutveckling, Åsa Lindskog sali1502@student.miun.se */

/* Applikation för registrering och inloggning */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);

// Starta applikation
app.listen(port, () => {
    console.log(`Servern är startad på http://localhost:${port}`);
})
