const express = require('express')

const router = express.Router()

const transactions = require('../Models/Bank')

// router.get("/transactions", function(req, res) {
//     console.log("Ok");
//     res.status(200).send("API is working properly");
// });

router.get('/transactions', function (req, res) {

    transactions.find({}, function (err, trans) {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.status(200).send(trans);
        }
})})

router.post('/transactions', function (req, res){
    let trans = new transactions(req.body.data)
    trans.save()
    res.status(200).send('ok')
})

router.delete('/transactions', function (req, res){
    let trans = req.body.transactionObj

    transactions.findOneAndDelete({amount:trans.amount,vendor:trans.vendor,category:trans.category}, function(err, song){
        res.send('deleted')
    });
})

module.exports = router