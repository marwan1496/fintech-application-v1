// services/accountService.js

const accountRepository = require('../repositories/accountRepository');

/**
 * Creates a new account.
 * @returns {object} The created account.
 */
function createAccount() {
  return accountRepository.createAccount();
}

/**
 * Deposits an amount into an account.
 * @param {number} accountId - The account ID.
 * @param {number} amount - The deposit amount.
 * @returns {object} The updated account.
 * @throws Will throw an error if the account doesn't exist or the amount is invalid.
 */
function deposit(accountId, amount) {
  const account = accountRepository.getAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error("Invalid deposit amount");
  }
  account.balance += amount;
  return accountRepository.updateAccount(account);
}

/**
 * Withdraws an amount from an account.
 * @param {number} accountId - The account ID.
 * @param {number} amount - The withdrawal amount.
 * @returns {object} The updated account.
 * @throws Will throw an error if the account doesn't exist, the amount is invalid, or there are insufficient funds.
 */
function withdraw(accountId, amount) {
  const account = accountRepository.getAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error("Invalid withdrawal amount");
  }
  if (account.balance < amount) {
    throw new Error("Insufficient funds");
  }
  account.balance -= amount;
  return accountRepository.updateAccount(account);
}

/**
 * Retrieves the balance for a given account.
 * @param {number} accountId - The account ID.
 * @returns {number} The account balance.
 * @throws Will throw an error if the account is not found.
 */
function getBalance(accountId) {
  const account = accountRepository.getAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  return account.balance;
}

module.exports = {
  createAccount,
  deposit,
  withdraw,
  getBalance,
};
