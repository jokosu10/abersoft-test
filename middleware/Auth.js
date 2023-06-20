require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to generate a token
function generateToken(user) {
    // Generate a token
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, { expiresIn: '2h' });
    return token;
}

const extractBearerToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.slice(7);

        req.token = token;
    }

    next();
};

const verifyToken = (req, res, next) => {
    const token = req.token;

    if (token == null) {
        return res.status(403).json({
            message: "A token is required for authentication"
        });
    } else {
        try {
            jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid token' });
                }

                // Attach the decoded token payload to the request object
                req.decodedToken = decoded;

                next();
            });
        } catch (err) {
            return res.status(401).json({
                message: "Missing Token"
            });
        }
    }

};

module.exports = {
    generateToken,
    verifyToken,
    extractBearerToken
};