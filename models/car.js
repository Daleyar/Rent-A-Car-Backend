const mongoose = require("mongoose");
const { reviewSchema } = require("./review");

const carSchema = mongoose.Schema({
    model: {
      type: String,
      required: true,
      trim: true,
},
    make: {
      type: String,
      required: true,
      trim: true,
},
    year: {
      type: Number,
      required: true
},
    image: {
      type: mongoose.Schema.Types.String,
      required: true
},
    carType: {
      type: String,
      enum: ["Sedan", "SUV"],
      default: "Sedan"
},
    numberOfSeats: {
      type: Number,
      min: 1,
      max: 8,
      default: 5
},
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Automatic"
},
    airConditioner: {
      type: Boolean,
      default: false
},
    rating: {
      type: Number,
      required: true,
      default: 0,
},
    numReviews: {
      type: Number,
      required: true,
      default: 0,
},
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
},
    reviews: [reviewSchema],
});

const Car = mongoose.model("Car", carSchema);
module.exports.Car = Car;
module.exports.carSchema = carSchema;
