const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/miniproj")

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    passworrd: String
})

module.exports = mongoose.model("user", userSchema)