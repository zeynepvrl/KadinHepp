import express from 'express';
import conn from "./db.js";
import dotenv from "dotenv";
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
import { errorHandler } from './middlewares/errorHandler.js';


dotenv.config();
conn();

const app = express();
const port = process.env.PORT;

app.use(cors()) 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/' , pageRoute);
app.use('/user', userRoute) 
app.use(errorHandler)


app.listen(port)