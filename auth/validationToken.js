const { verify } = require("jsonwebtoken");

module.exports = {
    verifyToken: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.TOKEN_KEY, (error, decoded) => {
                if (error) {
                    res.json({
                        sucess: 0,
                        message: "Invalid Token !"
                    });
                }
                else {
                    next();
                }
            })
        }
        else {
            res.json({
                success: 0,
                message: "Access Denied !"
            })
        }
    }
}