import express from 'express';
import conn from "./db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import cors from "cors"
import { errorHandler } from './middlewares/errorHandler.js';
import { checkUser } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
import fileUpload from 'express-fileupload';
import {v2 as cloudinary} from "cloudinary" 


dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

conn();


const app = express();
const port = process.env.PORT;

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs',swaggerUi.serve , swaggerUi.setup(swaggerDocument))

app.use(cors()) 

app.use(express.json())
app.use(cookieParser());
app.use(fileUpload({useTempFiles:true}))
app.use(express.urlencoded({extended:true}))

app.use("*" , checkUser)
app.use('/' , pageRoute);
app.use('/user', userRoute)
app.use('/post',postRoute)
app.use('/ay',pageRoute)
//app.use(errorHandler)


app.listen(port)