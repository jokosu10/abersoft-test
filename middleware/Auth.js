require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to generate a token
function generateToken(user) {
    // Generate a token
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, { expiresIn: '2h' });
    return token;
}

// check token manually
function checkToken(token) {
    if (!token || !token.startsWith('Bearer ')) {
        throw new Error('Invalid token when check token');
    }

    const formattedToken = token.split(' ')[1];

    if (!formattedToken) {
        throw new Error('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(formattedToken, process.env.TOKEN_KEY);

        const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

        if (decoded.exp < currentTimestamp) {
            throw new Error('Token has expired');
        }
        decoded.message = 'Token is valid';
        return decoded;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else {
            throw new Error('Invalid token');
        }
    }
}

module.exports = {
    generateToken,
    checkToken
};
