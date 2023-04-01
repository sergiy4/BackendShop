import path from 'path'
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import routerUser from './routers/userRoutes.js';
import routerPrint from './routers/printRoutes.js';
import cors from 'cors';
import corsOption from './config/corsOption.js';
import connectDB from './config/dbConn.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT =  process.env.PORT;

connectDB()



app.use(cors())

app.use(express.json())



app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/user' ,routerUser)
app.use('/print' ,routerPrint)




app.all('*', (req,res) =>{
    res.status(404)

    if(req.accepts('html')){
        res.json({message : '404 not found'})

    }else if(req.accepts('json')){
        res.json({message : '404 not found'})
    }
    else{
        res.type('txt').send('404 not found')
    }
})



mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=> console.log('server running on port ' +PORT))
})

mongoose.connection.on('error', err => {
    console.log(err)
    
})