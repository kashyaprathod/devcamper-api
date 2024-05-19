const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: './config/config.env' });

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

//connect to databse
connectDb();

const app = express();

//Body Parser
app.use(express.json());
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//prevent cross site scripting
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10mins
  max: 100,
});
app.use(limiter);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on  port ${PORT}`.yellow
      .bold
  )
);

//handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
