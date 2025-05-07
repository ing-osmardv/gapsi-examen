const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');

const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo en 2 minutos'
});

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.disable('x-powered-by');

// Swagger Documentation
require('./swagger')(app);

// Routes REST
app.use('/welcome', require('./routes/auth.router'));
app.use('/providers', require('./routes/provider.router'));

// Error handler
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;