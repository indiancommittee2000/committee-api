require("dotenv").config();
const express = require('express');
const app = express();
const memberRoutes = require("./api/member/member.router");
const committeeRoutes = require("./api/committee/committee.router");
const transactionRoutes = require("./api/tranactions/transaction.router");

app.use(express.json());

app.use('/api/member', memberRoutes);
app.use('/api/committee', committeeRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/', (req,res) => {
    res.json({
        success:1,
        message:"welcome to committee api"
    });
});

app.use('*', (req, res) => {
    res.json({
        success: 0,
        message: "Invalid Url"
    })
});


app.listen(process.env.PORT || 3000, () => console.log('Server is running on port ' + process.env.APP_PORT));
