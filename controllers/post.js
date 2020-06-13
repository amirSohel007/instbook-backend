
const Post = require('../models/Post')

//create new post
exports.createPost = async (req, res) => {
  const { body, imageUrl } = req.body;
  if (!body || !imageUrl) {
    return res.json({ error: "required all fileds" });
  }

  const post = new Post({ body, imageUrl, postedBy: req.user });
  const savePost = await post.save();
  res.json(savePost);
};

//get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find()
  .populate('postedBy', '_id name')
  .populate('comments.postedBy', '_id name')
  .sort({$natural:-1});
  res.json(posts);
};

//get my post
exports.getMyPost = async (req, res) => {
  const post = await Post.find({postedBy:req.user._id}).populate('postedBy', 'name')
  res.json(post);
};

// like post 
exports.likePost = async(req, res) => {
 const like = await Post.findByIdAndUpdate(req.body.postId, {
    $push:{likes:req.user._id}
  }, {new:true})
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
     .catch(error => {
    console.log(error)
  })
 
  res.json(like)
}

//unlike post 
exports.unlikePost = async(req, res) => {
  const unlike = await Post.findByIdAndUpdate(req.body.postId, {
    $pull:{likes:req.user._id}
  }, {new:true})
   .populate('postedBy', '_id name')
   .populate('comments.postedBy', '_id name')
  res.json(unlike)
}

//comment
exports.commentPost = async (req, res) => {
  const comments = await Post.findByIdAndUpdate(req.body.postId,
    {
      $push: { comments: {text: req.body.text, postedBy: req.user._id}},
    },{ new: true })
  .populate('comments.postedBy', '_id, name')
  .populate('postedBy', 'id_ name')
    .catch(error => console.log(error))
    res.json(comments)
};

//delete post
exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId });
  if (post) {
    if (post.postedBy._id.toString() == req.user._id.toString()) {
      let removePost = await post.remove();
      if (removePost) res.json({ status: true, removePost });
      else return res.json({ error: "failed" });
    }
  }
};
