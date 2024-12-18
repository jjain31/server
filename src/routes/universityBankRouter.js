const express = require("express");
const userAuth = require("../middleware/auth");
const Student = require("../models/student");
const { University } = require("../models/university");
const { Bank } = require("../models/bank");
const universityBankRouter = express.Router();
const User = require("../models/user");
universityBankRouter.get("/:userId", userAuth, async (req, res) => {
  try {
    const userId = req.params.userId;

    const student = await Student.findOne({ userId })
      .populate({
        path: "selectedUniversities.universityId",
        select: "name",
      })
      .populate({
        path: "selectedUniversities.selectedBanks",
        select: "name",
      });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student.selectedUniversities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

universityBankRouter.post("/:studentId", userAuth, async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { universities } = req.body;

    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingStudent = await Student.findOne({ userId: user._id });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const selectedUniversities = [];

    for (let uni of universities) {
      const university = await University.findOne({ name: uni.university });
      if (!university) {
        return res
          .status(400)
          .json({ message: `University ${uni.university} not found` });
      }

      const selectedBanks = [];

      for (let bankName of uni.banks) {
        const bank = await Bank.findOne({ name: bankName });
        if (!bank) {
          return res
            .status(400)
            .json({ message: `Bank ${bankName} not found` });
        }
        selectedBanks.push(bank._id);
      }

      selectedUniversities.push({
        universityId: university._id,
        selectedBanks: selectedBanks,
      });
    }

    const student = new Student({
      userId: user._id,
      selectedUniversities: selectedUniversities,
    });

    const savedStudent = await student.save();

    res.status(201).json(savedStudent.selectedUniversities);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

universityBankRouter.put("/:studentId", userAuth, async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { universities } = req.body;

    const student = await Student.findOne({ userId: studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    for (let uni of universities) {
      const university = await University.findOne({ name: uni.university });
      if (!university) {
        return res
          .status(400)
          .json({ message: `University ${uni.university} not found` });
      }

      const selectedBanks = [];
      for (let bankName of uni.banks) {
        const bank = await Bank.findOne({ name: bankName });
        if (!bank) {
          return res
            .status(400)
            .json({ message: `Bank ${bankName} not found` });
        }
        selectedBanks.push(bank._id);
      }

      const existingUniIndex = student.selectedUniversities.findIndex(
        (item) => item.universityId.toString() === university._id.toString()
      );

      if (existingUniIndex !== -1) {
        student.selectedUniversities[existingUniIndex].selectedBanks =
          selectedBanks;
      } else {
        student.selectedUniversities.push({
          universityId: university._id,
          selectedBanks: selectedBanks,
        });
      }
    }

    await student.save();
    res.json(student.selectedUniversities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

universityBankRouter.delete(
  "/:studentId/:universityId",
  userAuth,
  async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const universityId = req.params.universityId;

      const student = await Student.findOne({ userId: studentId });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const universityIndex = student.selectedUniversities.findIndex(
        (uni) => uni.universityId.toString() === universityId
      );

      if (universityIndex === -1) {
        return res
          .status(404)
          .json({ message: "University not found in student's selection" });
      }

      student.selectedUniversities.splice(universityIndex, 1);
      await student.save();

      res.json(student.selectedUniversities);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
universityBankRouter.delete("/:studentId", userAuth, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findOne({ userId: studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const user = await User.findById(student.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Student.findByIdAndDelete(student._id);
    await User.findByIdAndDelete(student.userId);

    res.json({ message: "Student and user deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = universityBankRouter;
