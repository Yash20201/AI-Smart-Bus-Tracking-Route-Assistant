const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try{
        const token = req.headers("Authorization");

        if(!token){
            return res.status(401).json({
                message: "access denied"
            });
        }

     
       const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

         req.user = decoded;

        next();

    } catch(err){
        res.status(401).json({
            message: "invalid token"
        });
    }   
};