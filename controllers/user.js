const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Sign up route
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ error: "required all fileds" });
  }

  const isRegisterd = await User.findOne({ email });
  if (isRegisterd) {
    return res.json({ error: "This email is already registered." });
  }

  //Create hash Password and save into DB
  bcrypt.hash(password, 12, async (err, hash) => {
    if (err) {
      return res.json({ error: "something went wrong" });
    }
    const newuser = new User({ name, email, password: hash });
    let userInfo = await newuser.save();
    if (userInfo) {
      res.json({ status: true, message: "user has been registerd" });
    }
    return res.json({ error: "something went wrong" });
  });
};

//Sign In route
exports.singIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ error: "Required all fields" });
  }

  const isUserExist = await User.findOne({ email: email });

  if (isUserExist == null){
    return res.json({error:'Invalid credentials'})
  }
    bcrypt.compare(password, isUserExist.password, (err, result) => {
      if (result){
           const token = jwt.sign({ _id: isUserExist._id },process.env.PRIVATE_KEY);
           const {name, _id, email} = isUserExist
           res.json({ status: true, token, name, _id, email });
          }
          else{
            return res.json({ error: "Password not matched" });
          }
    });


};


//Get all users
exports.getUsers = async (req, res) => {
    const users = await User.find().limit(5)
    res.json(users)
}