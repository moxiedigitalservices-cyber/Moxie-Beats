const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.use("/api/beats", require("./routes/beats"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/cart", require("./routes/checkout"));
app.use("/api/paynow", require("./routes/paynow"));

// Test Route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Beat Store API is running!"
    });
});

// Frontend fallback
app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

module.exports = app;