const express = require("express");
const router = express.Router();
const config = require("config");
const { v4: uuidv4 } = require('uuid');
const {Rental} = require("../models/rental");
const {Car} = require("../models/car");
const key = config.get("stripe_key")
const stripe = require("stripe")(key)

/*Tested Successfully*/
router.post("/rentcar", async (req, res) => { 
    const {token} = req.body
    
    try{
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        
        const payment = await stripe.charges.create({
            amount: req.body.rentalFee * 100,
            customer: customer.id,
            receipt_email: token.email,
            currency: "USD"
        },{
            idempotencyKey: uuidv4()
        })
        
        if(payment){
            req.body.transactionId = payment.source.id;
            const newRental = new Rental(req.body)
            await newRental.save();
            const car = await Car.findOne({ _id: req.body.car });
            car.rentalDates.push(req.body.rentalDates);

            await car.save();
            return res.send(newRental)
        }else{
            return res.status(500).send(`Internal Server Error: ${error}`);
        }


    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

router.get("/getrentals/:id", async(req, res) => {
    try {
        const rentals = await Rental.find({user: req.params.id}).populate({path:"car", model: "Car"})
        res.send(rentals)
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
  
});

module.exports = router;