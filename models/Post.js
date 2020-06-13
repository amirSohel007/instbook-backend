const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const PostSchema = new Schema({
  body: { type: String, required: true },
  imageUrl: { type: String, require: true },
  likes: [{ type: ObjectId, ref: "User" }],

  comments: [
    {
      text: String,
      postedBy: { type:ObjectId, ref: "User" },
    },
  ],

  postedBy: { type: ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", PostSchema);
