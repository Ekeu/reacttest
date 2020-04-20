//Will handle getting a web token for authentification
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/',
    [
      check('email', 'Please include a valid email').isEmail().normalizeEmail(),
      check('password','Password is required').exists()
    ],
    async (req, res) => {
      console.log(req.body)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        //See if user exists
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ message: 'Invalid credentials' }] });
        }

        //Compare user password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({errors: [{message: 'Invalid Credentials'}]});
        }
        //Return jswonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (error, token) => {
            if (error) throw error;
            res.json({ token });
          }
        );
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error!');
      }
    }
  );

module.exports = router;