const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const agentsRouter = require('./routes/agentsRouter');

dotenv.config({path:'./config.env'})

const app = express();

/// DB CONNECTION ///
mongoose.connect(process.env.DATABASE_MONGO_CONNECTION || process.env.DATABASE_LOCAL)
.then(() => console.log('mongoDB is connected'))
.catch( err =>{
   console.log('mongoDB doest connected',err);
   
});

/// ROUTER ///
app.use('api/v1/agents', agentsRouter)

// PORT CONNECTION // 
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`App runing on port ${port}`);
   
})