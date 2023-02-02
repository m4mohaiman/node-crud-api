const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel');
require('dotenv').config();
const app = express();
app.use(express.json())

const port = 6969;

app.get("/", (req, res) => {
  res.send("Hello World! Node");
});

//create the data 
app.post('/product', async (req ,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
});


//Database connect
mongoose.set('strictQuery' , false); 
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wrnfpsn.mongodb.net/Node-API?retryWrites=true&w=majority`).then(() => {
    //app server
    app.listen(port, () => { console.log(`Example app listening on port ${port}`);
    });
    console.log("Connect to Database!!!");}).catch((error) => {
    console.log(error);});
