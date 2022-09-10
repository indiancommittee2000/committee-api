const { getAllTransactions, getCommitteeTransactions, getMembersCommitteeTransactions, getMemberTransactions, createTransaction } = require("./transactions.service");

module.exports = {
    createTransaction: (req, res) => {
        createTransaction(body, (error, result) => {
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
    getTransactions: (req, res) => {
        const memberId = req.query.memberId;
        const committeeId = req.query.committeeId;
        if (memberId && committeeId) {
            getMembersCommitteeTransactions(memberId, committeeId, (error, result) => {
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
        }
        else if (memberId) {
            getMemberTransactions(memberId, (error, result) => {
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

        }
        else if (committeeId) {
            getCommitteeTransactions(committeeId, (error, result) => {
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
        }
        else {
            getAllTransactions((error, result) => {
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
        }

    },
}