const mongoose = require("mongoose");

const mealKitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    includes: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    featuredMealKit: {
        type: Boolean,
        required: true,
    }
    
});

const mealKitModel = mongoose.model("mealkits", mealKitSchema);

module.exports = mealKitModel