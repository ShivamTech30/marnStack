const mongoose = require("mongoose")

const {Schema} = mongoose

const rolesSchema = new Schema({
    role:String, 
    permission: [{  type: String, }],   
    
},{
    timestamps:true
})  
const Roles = mongoose.model("roles", rolesSchema) 

module.exports = Roles 