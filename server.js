import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import eventRoute from './routes/eventRoute.js'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();

connectDB();


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))


app.use('/api/v1/auth',authRoute);
app.use('/api/v1/event',eventRoute);


app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
});

const port = 3001;

app.listen(port,() => {
    console.log(`Server is running on ${port}`.bgCyan.white)
})
