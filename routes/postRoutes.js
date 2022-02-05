const express = require("express");
const { createPost, deletePost, updatePost, getAllPost, getOnePost } = require('../controller/postController');
const isAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(isAuth, getAllPost)
    .post(createPost);

router.route('/:id')
    .get(getOnePost)
    .patch(updatePost)
    .delete(deletePost);

module.exports = router;