require('dotenv').config()

const express = require("express")
const app = express()
const cors = require("cors")
require("./db/conn")
const Register = require("./model/registor")
const bcrypt = require("bcryptjs")

app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3002

console.log(process.env.SECRET_KEY)

// app.get("/", (req, res) => {

// })

app.post("/register", async (req, res) => {
    try {
        const data = new Register(req.body)
        // console.log(data)
        if (req.body.password === req.body.confirmpassword) {
            console.log(data,"sjsddhsvjad")  

            const token = await data.generateAuthToken()

            console.log(token," qweweqwewe")

            const userDetails = await data.save();
            res.status(201).send(userDetails)
        }
        else {
            res.status(404).send("password in not matched")
        }

    } catch (e) {
        res.status(400).send(req.body)
    }

})


app.post("/login", async (req, res) => {
    try {

        const email = req.body.email
        const password = req.body.password

        const details = await Register.findOne({ email: email })

        const match = await bcrypt.compare(password, details.password)
        const token = await details.generateAuthToken()

        if (match) {
            
            res.status(200).send({details,token})
        }
        else {
            res.status(404).send("INVALID LOGIN DETAILS")
        }

        // console.log(email)

    } catch (e) {

        res.status(400).send("INVALID LOGIN DETAILS")

    }

})

app.listen(port, () => {
    console.log(`conncted with that port ${port}`)
})