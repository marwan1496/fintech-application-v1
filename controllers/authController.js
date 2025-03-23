const authService = require('../services/authService');

/**
 * Handles admin login.
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 */
module.exports.login = function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = authService.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
