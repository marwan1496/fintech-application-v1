// services/authService.js

const jwt = require('jsonwebtoken');

// Hardcoded credentials and configuration (should be stored securely in production)
const adminUsername = "admin";
const adminPassword = "admin";
const jwtSecret = "56025E0C0FA4CBC84F060DAD39D8116B7B3161FC";
const tokenExpiry = "1h";

/**
 * Validates admin credentials and generates a JWT token.
 * @param {string} username 
 * @param {string} password 
 * @returns {string} A JWT token if credentials are valid.
 * @throws Will throw an error if credentials are invalid.
 */
function login(username, password) {
  if (username === adminUsername && password === adminPassword) {
    return jwt.sign({ username, role: 'admin' }, jwtSecret, { expiresIn: tokenExpiry });
  } else {
    throw new Error("Invalid credentials");
  }
}

module.exports = {
  login,
};
