// console.log("its working");
const express = require("express")
const jst = require("jsonwebtoken")
const parcer = require("cookie-parser") // this helps read cookie data // have to use it to in line

const db = require("better-sqlite3")("login_DB")
db.pragma("journal_mode = WAL")

const app = express()


// creating database
const createTable = db.prepare(`CREATE TABLE IF NOT EXISTS login_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )`).run()


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
// app.use(express.urlencoded({extended:true}))

app.use(parcer()) // this helps use cookie parcer



app.use(function(req, res, next){
    res.locals.errors = []
    next()
})

app.get("/", (req, res) => {
    // res.send("it works")
    if(req.cookies.this_is_a_test){
        return res.render("home")
    }
    res.redirect("/register")
})



app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", (req, res) => {
    const user = req.body.user_name
    const pass = req.body.password
    const errors = []

    // const userCheck = db.prepare("SELECT user, password FROM login_user WHERE user = ? AND password = ?").get(user, pass)
    // if (!userCheck) errors.push("this user username/password doest exist")

    const userCheck = db.prepare("SELECT * FROM login_data WHERE user = ? AND password = ?").get(user, pass)
    if(!userCheck) errors.push("lol")

    if (errors.length){
        res.render("login",{errors})
    }

    res.cookie("this_is_a_test", {user},{
        httpOnly: true,
        secure: true,
        maxAge: 1000*60*16
    });
    
    res.redirect("/")
})

app.post("/logout",(req, res) => {
    res.clearCookie("this_is_a_test") // to remove cookie
    res.redirect("/register")
})


app.get("/register", (req, res) => {
    // res.send("worked?")
    // res.render("register", {errors: []})
    res.render("register")
})
app.post("/register", (req, res) =>{
    const user = req.body.user_name
    const pass = req.body.password
    const errors = []

    // create a database if already not exist at top of code 

    // chaeck criteria for password and username
    if(user === "") errors.push("u must give an username")
    if(pass === "") errors.push("u must give an password")

    if(user && user.length <=3) errors.push("username must be attleast 4 character")
    if(pass && pass.length <=6) errors.push("password must be attleast 6 character")

    // check if user already exists
    const userCheck = db.prepare("SELECT * FROM login_data WHERE user = ?").get(user) 
    if(userCheck) errors.push("this username already exists")

    if(errors.length){
        return res.render("register",{errors})
    }
    // if doesnt exist then encrypt and create new account
    const userInput = db.prepare("INSERT INTO login_data (user, password) VALUES(?, ?)").run(user, pass)
    
    // if successfully registered than give them cookie and give then access to home page
    res.cookie("this_is_a_test", {user},{
        httpOnly: true,
        secure: true,
        maxAge: 1000*60*16
    });
    // res.send("thanks")
    res.redirect("/")
    
})

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000")
// })

app.listen(3000)

//  after his project is done , yo make a real life login page that works with google, facebook etc and phone number