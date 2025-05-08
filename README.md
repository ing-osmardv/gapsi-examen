# Gapsi Fullstack Exam

Este repositorio contiene una aplicación fullstack desarrollada como parte del examen técnico para Gapsi. Incluye un backend construido con Node.js y un frontend con React.

## Estructura del Proyecto
gapsi-examen/
├── backend/ # API REST/GraphQL con Node.js
└── frontend/ # Aplicación web con React

## Requisitos

- Node.js v14
- npm
- Git

## Instalación y ejecución local

Clona el repositorio:

```bash
git clone https://github.com/ing-osmardv/gapsi-examen.git
cd gapsi-examen
```

## Levantar el Backend

```bash
cd backend
npm install
npm run dev
```

## Levantar el Frontend
cd frontend
npm install
npm start

## Endpoints del Backend

GET /welcome

GET /providers – Lista de proveedores
POST /providers – Agregar proveedor
DELETE /providers/:id – Eliminar proveedor por ID

GET /docs - Documentacion en swagger

POST /graphql

### Notas
Este proyecto se desarrolló siguiendo buenas prácticas, incluyendo soporte para documentación con Swagger y consultas GraphQL, facilitando así el desarrollo y la integración futura.