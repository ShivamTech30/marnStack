const mongoose =require ("mongoose")
mongoose.set("strictQuery",false)


mongoose.connect("mongodb+srv://EcommerceWeb:EcommerceWeb123@cluster0.rqasgf4.mongodb.net/Ecommerce")
.then((e)=>{
    console.log('connecetd')
}).catch((e)=>{
    console.log("not connecrted")
})

