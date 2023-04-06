const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
//check post input data error 
const { check, validationResult } = require('express-validator');

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
  async  (req, res) => { 
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try{
    let user = await User.findOne({email});
    if(!user){ 
       return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});//match error message in line 24
    }    

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
    }

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
});

module.exports = router;