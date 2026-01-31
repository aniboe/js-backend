const express = require("express")
const app = express()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userModel = require("./models/user")
const postModel = require("./models/post")

const cookieParser = require("cookie-parser")
const path = require("path")


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
            res.cookie("token", token).redirect("/profile") // below two .sends create give error so if ther are multiple sends then use it like this
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
    if(!user) return res.status(500).send("user doesnt exists") // return is important

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

app.get("/profile", isLoggedIn, async (req, res) => {
    // console.log(req.user); this shows values inserted in jwt

    let user = await userModel.findOne({email: req.user.email}).populate("posts") // dont know what it does
    console.log(user); // shows the details of user

    // user.populate("posts") // this is not how you are sposed to do this ^
    
    res.render("profile", {user})
})


app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    let post = await postModel.create({
        user: user._id,
        content: req.body.content,

    })
    user.posts.push(post._id)
    await user.save() // whenwe manualy do this we have to save it manualy
    res.redirect("/profile") 

})

function isLoggedIn(req, res, next){
    if(!req.cookies.token){
        res.redirect("/login")
    }else{
        let data = jwt.verify(req.cookies.token, "shhhh")
        req.user = data // this is accessed /profile 
        next()
    }
    
}

app.listen(3000)


