const mongoose = require("mongoose")
// const validation= require("validation") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const Schema = mongoose.Schema;
const employeeSchema = new Schema({

    name: { type: String, required: true },
    number: { type: Number, required: true, min: 10 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    confirmpassword: { type: String, required: true, }, 
    role:[{type: String}]
        // tokens: [{ token: { type: String, required: true, } }]
})

 


// generate token

employeeSchema.methods.generateAuthToken = async function () {
    try {

        const tokenData = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        // this.tokens = this.tokens.concat({ token: tokenData })
        // this.tokens[0].token = tokenData
        await this.save()
        return tokenData


    } catch (error) {

        console.log(" ,jshjhgjdhgjh ", error)
    }
}






// convert password into hash 

employeeSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10)
    }

})

const Register = mongoose.model("Register", employeeSchema) 

module.exports = Register 