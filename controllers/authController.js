import { comaprePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone} = req.body;
        if(!name || !email || !password || !phone)
        {
            return res.send({error: "Enter all the details"});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.send({
                success: true,
                message:"User already registered"
            })
        }
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({name,email,phone,password:hashedPassword}).save()

        res.send({
            success:true,
            message:"User registered successfully",
            user,
        })

    }catch(error){
        res.send({
            success:false,
            message:"Error in registration",
            error
        })
    }
}

export const loginController = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.send({
                successs:false,
                message:"Invalid email or password"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comaprePassword(password,user.password);
        if(!match){
            return res.send({
                success:false,
                message:"Invalid password"
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.send({
            success:true,
            message:"Logged in successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                _id:user._id,
            },
            token,
        });


    }catch(error){
        res.send({
            success:false,
            message:"Error in login",
            error
        })
    }
}


export const participateController = async(req,res) => {
    try{ 
        const {eid} = req.params;
        const event = await eventModel.findById(eid)
        let eventusers = event.users;
        const olduser = await userModel.findById(req.user._id)
        let userevents = olduser.events;
        for(let i=0;i<userevents.length;i++)
        {
            if(userevents[i]._id.equals(event._id))
            {
                return res.status(200).send({
                    success:true,
                    message:'already registered for the event'
                })
                
            }
        }
        userevents.push(event);
        const user = await userModel.findByIdAndUpdate(req.user._id,{events:userevents},{new:true}).populate('events')
        eventusers.push(user);
        const newev= await eventModel.findByIdAndUpdate(event._id,{users:eventusers},{new:true});

        res.status(200).send({
            success:true,
            message:"registered for the event successfully",
            user
        })

    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"error has occured"
        })
    }
}


export const getParticipatedEventsController = async(req,res) => {
    try{
        const user = await userModel.findById(req.user._id)
        const events = user.events;
        res.status(200).send({
            success:true,
            events
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"error while getting prods"
        })
    }
}
  