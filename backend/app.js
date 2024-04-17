const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

// Initializing express application
const app = express();

// Connects the morgan middleware for logging info about reqs & res's
// Connects cookieparser & express.json for parsing cookies & JSON bodies
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
// enable cors only in development
    app.use(cors());
}

  // helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
   })
);

  // Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);


const routes = require('./routes');

// ...

app.use(routes); // Connect all the routes










module.exports = app;
