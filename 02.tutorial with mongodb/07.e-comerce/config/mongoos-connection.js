const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/e-comerce") // this is only foe local hoste not for external servers
.then(function(){
    console.log("conncetd sussessfully");
    // learn how to make debugger for this 
})
.catch(function(err){
    console.log(err);
    
})

module.exports = mongoose.connection
