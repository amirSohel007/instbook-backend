const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  body: { type: String, required: true },
  imageUrl: { type: String, require: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],

  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],

  postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", PostSchema);
