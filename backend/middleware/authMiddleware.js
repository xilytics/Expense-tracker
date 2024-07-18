const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Token:', token);
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Decoded User:', decoded.user);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};



module.exports = authenticate;
