const logger = require("../utils/logger");
const { version } = require("../../package.json");

exports.getWelcome = (req, res) => {
  try {
    res.json({
      message: "Bienvenido Candidato 01",
      version,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error al obtener mensaje de bienvenida" });
  }
};
