const express = require("express");
const router = express.Router();

const Beat = require("../models/Beat");

// CREATE a new beat (temporary admin endpoint)
router.post("/beats", async (req, res) => {
    try {
        const {
            title,
            artist,
            price,
            previewUrl,
            fullUrl,
            isFeatured
        } = req.body;

        const beat = await Beat.create({
            title,
            artist,
            price,
            previewUrl,
            fullUrl,
            isFeatured: isFeatured || false
        });

        res.status(201).json(beat);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create beat",
            error: error.message
        });
    }
});

module.exports = router;