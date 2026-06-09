const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        const authHead = req.headers.authorization;

        if (!authHead) {
            res.status(401).json({ message: "Unauthorized access!" })
        }

        const token = authHead.split(" ")[1];

        const decoded = jwt.verify(token, "aeroSecretKey");

        if (!decoded) {
            res.status(401).json({ message: "Unauthorized access!" })
        }

        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: "Error while authenticating user", details: error.message });
    }
}

module.exports = {
    authentication
}