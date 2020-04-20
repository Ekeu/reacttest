//Contains feature like registering users, adding users etc
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('fname', 'First Name is required').not().isEmpty(),
    check('lname', 'Last Name is required').not().isEmpty(),
    check('website', 'Website is required').not().isEmpty(),
    check('description', 'Decription is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check(
      'password',
      'Password should not be empty, with a minimum of eight characters'
    )
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, email, website, description, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists' }] });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'identicon',
      });

      user = new User({
        fname,
        lname,
        email,
        website,
        description,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(12);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
