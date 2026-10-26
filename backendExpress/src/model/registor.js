const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    number: { type: Number, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    role: [{ type: String, default: "USER" }],
    paidAt: { type: Date, default: Date.now }
});

// generate token
employeeSchema.methods.generateAuthToken = async function () {
    try {
        const secretKey = process.env.SECRET_KEY || "asdfghjklasdfghjlqasdfghjklasdfghjkl";
        const tokenData = jwt.sign({ _id: this._id.toString() }, secretKey);
        return tokenData;
    } catch (error) {
        console.error("Error generating auth token:", error);
        throw error;
    }
};

// convert password into hash before saving
employeeSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = this.password;
    }
    if (this.email) {
        this.email = this.email.toLowerCase().trim();
    }
});

const Register = mongoose.model("Register", employeeSchema);

module.exports = Register; 