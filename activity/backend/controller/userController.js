const connection = require("../model/db");
const { v4: uuidv4 } = require('uuid');

async function getAllUsers(){

}
async function getUserById(){

}
async function updateUserById(){

}
async function deleteUserById(){

}

async function createUserPromisified(userObject){
    return new Promise(function(resolve, reject){
        const {uid, name, email, password, username, bio, isPublic} = userObject;
        let sql;
        if(isPublic != undefined){
            sql = `INSERT INTO user_table(uid, name, email, password, username, bio, isPublic) VALUES('${uid}', '${name}', '${email}', '${password}', '${username}', '${bio}', ${isPublic})`;
        }
        else{
            sql = `INSERT INTO user_table(uid, name, email, password, username, bio) VALUES('${uid}', '${name}', '${email}', '${password}', '${username}', '${bio}')`;
        }
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}

async function createUser(req, res){
    try{
        const uid = uuidv4();
        const {name, email, password, username, bio, isPublic} = req.body;
        
        let userObject = {
            uid, name,
            email,
            password,
            username,
            bio,
            isPublic
        }
        let data = await createUserPromisified(userObject);
        res.status(200).json({
            message:"User created successfully",
            data
        })
    }
    catch(error){
        res.json({
            message: "Failed to create user",
            error
        })
    }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.createUser = createUser;