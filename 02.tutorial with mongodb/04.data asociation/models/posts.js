const { default: mongoose } = require("mongoose")
const mogoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/testingthedata")

const postSchema = mogoose.Schema({
    postdata: String,
    // user: String,
    user: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now // not Date.now() as it will run imediately and create error 
    }
})

module.exports = mongoose.model("post", postSchema)
