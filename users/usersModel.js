const db = require('../data/dbConfig');

const userList = () => {
    return db('users').select('id','username','email');
}
const getUser = id => {
    return db('users').select('username','email').where({id:id}).first();
}
const getGraphs = id => {
    return db('graphs').select('id','name').where({owner:id})
}

module.exports = {
    userList,
    getUser,
    getGraphs
}