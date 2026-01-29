const express = require("express")
const app = express()

const path = require("path")

const userModel = require("./models/user")
const user = require("./models/user")

app.set("view engine", "ejs")
app.use(express.json()) // i dont know what it does
app.use(express.urlencoded({extended:true})) // dont know what it does
app.use(express.static(path.join(__dirname, "public"))) // same here



app.get("/", (req, res) => {
    res.render("index")
})


app.post("/create", async(req, res) => {
    let {name, email, image} = req.body;
    let createdUser = await userModel.create({
        name: name, // or just name if both are same name 
        email: email,
        image: image
    })
    res.redirect("/read")
})

app.get("/read", async (req, res) => {
    let allUsers = await userModel.find()
    res.render("read", {user: allUsers})
})

app.get("/edit/:userid", async (req, res) => {
    let user = await userModel.findOne({_id: req.params.userid})
    res.render("edit", {user})
})

app.post("/update/:userid", async (req, res) => {
    let {name, email, image} = req.body
    // let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name,email,image}, {new: true}) // same thing as statement below
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {
        name,
        email,
        image
    }, {new: true})

    res.redirect("/read")
})

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read")
})


app.listen(4000)