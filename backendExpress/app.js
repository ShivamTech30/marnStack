global.SlowBuffer = global.Buffer;
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./src/db/conn");
const Register = require("./src/model/registor");
const bcrypt = require("bcryptjs");
const rolesModel = require("./src/model/rolesModel");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3003;

// Database connection verification middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        return res.status(503).json({
            success: false,
            error: "Database unavailable. Please check that MongoDB is running.",
            details: err.message
        });
    }
});

const routes = require("./src/routers/_routes");

app.get("/ping", (req, res) => res.send("pong"));
app.use("/", routes);

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }

        const normalizedEmail = String(email).toLowerCase().trim();
        const details = await Register.findOne({ email: normalizedEmail });
        if (!details) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, details.password);
        if (!match) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }

        const token = await details.generateAuthToken();
        const roles = Array.isArray(details.role) ? details.role[0] : (details.role || "USER");
        const permission = await rolesModel.findOne({ role: roles });

        const user = {
            _id: details._id,
            name: details.name,
            email: details.email,
            number: details.number,
            role: details.role,
        };

        return res.status(200).json({
            success: true,
            message: "Login successful",
            details: user,
            user,
            token,
            permission
        });
    } catch (e) {
        return res.status(500).json({ success: false, error: "Login failed: " + e.message });
    }
});

if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Backend server running on port ${port}`);
    });
}

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.code === 11000) {
        return res.status(400).json({ success: false, error: "User or Email already exists." });
    }
    res.status(err.status || 500).json({ success: false, error: err.message || "Internal Server Error" });
});

module.exports = app;
