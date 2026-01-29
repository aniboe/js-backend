const mongoos = require("mongoose")

mongoos.connect("mongodb://localhost:27017/nodemongo")

const userSchema = mongoos.Schema({
    name: String,
    username: String,
    email: String
})

// mongoos.model("user", userSchema)
module.exports = mongoos.model("user", userSchema)