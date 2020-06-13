const express = require('express')
const router = express.Router()
const {signUp,
       singIn,
       getUsers,
       getAnySingleUsers, 
       followUser, 
       unFollowUser} = require('../controllers/user')
const {createPost,
       getAllPosts,
       getMyPost,
       likePost,
       unlikePost,
       commentPost,
       deletePost
      } = require('../controllers/post')
const {isAuthenticate} = require('../controllers/authenticate')

// User routes
router.post('/signup', signUp);
router.post('/signin', singIn)
router.get('/allusers', isAuthenticate, getUsers)
router.get('/user/:id', isAuthenticate, getAnySingleUsers)
router.put('/follow', isAuthenticate, followUser)
router.put('/unfollow', isAuthenticate, unFollowUser)
router.put('/test', (req, res) => {
       res.json({message:"API is running & up "})
})

//Post routes
router.post('/addpost', isAuthenticate, createPost)
router.get('/posts', isAuthenticate, getAllPosts)
router.get('/mypost', isAuthenticate, getMyPost)
router.put('/like', isAuthenticate, likePost)
router.put('/unlike', isAuthenticate, unlikePost)
router.put('/comment', isAuthenticate, commentPost)
router.delete('/delete/:postId', isAuthenticate, deletePost)



module.exports = router