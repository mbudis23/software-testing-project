class Account {
  constructor(email, hashedPassword, npwp) {
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.npwp = npwp;
  }
}

module.exports = Account;