const { response } = require("express");
const memberService = require("../member/member.service");
const { getCommittee, getCommitteeBids, getMemberCommittees, getCommitteeTemplateDetails, createCommittee,AddMemberToCommittee } = require("./committee.service");

module.exports = {
    getCommitteeDetails: (req, res) => {
        const id = req.params.id;
        var committeeDetail = {
        };
        getCommittee(id, (error, result) => {
            if (error) {
                res.json({
                    success: 0,
                    message: "database error",
                    error: error,
                });
            }
            committeeDetail.basicDetail = result;
            getCommitteeBids(id, (error, result) => {
                if (error) {
                    res.json({
                        success: 0,
                        message: "database error",
                        error: error,
                    });
                }
                committeeDetail.bids = result;
                res.json({
                    success: 1,
                    data: committeeDetail
                });
            });
        });
    },
    getCommitteeDetailsBasedOnMember: async (req, res) => {
        const memberId = req.params.memberId;
        var committeesDetails = [];
        getMemberCommittees(memberId, (error, result) => {
            if (error) {
                res.json({
                    success: 0,
                    message: "database error",
                    error: error,
                });
            }
            let requests = result.map((committee) => {
                const committeeId = committee.committeeId;
                console.log("committee Id", committeeId);
                var tempResult = {};
                tempResult.memberDetail = {
                    id: memberId,
                    memberCount: committee.Count,
                    committeeId: committeeId
                }
                return new Promise((resolve, reject) => {
                    getCommittee(committeeId, (error, result) => {
                        if (error) {
                            reject();
                        }
                        tempResult.committeeBasicDetail = result;
                        committeesDetails.push(tempResult);
                        console.log(committeesDetails);
                        resolve();
                    });
                });

            });
            Promise.all(requests).then(() => res.json({
                success: 1,
                data: committeesDetails
            }));
        });
    },
    createCommittee: (req, res) => {
        const body = req.body;
        const validate = validateCreateCommitteeRequest(body);
        if (!validate.isValid) {
            res.json({
                success: 0,
                message: validate.message,
            });
        }
        let totalMemberCount = 0;
        body.members.forEach(element => {
            totalMemberCount += element.memberCount;
        });
        getCommitteeTemplateDetails(body.committeeTemplateId, (error, result) => {
            if (error) {
                res.json({
                    success: 0,
                    message: "Error Occured",
                    error: error
                });
            }
            if (totalMemberCount != result.memberCount) {
                res.json({
                    success: 0,
                    message: "Member Count not Matched",
                });
            }
            return createCommittee(body, (error, createCommitteeResult) => {
                if (error) {
                    res.json({
                        success: 0,
                        mesaage: "Error During Create Committee",
                        error: error
                    });
                }
                const committeeId = createCommitteeResult.insertId;
                let requests = body.members.map((member) => {
                    return new Promise((resolve, reject) => {
                        AddMemberToCommittee(committeeId, member.memberId, member.memberCount, (error, result) => {
                            if (error) {
                                console.log(error);
                                reject(error);
                            }
                            console.log(result);
                            resolve();
                        });
                    });
                });
                Promise.all(requests).then(() => res.json({
                    success: 1,
                    data: {
                        committeeId: committeeId
                    }
                }))
                .catch((error) => console.log(error));
            });
        });
    }
}

const validateCreateCommitteeRequest = (body) => {
    if (!body.committeeTemplateId || body.committeeTemplateId == "" || !Number.parseInt(body.committeeTemplateId)) {
        return { message: "Invalid committeeTemplateId:('" + body.committeeTemplateId + "')", isValid: false };
    }
    else if (!body.completedMonthCount || body.completedMonthCount == "" || !Number.isInteger(body.completedMonthCount)) {
        return { message: "Invalid completedMonthCount:('" + body.completedMonthCount + "')", isValid: false };
    }
    else if (!body.createdMonth || body.createdMonth == "" || !Number.isInteger(body.createdMonth)) {
        return { message: "Invalid createdMonth:('" + body.createdMonth + "')", isValid: false };
    }
    else if (!body.createdYear || body.createdYear == "" || !Number.isInteger(body.createdYear)) {
        return { message: "Invalid createdYear:('" + body.createdYear + "')", isValid: false };
    }
    else {
        return { isValid: true };
    }
}