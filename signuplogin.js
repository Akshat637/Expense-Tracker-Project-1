let User = require('../models/user');




exports.postuserdata = async (req, res) => {
  let { name, email, phonenumber, pwd } = req.body;
  if (name == undefined || name.length === 0 ||
    email == undefined || email.length === 0 ||
    pwd == undefined || pwd.length === 0) {
    res.status(400).json({ err: 'Something is Wrong' })
  }


  let password = await bcrypt.hash(pwd, 10);
  User.create({
    name, email, phonenumber, password
  })
    .then(result => {
      res.status(200).json({ message: 'successfuly' })
    })
    .catch(err => {
      res.status(400).json(err);
    })
};
