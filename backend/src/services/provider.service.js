const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const DB_PATH = path.join(__dirname, '../../bd.json');

class ProviderService {
  static async loadData() {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Error al cargar la base de datos', error);
      throw new Error('Error al cargar los datos');
    }
  }

  static async saveData(data) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      logger.error('Error al guardar en la base de datos', error);
      throw new Error('Error al guardar los datos');
    }
  }

  static async getProvidersPaginated(page = 1, limit = 10) {
    try {
      const data = await this.loadData();
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedItems = data.providers.slice(startIndex, endIndex);
      
      return {
        items: paginatedItems,
        total: data.providers.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(data.providers.length / limit)
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  static async createProvider(providerData) {
    try {
      if (!providerData.name || !providerData.companyName || !providerData.address) {
        throw new Error('Todos los campos (nombre, razón social, dirección) son requeridos');
      }

      if (providerData.name.length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }

      if (providerData.name.length > 100) {
        throw new Error('El nombre no puede exceder 100 caracteres');
      }
      const data = await this.loadData();
      
      const existe = data.providers.some(p => p.name === providerData.name);
      if (existe) {
        throw new Error('Ya existe un proveedor con ese nombre');
      }
      
      const newId = data.providers.length > 0 
        ? Math.max(...data.providers.map(p => p.id)) + 1 
        : 1;
      
      const newProvider = {
        id: newId,
        ...providerData,
        createdAt: new Date().toISOString()
      };
      
      data.providers.push(newProvider);
      await this.saveData(data);
      
      return newProvider;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  static async deleteProvider(id) {
    try {
      const data = await this.loadData();
      const index = data.providers.findIndex(p => p.id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Proveedor no encontrado');
      }
      
      data.providers.splice(index, 1);
      await this.saveData(data);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

module.exports = ProviderService;