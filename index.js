

require('dotenv').config()
const cors= require('cors')
const express=require('express')
const connectDB=require('./config/connect')
const notificationRoutes=require('./routes/notification')

const app=express()
app.use(express.json())
app.use(cors())
app.use('/notification',notificationRoutes )
 app.get("/test",(req,res)=>{
    res.send({msg:"running.."})
 })
const start =async()=>{
    const PORT = process.env.PORT || 3000;

    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>
        console.log(`Http server is running on port:${PORT} `)
    )
    } catch (error) {
        console.log("error while starting server:"+error)
    }
}

start()