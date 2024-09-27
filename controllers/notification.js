const mongoose=require('mongoose')
const admin =require('../config/firebase')
const User =require('../model/User')

const sendNotification=async(req,res)=>{
    const {token,title,description,imageUrl}=req.body;
    try {
        const response =await admin.messaging().send({
            token:token,
            data:{
                title:title,
                description:description,
                imageUrl:imageUrl
            },
            
        })
        res.status(200).send(`notification sent successfully🚀:${JSON.stringify(response)}`)
        
    } catch (error) {
        res.status(500).send(`error sending notification: ${error.message}`)
    }
}


const broadcastNotification=async(req,res)=>{
    const {title,description,imageUrl}=req.body;
    try {
        const users=await User.find().select('device_token -_id')
        const deviceTokens=users?.map((user)=>user.device_token)

        const response =await admin.messaging().sendEachForMulticast({
            tokens:deviceTokens,
            data:{
                title:title,
                description:description,
                imageUrl:imageUrl
            },
            
        })
        res.status(200).send(`notification Broadcast sent successfully🚀:${JSON.stringify(response)}`)
        
    } catch (error) {
        res.status(500).send(`error Broadcasting notification: ${error.message}`)
    }
}

const registerToken=async(req,res)=>{
    const {device_token}=req.body

    try {
        let user =await User.findOne({device_token})
        if(user){
            return res.status(200).send('Device token already registered')
        }
        user= new User({device_token})
        await user.save()
        res.status(201).send(`registeration successful🚀}`)
    } catch (error) {
        res.status(500).send(`error registering token: ${error.message}`)
    }

}

module.exports= {sendNotification,broadcastNotification,registerToken}