import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected routes token based

export const requireSignIn = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            message: "Access denied. No token provided."
        })
    };


    try {
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
}