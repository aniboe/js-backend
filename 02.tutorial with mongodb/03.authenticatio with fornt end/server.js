const express = require("express")
const app = express()

const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")


const userModel = require("./models/user")

const path = require("path") // dont known what it does

app.set("view engine", "ejs")
app.use(express.json()) // dont known what it does
app.use(express.urlencoded({extended: true})) // dont known what it does
app.use(express.static(path.join(__dirname, "public"))) // dont known what it does

// app.use(express.urlencoded({extended: false})) // another thing that i have no idea what it is 

app.use(cookieParser())

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/create", (req, res) => {
    res.render("index")
})
app.post("/create", (req, res) => {
    // let {username, email, password, age} = req.body // i can do this but i am mot for now

    bcrypt.genSalt(10, (err, salt) => {
        // console.log(salt);
        bcrypt.hash(req.body.password, salt , async (err, hash) => {
            // console.log(hash);
            let createdUser = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                age: req.body.age
            })
            // let token = jwt.sign({req.body.email}, "shhhhhhhhhhhhhh") // this doesnt work, below is righ way
            let token = jwt.sign({emial: req.body.email}, "shhhhhhhhhhhhhh") // dosnt matter where i write this , as ong as its inside funcrion scope i works (here atleast)
            res.cookie("email", token)
            res.send(createdUser)
        })
    })
    
})

app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async(req, res) => {
    let user = await userModel.findOne({
      username: req.body.username  
    })
    if(!user) return res.send("something went wrong")
    
    
    // _________________this works bu dont add callback function after(this is promiss version)
    
    // const isTrue = await bcrypt.compare(req.body.password, user.password)
    // console.log(isTrue);
    // if(!isTrue){
    //     res.send("something went wrong")
    // }else res.send("you are logged in")

    // ___________________________________this is callback version
    const isTrue = await bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(result); 
        if(result){
            let token = jwt.sign({email: req.body.email, username: req.body.username}, "shhhhhhhhhhhhhh") // dosnt matter where i write this , as ong as its inside funcrion scope i works (here atleast)
            res.cookie("email_user", token)
            res.send("you are logged in ")} 
        else res.send("check cookie dumass")
    })
    // ____________________________________________________________________

})


app.get("/logout", (req, res) => {
    // res.cookie("token", "") // scam
    res.clearCookie("email")
    res.send("cookie has bee cleared")
})

app.listen(3000)