import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketID, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req, res)=>{
    try {
        const loggedInUserID= req.user._id; //req.user in  protectRoute middleware
        const filteredUsers = await User.find({_id: {$ne:loggedInUserID}}).select("-password"); //fetching all the users except the logged in user

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getMessages = async(req, res)=>{
    try {
        const {id: userToChatID}=req.params;
        const myID=req.user._id; 

        const message= await Message.find({ // find all the messages where sender is me and receiver is the user i am chattinf with or vice versa
            $or:[
                {senderID: myID, receiverID: userToChatID},
                {senderID: userToChatID, receiverID: myID}
            ]
        });

        res.status(200).json(message);

    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


export const sendMessage = async(req, res)=>{
    try {
        const {text, image} = req.body;
        const {id: receiverID} = req.params;
        const senderID = req.user._id;

        let imageURL;
        if(image) {
            //upload base64 image to cloudinary 
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL=uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderID, 
            receiverID,
            text,
            image: imageURL,
        })

        await newMessage.save();

        const receiverSocketID = getReceiverSocketID(receiverID);
        if(receiverSocketID){ // if user is online
            io.to(receiverSocketID).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}