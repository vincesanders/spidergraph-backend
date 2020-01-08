const db = require('../data/dbConfig');

const login = username => {
    return db('users')
        .select('username','password','email')
        .where({username:username})
        .first()
}
const register = async (username,password,email) => {
    await db('users').insert({username:username,password:password,email:email})
    return db('users')
        .select('username','email')
        .where({username:username})
        .first()
}
const unique = (username,email) => {
    return db('users')
        .select('username','password','email')
        .where({username:username})
        .orWhere({email:email}).first()
}
module.exports = {login,register,unique}