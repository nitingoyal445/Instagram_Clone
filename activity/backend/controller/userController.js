const connection = require("../model/db");
const { v4: uuidv4 } = require('uuid');

function getAllUsers(req, res){
        const sql = `SELECT * FROM user_table`;
        connection.query(sql, function(error, data){
        if(error){
            res.json({
                message : "Failed to get all users",
                error
            })
        }
        else{
            res.status(200).json({
                message: " Got all users !!",
                data
            })
        }
    })
}

function getUserById(req, res){
        const {id} = req.params;
        const sql = `SELECT * FROM user_table WHERE uid = '${id}'`;
        console.log(sql); 
        connection.query(sql, function(error, data){
            if(error){
                res.json({
                    message : "Failed to get user",
                    error
                })
            }
            else{
                if(data.length){
                    res.status(200).json({
                        message:"Got user by id",
                        data
                    });
                }
                else{
                    res.status(200).json({
                        message : "No User Found !!"
                    })
                }
            }
        }) 
}

function updateUserById(req, res){
    const {id} = req.params;
    const updateObject = req.body;
    let sql = `UPDATE user_table SET `;
    for(key in updateObject){
        sql+= `${key} = '${updateObject[key]}',`
    }
    sql = sql.substring(0, sql.length-1);
    sql += ` WHERE uid = '${id}'`;
    // console.log(sql);
    connection.query(sql, function(error, data){
        if(error){
            res.json({
                message:"Failed to update",
                error
            })
        }
        else{
            res.status(201).json({
                message: "updated user !!",
                data
            })
        }
    })
}


function deleteUserById(req, res){
    const {id} = req.params;
    const sql = `DELETE FROM user_table WHERE uid='${id}'`;
    connection.query(sql , function(error, data){
            if(error){
                res.json({
                    message:"Failed to delete a user",
                    error
                })
            }
            else{
                if(data.affectedRows){
                    res.status(200).json({
                        message: "Successfully deleted a user",
                        data
                    })
                }
                else{
                    res.json({
                        message: "No user found !!"
                    })
                }
                
            }
        })

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