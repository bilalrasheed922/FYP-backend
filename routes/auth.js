const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate a unique 6-digit tag prefixed with #
async function generateUniqueTag() {
  let isUnique = false;
  let newTag;

  while (!isUnique) {
    newTag = `#${Math.floor(100000 + Math.random() * 900000)}`;
    const existingUser = await User.findOne({ tag: newTag });
    if (!existingUser) isUnique = true;
  }

  return newTag;
}

// =======================
//       Signup Route
// =======================
router.post('/signup', async (req, res) => {
  console.log('Frontend hit /signup with:', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
        errorType: 'email',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const tag = await generateUniqueTag();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      tag,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
});

// =======================
//        Login Route
// =======================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Frontend hit /login with:', req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
      errorType: 'input',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email',
        errorType: 'email',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
        errorType: 'password',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tag: user.tag,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
