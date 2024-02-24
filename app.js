import express from 'express';
import conn from "./db.js";
import dotenv from "dotenv";
import pageRoute from "./routes/pageRoute.js"
import userRoute from "./routes/userRoute.js"


dotenv.config();
conn();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/' , pageRoute);
app.use('/user', userRoute) 


app.listen(port)