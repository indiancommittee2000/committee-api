const { verifyToken } = require("../../auth/validationToken");
const {createTransaction, getTransactions} = require("./transaction.controller");

const router = require("express").Router();

router.post('/create', verifyToken, createTransaction);
router.get('/', verifyToken, getTransactions);
module.exports = router; 