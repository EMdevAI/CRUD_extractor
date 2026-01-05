const Login = require("../models/Login");

exports.loginUser = async (req, res) => {
  try {
    const { User, password } = req.query;
    if (!User || !password)
      return res.status(400).json({ status: "no", tipo: "nodefinido" });

    const resultado = await Login.findOne({
      where: { USERNAME: User, PASSWORD: password },
    });

    if (!resultado)
      return res.status(401).json({ status: "no", tipo: "nodefinido" });

    res.json({ status: "yes", tipo: resultado.TIPOUSUARIO });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
