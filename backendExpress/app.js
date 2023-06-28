require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
require("./src/db/conn")
const Register = require("./src/model/registor")
const bcrypt = require("bcryptjs");
const Product = require('./src/model/registor');
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


const register = require("./src/routers/login")
const add_product = require("./src/routers/login")
const all_product = require("./src/routers/login");
const { Result } = require('antd');

app.use("/", register)
app.use("/", add_product)
app.use("/", all_product)


console.log("hjbdjhebhj")

// app.post("/register", async (req, res) => {
//     try {
//         const data = new Register(req.body)
//         if (req.body.password === req.body.confirmpassword) {
//             const token = await data.generateAuthToken()
//             const userDetails = await data.save();
//             // res.status(201).json({data:userDetails}) 
//             res.status(201).send({
//                 "data": userDetails,
//                 "message": "successful",
//                 "token": token
//             })
//         }
//         else {
//             res.status(404).send("password in not matched")
//         }

//     } catch (e) {

//         res.status(400).send(req.body)
//     }

// })


app.post("/login", async (req, res) => {
    try {

        //start redis Check 
        // let anykeyName="fname"
        // let getCacheData =await redisClient.get(anykeyName)
        // console.log("xscd",getCacheData)
        // let object ={
        //     name:"shivam",
        //     age:"25"
        // }

        // let responseArray=""
        // if(getCacheData){
        //     responseArray=JSON.parse(getCacheData)
        //     console.log("GET    cache")
        // }else{
        //     console.log("set cache")
        //     redisClient.set(keyName,JSON.stringify(object),{EX:30})
        //     responseArray=object
        // }


        //end redis Check 


        const email = req.body.email
        const password = req.body.password
        const details = await Register.findOne({ email: email })
        const match = await bcrypt.compare(password, details.password)
        const token = await details.generateAuthToken()
        if (match) {
            res.status(200).send({ details, token })
        }
        else {
            res.status(404).send("INVALID LOGIN DETAILS")
        }
    } catch (e) {
        res.status(400).send("INVALID DETAILS")
    }

})


// app.post("/add_product", async (req, res) => {
//     try {
//         const data = new Product(req.body)
//         const userDetails = await data.save();
//         res.status(201).send({
//             "data": userDetails,
//         })
//     }
//     catch (e) {
//         res.status(400).send(req.body)
//     }
// })





app.listen(port, () => {

    console.log(`conncted with that port ${port}`)
})