const { University, universityEnum } = require("../models/university");

const seedUniversity = async () => {
  try {
    for (let universityName of universityEnum) {
      const existingUniversity = await University.findOne({ name: universityName });
      if (!existingUniversity) {
        await University.create({ name: universityName });
       
      }
    }
    console.log("University seeding completed.");
  } catch (err) {
    console.error("Error seeding universities:", err);
  }
};

module.exports = seedUniversity;
