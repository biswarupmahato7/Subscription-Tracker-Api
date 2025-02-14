import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength:2,
        maxLength:50

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique:true,
        minLength:2,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],

        maxLength:50
    },
    password:{
        type: String,
        required: [true, 'User password is required!'],
        minLength: 6,

    }

},{timestamps:true})

const User = mongoose.model('User',userSchema);
export default User;