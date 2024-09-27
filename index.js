

require('dotenv').config()

const express=require('express')
const connectDB=require('./config/connect')
const notificationRoutes=require('./routes/notification')

const app=express()
app.use(express.json())

app.use('/notification',notificationRoutes )
 app.get("/test",(req,re)=>{
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