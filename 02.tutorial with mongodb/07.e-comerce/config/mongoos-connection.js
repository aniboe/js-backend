const mongoose = require("mongoose")
const dgbr = require("debug")("development:mongoose") // npm i debug

const config = require("config") // npm i config

// $env:DEBUG="development:mongoose"  //to see debug
// $env:DEBUG="development:mongoose*" // or this for all
// $env:DEBUG= // if not want to print

mongoose.connect(`${config.get("MONGODB_URI")}/e-comerce`) // this is only for local hoste not for external servers
.then(function(){
    dgbr("conncetd sussessfully");
    // learn how to make debugger for this 
})
.catch(function(err){
    dgbr(err);
    
})

module.exports = mongoose.connection
