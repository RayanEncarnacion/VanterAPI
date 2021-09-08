const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Render get one user
router.get("/getUser", async (req, res) => {
  res.render("getUser");
});

// Get one user
router.post("/oneUser", async (req, res) => {
  try {
    // Find user with id from the request body
    const user = await User.findOne({ _id: req.body.id });

    // Using Ternary operator
    user
      ? res.render("singleUser", { username: user.username, id: user._id })
      : res.status(404).json("User not found!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all users
router.get("/allUsers", async (req, res) => {
  try {
    // Get array of all users
    const users = await User.find();
    // Pass the array to the ejs page and display every user
    res.render("usersList", { users: users });
  } catch (error) {
    res.status(500).json(error);
  }
});

//  Render Tests pages

router.get("/tests", (req, res) => res.render("getTests"));
router.get("/tests/myTests", (req, res) => res.render("getMyTests"));

// Add tests
router.put("/tests/:id/:tests", async (req, res) => {
  const testsArray = req.params.tests;
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { tests: testsArray },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    user ? res.json({ updated: true }) : res.json({ updated: false });
  } catch (error) {
    res.json(error);
  }
});

// Display tests
router.post("/tests/myTests", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    user
      ? res.render("testsDisplay", {
          username: user.username,
          tests: user.tests,
        })
      : res.json({ message: "User not found!" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
