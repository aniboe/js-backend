// ___________________________how to add cookie and how to read cookie

// const cookieParser = require("cookie-parser")
// const express = require("express")
// const app = express()

// const jwt = require("jsonwebtoken")

// app.use(cookieParser())


// app.get("/", (req, res) => {
//     // res.cookie("cookie_name", "cookie_value")
//     res.cookie("cookie_name", "cookie_value_value")
//     res.send("it works")
// })


// app.get("/read", (req, res) => {
//     // res.cookie("cookie_name", "cookie_value")
//     console.log(req.cookies);    
//     res.send("read")
// })

// app.listen(3000)



// const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()

const bcrypt = require("bcrypt")

// const jwt = require("jsonwebtoken")

// app.use(cookieParser())



// __________________this is encryption________________________________

// app.get("/", (req, res) => { //below line is is sntax for bcrypt
//     /*bcrypt.genSalt(saltRounds, function(err, salt) {  // "salt" is a reandom string tha gets mixed with the password
//         bcrypt.hash(myPlaintextPassword, salt, function(err, hsh){
//             // Store hash inyour passwod db
//         })
//     })*/
//     const pass = "mypassword"
//     bcrypt.genSalt(10, function(err, salt) {
//         console.log("this is salt:",salt)
//         bcrypt.hash(pass, salt, function(err, hash){ // hash stores hashes pass
//             console.log(`hashed password for:${pass} is : ${hash}`);
//             console.log(hash);
//         })
//     })
//     res.send("it works")
// })

// app.get("/compare", (req, res) => {
//     const pass = "mypassword"
//     const hash = "$2b$10$vCZH7eb7LPbmJPA5T7e/lOZC3FN/InORoac36VkJu5WJ0OPTjv07K"
//     bcrypt.compare(pass, hash, function(err, result) { // "result" stores true/false
//         console.log(result);
        
//     })
//     res.send("pass is right")
// })

// ________________________________below JWT (json web token)


const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.get("/", (req, res) => {
    // jwt.sign({email: "thisisatestemail@tst.com"}, "secret") // this is syntax
    let token = jwt.sign({email: "thisisatestemail@tst.com"}, "secret")
    console.log(token);
    res.cookie("token", token)
    res.send("it ?")
})

app.get("/read", (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret")
    console.log(data)
    res.send(data)
})


app.listen(3000)
