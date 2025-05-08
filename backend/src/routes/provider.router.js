const express = require("express");
const router = express.Router();
const providerController = require("../controllers/provider.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       required:
 *         - name
 *         - companyName
 *         - address
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *           example: 1
 *         name:
 *           type: string
 *           maxLength: 100
 *           example: "Proveedor Ejemplo 1"
 *         companyName:
 *           type: string
 *           maxLength: 200
 *           example: "Razón Social 1 S.A. de C.V."
 *         address:
 *           type: string
 *           maxLength: 300
 *           example: "Calle Falsa 123, Ciudad de México"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00.000Z"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Descriptive error message"
 */

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Get paginated providers list
 *     tags: [Providers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Providers list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Provider'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("", providerController.getProviders);

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - companyName
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               companyName:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Provider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("", providerController.createProvider);

/**
 * @swagger
 * /api/providers/{id}:
 *   delete:
 *     summary: Delete a provider
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Provider ID
 *     responses:
 *       204:
 *         description: Provider deleted successfully
 *       404:
 *         description: Provider not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", providerController.deleteProvider);

module.exports = router;
