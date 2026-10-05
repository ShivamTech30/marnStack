const mongoose =require ("mongoose")
mongoose.set("strictQuery",false)


// mongoose.connect("mongodb+srv://EcommerceWeb:EcommerceWeb123@cluster0.rqasgf4.mongodb.net/Ecommerce")
const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/${process.env.DATABASE_NAME}`;

mongoose.connect(mongoURI)
.then((e)=>{
    console.log(`connected database successfully`)
}).catch((e)=>{
    console.log("not connected", e)
})
