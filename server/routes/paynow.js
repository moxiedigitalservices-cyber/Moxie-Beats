const express = require("express");
const router = express.Router();

// Paynow will call this after payment
router.get("/result", (req, res) => {
    console.log("💰 Paynow callback received:", req.query);

    res.send("Payment received");
});

module.exports = router;