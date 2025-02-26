const express = require("express");
const router = express.Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});

module.exports = router;
