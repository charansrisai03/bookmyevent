import eventModel from "../models/eventModel.js";
import userModel from "../models/userModel.js";



export const createEventController = async(req,res) =>{
try {
const {title,description,place,date,time} = req.body;
  const organiser = req.user._id;

if(!title || !description || !place || !date ||!time || !organiser){
return res.status(501).send({
success:false,
message:"Give all the details"
})
}
const event = await new eventModel({title,description,place,date,organiser,time}).save();
res.send({
success:true,
message:"Added event",
event,
})

} catch (error) {
return res.status(500).send({
message:'Error in organising an event',
success:false,
error
})
}
}


export const getAllEventsController = async(req,res) =>{
    try{
        
        const events = await eventModel.find({})
        res.status(200).send({
            success:true,
            message:"successfully fetched all the events",
            events
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"error while fetching events"
        })
    }
}

export const getEventController = async(req,res) =>{
    try{

        const {title} = req.params
        const event = await eventModel.findOne({title})
        res.status(200).send({
            success:true,
            message:"successfully fetched all the events",
            event,
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:"error while fetching events"
        })
    }
}

export const removeEventFromUserController = async (req, res) => {
  try {
    const { title } = req.params;
    const event = await eventModel.findOne({ title });
    const user = await userModel.findById(req.user._id);
    const userEvents = user.events;

    for (let i = 0; i < user.events.length; i++) {
      if (user.events[i]._id.equals(event._id)) {
        userEvents.splice(i, 1);

        const updatedUser = await userModel.findByIdAndUpdate(
          user._id,
          { $set: { events: userEvents } },
          { new: true }
        );
      }
    }

    res.send({
      success: true,
      message: "Successfully deleted event",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error while deleting event",
    });
  }
};

export const getHostedEventsController = async(req,res) => {
  try{

      const events = await eventModel.find({organiser:req.user._id})
     
      res.status(200).send({
          success:true,
          events
      })
  }   
  catch(error)
  {
      res.status(500).send({
          success:false,
          message:"error while fetching hosted events"
      })
  }
}

export const getEventUsersController = async(req,res) => {
  try{
      const {eid} = req.params;
      const event = await eventModel.findById(eid)
      const eventusers = event.users
      res.status(200).send({
          success:true,
          eventusers
      })
  }
  catch(error){
      res.status(200).send({
          success:true,
          message:"error while fetching users of event"
      })
  }
}
