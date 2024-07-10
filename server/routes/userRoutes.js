const User = require("../models/userModel");
const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const userExists  = await User.findOne({email:req.body.email})

        if(userExists){
            res.send({
                success: false,
                message : "User Already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10)

        const newUser = new User(req.body)
        
        await newUser.save()

        res.status(201).json('User Created');

    } catch (error) {
        res.json(error);
    }
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email : req.body.email})

    if(!user){
        res.send({
            success : false,
            message : 'User Does not exists, please register'
        })
    }

    const validPassword = await bcrypt.compare(req.body.password)

    if(!validPassword){
        return res.send({
            success : false,
            message :"Invalid Password"
        })
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;