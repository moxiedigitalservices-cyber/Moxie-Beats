const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

module.exports = app;