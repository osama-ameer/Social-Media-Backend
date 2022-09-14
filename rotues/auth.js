const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const config = require("config");
const bcrypt = require("bcrypt");
const auth = require("../middlewere/auth");


// @route POST /api/auth
// @desc Authorize User
// @acces Public

router.post('/',
// Middlewere to validate data coming from client
[
    check('email', "Please enter a valid email.").isEmail(),
    check('password', "Please enter a valid password.").not().isEmpty()
],
 async(req,res) => {
    // Validate the data
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({ error : errors.array()})

    // Destructure the fields from request body
    const {email, password} = req.body

    try {

    // Check user exists
    const user = await User.findOne({email})
    console.log(user);
    if(!user) return res.status(400).json({ msg: "User does not exists with this email."})

    // Check password matched or not
    const isMatched = await bcrypt.compare(password, user.password)
    if(!isMatched)  return res.status(400).json({ msg: "Password incorrect"})


     // Return jwt
     const payload = {
        user: {
          id: user.id,
        },
      };

    
    jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 100000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );

    } catch (error) {
        console.log("Error ", error.message);
      res.status(500).json({ msg: "Server Error" });
    }

    
})




// @route GET /api/auth
// @desc Get User Data
// @acces Private

router.get('/',auth, async (req,res) => {
    try {

        const user = await User.findById(req.user.id).select({
            password: 0,
            __v: 0
        })
        res.status(200).json({ user })
        
    } catch (error) {
        console.log("Error ", error.message);
        res.status(500).json({ msg: "Server Error" });   
    }
})


module.exports = router