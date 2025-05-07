const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { version } = require('../package.json');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Proveedores Gapsi',
      version,
      description: 'Documentación para el examen práctico FullStack',
      contact: {
        name: 'Osmar yair Ramirez Perez',
        email: 'ing.osmardv@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' },
    ],
    components: {
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs, {
    explorer: true,
    customSiteTitle: 'Gapsi API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/assets/favicon.ico'
  }));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};