const jwt = require("jsonwebtoken");
const User = require('./models/user');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("authorization");

    const Id = jwt.verify(token, 'akshat1234567890');
   // console.log(TOKEN_SECRET)
    console.log(Id)
    User.findByPk(Id)
      .then((user) => {
        //console.log(JSON.stringify(user))
        req.user = user;
        next();
      })
      .catch((err) => {
       // throw new Error(err);
       res.status(401).json({message:"unauthorized login again"})

      });
  } catch (err) {
   res.status(404).json({success :false,message:"not able to authorized!login again"})
  }
};