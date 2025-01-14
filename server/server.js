const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const app = express();

// PORT CONNECTION // 
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`App runing on port ${port}`);
   
})