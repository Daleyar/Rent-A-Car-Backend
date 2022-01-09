const {Car} = require("../models/car");
const express = require("express");
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, './images/');
    },
    filename: (req, file, cb) => {
    cb(null, file.originalname);
    },
});

const upload = multer({storage: storage})

/*Tested Successfully*/
router.post("/car", upload.single('carImage'), async (req, res) => {
    try{
        const newCar = new Car({
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            carImage: req.file.path,
            carType: req.body.carType,
            numberOfSeats: req.body.numberOfSeats,
            transmission: req.body.transmission,
            vehicleFeatures: req.body.vehicleFeatures,
            dailyRentalRate: req.body.dailyRentalRate,
        });
        await newCar.save();
        return res.send(newCar);
    }catch(ex){
        console.log("Couldn't Create New Car");
        return res.status(500).send(`InternalServerError:${ex}`);
    }
});

router.get("/cars", async (req, res) => {
    try {
      const cars = await Car.find();
      return res.send(cars);
    }catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
  });

module.exports = router;
