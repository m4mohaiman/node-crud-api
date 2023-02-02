const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

const port = 6969;

app.get("/", (req, res) => {
  res.send("Hello World! Node");
});


mongoose.set('strictQuery' , false); 
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wrnfpsn.mongodb.net/Node-API?retryWrites=true&w=majority`).then(() => {
    //app server
    app.listen(port, () => { console.log(`Example app listening on port ${port}`);
    });
    console.log("Connect to Database!!!");}).catch((error) => {
    console.log(error);});
