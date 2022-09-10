const { verifyToken } = require("../../auth/validationToken");
const { getCommitteeDetails, getCommitteeDetailsBasedOnMember, createCommittee } = require("./committee.controller");

const router = require("express").Router();

router.get('/:id', verifyToken, getCommitteeDetails);
router.get('/member/:memberId', verifyToken, getCommitteeDetailsBasedOnMember);
router.post('/', verifyToken, createCommittee);

module.exports = router;