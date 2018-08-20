var express             = require('express');
var mongoose            = require('mongoose');
var bcrypt              = require('bcrypt');
var jwt                 = require('jsonwebtoken'); // used to create, sign, and verify tokens
var url                 = require('url');
var app                 = require('../app');
var UserSchema          = require('../app/models/user'); // get our mongoose model
var LanguageSchema      = require('../app/models/language'); // get our mongoose model
var {
    translatePhraseStr
}                       = require('../server/translate');
var renderFullPage      = require('./renderFullPage');
var verifyToken         = require('./verifyToken');

var router      = express.Router();
var User        = mongoose.model('User', UserSchema);
var Language    = mongoose.model('Language', LanguageSchema);


// route to authenticate a user (POST http://localhost:8080/api/login_check)
router.post('/api/login_check', function(req, res) {
    // find the user
    console.log('body', req.body);
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        // console.log('26', err);
        if (err) console.log('jiffj');
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err) {
                    res.status(401).json({
                        failed: err
                    });
                }
                if(result) {
                    var token = jwt.sign({
                      email: req.body.email,
                  }, '91005translator', { expiresIn: '1d' });

                    //set access_token in session
                    let sessData = req.session;
                    sessData.access_token = token;

                    // return the information including token as JSON
                    return res.json({
                        success: true,
                        token: token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });

                    console.log('31', result);
                }
                return res.status(401).json({
                    failed: err
                });
            });
        }
    });
});


router.post('/api/signup', function(req, res) {
    const body = req.body;
    console.log('checking...', body);

    bcrypt.hash(body.password, 10, function(err, hash){
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            // create a sample user
            var user = new User({
                name: body.name,
                email: body.email,
                password: hash,
                admin: true
            });

            var languages = body.languages;

            languages.forEach(function(l, i) {
                user.languages.push({'title': l});
            })

            // save the sample user
            user.save(function(err, savedUser) {
                if (err) {
                    console.log(err.message);
                    if(err.message.indexOf('E11000 duplicate key error index') >= 0 &&
                       err.message.indexOf('translator.users.$email_1') >=0) {
                        return res.json({
                            success: false,
                            message: 'Email already used'
                        });
                    } else {
                        return res.json(err);
                    }
                }

                var token = jwt.sign({
                  email: req.body.email,
                }, '91005translator', { expiresIn: '1h' });

                //set access_token in session
                let sessData = req.session;
                sessData.access_token = token;

                // return the information including token as JSON
                return res.json({
                    success: true,
                    token: token,
                    user: {
                        id: savedUser.id,
                        name: savedUser.name,
                        email: savedUser.email
                    }
                });
            });
        }
    });
});

router.post('/api/translate', function(req, res) {
    //
    const body   = req.body,
    phrase       = body.phrase,
    source_lang  = body.source_lang,
    target_lang  = body.target_lang,
    order        = body.order,
    uniqueString = body.uniqueString,
    phrase_str   = phrase[1];

    var translated = translatePhraseStr(phrase_str, order, uniqueString, source_lang, target_lang);
    return translated.then(function(data) {
            return res.json(data);
        }, function(err) {
            return res.json(err);
    });

});

router.get('/api/users/me', verifyToken, function(req, res) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.json({"message":"There was a problem finding the user."});

        if (!user) return res.json({err:"No user found."});

        res.json(user);
    });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/api/users', verifyToken, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get(`/api/users/:id`, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// router.get('/login', function(req, res, next) {
//
//     let params = {
//         url: req.url,
//         title: 'Traducteur. Français - lingala',
//         preloadedState: {
//             Translator: {
//                 access_token: 'myToken'
//             }
//         }
//     }
//
//     // res.send('index rendered');
//     renderFullPage(req, res, params);
// });

router.all('*', function(req, res, next) {

    var sessData = req.session;
    // sessData.someAttribute = "foo";
    // var someAttribute = req.session.someAttribute;

    let params = {
        url: req.originalUrl,
        title: 'Traducteur. Français - lingala',
        preloadedState: {
            Translator: {
                access_token: sessData.access_token
            },
        }
    }

    // res.render('index', {title: 'some title', r: 'jkg'});
    // res.send('index rendered');
    renderFullPage(req, res, params);
});

// route middleware to verify a token
// router.use(function(req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     // decode token
//     if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, '91005translator', function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });

module.exports = router;
