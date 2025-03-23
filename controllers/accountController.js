// controllers/accountController.js

const accountService = require('../services/accountService');
const { v4: uuidv4 } = require('uuid');

/**
 * Creates a new account.
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 */
function createAccount(req, res) {
  try {
    const account = accountService.createAccount();
    res.status(201).json({ account_id: account.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Deposits funds into an account.
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 */
function deposit(req, res) {
  try {
    const accountId = parseInt(req.params.id, 10);
    const { amount } = req.body;
    accountService.deposit(accountId, amount);
    const transactionId = uuidv4();
    res.status(200).json({ transaction_id: transactionId });
  } catch (error) {
    if (error.message === "Account not found") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Invalid deposit amount") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

/**
 * Withdraws funds from an account.
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 */
function withdraw(req, res) {
  try {
    const accountId = parseInt(req.params.id, 10);
    const { amount } = req.body;
    accountService.withdraw(accountId, amount);
    const transactionId = uuidv4();
    res.status(200).json({ transaction_id: transactionId });
  } catch (error) {
    if (error.message === "Account not found") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Invalid withdrawal amount" || error.message === "Insufficient funds") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

/**
 * Retrieves the account balance.
 * @param {object} req - Express request.
 * @param {object} res - Express response.
 */
function getBalance(req, res) {
  try {
    const accountId = parseInt(req.params.id, 10);
    const balance = accountService.getBalance(accountId);
    res.status(200).json({ balance });
  } catch (error) {
    if (error.message === "Account not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  createAccount,
  deposit,
  withdraw,
  getBalance,
};
