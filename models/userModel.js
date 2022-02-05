const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "post must have  username"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "post must have a body"],
    },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;