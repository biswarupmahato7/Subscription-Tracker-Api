import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

import mongoose from "mongoose"
import e from "express";
//signUp
export const signUp = async (req,res,next) =>{
    const session = await mongoose.startSession();

    session.startTransaction()

    try{
        //create a new user
        const {name, email, password} = req.body

        //Check if a user already exist or not
        const existUser = await User.findOne({email})

        if(existUser){
            const error = new Error('User already exist')
            error.statusCode = 409 // already exist
            throw error
        }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //new user
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], {session})
        
        //CREATE TOKEN
        const token = jwt.sign({userId: newUsers[0]._id},JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User Created',
            data: {
                token,
                user: newUsers[0]
            }

        })

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error)
    }

}

//singIn
export const signIn = async (req,res,next) =>{
    try{
        const {email,password} = req.body;
    const user = await User.findOne({email})

    if(!user){
        const error = new Error('User not Found')
        error.statusCode = 404
        throw error
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        const error = new Error('Invalid password')
        error.statusCode = 401;
        throw error
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN})
    res.status(200).json({
        success: true,
        message: 'User signed in successfully',
        data:{
            token,
            user
        }
    })


    }catch(error){
        next(error)
        
    }
    
}


export const signOut = async (req,res,next) =>{
    
}