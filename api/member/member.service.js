const pool = require("../../config/dbConnection");

module.exports = {
    create: (data, callback) => {
        pool.query(`insert into members(name,mailId,phoneNo,password) values(?,?,?,?)`,
            [data.name,
            data.mailId,
            data.phoneNo,
            data.password],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    getMember: (id, callback) => {
        pool.query(`select id,name,mailId,phoneNo from members where id=? limit 1;`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    memberLogin: (data, callback) => {
        pool.query(`select id from members where phoneNo=? and password=? limit 1;`,
            [data.phoneNo,
            data.password],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null,results);
            })
    }
}