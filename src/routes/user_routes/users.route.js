const express = require("express");
const router = express.Router();

const User = require("../../models/users/user.model");

const AuthUserController = require("../../controllers/userController/authController/authUserController");

router.get("/getAll", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/create", async (req, res) => {
  try {
    await AuthUserController.createUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el usuario");
  }
});

module.exports = router;
