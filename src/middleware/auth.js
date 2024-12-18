const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
          try{
          const {token} = req.cookies;
          if(!token){
                  return res.status(401).send("Please Login");  
          }
          const decoded = await jwt.verify(token,"TaskManagement$70");
          const {_id}=decoded;
          const user= await User.findById(_id);
          if(!user){
                    throw new Error("Can't fint the user");
          }
          req.user = user;
          next();
}
catch(err){
          res.status(400).send("Something went wrong");
}
}
module.exports = userAuth;