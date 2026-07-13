// ==========================================
// MOXXIE DIGITAL ANALYTICS API
// ==========================================


const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const Beat = require("../models/Beat");
const Purchase = require("../models/Purchase");



// ==========================================
// DASHBOARD OVERVIEW
// ==========================================

router.get(
    "/dashboard",
    protect,
    async (req, res) => {

        try {

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


            const pendingOrders =
            await Purchase.countDocuments({
                status:"pending"
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

            const recentOrders =
            await Purchase.find()
            
            .sort({
                createdAt:-1
            })
            
            .limit(5)
            
            .select(
                "customerEmail total paymentMethod status createdAt"
            );

            const topBeats =
            await Purchase.aggregate([
            
                {
                    $match:{
                        status:"paid"
                    }
                },
            
                {
                    $unwind:"$beats"
                },
            
                {
                    $group:{
            
                        _id:"$beats",
            
                        sales:{
                            $sum:1
                        },
            
                        revenue:{
                            $sum:"$total"
                        }
            
                    }
            
                },
            
                {
                    $sort:{
                        sales:-1
                    }
                },
            
                {
                    $limit:5
                },
            
                {
                    $lookup:{
            
                        from:"beats",
            
                        localField:"_id",
            
                        foreignField:"_id",
            
                        as:"beat"
            
                    }
            
                },
            
                {
                    $unwind:"$beat"
                }
            
            ]);

            res.json({

                totalBeats,
            
                featuredBeats,
            
                totalOrders,
            
                paidOrders,
            
                pendingOrders,
            
                revenue:
                revenue.length
                ? revenue[0].total
                : 0,
            
                recentOrders,

                topBeats
            
            });


        }


        catch(error){

            console.error(
                "ANALYTICS ERROR:",
                error
            );


            res.status(500).json({

                message:"Analytics failed"

            });

        }

    }

);

router.get(
    "/monthly-sales",
    protect,
    async (req, res) => {

        try {

            const monthlySales =
            await Purchase.aggregate([

                {
                    $match:{
                        status:"paid"
                    }
                },

                {
                    $group:{

                        _id:{
                            year:{
                                $year:"$createdAt"
                            },
                            month:{
                                $month:"$createdAt"
                            }
                        },

                        revenue:{
                            $sum:"$total"
                        },

                        orders:{
                            $sum:1
                        }

                    }

                },

                {
                    $sort:{
                        "_id.year":1,
                        "_id.month":1
                    }

                }

            ]);

            res.json(monthlySales);

        }

        catch(error){

            console.error(error);

            res.status(500).json({

                message:"Monthly sales failed"

            });

        }

    }
);



module.exports = router;