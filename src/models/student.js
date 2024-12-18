const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
          },
          selectedUniversities: [{
            universityId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'University', 
              required: true,
            },
            selectedBanks: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Bank',
              required: true,
            }],
          }],
        }, {
          timestamps: true,
        });
        

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
