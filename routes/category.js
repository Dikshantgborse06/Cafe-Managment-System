const express = require('express');
const connection = require('../connection');
const router = express.Router();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

//API to add category to our database
router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res,next) =>{
    let category = req.body;
    query = "insert into category (name) values(?)";
    connection.query(query,[category.name],(err,results) =>{
        if(!err){
            return res.status(200).json({message: "Category Added Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//New API for/to get all Category
router.get('/get',auth.authenticateToken,(req,res,next) =>{
    var query = "select * from category order by name";
    connection.query(query,(err,results) =>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//API for updating anyu record
router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next) =>{
    let product = req.body;
    var query = "update category set name=? where id=?";
    connection.query(query,[product.name , product.id], (err,results) =>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Category does not found.."});
            }
            else{
                return res.status(200).json({message: "Category Updated Successfully"});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//export
module.exports = router;
// after this, we need to connect this all APIs to our project so in index page, we need to import 