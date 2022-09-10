const pool = require('../../config/dbConnection');

module.exports = {
    createTransaction: (body, callback) => {
        pool.query(`insert into committeeTest.transactions(committeeId,memberId,
                    amountPaid,installmentMonth,statusCode) values(?,?,?,?,?);`,
            [body.committeeId, body.memberId, body.amountPaid,
            body.installmentMonth, body.statusCode],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    getAllTransactions: (callback) => {
        pool.query(`select Id,committeeId,memberId,amountPaid,installmentMonth,
                    remarks,statusCode,createdOn from committeeTest.transactions;`,
            [], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    getMemberTransactions: (memberId, callback) => {
        pool.query(`select Id,committeeId,memberId,amountPaid,installmentMonth,remarks,
                    statusCode,createdOn from committeeTest.transactions where memberId=?;`,
            [memberId], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    getMembersCommitteeTransactions: (memberId, committeeId, callback) => {
        pool.query(`select Id,committeeId,memberId,amountPaid,installmentMonth,remarks,statusCode,
                    createdOn from committeeTest.transactions where committeeId=? and memberId=?;`,
            [committeeId, memberId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    getCommitteeTransactions: (committeeId, callback) => {
        pool.query(`select Id,committeeId,memberId,amountPaid,installmentMonth,remarks,
                    statusCode,createdOn from committeeTest.transactions where committeeId=?;`,
            [committeeId], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
}