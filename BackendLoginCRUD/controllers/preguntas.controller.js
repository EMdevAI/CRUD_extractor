const TablaJson = require("../models/TablaJson");

exports.getPregunta = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Falta idEjercicio" });

    const resultado = await TablaJson.findOne({ where: { idEjercicio: id } });
    if (!resultado)
      return res.status(404).json({ mensaje: "No hay datos para ese id" });

    res.json(resultado); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPreguntas = async (req, res) => {
  try {
    const resultados = await TablaJson.findAll();
    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
