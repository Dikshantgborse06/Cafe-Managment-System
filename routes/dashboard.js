//Here, all APIs related to dashboard are defined.

const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.get('/details',auth.authenticateToken,(req,res,next)=>{
    var categoryCount;
    var productCount;
    var billCount;
    var query = "select count(id) as categoryCount from category";

    connection.query(query,(err,results)=>{
        if(!err){
            categoryCount = results[0].categoryCount;  // at index 0, we are expecting categoryCount mentioned in query
        }
        else{
            return res.status(500).json(err);
        }
    })
    //new query
    var query = "select count(id) as productCount from product";
    connection.query(query,(err,results)=>{
        if(!err){
            productCount = results[0].productCount;
        }
        else{
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as billCount from bill";
    connection.query(query,(err,results)=>{
        if(!err){
            billCount = results[0].billCount;
            var data ={    // by executing all 3 queries, now we will return the complete results
                category: categoryCount,
                product: productCount,  
                bill: billCount    
            };
            return res.status(200).json(data);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//for explore purpose
module.exports = router;
//coonect it with to the index.js file