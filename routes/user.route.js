const express = require("express")
require("dotenv").config()
const {UserModel}= require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User Registration
 *     description: Register a new user by providing name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       409:
 *         description: User already exists. Please log in.
 *       500:
 *         description: Internal server error.
 */

userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try {
        if(!name || !email || !password){
            res.status(400).send({"msg":"Enter all required fields"})
        }
        else{
            bcrypt.hash(password, 5,async(err, hash) =>{
                // Store hash in your password DB.
                const user = new UserModel({name,email,password:hash})
                await user.save()
                res.status(200).send({"msg":"User is registered"})
            });
 

        }
      
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate and log in an existing user by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful. Returns an access token.
 *       400:
 *         description: Password is incorrect or other client errors.
 *       404:
 *         description: Email does not exist.
 *       500:
 *         description: Internal server error.
 */

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
      const user =  await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    res.status(200).send({"msg":"Login is succesful","token":jwt.sign({"userID":user._id},process.env.token)})
                }
                else{
                    res.status(400).send({"msg":"Wrong Password"})
                }
                
            });
        }
        else{
            res.status(400).send({"msg":"user not found"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {userRouter}