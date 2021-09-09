const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Capturing params for every GET request in this router
router.param("username", (req, res, next, username) => {
  req.username = username;
  next();
});
router.param("password", (req, res, next, password) => {
  req.password = password;
  next();
});

// Verify credentials
router.get("/:username/:password", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    if (user) {
      // Validation
      const passwordValidation = await bcrypt.compare(
        req.password,
        user.password
      );
      // Send response on validation
      passwordValidation
        ? res.json({ logged: true })
        : res.json({ logged: false });
    } else res.json({ logged: false });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
