const mongoose =require ("mongoose")
mongoose.set("strictQuery",false)
mongoose.connect("mongodb://localhost:27017/demos")
.then((e)=>{
    console.log('connecetd')
}).catch((e)=>{
    console.log("not connecrted")
})