const mongoose = require("mongoose");
const slugify = require("slugify");

const LicenseSchema = new mongoose.Schema({

    name: String,

    price: Number,

    stemsIncluded: {
        type: Boolean,
        default: false
    },

    commercialUse: {
        type: Boolean,
        default: true
    },

    exclusive: {
        type: Boolean,
        default: false
    }

});

const BeatSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },

    slug:{
        type:String,
        unique:true
    },

    artist:{
        type:String,
        required:true
    },

    producer:{
        type:String,
        default:"Moxxie"
    },

    genre:{
        type:String,
        default:"Unknown"
    },

    subGenre:{
        type:String,
        default:""
    },

    bpm:{
        type:Number,
        default:0
    },

    key:{
        type:String,
        default:""
    },

    mood:{
        type:String,
        default:""
    },

    description:{
        type:String,
        default:""
    },

    tags:[String],

    duration:{
        type:Number,
        default:30
    },

    price:{
        type:Number,
        required:true
    },

    previewUrl:{
        type:String,
        required:true
    },

    fullUrl:{
        type:String,
        required:true
    },

    coverArt:{
        type:String,
        default:"/assets/images/moxxie-logo.png"
    },

    downloads:{
        type:Number,
        default:0
    },

    isFeatured:{
        type:Boolean,
        default:false
    },

    isPublished:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

BeatSchema.pre("save", async function(){

    if(this.isModified("title")){

        this.slug = slugify(
            this.title,
            {
                lower:true,
                strict:true
            }
        );

    }

});

module.exports = mongoose.model("Beat", BeatSchema);