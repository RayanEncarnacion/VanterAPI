const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

router.get("/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  try {
    const user = await User.findOne({ username });
    if (user) {
      // Validation
      const passwordValidation = await bcrypt.compare(password, user.password);
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
