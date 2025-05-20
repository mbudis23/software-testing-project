class TaxPayment {
  constructor(referenceId, tax_type, amount, npwp, status = "Pending") {
    this.referenceId = referenceId;
    this.tax_type = tax_type;
    this.amount = amount;
    this.npwp = npwp;
    this.status = status;
    this.submission_date = new Date().toISOString();
  }
}

module.exports = TaxPayment;