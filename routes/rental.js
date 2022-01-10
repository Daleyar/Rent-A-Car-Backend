const express = require("express");
const router = express.Router();
const {Rental} = require("../models/rental");

/*Tested Successfully*/
router.post("/rentcar", async (req, res) => {
    
    req.body.transactionId = '0' + Math.floor(Math.random() * 100000000);
    try{
        const newRental = new Rental(req.body)
        await newRental.save();
        return res.send(newRental)
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;