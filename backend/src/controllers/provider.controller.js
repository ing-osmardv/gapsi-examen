const ProviderService = require("../services/provider.service");
const logger = require("../utils/logger");

exports.getProviders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await ProviderService.getProvidersPaginated(page, limit);
    res.json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const providerData = req.body;
    const newProvider = await ProviderService.createProvider(providerData);
    res.status(201).json(newProvider);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    await ProviderService.deleteProvider(id);
    res.status(204).end();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: error.message });
  }
};
