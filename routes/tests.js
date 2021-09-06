const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

// Add tests
router.put("/:id/:tests", async (req, res) => {
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

router.get("/myTests", (req, res) => res.render("getMyTests"));

// Display tests
router.post("/myTests", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    user
      ? res.render("testsDisplay", {
          username: user.username,
          tests: user.tests,
        })
      : res.json("User not found!");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
