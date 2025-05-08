const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Gestión de proveedores para Gapsi e-Commerce
 */

/**
 * @swagger
 * /welcome:
 *   get:
 *     summary: Mensaje de bienvenida
 *     tags: [Bienvenida]
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Bienvenido Candidato 01
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
router.get("", authController.getWelcome);

module.exports = router;
