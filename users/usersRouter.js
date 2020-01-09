const express = require('express');
const router = express.Router();
const authMW = require('../auth/authMW');
const users = require('./usersModel');
router.use(authMW);

router.get('/',(req,res) => {
    users.userList()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => {
            res.status(500).json({...err,message:"Error getting the user list"});
        })
})
router.get('/:id',(req,res) => {
    users.getUser(req.params.id)
        .then(user => {
            user
                ? res.status(200).json(user)
                : res.status(400).json({message:"There no user with that ID"});
        })
        .catch(err => {
            res.status(500).json({...err,message:"Error getting the user list"});
        })
})
router.get('/:id/graphs',(req,res) => {
    users.getGraphs(req.params.id)
        .then(graphs => {
            res.status(200).json(graphs)
        })
        .catch(err => {
            res.status(500).json({...err,message:`There was an error getting user ${req.params.id}'s graphs`})
        })
})

module.exports = router;