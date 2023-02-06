const mongoose =require ("mongoose")
mongoose.connect("mongodb://localhost:27017/registration")
.then((e)=>{
    console.log('connecetd')
}).catch((e)=>{
    console.log("not connecrted")
})