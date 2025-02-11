const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')

const indicatorsRouter = require('./routes/indicatorsRouter');
const userRouter = require('./routes/usersRouter')
dotenv.config({path:'./config.env'})

/// SERVER /// 
const app = express();

/// GLOBAL MIDDELEWARES ///

/// set security HTTP headers
app.use(helmet())

/// limit request from same IP
const limiter = rateLimit({
   max: 250,
   windowMs: 60 * 60 * 1000,
   message: 'too many requests from this IP please try again in an hour'
});
app.use('/api', limiter)

// Error handling middleware 
/// Body parser, reading data from body into req.body
app.use(cookieParser());
app.use(express.json());

app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));

/// Data sanitization against NoSql query injection 
app.use(mongoSanitize());

/// Data sanitization againt XSS
app.use(xss());

// app.use(hpp());

/// Serving static files
app.use(express.static(`${__dirname}/public`))

app.use((err, req, res, next) => { 
   res.status(err.status || 500).json({
       status: 'fail', message: err.message, errors: err.errors || {} 
   }); 
});

app.use(( req, res ,next ) => {
   req.requestTime = new Date().toISOString();
   console.log(req.cookies);

   next();
})

/// DB CONNECTION ///
mongoose.connect(process.env.DATABASE_MONGO_CONNECTION || process.env.DATABASE_LOCAL)
.then(() => console.log('mongoDB is connected'))
.catch( err =>{
   console.log('mongoDB doest connected',err);
});

/// ROUTER ///
app.use('/api/v1/indicators', indicatorsRouter)
app.use('/api/v1/users', userRouter)

/// HANDAL ERR ROUTER ///
app.all('*', (req, res, next) => {
   res.status(404).json({
      status:'fail',
      message: `cant find ${req.originalUrl} on this server`
   })
})

// PORT CONNECTION // 
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`App runing on port ${port}`);
   
})