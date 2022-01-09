const mongoose = require("mongoose");
const { reviewSchema } = require("./review");

const carSchema = mongoose.Schema({
    model: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        enum: ["Economy", "Luxury", "Standard", "SUV"],
        default: "Standard"
    },
    numberOfSeats: {
        type: Number,
        min: 2,
        max: 8,
        default: 5
    },
    transmission: {
        type: String,
        enum: ["Manual", "Automatic"],
        default: "Automatic"
    },
    vehicleFeatures: {
        type: Array,
        default: []
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 40,
        max: 1000
    },
    reviews: [reviewSchema],
},

);

const Car = mongoose.model("Car", carSchema);
module.exports.Car = Car;
module.exports.carSchema = carSchema;