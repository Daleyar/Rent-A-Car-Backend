const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true 
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String, 
        required: true
    },
},
{
    timestamps: true,
}
)

const Review = mongoose.model("Review", reviewSchema);
module.exports.Review = Review;
module.exports.reviewSchema = reviewSchema;