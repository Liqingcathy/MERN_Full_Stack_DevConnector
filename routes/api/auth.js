const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth'); //use middleware
const jwt = require('jsonwebtoken');
const config = require('config');
//check post input data error 
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    //res.send('Auth route')
}); //add auth param to use middle ware

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
//add second param to check error
router.post('/', 
[
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter a password'
    ).exists()
], 
  async  (req, res) => { //get promise
    const errors = validationResult(req); //receive req
    //check error
    if(!errors.isEmpty()){
        //if there's error, send json data back in an array
        //400 means bad request
        return res.status(400).json({errors: errors.array()});
    }

    //pull out some from body
    const {email, password} = req.body;

    try{
     //see if user exists
    let user = await User.findOne({email});
    if(!user){ //if not user
       return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});//match error message in line 24
    }    

    //if password match
    const isMatch = await bcrypt.compare(password, user.password); //plain tex pw and user pw
    if(!isMatch){
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
    }

    //return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }
    
    jwt.sign(
        payload, 
        config.get('jwtSecret'),//config default.js add jwtSecret
        {expiresIn: 360000},
        (err, token) => {
            if(err) throw err;
            res.json({token})
        }
        );
    //res.send('User registered');
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
    //console.log(req.body); //object of data the route sent
    //initialize middleware for body parser --> server.js
    
});

//export route
module.exports = router;