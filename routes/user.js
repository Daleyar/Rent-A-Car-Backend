const express = require("express");
const router = express.Router();
const { User, validateUser, validateLogin} = require("../models/user");
const bcrypt = require("bcrypt");

/* Registers New User */
/*Tested Successfully*/
router.post("/user/register", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if(user) 
            return res.status(400).send(`Email ${req.body.email} already exists!`);

        const salt = await bcrypt.genSalt(10);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: await bcrypt.hash(req.body.password, salt),
        });

        await user.save();

        return res.send("User Created!")

    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

/* User Login */
/*Tested Successfully*/
router.post("/user/login", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) 
            return res.status(400).send(error.details[0].message);

        const user = await User.findOne({email: req.body.email});
        if (!user) 
            return res.status(400).send(`Invalid email or password.`);

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password.");
      
        const token = user.generateAuthToken();
        return res.send(token);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
      const user = await User.findOne({_id: req.params.userId});
      return res.send(user);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
});
  
module.exports = router;