const mongoose = require("mongoose");

const licenseDetails = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true
    },
    issuingCountry: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    }
});

const License = mongoose.model("License", licenseDetails);
module.exports.License = License;
module.exports.licenseDetails = licenseDetails;