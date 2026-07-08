const express = require("express");
const router = express.Router();

const Beat = require("../models/Beat");
const paynow = require("../config/paynow");

router.post("/checkout", async (req, res) => {
    try {
        const { beatId } = req.body;

        const beat = await Beat.findById(beatId);

        if (!beat) {
            return res.status(404).json({ message: "Beat not found" });
        }

        const payment = paynow.createPayment(
            `Beat Purchase - ${beat.title}`,
            "customer@email.com"
        );

        payment.add(beat.title, beat.price / 100);

        const response = await paynow.send(payment);

        if (response.success) {
            const url = response.redirectUrl;
            return res.json({ url });
        } else {
            return res.status(500).json({
                message: "Paynow payment failed"
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: "Checkout error",
            error: error.message
        });
    }
});

module.exports = router;