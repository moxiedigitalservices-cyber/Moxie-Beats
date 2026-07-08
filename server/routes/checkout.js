const Purchase = require("../models/Purchase");
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const router = express.Router();

const Beat = require("../models/Beat");
const paynow = require("../config/paynow");


router.post("/checkout", async (req, res) => {

    try {

        const { beats, email } = req.body;
        


        if(!beats || beats.length === 0){

            return res.status(400).json({
                message:"Cart is empty"
            });

        }

        if(!email){

            return res.status(400).json({
                message:"Email required"
            });
        
        }


        const beatList = await Beat.find({
            _id:{
                $in: beats
            }
        });


        if(beatList.length === 0){

            return res.status(404).json({
                message:"No beats found"
            });

        }


        const payment = paynow.createPayment(
            "Moxxie Digital Beat Purchase",
            email
        );
        
        
        let total = 0;
        
        
        beatList.forEach(beat => {
        
            payment.add(
                beat.title,
                beat.price / 100
            );
        
            total += beat.price;
        
        });
        
        
        // Create pending purchase first
        
        const purchase = await Purchase.create({
        
            customerEmail:email,
        
            beats:beatList.map(beat=>beat._id),
        
            total,
        
            status:"pending",
        
            downloadToken:uuidv4()
        
        });
        
        
        // Now send payment to Paynow
        
        const response = await paynow.send(payment);
        
        
        if(response.success){
        
            purchase.paymentReference = response.pollUrl;
        
            await purchase.save();
        
        
            return res.json({
        
                url: response.redirectUrl
        
            });
        
        }


        if(response.success){

            return res.json({

                url: response.redirectUrl

            });

        }


        return res.status(500).json({

            message:"Paynow payment failed"

        });



    } catch(error){

        return res.status(500).json({

            message:"Checkout error",

            error:error.message

        });

    }

});


module.exports = router;