const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  //   console.log("HEEEEEEEEEEEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOO");
  //   console.log(req.body);
  const { fullName, email, password, profileImageUrl } = req.body || {};

  // Validations: Check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please enter all details" });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while registering user, please try again later",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all details" });
  }
  try {
    // Check if user exists and compare password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while logging in, please try again later",
      error: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    
  } catch (error) {
    return res.status(500).json({
      message:
        "Server error while fetching user profile, please try again later",
        error: error.message,
    });
  }
};
