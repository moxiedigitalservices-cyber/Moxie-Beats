const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/beats", require("./routes/beats"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/cart", require("./routes/checkout"));
app.use("/api/paynow", require("./routes/paynow"));
app.use("/api/download", require("./routes/download"));
const analyticsRoutes = require("./routes/analytics");
app.use("/api/analytics", analyticsRoutes);

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