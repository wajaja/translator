/**
 * Module Dependencies
 */
var express      = require('express'),
    path         = require('path'),
    // favicon      = require('serve-favicon'),
    //http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/
    bodyParser  = require('body-parser'),
    helmet      = require('helmet'),

    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),
    session     = require('express-session'),
    redis       = require("redis"),
    RedisStore  = require('connect-redis')(session),
    routes      = require('./routes/index'),
    client      = redis.createClient();


require('./manager');

var config = require('./config/dev'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var app = express();

// =======================
// configuration =========
// =======================
app.use(helmet()) //It's best to use Helmet early in your middleware stack so that its headers are sure to be set.
app.use(helmet.noCache()) //disable client-side caching
app.use(helmet.xssFilter()) // Sets "X-XSS-Protection: 1; mode=block".
mongoose.connect(config.database, { useNewUrlParser: true }); // connect to database
app.set('appSecret', config.secret); // secret variable

/**
 * Middleware
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());  // TODO Explain
app.use(bodyParser.urlencoded({ extended: false }));
const projectRoot = path.resolve(__dirname, '../translator');
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
    cookie: { maxAge: 60000 }
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

module.exports = app;
