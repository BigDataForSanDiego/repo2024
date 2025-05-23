import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import authRouter from "./routers/authRouter";
import { authmiddleware } from "./middleware/authmiddle";

dotenv.config({path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(express.urlencoded({extended: true, limit: '50 mb'}))
app.use(express.json({limit: '50 mb'}))

app.use('/api/auth', authRouter)

const port = process.env.PORT || 5000
const start = async () => {
  try{
    await connectDB();
    app.listen(port, () =>{
      console.log(`Server is running on port ${port}`)
    })
  }
  catch(error){
    console.log(error)
  }
}
start();
