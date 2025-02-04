import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import authRouter from "./routers/authRouter";
import hospitalRouter from "./routers/hospitalRouter";
import { authmiddleware } from "./middleware/authmiddle";
import cors from 'cors';


dotenv.config({path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(express.urlencoded({extended: true, limit: '50 mb'}))
app.use(express.json({limit: '50 mb'}))
app.use(cors());

app.use('/api/auth', authRouter)
app.use('/api/hospitals', hospitalRouter)


const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
console.log(port)
const start = async () => {
  try{
    await connectDB();
    app.listen(port, '0.0.0.0', () =>{
      console.log(`Server is running on port ${port}`)
    })
  }
  catch(error){
    console.log(error)
  }
}
start();
