const Roles =require("../model/rolesModel")


module.exports.addRole =async(req, res, next) => { 
 

    console.log("mbvdvdd",req.body)

    const {role,permission}=req.body  


    const newRole=await Roles.create({role,permission})

    // const isSaved=await newRole.save()

    if(newRole){
        return  res.send({code:200,message:"role added"}) 

    }
    else {
        return  res.send({code:500,message:"internal server error"}) 

    }



 }


module.exports.deleteRole = (req, res, next) => { 
    return  res.send({code:200,message:"role added"}) 
   }
   