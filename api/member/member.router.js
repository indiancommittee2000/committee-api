const { verifyToken } = require("../../auth/validationToken");
const { createMember, memberLogin, getMemberDetails } = require("./member.controller");

const router = require("express").Router();

router.post('/create', verifyToken, createMember);
router.post('/login', memberLogin);
router.get('/:id', getMemberDetails);
module.exports = router; 