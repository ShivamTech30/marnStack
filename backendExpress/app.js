require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
require("./src/db/conn")
const Register = require("./src/model/registor")
const bcrypt = require("bcryptjs");
const Product = require('./src/model/registor');
const rolesModel =require("./src/model/rolesModel")
//  
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3003

//####### REDIS ########
const redis = require('redis')
// const redisClient =redis.createClient(6379,"127.0.0.1") this will take as default
const redisClient = redis.createClient(6379, "127.0.0.1")

// const redisClient =redis.createClient({
//     port:"any port",
//     host :"any "
// })  this you can make coustome


// check redis is connected or not 
redisClient.connect()

redisClient.on("connect", function (error) {
    console.log("redis is connecetd")
})


const register = require("./src/routers/_routes")
const add_product = require("./src/routers/_routes")
const all_product = require("./src/routers/_routes");
// const add_role = require("./src/routers/_routes");


// const { Result } = require('antd');

app.use("/", register)
app.use("/", add_product)
app.use("/", all_product)
// app.use("/", add_role) 

app.post("/login", async (req, res) => {
    try { 
        const email = req.body.email
        const password = req.body.password
        const details = await Register.findOne({ email: email })
        const match = await bcrypt.compare(password, details.password)
        const token = await details.generateAuthToken()

        const roles=details.role
        const permission =await rolesModel.findOne({role:roles})

        if (match) {
            res.status(200).send({ details, token,permission:permission })
        }
        else {
            res.status(404).send("INVALID LOGIN DETAILS")
        }
    } catch (e) {
        res.status(400).send("INVALID DETAILS")
    }

})

 





app.listen(port, () => {

    console.log(`conncted with that port ${port}`)
})