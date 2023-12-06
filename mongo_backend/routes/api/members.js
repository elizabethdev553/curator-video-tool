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
  async (req, res) => {

    const {handle, email, password } = req.body;
    try {
      let member = await Member.findOne({ email });
      
      if (member) {
        return res
          .status(400)
          .json({errors: "Member is already exist"});
      }

      member = new Member({
        handle,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      member.password = await bcrypt.hash(password, salt);

      await member.save();

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
