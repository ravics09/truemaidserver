require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const userRoute = require("./routers/userRouter");
const connectDB = require('./configuration/connectDatabase');
const port = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 9090;

//To create database connection
connectDB();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));


app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})