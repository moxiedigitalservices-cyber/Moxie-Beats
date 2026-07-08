const express = require("express");
const router = express.Router();

const Purchase = require("../models/Purchase");
const paynow = require("../config/paynow");


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
                });



            if(purchase){

                purchase.status = "paid";

                await purchase.save();


                console.log(
                    "✅ Purchase marked as paid:",
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