const mongoose = require('mongoose');

const universityEnum = [
  'Harvard University',
  'Stanford University',
  'Massachusetts Institute of Technology (MIT)',
  'University of California, Berkeley',
  'Princeton University',
  'Columbia University',
  'Yale University',
  'University of Chicago',
  'University of Pennsylvania',
  'California Institute of Technology',
  'Monash University, Australia',
  'UNSW, Australia',
  'TU Munich, Germany',
  'University of Europe for Applied Sciences, Germany',
  'NUS, Singapore',
  'University of Toronto, Canada',
  'Brock University, Canada',
  'Kingston University, UK',
  'University of Leeds, UK',
  'Trinity College Dublin, Ireland'
];

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: universityEnum, 
    unique: true
  }
});

const University = mongoose.model('University', universitySchema);
module.exports = { University, universityEnum };
