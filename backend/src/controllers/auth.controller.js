import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt, { genSalt } from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup= async (req, res)=>{
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message: "All the fields are required"});
        } 

        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // 1234 => afe_^#&kndf

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        
        if(newUser){
            generateToken(newUser._id, res); // function in ../lib/utils.js
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }
        else{
            return res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login= async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isPassCorrect = await bcrypt.compare(password, user.password);
        if(!isPassCorrect) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic
        });


    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const logout=(req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: "0"});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


export const updateProfile=async(req, res)=>{
    try {
        const {profilePic}=req.body;
        const userID=req.user._id; // req.user in protectRoute middleware

        if(!profilePic){
            return res.status(400).json({message: "Provide the profile picture"});
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userID, {profilePic: uploadResponse.secure_url}, {new: true}); // uploadResponse.secure_url we take this from cloudinary

        res.status(200).json({updatedUser});

    } catch (error) {
        console.log("Error in updateProfile controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth=(req, res)=>{
    try {
        res.status(200).json(req.user); //req.user is in protectRoute middleware
    } catch (error) {
        console.log("Error in checkAuth controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}