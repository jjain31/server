const mongoose=require('mongoose')
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blogSchema = new Schema({
        firstName: {
          type: String,
          required: true,
          minLength: 2,
          maxLength: 50,
          index: true,
        },
        lastName: {
          type: String,
        },
        emailId: {
          type: String,
          lowercase: true,
          required: true,
          unique: true,
          trim: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid email address");
            }
          },
        },
        password: {
          type: String,
          required: true,
          validate(value) {
            if (!validator.isStrongPassword(value)) {
              throw new Error("Enter Strong Password");
            }
          },
        },
      }, {
        timestamps: true,
      });
      

blogSchema.methods.getJWT = async function (){
const user = this;
const token = await jwt.sign({_id:user._id},"TaskManagement$70",{expiresIn : "30d"});
return token;
}
blogSchema.methods.validatePassword = async function (passwordByUser) {
        const user = this;
        const passwordHash = user.password;
        const isPasswordValid = bcrypt.compare(passwordByUser,passwordHash);
        return isPasswordValid;
        
}
module.exports = mongoose.model("User",blogSchema);