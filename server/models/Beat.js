const mongoose = require("mongoose");

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

    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        unique: true
    },

    artwork:{
        type:String,
        default:""
    },

    artist: String,

    price: {
        type: Number,
        required: true,
        default: 0
    },

    genre: String,

    subGenre: String,

    mood: String,

    bpm: Number,

    key: String,

    duration: String,

    tags: [String],

    coverImage: String,

    previewUrl: String,

    fullUrl: String,

    licenses: [LicenseSchema],

    plays: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    downloads: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    isExclusiveSold: {
        type: Boolean,
        default: false
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Beat", BeatSchema);