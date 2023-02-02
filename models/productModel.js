const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title:{
            type : String,
            required : [true , "Please enter a product title"]
        },
        quantity:{
            type : Number,
            required : true,
            default : 0
        },
        price:{
            type: Number, 
            required : true
        },
        image:{
            type: String,
            required: true
        },
        details:{
            type : String,
            required : false
        }
    },
    {
        timestamps : true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;