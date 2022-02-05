const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "post must have a title"],
    },
    body: {
        type: String,
        require: [true, "post must have a body"],
    },
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;