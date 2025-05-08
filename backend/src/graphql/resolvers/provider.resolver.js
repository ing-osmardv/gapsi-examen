const ProviderService = require("../../services/provider.service");

const resolvers = {
  providers: async ({page = 1, limit = 10}) => {
    return await ProviderService.getProvidersPaginated(page, limit);
  },
  createProvider: async ({ name, companyName, address }) => {
    return await ProviderService.createProvider({
      name,
      companyName,
      address,
    });
  },
  deleteProvider: async ({ id }) => {
    await ProviderService.deleteProvider(id);
    return { success: true };
  },
};

module.exports = resolvers;
