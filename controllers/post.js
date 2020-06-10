
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
  .populate('postedBy', ' name')
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
  }, {new:true}).catch(error => {
    console.log(error)
  })
  res.json(like)
}

//unlike post 
exports.unlikePost = async(req, res) => {
  const unlike = await Post.findByIdAndUpdate(req.body.postId, {
    $pull:{likes:req.user._id}
  }, {new:true})
  res.json(unlike)
}

exports.commentPost = async (req, res) => {
  const comments = await Post.findByIdAndUpdate(req.body.postId,
    {
      $push: { comments: {text: req.body.text, postedBy: req.user._id}},
    },{ new: true }).populate('comments', 'name')
    .catch(error => console.log(error))
    res.json(comments)
};