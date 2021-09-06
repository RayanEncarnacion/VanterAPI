const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

// Create user
router.post("/:username/:password/:passwordConfirmation", async (req, res) => {
  if (req.params.username && req.params.password) {
    try {
      // If passwords are equal
      if (req.params.password === req.params.passwordConfirmation) {
        // Securing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.params.password, salt);

        // Create and save a new User document on DB
        const user = await User.create({
          username: req.params.username,
          password: hashedPass,
        });

        // Send response back
        res.json({ status: true });
      } else res.render("error", { message: "Password  " });
    } catch (error) {
      res.render("error", { message: error.message });
    }
  } else res.status(400).json("Enter the neccesary information!");
});

module.exports = router;
