const mongoose = require('mongoose')
const recipeschema = new mongoose.Schema({
    recipename:{
        type:String,
        required:true,
        trim:true
    },
    Ingredients:{
        type:String,
        required:true,
        trim:true
    }
  , procedure:{
        type:String,
        required:true,
        trim:true
    }  ,owner:{
        // this is used to connect the user and recipes
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{
    timestamps:true
}
)
const Recipe = mongoose.model('Recipe',recipeschema)
module.exports= Recipe