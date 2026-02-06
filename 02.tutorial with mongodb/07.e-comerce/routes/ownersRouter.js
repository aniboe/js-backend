const express = require("express")
const router = express()

const ownerModel = require("../models/owner-model")

if(process.env.NODE_ENV === "development"){
    router.post("/create", async(req, res) => {

        // foe now we are accessing dataset directly but 
        // use "npm install joi" and authenticake this (dont know what that means)

        let owner = await ownerModel.find()

        if (owner.length > 0) return res.status(503).send("you dont have permition to create new owner") 

            // ALL STATUS NUMBERS
            // 
            /*
            🟢 2xx — Success
                Status	Name	When to use it
                200	OK,	Request succeeded (GET, PUT, normal success)
                201	Created,	Resource successfully created (POST)
                202	Accepted,	Request accepted, processing later (jobs, queues)
                204	No Content,	Success but no response body (DELETE)

            🟡 3xx — Redirection (less common in APIs)
                Status	Name	When to use it
                301	Moved, Permanently	Resource URL changed forever
                302	Found,	Temporary redirect
                304	Not Modified,	Client cache is still valid

            🔵 4xx — Client Errors (user messed up)
                Status	Name	When to use it
                400	Bad Request,	Invalid request data / malformed JSON
                401	Unauthorized,	Not logged in / missing token
                403	Forbidden,	Logged in but not allowed
                404	Not Found,	Resource doesn’t exist
                409	Conflict,	Duplicate data (email already exists)
                422	Unprocessable Entity,	Validation failed (Joi, Zod, etc.)
                429	Too Many Requests,	Rate limiting

            🔴 5xx — Server Errors (your fault 😅)
                Status	Name	When to use it
                500	Internal Server Error,	Something crashed
                502	Bad Gateway,	Invalid response from another server
                503	Service Unavailable,	Server down / maintenance
                504	Gateway Timeout,	Another service didn’t respond

            */

        else{
            let createdOwner = await ownerModel.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
            })
            res.status(201).send(createdOwner)
        }
        

    })
}

router.get("/", (req, res) => {
    res.send("hay is not edible to human")
})



module.exports = router