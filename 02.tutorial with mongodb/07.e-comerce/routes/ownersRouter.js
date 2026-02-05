const express = require("express")
const { model } = require("mongoose")
const router = express()

router.get("/", (req, res) => {
    res.send("hay is not edible to human")
})

module.exports = router