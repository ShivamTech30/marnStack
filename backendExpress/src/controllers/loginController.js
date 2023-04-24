const Register = require("../model/registor");
const catchAsyncErrors = require("../middleware/catchAsynErrors");




exports.registerDetails = catchAsyncErrors(async (req, res, next) => {
     const { name, number, email, password, confirmpassword } = req.body 
    
    const register = await Register.create({
        name,
        number,
        email,
        password,
        confirmpassword,
         paidAt: Date.now(),
        // user:req.user._id,
    })

    res.status(201).json({
        success: true,
        register
    })
})