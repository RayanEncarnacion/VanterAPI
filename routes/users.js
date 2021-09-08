const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Rendering EJS pages
router.get("/getUser", async (req, res) => res.render("getUser"));
router.get("/update", (req, res) => res.render("update"));
router.get("/tests", (req, res) => res.render("getTests"));
router.get("/tests/myTests", (req, res) => res.render("getMyTests"));
router.get("/delete", (req, res) => res.render("delete"));

// Get one user
router.get("/oneUser", async (req, res) => {
  console.log(req.body);
  try {
    // Find user with id from the request body
    const user = await User.findOne({ _id: req.body.id });

    // Using Ternary operator
    if (user)
      res.render("singleUser", { username: user.username, id: user._id });
  } catch (error) {
    res.render("error", { message: "User not found!" });
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

// Update user
router.put("/update/:id/:username/:password", async (req, res) => {
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

// Delete single user with username and password
router.delete("/delete/:username/:password", async (req, res) => {
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
