const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'car',
        required: true
    },
    rentalDates:{
        from: {type: String},
        to: {type: String}
    },
    milesTraveled: {
        type: Number,
        default: 15
    },
    totalDays: {
        type: Number,
    },
    rentalFee: {
        type: Number,
        min: 0
    },
    renterAgeDiscount: {
        type: Boolean,
        default: false
    },
    insurance: {
        type: Boolean,
        default: true
    },
    transactionId: {
        type: String
    }
},
    {timestamps: true}
);

const Rental = mongoose.model("Rental", rentalSchema);
module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;