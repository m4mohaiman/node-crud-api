const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel');
var cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const port = 6969;

app.get("/", (req, res) => {
  res.send("API connected!");
});


//create the data 
app.post('/product', async (req ,res)=>{
    try{
        const products = await Product.create(req.body);
        res.status(200).json(products);
    } catch (error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
});

//read all data 
app.get('/product', async (req ,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
});

//read data by ID
app.get('/product/:id', async (req ,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
});

//edit data by ID 
app.put('/product/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch(error){
        res.status(500).json({message : error.message});
    }
});


//delete data 
app.delete('/product/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch(error){
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
