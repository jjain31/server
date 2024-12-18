const { Bank, bankEnum } = require("../models/bank");

const seedBanks = async () => {
  try {
    for (let bankName of bankEnum) {
      const existingBank = await Bank.findOne({ name: bankName });
      if (!existingBank) {
        await Bank.create({ name: bankName, country: "India" });
      }
    }
    console.log("Bank seeding completed.");
  } catch (err) {
    console.error("Error seeding banks:", err);
  }
};

module.exports = seedBanks;
