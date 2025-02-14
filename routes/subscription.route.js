import { Router } from "express";
import authorize from '../middlewares/auth.middlewares.js'
import { createSubscription,getUserSubscriptions } from "../controller/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/',(req,res) =>{
    res.send({
        title: 'GET all subscription'
    })
})

subscriptionRouter.get('/:id',(req,res) =>{
    res.send({
        title: 'GET  subscription details'
    })
})

subscriptionRouter.post('/', authorize,  createSubscription)

subscriptionRouter.put('/:id',(req,res) =>{
    res.send({
        title: 'UPDATE subscription'
    })
})

subscriptionRouter.delete('/:id',(req,res) =>{
    res.send({
        title: 'DELETE subscription'
    })
})

subscriptionRouter.get('/user/:id',authorize, getUserSubscriptions)

export default subscriptionRouter;