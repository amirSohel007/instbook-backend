const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profileImg: {type:String, default:"https://is.gd/mIfCka"},
  password: { type: String, required: true },
  followers: [{type:ObjectId, ref:"User"}],
  following: [{type:ObjectId, ref:"User"}]
});

module.exports = mongoose.model("User", UserSchema);
