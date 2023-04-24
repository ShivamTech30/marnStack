require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
require("./src/db/conn")
const Register = require("./src/model/registor")
const bcrypt = require("bcryptjs");
const Product = require('./src/model/registor');

app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3003


const register = require("./src/routers/login")
const add_product = require("./src/routers/login") 
const all_product = require("./src/routers/login")

app.use("/",register)
app.use("/",add_product)
app.use("/",all_product)


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