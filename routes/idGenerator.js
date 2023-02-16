class IDGenerator {
  constructor({ category, count }) {
    this.category = category;
    this.count = count;
  }

  async getID() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);

    return this.category + timestamp + randomNumber + this.count;
  }
}

module.exports = IDGenerator;
