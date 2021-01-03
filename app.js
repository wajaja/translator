/**
 * Module Dependencies
 */
var noCache      = require('nocache')
var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    //http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/
    bodyParser  = require('body-parser'),
    helmet      = require('helmet'),

    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),
    session     = require('express-session'),
    redis       = require("redis"),
    csp         = require("helmet-csp"),
    RedisStore  = require('connect-redis')(session),
    routes      = require('./routes/index').default,
    client      = redis.createClient();


require('./server/francais-lingala/manager');

var config = require('./config/dev'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var app    = express();
var projectRoot = (process.platform === 'win32') ? path.resolve(__dirname, 'translator') : '/opt/nodejs/translator';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});


// =======================
// configuration =========
// =======================
app.use(helmet()) //It's best to use Helmet early in your middleware stack so that its headers are sure to be set.
app.use(noCache()) //disable client-side caching
app.use(helmet.xssFilter()) // Sets "X-XSS-Protection: 1; mode=block".

app.use(
    csp({
        directives: {
            defaultSrc: [`'self'`],
            scriptSrc: [`'self'`, `'unsafe-inline'`, `code.jquery.com`, `stackpath.bootstrapcdn.com`, `fonts.googleapis.com`],
            // objectSrc: ["'none'"],
            styleSrc: [`'self'`, `'unsafe-inline'`,  `code.jquery.com`, `stackpath.bootstrapcdn.com`, `fonts.googleapis.com`],
            objectSrc: [`'self'`, `'unsafe-inline'`],
            fontSrc: [`'self'`, `'unsafe-inline'`,  `fonts.gstatic.com`],
            upgradeInsecureRequests: [],
        },
        reportOnly: false,
    })
);

mongoose.connect(
    config.database, 
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, }
); // connect to database
app.set('appSecret', config.secret); // secret variable

/**
 * Middleware
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(projectRoot, 'public/images', 'zxt4.png')));
app.use(bodyParser.json());  // TODO Explain
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('build', express.static(__dirname))
app.use('/build', express.static(path.join(projectRoot, '/build')));
app.use(express.static(path.join(projectRoot, '/public')));
// Log requests to console
app.use(morgan('dev'));
//The session middleware won't get called for any requests that get handled by router
app.use(session({
    secret: '91005translator',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        client: client,

    }),
    cookie: { maxAge: 86400000 } //1 day
}))

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('trust proxy', 1) // trust first proxy

/**
 * Logging
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500)
           .send({
                message: err.message,
                errori: err.toString()
            });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
       .send({
            message: err.message,
            erroro: err.toString()
        });
});

exports.redisClient = client;
module.exports = app;
