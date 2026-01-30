const express = require("express")
const app = express()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userModel = require("./models/user")
const postModel = require("./models/post")

const cookieParser = require("cookie-parser")
const path = require("path")
const { hash } = require("crypto")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))




app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("index")
})
app.post("/register", async(req, res) => {
    let {username, password, name, email, age} = req.body
    let userCheck =  await userModel.findOne({
        email
    })

    if (userCheck) return res.status(500).send("user already eists")
        
    bcrypt.genSalt(10, (err, salt) => {
        // console.log(salt);
        bcrypt.hash(password, salt, async (err, hash) => {
            // console.log(result);
            // res.send(result)
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })

            let token = jwt.sign({email: email,userid: user._id}, "shhhh");
            res.cookie("token", token).send("you are registered") // below two .sends create give error so if ther are multiple sends then use it like this
            // res.send("registered") Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        })
          
    })
    // res.send("you are registered") // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
})

app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async (req, res) => {
    let {username, password} = req.body
    let user = await userModel.findOne({
        username
    })
    if(!user) res.status(500).send("user doesnt exists")

    bcrypt.compare(password, user.password, (err, result) => {
        // console.log(result);
        if(result){
            let token = jwt.sign({email: user.email, userid: user._id}, "shhhh")
            res.cookie("token", token)
            res.redirect("/profile")
        }else res.send("there seems o hae been some problem")
        
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
})

app.get("/profile", isLoggedIn, (req, res) => {
    console.log(req.user);
    
    res.render("temp")
})

function isLoggedIn(req, res, next){
    if(!req.cookies.token){
        res.send("please login/signup")
    }else{
        let data = jwt.verify(req.cookies.token, "shhhh")
        req.user = data
    }
    next()
}

app.listen(3000)


