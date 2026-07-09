const express = require("express");
const router = express.Router();

const Purchase = require("../models/Purchase");


router.get("/:token", async (req,res)=>{

    try{

        const purchase = await Purchase.findOne({
            downloadToken:req.params.token,
            status:"paid"
        }).populate("beats");


        if(!purchase){

            return res.status(404).send(
                "Download link invalid or payment not completed."
            );

        }


        const downloads = purchase.beats.map(beat=>({

            title:beat.title,

            url:beat.fullUrl

        }));


        res.json({
            downloads
        });


    }catch(error){

        res.status(500).json({

            message:"Download error",

            error:error.message

        });

    }

});


module.exports = router;