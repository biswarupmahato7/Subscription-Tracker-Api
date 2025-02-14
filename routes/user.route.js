import { Router } from "express";
import { getUsers, getUser } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middlewares.js";

const userRouter = Router()

userRouter.get('/',getUsers)

userRouter.get('/:id', authorize, getUser)

// userRouter.post('/',getUser)

userRouter.put('/',(req,res)=>{
    res.send({
        title: 'UPDATE user'
    })
})

userRouter.delete('/',(req,res)=>{
    res.send({
        title: 'DELETE user'
    })
})

export default userRouter