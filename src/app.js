const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const app = express();
const cors = require('cors')
const PORT  = process.env.PORT || 3000;
const aiRoutes = require('./routes/ai.routes')
const authRoute = require('./routes/authRoutes')

app.use(express.json())
dotenv.config()
app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST",
    credentials: true
  }));
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.catch((err)=>console.log(err))

app.use('/api/auth',authRoute);
app.use('/ai',aiRoutes);

app.use('/',(req,res)=>{
    res.send("Hello World")
}) 

module.exports = app;
