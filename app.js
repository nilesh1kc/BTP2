const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const mapRouter = require('./routes/mapRoutes')
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const globalErrorHandler = require('./controller/errorController');
const app = express();
app.use(cors());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'template'));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(helmet());
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginResourcePolicy: {
            allowOrigins: ['*']
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ['*'],
                styleSrc:['*',"'unsafe-inline'"],
                scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
            }
        }
    })
)
// app.use(helmet.contentSecurityPolicy({
//     useDefaults: false,
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "http://localhost:8080", "https://localhost:8080", "http://ajax.googleapis.com", "https://fonts.googleapis.com","https://api.tiles.mapbox.com"], // 
//         objectSrc: ["'none'"],
//         fontSrc: ["'self'", 'https://fonts.gstatic.com',,"https://api.tiles.mapbox.com"],
//         styleSrc: ["'self'", 'https://fonts.googleapis.com',"https://api.tiles.mapbox.com","'unsafe-inline'"],
//         upgradeInsecureRequests: [],
//     },
// }))


const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
// Required Parsers
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

//Routes
app.use('/', viewRouter)
app.use('/api/v1/map', mapRouter);
app.use('/api/v1/users', userRouter)

app.use(globalErrorHandler);

app.all('/', (req, res, next) => {
    res.status(404).json({
        status: 'failed',
        message: 'You are making a wrong request'
    })
})

module.exports = app;