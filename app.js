/**
 * Module Dependencies
 */
var express      = require('express'),
    path         = require('path'),
    // favicon      = require('serve-favicon'),
    //http://blog.slatepeak.com/creating-a-simple-node-express-api-authentication-system-with-passport-and-jwt/
    bodyParser  = require('body-parser'),

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
mongoose.connect(config.database); // connect to database
app.set('appSecret', config.secret); // secret variable

/**
 * Middleware
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());  // TODO Explain
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Log requests to console
app.use(morgan('dev'));
app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(session({
    secret: '91005translator',
    resave: false,
    saveUninitialized: true,
    // store: new RedisStore({
    //     client: client,
    //
    // }),
    cookie: { maxAge: 60000 }
}))

/**
 * Logging
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
