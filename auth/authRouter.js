const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('./authModel');
const secret = require('./authSecrets');

router.post('/login',(req,res)=>{
    const {username,password} = req.body;
    auth.login(username)
        .then(user => {
            if(user.password && bcrypt.compareSync(password,user.password)){
                const token = generateToken(user);
                res.status(201).json({username:user.username,email:user.email,token:token});
            } else {
                res.status(400).json({message:'Invalid username or password'})
            }

        })
        .catch(err => {
            res.status(500).json({...err,message:'Error logging in.'});
        })
})
router.post('/register',(req,res)=>{
    const {username,email} = req.body;
    const password = bcrypt.hashSync(req.body.password,8);
    auth.register(username,password,email)
        .then(user => {
            const token = generateToken(user);
            res.status(201).json({username:user.username,email:user.email,token:token});
        })
        .catch(err => {
            auth.unique(username,email)
                .then(dup => {
                    dup 
                    ? res.status(400).json({account:dup.username,message:'Account with that username or email already exists.'})
                    : res.status(500).json({...err,message:'Error registering account.'});
                })
                .catch(unique_error => {
                    res.status(500).json({...unique_error,message:'Please report this error to the backend dev.'});
                })
        })
})

const generateToken = user => {
	const payload = {
        subject: user.id,
		username: user.username
	}
	const options = {
		expiresIn: '1d'
	}
	return jwt.sign(payload,secret.jwtSecret,options);
}

module.exports = router;