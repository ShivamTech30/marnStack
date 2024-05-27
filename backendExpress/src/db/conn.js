const mongoose =require ("mongoose")
mongoose.set("strictQuery",false)


// mongoose.connect("mongodb+srv://EcommerceWeb:EcommerceWeb123@cluster0.rqasgf4.mongodb.net/Ecommerce")
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`)

.then((e)=>{
    console.log(`connecetd data base is  ${process.env.DATABASE_NAME}`)
}).catch((e)=>{
    console.log("not connecrted")
})

