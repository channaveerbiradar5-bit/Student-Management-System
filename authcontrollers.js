const fs = require('fs');
const path = require('path');
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "sms-secret-key", {
        expiresIn: "1d"
    });
};

const registerUser = async (req,res)=>{
    try{
        const log = `REGISTER ${new Date().toISOString()} BODY=${JSON.stringify(req.body)}\n`;
        console.log('registerUser called', req.body);
        fs.appendFile(path.resolve(__dirname, '../register.log'), log, (err) => {
          if (err) console.error('Failed to write register log:', err);
        });
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required🫨"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({message:"User registered successfully",
        token:generateToken(user._id),
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
 
    } catch (error) {
        const errLog = `REGISTER ERROR ${new Date().toISOString()} ${error.stack || error.message}\n`;
        console.error('Register error:', error);
        fs.appendFile(path.resolve(__dirname, '../register.log'), errLog, (err) => {
          if (err) console.error('Failed to write register error log:', err);
        });
        res.status(500).json({message: error.message});
    }
};

//login
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not Exist"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});

        }
        res.status(200).json({message:"Login successful",token:generateToken(user._id),
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
module.exports = {registerUser,loginUser};