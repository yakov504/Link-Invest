const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const agentsRouter = require('./routes/agentsRouter');
const userRouter = require('./routes/usersRouter')
dotenv.config({path:'./config.env'})

/// SERVER /// 
const app = express();

// Error handling middleware 
app.use(express.json())

app.use((err, req, res, next) => { 
   res.status(err.status || 500).json({
       status: 'fail', message: err.message, errors: err.errors || {} 
   }); 
});

/// DB CONNECTION ///
mongoose.connect(process.env.DATABASE_MONGO_CONNECTION || process.env.DATABASE_LOCAL)
.then(() => console.log('mongoDB is connected'))
.catch( err =>{
   console.log('mongoDB doest connected',err);
});

/// ROUTER ///
app.use('/api/v1/agents', agentsRouter)
app.use('/api/v1/users', userRouter)

// PORT CONNECTION // 
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`App runing on port ${port}`);
   
})