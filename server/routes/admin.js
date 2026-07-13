const protect = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const Beat = require("../models/Beat");
const Purchase = require("../models/Purchase");

// CREATE a new beat (temporary admin endpoint)
router.post(
    "/beats",
    protect,
    async (req,res)=>{
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

        console.error(
            "CREATE BEAT ERROR:",
            error
        );
    
    
        res.status(500).json({
    
            message: "Failed to create beat",
    
            error: error.message
    
        });
    
    }
});

// UPDATE BEAT
router.put(
    "/beats/:id",
    protect,
    async (req,res)=>{

    try {

        const beat = await Beat.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!beat) {

            return res.status(404).json({
                message: "Beat not found"
            });

        }

        res.json(beat);

    }

    catch (error) {

        console.error("UPDATE BEAT ERROR:", error);

        res.status(500).json({

            message: "Failed to update beat",

            error: error.message

        });

    }

});

// DELETE BEAT
router.delete(
    "/beats/:id",
    protect,
    async (req,res)=>{

    try{

        const beat = await Beat.findByIdAndDelete(
            req.params.id
        );

        if(!beat){

            return res.status(404).json({
                message:"Beat not found"
            });

        }

        res.json({

            success:true,

            message:"Beat deleted"

        });

    }

    catch(error){

        console.error(

            "DELETE BEAT ERROR:",

            error

        );

        res.status(500).json({

            message:"Failed to delete beat",

            error:error.message

        });

    }

});

// ==========================================
// GET ALL ORDERS
// ==========================================

router.get("/orders", async (req,res)=>{

    try{

        const orders = await Purchase.find()

        .populate("beats")

        .sort({

            createdAt:-1

        });


        res.json(orders);


    }
    catch(error){

        res.status(500).json({

            message:"Failed to fetch orders",

            error:error.message

        });

    }

});

// ==========================================
// DASHBOARD STATS
// ==========================================

router.get(
    "/dashboard",
    protect,
    async (req, res) => {

        try{

            const totalBeats =
            await Beat.countDocuments();

            const featuredBeats =
            await Beat.countDocuments({

                isFeatured:true

            });

            const totalOrders =
            await Purchase.countDocuments();

            const paidOrders =
            await Purchase.countDocuments({

                status:"paid"

            });

            const revenue =
            await Purchase.aggregate([

                {

                    $match:{

                        status:"paid"

                    }

                },

                {

                    $group:{

                        _id:null,

                        total:{

                            $sum:"$total"

                        }

                    }

                }

            ]);

            res.json({

                totalBeats,

                featuredBeats,

                totalOrders,

                paidOrders,

                revenue:

                revenue.length
                ? revenue[0].total
                : 0

            });

        }

        catch(error){

            console.error(error);

            res.status(500).json({

                message:"Dashboard failed"

            });

        }

    }
);

module.exports = router;