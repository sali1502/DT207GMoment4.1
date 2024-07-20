const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema för användare
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hasha lösenord
userSchema.pre("save", async function(next) {
try {
    if(this.isNew || this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
} catch(error) {
    next(error);
}
});


