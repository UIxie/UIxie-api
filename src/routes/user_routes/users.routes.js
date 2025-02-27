const express = require("express");
const router = express.Router();

const User = require("../../models/users/user");

router.get("/getAll", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
