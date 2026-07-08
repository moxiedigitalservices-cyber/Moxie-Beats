const mongoose = require("mongoose");


const PurchaseSchema = new mongoose.Schema({

    customerEmail:{
        type:String,
        required:true
    },


    beats:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Beat"
        }
    ],


    paymentReference:{
        type:String
    },


    paymentMethod:{
        type:String,
        default:"Paynow"
    },


    status:{
        type:String,
        enum:[
            "pending",
            "paid",
            "failed"
        ],
        default:"pending"
    },


    downloadToken:{
        type:String
    },


    total:{
        type:Number,
        required:true
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Purchase",
    PurchaseSchema
);