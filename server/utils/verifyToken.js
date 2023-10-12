const jwt = require('jsonwebtoken');
const { createError } = require("../utils/error.js");
const userModel = require("../models/Users.model.js");

const verifyToken = (req, res, next) => {
    // const token = req.cookies;
    // if (!token) {
    //     return next(createError(401, "You are not authenticated!"));
    // }

    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized. Missing or invalid token.' });
    }

    const tokenValue = token.split('Bearer ')[1];

    jwt.verify(tokenValue, process.env.JWT, async (err, decoded) => {
        if (err) return next(createError(403, "Token is not valid!"));

        try {
            const userId = decoded.id;

            const user = await userModel.findById(userId);

            if (!user) {
                return next(createError(403, "User not found!"));
            }

            req.user = user; // Attach the user to the request
            next();
        } catch (error) {
            return next(createError(500, "Internal server error"));
        }
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};


module.exports = { verifyToken, verifyUser, verifyAdmin };