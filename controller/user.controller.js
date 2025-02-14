
import User from "../models/user.model.js";

//get all users
export const getUsers = async(req, res, next) =>{
    try{
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        })

    }catch(error){
        next(error)

    }
}

//get single user

export const getUser = async(req, res, next) =>{
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('User Not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            data: user
        })

    }catch(error){
        next(error)

    }
}
