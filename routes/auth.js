const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).isSelected('-password')
        res.json(user)
    } catch (err) {
        res.status(500).send('Server Error')
    }
});


// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/',[
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter the password').exists()
], async (req, res)=>{
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({msg: 'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials '})
        }
        const payload = {
            user :{
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000,
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error')
    }
});





module.exports = router;