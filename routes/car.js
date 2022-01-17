const express = require("express");
const auth = require("../middleware/auth");
const multer = require('multer');
const {Car} = require("../models/car");
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

/*POST new car*/
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
            zipcode: req.body.zipcode,
        });
        await newCar.save();
        return res.send(newCar);
    }catch(ex){
        console.log("Couldn't Create New Car");
        return res.status(500).send(`InternalServerError:${ex}`);
    }
});

/*GET all cars*/
/*Tested Successfully*/
router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        return res.send(cars);
    }catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

/*GET cars by ID*/
/*Tested Successfully*/
router.get("/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        return res.send(car);
    }catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

/*Post Reviews*/
/*Tested Successfully & average rating calculates correctly*/
router.post("/cars/:id/reviews", [auth], async (req, res) =>{
    try{
        const car = await Car.findById(req.params.id)
        if(!car) {
            return res.status(400).send(`The car with id "${req.params.id}" does not exist.`);
        }
        
        const alreadyReviewed = car.reviews.find(
            (r) => r.user.toString() === req.user._id
        )
        
        if (alreadyReviewed) {
            return res.status(400).send('Car review already submitted')
        }

        const review = {
            name: req.user.name,
            rating: req.body.rating, 
            comment: req.body.comment,
            user: req.user._id,
        }
      
        car.reviews.push(review)
      
        car.numberOfReviews = car.reviews.length
      
        car.rating = car.reviews.reduce((sum, car) => car.rating + sum, 0) / car.reviews.length
      
        await car.save()
        return res.send(car);
    }catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

router.get(":path", async (req, res) => {
    try {
        res.download('./' + req.params.path);
    }catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;
