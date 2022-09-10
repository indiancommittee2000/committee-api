const pool = require('../../config/dbConnection');
module.exports = {
    getCommittee: (id, callback) => {
        pool.query(`select co.id,co.createdMonth,co.createdYear,
                    co.completedMonthCount,co.isActive,ct.title,ct.duration,ct.amount,ct.memberCount 
                    from committeeTest.committees as co inner join committeeTest.committeeTemplates 
                    as ct on co.committeeTemplateId = ct.id where co.id = ?;`, [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            });
    },
    getCommitteeBids: (id, callback) => {
        pool.query(`select id,memberId,bidMonth,bidYear,bidIterationCount,loss,monthlyInstalment,createdOn 
                   from committeeTest.committeeBids where committeeId=? order by bidIterationCount desc`, [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    getMemberCommittees: (id, callback) => {
        pool.query(`select committeeId,Count from committeeTest.membersCommitteeWiseMapping where memberId=?;`,
            [id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    createCommittee: (body, callback) => {
        pool.query(`insert into committeeTest.committees(committeeTemplateId,completedMonthCount,createdMonth,createdYear) values(?,?,?,?);`,
            [body.committeeTemplateId,
            body.completedMonthCount,
            body.createdMonth,
            body.createdYear], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    createCommitteeTemplate: (body, callback) => {

    },
    createBid: (body, callback) => {

    },
    AddMemberToCommittee: (committeeId, memberId, memberCount, callback) => {
        pool.query(`insert into committeeTest.membersCommitteeWiseMapping(memberId,committeeId,count) values(?,?,?);`,
            [memberId,
                committeeId,
                memberCount], (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, results);
                });
    },
    getCommitteeTemplateDetails: (id, callback) => {
        pool.query(`select id,title,amount,duration,maxInstallment,memberCount 
                    from committeeTest.committeeTemplates where id=?;`,
            [id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            });
    },
}
