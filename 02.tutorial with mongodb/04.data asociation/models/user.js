const { default: mongoose } = require("mongoose")
const mogoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/testingthedata")

const userSchema = mogoose.Schema({
    username: String,
    email: String,
    age: Number,
    // post: Array
    post:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "post"
        }
    ]
})

module.exports = mongoose.model("user", userSchema)

