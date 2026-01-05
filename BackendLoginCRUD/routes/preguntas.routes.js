const express = require("express");
const router = express.Router();
const preguntasController = require("../controllers/preguntas.controller");

router.get("/Pregunta", preguntasController.getPregunta);
router.get("/Preguntas", preguntasController.getPreguntas);

module.exports = router;
