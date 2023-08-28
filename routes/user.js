

const express = require('express');
const connection = require('../connection'); 
const router = express.Router();
//Signup API
const jwt = require('jsonwebtoken');  //importing  jw token in order to generate the same
require('dotenv').config(); //importing involvement file 
//We will also require a scret key to encrypt and decrypt jwt

//For forgetting password, we'll import package
const nodemailer = require('nodemailer');

//Authentication and checkRole:
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


//Postman is an application used for API Testing.
router.post ('/signup',(req,res) =>{   //mapping
    let user = req.body;  //the value of bosy is stored in user
    query = "select email,password,role,status from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){   
            if(results.length <=0){  //if email or user already have account ot not
                query = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')"
                connection.query(query, [user.name, user.contactNumber, user.email, user.password],(err,results)=>{  //executes the query
                    if(!err){
                        return res.status(200).json({message: "Successfully Registered.."});
                    }
                    else{
                        return res.status(500).json(err);
                    }  
                })
            } 
            else{
                return res.status(400).json({message : "Email Already Exist.."});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
    
})
//Creating or Adding new login APIs
router.post('/login',(req,res)=>{
    const user= req.body;  //geting value from the body stored in var 'user'

    query = "select email,password,role,status from user where email=?";
    connection.query(query, [user.email] , (err,results) =>{
        if(!err){
            if(results.length <=0 || results[0].password != user.password){   //email address is sent to us is incorrect 
                return res.status(401).json({message:"Incorrect Username or Password.."});
            }
            else if(results[0].status == 'false'){  //user need for admin approval
                return res.status(401).json({messages:"Wait for Admin Approval.."});
            }
            else if(results[0].password == user.password){   //if this condt satisfies then we will generate the token
                const response = {email: results[0].email, role: results[0].role}
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN,{expiresIn: '8h'})
                res.status(200).json({token: accessToken});
            }
            else{
                return res.status(400).json({message:"Something went wrong. Please try again later."});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//Sending email 
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
//Creating new API for above process


router.post("/forgotPassword",(req,res) =>{
    const user = req.body;
    query = "select email,password from user where email=?";
    connection.query(query,[user.email],(err,results) =>{
        if(!err){
            if(results.length <=0){  //user doesn't exist in our database
                return res.status(200).json({message: "Password sent successfully to your email."});
            }
            else{
                var mailOptions ={
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password by CAFE MANAGEMENT SYSTEM',
                    html: '<p><b>Your Login details for Cafe Management System</b><br><b>Email:</b>' + results[0].email + '<br><b>Password:</b>'+ results[0].password + '<br><a href="http://localhost:42000/">Click here to login</a></p>'
                };
                transporter.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json({message: "Password sent successfully to your email."});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//Creating APIs for all the Users
router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    var query = "select id,name,email,contactNumber,status from user where role='user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})
//we login, we get a token
//for each user,it corresponding API is open
//Now restricting it


//Creating a new API to change/update the status of user
router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res)=>{  //patch->cause we are doing modification
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query,[user.status, user.id],(err,results)=>{ //query[a,b] we will get ie a and b
        if(!err){
            if(results.affectedRows == 0){   //if the update is not done, if done then status affectedRow must be updated by 1 as we are updating 1 record
                return res.status(404).json({message: "User ID does not exist"}); //doesnt updated it
            }
            return res.status(200).json({message: "User Updated Successfully..."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

//Creating another API for check the token
router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"}); //means all the API created are working fine
})
//Another API to change the password
router.post('/changePassword',auth.authenticateToken,(req,res)=>{
    const user = req.body;
    const email = res.locals.email; //we will get the email form particular authenticateToken
    var query = "select * from user where email=? and password=?";
    connection.query(query,[email, user.oldPassword],(err,results)=>{
        if(!err){
            if(results.length <=0){
                return res.status(400).json({message:"Incorrect Old Password"});
            }
            else if(results[0].password == user.oldPassword){
                query = "update user set password=? where email=?";
                connection.query(query,[user.newPassword,email],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Password Updated Successfully."});
                    } 
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else{
                return res.status(400).json({message:"Something went worng. Please try again."});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })
})
module.exports = router;