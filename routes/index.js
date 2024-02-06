// Importa il modulo express
var express = require("express");

// Crea un'istanza del router
var router = express.Router();

// Definisci la route per il percorso /
router.get("/", function (req, res) {
  // Invia la view index.ejs come risposta
  res.render("index", {title : 'SensorNetHub'});
});

// Esporta il router
module.exports = router;
