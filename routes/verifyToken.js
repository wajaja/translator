var jwt     = require('jsonwebtoken');


function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token)
        return res.status(403).json({auth: false, message: 'No token provided.'});
    jwt.verify(token, '91005translator', function(err, decoded) {
        if (err)
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}
export default verifyToken;
