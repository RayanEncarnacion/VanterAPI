const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.put("/:id/:username/:password", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.params.password, salt);
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.params.username,
        password: hashedPass,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    user ? res.json({ updated: true }) : res.json({ updated: false });
  } catch (error) {
    res.json("Error!");
  }
});

module.exports = router;
