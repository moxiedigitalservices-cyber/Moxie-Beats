const express = require("express");
const router = express.Router();

const Beat = require("../models/Beat");

// GET all beats (or featured only)
router.get("/", async (req, res) => {
    try {
        const filter = req.query.featured === "true"
            ? { isFeatured: true }
            : {};

        const beats = await Beat.find(filter);

        res.json(beats);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET single beat
router.get("/:id", async (req, res) => {
    try {
        const beat = await Beat.findById(req.params.id);

        if (!beat) {
            return res.status(404).json({ message: "Beat not found" });
        }

        res.json(beat);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;