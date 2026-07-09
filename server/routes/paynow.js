const express = require("express");
const router = express.Router();

const Purchase = require("../models/Purchase");
const paynow = require("../config/paynow");
const sendDownloadEmail = require("../config/email");


router.get("/result", async (req, res) => {

    try {

        console.log(
            "💰 Paynow callback received:",
            req.query
        );


        const pollUrl = req.query.pollurl;


        if(!pollUrl){

            return res.status(400).send(
                "Missing payment reference"
            );

        }


        const status =
            await paynow.pollTransaction(pollUrl);



        if(status.paid){

            const purchase =
    await Purchase.findOne({
        paymentReference: pollUrl
    })
    .populate("beats");



    if(purchase && purchase.status !== "paid"){

        purchase.status = "paid";
                
                    await purchase.save();
                
                
                    const downloadUrl =
`${process.env.FRONTEND_URL}/download.html?token=${purchase.downloadToken}`;
                
                
                    await sendDownloadEmail(
                        purchase.customerEmail,
                        downloadUrl,
                        purchase.beats
                    );
                
                
                    console.log(
                        "✅ Purchase completed:",
                        purchase._id
                    );
                
                }

        }


        res.send("OK");


    } catch(error){

        console.error(
            "Paynow callback error:",
            error
        );


        res.status(500).send(
            "Error"
        );

    }

});


module.exports = router;