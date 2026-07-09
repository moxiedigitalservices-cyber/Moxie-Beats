const express = require("express");
const router = express.Router();

const Purchase = require("../models/Purchase");
const paynow = require("../config/paynow");
const sendDownloadEmail = require("../config/email");

router.get("/result", async (req, res) => {

    try {

        const pollUrl = req.query.pollurl;

        if (!pollUrl) {
            return res.status(400).send("Missing payment reference");
        }

        const status = await paynow.pollTransaction(pollUrl);

        if (
            status.status &&
            status.status.toLowerCase() === "paid"
        ) {

            const purchase = await Purchase.findOne({
                paymentReference: pollUrl
            }).populate("beats");

            if (!purchase) {
                return res.status(404).send("Purchase not found");
            }

            // Only process the purchase once
            if (purchase.status !== "paid") {

                purchase.status = "paid";
                await purchase.save();

                const downloadUrl =
`${process.env.FRONTEND_URL}/download.html?token=${purchase.downloadToken}`;

                const emailSent = await sendDownloadEmail(
                    purchase.customerEmail,
                    downloadUrl,
                    purchase.beats
                );

                if (emailSent) {
                    console.log(
                        `✅ Download email sent to ${purchase.customerEmail}`
                    );
                } else {
                    console.error(
                        `❌ Failed to send email to ${purchase.customerEmail}`
                    );
                }

                console.log(
                    `✅ Purchase ${purchase._id} completed successfully`
                );

            }

        }

        return res.send("OK");

    } catch (error) {

        console.error("Paynow callback error:", error);

        return res.status(500).send("Error");

    }

});

module.exports = router;