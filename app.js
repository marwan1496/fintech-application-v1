// app.js

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
require('express-async-errors')

const app = express();
const port = 3002;


app.use(express.json());

// Import controllers
const authController = require('./controllers/authController');
const accountController = require('./controllers/accountController');

app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, "./api/openapi.yaml"),
      operationHandlers: path.join(__dirname, "controllers"),
    })
  );

  app.use((error, _req, res, _next) => {
    console.log("here")
    res.status(error?.statusCode ?? 500).json({
      message: error?.message ?? "Someting went wrong",
    });
  });
// JWT verification middleware
const jwtSecret = "56025E0C0FA4CBC84F060DAD39D8116B7B3161FC"; // Should be stored securely

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid" });
      }
      req.admin = decoded;
      next();
    });
  } else {
    res.status(403).json({ error: "No token provided" });
  }
}

/**
 * Swagger configuration options.
 */

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

module.exports = app;
