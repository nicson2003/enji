const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userData = require('../../model/userData.json');
const env = require('../../environments');
const { v4: uuidv4 } = require('uuid');

const { JWT_SECRET_KEY } = env.getEnvironmentVariables();

const findUserByKey = (key, value) => {
  const users = Object.keys(userData).map((user) => userData[user]);
  let matchUser = users.find((user) => user[key] === value) || null;
  return matchUser;
};

router.route('/login').post(
  //validations
  body('user_name').not().isEmpty(),
  body('password').not().isEmpty(),
  async function (req, res) {
    const errors = validationResult(req);
    const { user_name, password } = req.body;
    const matchUser = findUserByKey('user_name', user_name);

    if (!matchUser) {
      return res.status(400).json({ errors: [{ message: 'User Not Found' }] });
    }
    const isMatch = await bcrypt.compare(password, matchUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Credentials' }] });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const payload = {
        user_name,
      };

      jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({
          data: { token },
          message: 'successfully signin',
          id: uuidv4(),
        });
      });
    }
  }
);

router.route('/logout').post(function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    res.json({
      data: {
        user: null,
      },
      message: 'successfully signout',
    });
  }
});

router.route('/register').post(
  //validations
  body('email_address').not().isEmail(),
  body('user_name').isEmpty(),
  body('password').not().isEmpty().isLength({ min: 5, max: 25 }),

  async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const { user_name, password } = req.body;
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = {
      id: uuidv4(),
      user_name,
      password: hashPassword,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      res.json({
        data: 'ongoing development',
        message: 'success',
      });
    }
  }
);

router
  .route('resetpassword/:id?')
  .put(function (req, res) {
    res.json({
      data: 'ongoing development',
      message: 'success',
    });
  })
  .patch(function (req, res) {
    res.json({
      data: 'ongoing development',
      message: 'success',
    });
  });

module.exports = router;
