const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Member = require('../../models/Member');

// @route    POST api/members
// @desc     Register member
// @access   Public
router.post(
  '/',
  // check('memberId', 'memberId is required').notEmpty(),
  // check('handle', 'Handle is required').notEmpty(),
  // check('email', 'Please include a valid email').isEmail(),
  // check(
  //   'password',
  //   'Please enter a password with 6 or more characters'
  //).isLength({ min: 6 }),
  async (req, res) => {

    // const errors = validationResult(req);
    // console.log("errors=>!!!!!!", errors);
    // if (!errors.isEmpty()) {
    //   console.log("no errors");
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const {handle, email, password } = req.body;
    try {
      let member = await Member.findOne({ email });
      
      console.log("member", member);
      if (member) {
        return res
          .status(400)
          .json({"msg": "Member is already exist"});
      }

      member = new Member({
        handle,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      member.password = await bcrypt.hash(password, salt);

      await member.save();

      // const payload = {
      //   member: {
      //     id: member.id
      //   }
      // };

      // jwt.sign(
      //   payload,
      //   config.get('jwtSecret'),
      //   { expiresIn: '5 days' },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.status(200).json({ token });
      //   }
      // );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
