const express = require("express");
const userRouter = require("./router/userRouter");
const app = express();

app.use(express.json());

//user=>
// get all user., get a user,create a post update a user, delete a user 

app.use("/api/user", userRouter);


//post=>
//get all post , get a post, create a post, update a post, delete a post

//on the basis of id

//get all followers // get all following
//see pending request // send request // accept a peding request // cancel pending request // unfollow 




app.listen(3000, function(){
    console.log("app is listening at 3000 port");
})
