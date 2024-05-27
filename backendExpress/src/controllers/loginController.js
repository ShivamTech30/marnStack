const Register = require("../model/registor");
const catchAsyncErrors = require("../middleware/catchAsynErrors");




exports.registerDetails = catchAsyncErrors(async (req, res, next) => {
     const { name, number, email, password, confirmpassword ,role} = req.body 
     console.log(req.body)
    
    const register = await Register.create({
        name,
        number,
        email,
        password,
        confirmpassword,
        role,
         paidAt: Date.now(),
        // user:req.user._id,
    })

    res.send({"status":201,"message":register})
})


 
 