/* eslint-disable no-unused-vars */
import express from 'express'
import {PORT} from './config/env.js'

import uerRouter from './routes/user.route.js'
import subscriptionRouter from './routes/subscription.route.js';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js';
import connectedToDb from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workFlow.route.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware)

app.get('/v2/workflows', (req, res) => {
    res.json({ message: "Workflows API is working" });
});

app.get('/',(req,res)=>{
    res.send('Welcome baby')
})

app.listen(PORT, async ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    await connectedToDb()
})

