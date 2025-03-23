// repositories/accountRepository.js

const accounts = {};
let nextAccountId = 1;

/**
 * Creates a new account with an initial balance of 0.
 * @returns {object} The newly created account.
 */
function createAccount() {
  const account = { id: nextAccountId, balance: 0 };
  accounts[nextAccountId] = account;
  nextAccountId++;
  return account;
}

/**
 * Retrieves an account by its ID.
 * @param {number} id - The account ID.
 * @returns {object|null} The account if found, otherwise null.
 */
function getAccountById(id) {
  return accounts[id] || null;
}

/**
 * Updates an account in the repository.
 * @param {object} account - The account object.
 * @returns {object} The updated account.
 */
function updateAccount(account) {
  accounts[account.id] = account;
  return account;
}

module.exports = {
  createAccount,
  getAccountById,
  updateAccount,
};
