const express = require("express")
const app = express()

const userModel = require("./user_model") //




app.get("/", (req, res) => {
    res.send("hello world")
})


// app.get("/create", async (req, res) => {
//     let createduser = await userModel.create({
//         name: "definatelynotme",
//         username: "lolocnotme",
//         email: "lolnotmeelol@gmsil.com"
//     })

//     res.send(createduser)
// })




// app.get("/update", async (req, res) => {
//     // userModel.findOneUpdate({find based on },{ what to update },{new:true})
//     let updateduser = await userModel.findOneAndUpdate({username: "ocnotme"}, {name: "hahanot me "}, { new: true})

//     res.send(updateduser)
// })


app.get("/read", async (req, res) => {
    let user = await userModel.find() // to find all
    // let user = await userModel.findOne({username: "ocnotme"}) / showes one value and it is first 
    // let user = await userModel.find({username: "ocnotme"}) 

    res.send(user)
})



app.get("/delete", async (req, res) => {
    let user = await userModel.findOneAndDelete({username: "ocnotme"}) 

    res.send(user)
})

app.listen(3000)

