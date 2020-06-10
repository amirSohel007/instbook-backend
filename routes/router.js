const express = require('express')
const router = express.Router()
const {signUp, singIn, getUsers} = require('../controllers/user')
const {createPost, getAllPosts, getMyPost, likePost, unlikePost, commentPost} = require('../controllers/post')
const {isAuthenticate} = require('../controllers/authenticate')

// User routes
router.post('/signup', signUp);
router.post('/signin', singIn)
router.get('/allusers', isAuthenticate, getUsers)

//Post routes
router.post('/addpost', isAuthenticate, createPost)
router.get('/posts', isAuthenticate, getAllPosts)
router.get('/mypost', isAuthenticate, getMyPost)
router.put('/like', isAuthenticate, likePost)
router.put('/unlike', isAuthenticate, unlikePost)
router.put('/comment', isAuthenticate, commentPost)



module.exports = router