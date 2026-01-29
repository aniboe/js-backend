const express = require("express")
const app = express()

const userModel = require("./models/user")
const postModel = require("./models/posts")


app.get("/", (req, res) => {
    res.send("this works")
})

app.get("/create", async (req, res) => {
    let user = await userModel.create({
        username: "anisur",
        email: "fumail@fu.lon",
        age: 22,
    })
    res.send(user)
})
app.get("/post/create", async (req, res) => {
    let post = await postModel.create({
        postdata: "hello world",
        user: "697a32172d4c1407c95cc27d"
    })
    let user = await userModel.findOne({_id: post.user})
    user.post.push(post._id)
    await user.save() // await, since its async task. and if we make change on our own withiut using mongoose than we have to manualy save it

    res.send({post, user})
})


app.listen(3000)
