const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Delete single user with username and password
router.delete("/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      // Validate passwords
      const validate = await bcrypt.compare(password, user.password);
      // Response depending on Validation
      if (validate) {
        await User.deleteOne({ username: username });
        res.json({ deleted: true });
      } else {
        res.json({ pwError: "Wrong password!" });
      }
    } else res.json({ userError: "User not found!" });
  } catch (error) {
    res.json({ server: "Something went wrong with the request!" });
  }
});

module.exports = router;
