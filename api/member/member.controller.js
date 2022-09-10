const { create, memberLogin, getMember } = require("./member.service");
const { sign } = require("jsonwebtoken");

module.exports = {
    createMember: (req, res) => {
        const body = req.body;
        create(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "database error",
                    error: error.sqlMessage
                });
            }

            return res.status(200).json({
                success: 1,
                data: result
            })
        });
    },
    memberLogin: (req, res) => {
        const body = req.body;
        memberLogin(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "database error",
                    error: error.sqlMessage
                });
            }
            if (result.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "Wrong phone No. and password"
                });
            }

            jsonToken = sign({ result: result[0] }, process.env.TOKEN_KEY, {
                expiresIn: "7d"
            })
            return res.status(200).json({
                success: 1,
                data: {
                    id: result[0].id,
                    token: jsonToken
                }
            })
        })
    },
    getMemberDetails: (req, res) => {
        const id = req.params.id;
        getMember(id, (error, result) => {
            if (error) {
                res.json({
                    success: 0,
                    message: "database error",
                    error: error,
                });
            }
            
            res.json({
                success: 1,
                data: result
            })
        })
    }
} 